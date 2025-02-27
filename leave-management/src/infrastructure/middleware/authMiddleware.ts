import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey"; 

export interface AuthRequest extends Request {
  user?: { id: number; role: "user" | "admin" };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    res.status(401).json({ error: "Accès refusé, token requis" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: "user" | "admin" };
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Accès refusé, admin requis" });
    return;
  }
  next();
};
