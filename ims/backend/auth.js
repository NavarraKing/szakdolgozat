import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token is missing or invalid" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = {
      id: user.id,
      username: user.username,
      account_level: user.account_level, 
    };
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (req.user.account_level !== 1) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

export default authenticateToken;