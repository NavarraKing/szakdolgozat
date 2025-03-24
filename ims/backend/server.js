import express from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import authenticateToken, { requireAdmin } from "./auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root", 
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ims",
});

// Registration
app.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    });
  }

  try {
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    await db.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const [users] = await db.query(
      `SELECT u.*, r.rolename 
       FROM users u 
       LEFT JOIN roles r ON u.account_level = r.id 
       WHERE u.username = ? OR u.email = ?`,
      [usernameOrEmail, usernameOrEmail]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, account_level: user.account_level },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Profile update
app.put("/api/profile", authenticateToken, async (req, res) => {
  const { username, email, phone_number, number_countrycode, given_name, family_name, dob, address, password, profile_picture } = req.body;
  const { id } = req.user;

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const changes = [];
    if (existingUser[0].username !== username) changes.push(`Username changed, ${existingUser[0].username} -> ${username}`);
    if (existingUser[0].email !== email) changes.push(`Email changed, ${existingUser[0].email} -> ${email}`);
    if (existingUser[0].phone_number !== phone_number) changes.push(`Phone Number changed, ${existingUser[0].phone_number} -> ${phone_number}`);
    if (existingUser[0].number_countrycode !== number_countrycode) changes.push(`Country Code changed, ${existingUser[0].number_countrycode} -> ${number_countrycode}`);
    if (existingUser[0].given_name !== given_name) changes.push(`Given Name changed, ${existingUser[0].given_name} -> ${given_name}`);
    if (existingUser[0].family_name !== family_name) changes.push(`Family Name changed, ${existingUser[0].family_name} -> ${family_name}`);
    if (existingUser[0].dob !== dob) changes.push(`Date of Birth changed, ${existingUser[0].dob || null} -> ${dob}`);
    if (existingUser[0].address !== address) changes.push(`Address changed, ${existingUser[0].address} -> ${address}`);
    if (existingUser[0].profile_picture !== profile_picture) changes.push(`Profile Picture changed`);

    const hashedPassword = password ? await argon2.hash(password) : undefined;

    await db.query(
      `UPDATE users SET 
        username = ?, 
        email = ?, 
        phone_number = ?, 
        number_countrycode = ?, 
        given_name = ?, 
        family_name = ?, 
        dob = ?, 
        address = ?, 
        profile_picture = ?, 
        password = COALESCE(?, password) 
      WHERE id = ?`,
      [
        username || null,
        email || null,
        phone_number || null,
        number_countrycode || null,
        given_name || null,
        family_name || null,
        dob || null, 
        address || null,
        profile_picture || null,
        hashedPassword,
        id,
      ]
    );

    if (changes.length > 0) {
      await db.query(
        "INSERT INTO users_logs (user_id, modified, modified_by) VALUES (?, ?, ?)",
        [id, `Edited: ${changes.join(", ")}`, id]
      );
    }

    const newToken = jwt.sign(
      { id, username, account_level: existingUser[0].account_level },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Profile updated successfully", token: newToken });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
});

app.post("/api/check-username", async (req, res) => {
  const { username } = req.body;
  const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  res.json({ available: users.length === 0 });
});

app.post("/api/check-email", authenticateToken, async (req, res) => {
  const { email } = req.body;
  const { id } = req.user;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ? AND id != ?", 
      [email, id]
    );
    res.json({ available: users.length === 0 });
  } catch (err) {
    console.error("Error checking email availability:", err);
    res.status(500).json({ message: "Error checking email availability" });
  }
});

app.post("/api/check-phone", authenticateToken, async (req, res) => {
  const { phone_number } = req.body;
  const { id } = req.user;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE phone_number = ? AND id != ?",
      [phone_number, id]
    );
    res.json({ available: users.length === 0 });
  } catch (err) {
    console.error("Error checking phone number availability:", err);
    res.status(500).json({ message: "Error checking phone number availability" });
  }
});

