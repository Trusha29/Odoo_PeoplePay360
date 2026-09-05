import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "../types/auth.types";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
      return;
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
      return;
    }

    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};