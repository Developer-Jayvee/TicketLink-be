import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message : 'Unauthenticated' });
  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, user) => {
      if (err) return res.status(403).json({ message : 'Unauthenticated' });
      req.user = user;
      next();
    },
  );
}
