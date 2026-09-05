import jwt from "jsonwebtoken";
import { UserRole } from "../generated/prisma/client";
import { env } from "../config/env";
import { JwtPayload } from "../types/auth.types";

export const generateToken = (
  userId: number,
  role: UserRole
): string => {
  const payload: JwtPayload = {
    userId,
    role,
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    env.JWT_SECRET
  ) as JwtPayload;
};