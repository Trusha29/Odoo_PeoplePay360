import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { UserRole } from "../generated/prisma/client";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    // User must already be authenticated
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Check user's role
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
      return;
    }

    // Role is allowed
    next();
  };
};