import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "mysecretkey"; // 🔴 Replace with a real secret key in production

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    res.status(401).json({ error: "Accès refusé" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next(); // ✅ Ensure `next()` is called to continue request
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};