// Fetch user data
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;

    const [users] = await db.query(
      `SELECT u.*, r.rolename 
       FROM users u 
       LEFT JOIN roles r ON u.account_level = r.id 
       WHERE u.id = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        country_code: user.number_countrycode,
        given_name: user.given_name,
        family_name: user.family_name,
        dob: user.dob,
        address: user.address,
        profile_picture: user.profile_picture,
        role: user.rolename,
      },
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// Fetch all users (Admin only)
app.get("/api/users", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT id, username, email, phone_number, given_name, family_name, 
              DATE_FORMAT(dob, '%Y-%m-%d') AS dob, address, profile_picture, account_level 
       FROM users`
    );
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Update a specific user (Admin only)
app.put("/api/users/:id", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { username, email, phone_number, given_name, family_name, dob, address, account_level, password, profile_picture } = req.body;

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const changes = [];
    if (existingUser[0].username !== username) changes.push(`Username changed, ${existingUser[0].username} -> ${username}`);
    if (existingUser[0].email !== email) changes.push(`Email changed, ${existingUser[0].email} -> ${email}`);
    if (existingUser[0].phone_number !== phone_number) changes.push(`Phone Number changed, ${existingUser[0].phone_number} -> ${phone_number}`);
    if (existingUser[0].given_name !== given_name) changes.push(`Given Name changed, ${existingUser[0].given_name} -> ${given_name}`);
    if (existingUser[0].family_name !== family_name) changes.push(`Family Name changed, ${existingUser[0].family_name} -> ${family_name}`);
    if (existingUser[0].dob !== dob) changes.push(`Date of Birth changed, ${existingUser[0].dob || null} -> ${dob}`);
    if (existingUser[0].address !== address) changes.push(`Address changed, ${existingUser[0].address} -> ${address}`);
    if (existingUser[0].account_level !== account_level) changes.push(`Account Level changed, ${existingUser[0].account_level} -> ${account_level}`);
    if (existingUser[0].profile_picture !== profile_picture) changes.push(`Profile Picture changed`);

    const hashedPassword = password ? await argon2.hash(password) : undefined;

    const [result] = await db.query(
      `UPDATE users SET 
        username = ?, 
        email = ?, 
        phone_number = ?, 
        given_name = ?, 
        family_name = ?, 
        dob = ?, 
        address = ?, 
        account_level = ?, 
        profile_picture = ?, 
        password = COALESCE(?, password) 
      WHERE id = ?`,
      [
        username || null,
        email || null,
        phone_number || null,
        given_name || null,
        family_name || null,
        dob || null,
        address || null,
        account_level, 
        profile_picture || null,
        hashedPassword,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (changes.length > 0) {
      await db.query(
        "INSERT INTO users_logs (user_id, modified, modified_by) VALUES (?, ?, ?)",
        [id, `Edited: ${changes.join(", ")}`, req.user.id]
      );
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Product list
app.get("/api/products", authenticateToken, async (req, res) => {
  try {
    const [products] = await db.query("SELECT id, itemname, displayname, price, stock, description, image_url FROM products");
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Fetch product details by ID
app.get("/api/products/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [products] = await db.query(
      "SELECT id, itemname, displayname, price, stock, description, image_url FROM products WHERE id = ?",
      [id]
    );
    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(products[0]);
  } catch (err) {
    console.error("Error fetching product details:", err);
    res.status(500).json({ message: "Error fetching product details." });
  }
});

// Add a new product (Admin only)
app.post("/api/products", authenticateToken, requireAdmin, async (req, res) => {
  const { itemname, displayname, price, stock, description, image_url } = req.body;

  if (!itemname || !displayname || description === undefined || description.trim() === "") {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (price === null || price === undefined || stock === null || stock === undefined) {
    return res.status(400).json({ message: "Price and stock are required." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO products (itemname, displayname, price, stock, description, image_url, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [itemname, displayname, price, stock, description, image_url, req.user.id]
    );

    const productId = result.insertId;

    await db.query(
      "INSERT INTO products_logs (product_id, modified, modified_by) VALUES (?, ?, ?)",
      [productId, "Created", req.user.id]
    );

    res.status(201).json({ message: "Product added successfully." });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Error adding product." });
  }
});

// Update a product (Admin only)
app.put("/api/products/:id", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { itemname, displayname, price, stock, description, image_url } = req.body;

  if (!itemname || !displayname || description === undefined || description.trim() === "") {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (price === null || price === undefined || stock === null || stock === undefined) {
    return res.status(400).json({ message: "Price and stock are required." });
  }

  try {
    const [existingProduct] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (existingProduct.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    const changes = [];
    if (existingProduct[0].price !== price) {
      changes.push(`Price changed, ${existingProduct[0].price} -> ${price}`);
    }
    if (existingProduct[0].stock !== stock) {
      changes.push(`Stock changed, ${existingProduct[0].stock} -> ${stock}`);
    }
    if (existingProduct[0].image_url !== image_url) {
      changes.push(`Image URL changed, ${existingProduct[0].image_url} -> ${image_url}`);
    }
    if (existingProduct[0].itemname !== itemname) {
      changes.push(`Item Name changed, ${existingProduct[0].itemname} -> ${itemname}`);
    }
    if (existingProduct[0].displayname !== displayname) {
      changes.push(`Display Name changed, ${existingProduct[0].displayname} -> ${displayname}`);
    }
    if (existingProduct[0].description !== description) {
      changes.push(`Description changed, ${existingProduct[0].description} -> ${description}`);
    }

    if (changes.length === 0) {
      return res.status(400).json({ message: "No changes detected." });
    }

    const [result] = await db.query(
      "UPDATE products SET itemname = ?, displayname = ?, price = ?, stock = ?, description = ?, image_url = ?, last_modified = CURRENT_TIMESTAMP WHERE id = ?",
      [itemname, displayname, price, stock, description, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    await db.query(
      "INSERT INTO products_logs (product_id, modified, modified_by) VALUES (?, ?, ?)",
      [id, `Edited: ${changes.join(", ")}`, req.user.id]
    );

    res.json({ message: "Product updated successfully." });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Error updating product." });
  }
});

// Delete a product (Admin only)
app.delete("/api/products/:id", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const [existingProduct] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (existingProduct.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    await db.query(
      "INSERT INTO products_logs (product_id, modified, modified_by) VALUES (?, ?, ?)",
      [id, "Deleted", req.user.id]
    );

    res.json({ message: "Product deleted successfully." });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product." });
  }
});

// Fetch max account level
app.get("/api/roles/max", authenticateToken, async (req, res) => {
  try {
    const [result] = await db.query("SELECT MAX(id) AS maxLevel FROM roles");
    res.json({ maxLevel: result[0].maxLevel });
  } catch (err) {
    console.error("Error fetching max account level:", err);
    res.status(500).json({ message: "Error fetching max account level" });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Server starting
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});