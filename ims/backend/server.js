import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());  
const PORT = 5000;

const db = mysql.createPool({
    host: "localhost",    
    user: "root",         
    password: "",         
    database: "ims",   
});

//Registration
app.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body; 

  try {
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (users.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, hashedPassword, email]); 
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

//Login
app.post("/api/login", async (req, res) => {
    const { usernameOrEmail, password } = req.body;
  
    try {
      const [users] = await db.query("SELECT * FROM users WHERE username = ? OR email = ?", [usernameOrEmail, usernameOrEmail]);
      if (users.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const user = users[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Error logging in" });
    }
});

//Profile update
app.put("/api/profile", async (req, res) => {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const { username, newPassword } = req.body;
  
      const [users] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
      if (users.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const user = users[0];
  
      const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : user.password;
  
      await db.query("UPDATE users SET username = ?, password = ? WHERE id = ?", [username || user.username, hashedPassword, user.id]);
      res.json({ message: "Profile updated successfully" });
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Error updating profile" });
    }
});

// Fetch user data
app.get("/api/user", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await db.query("SELECT id, username, email FROM users WHERE id = ?", [decoded.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: users[0] });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

//Product list
app.get("/api/products", async (req, res) => {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      // Token validation
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const [products] = await db.query("SELECT * FROM products");
  
      res.json(products);
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: "Error fetching products" });
    }
});

// Logout, destroy token
app.post("/api/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});

//Server starting
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});