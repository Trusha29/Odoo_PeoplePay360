import { UserRole } from "../generated/prisma/client";

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface JwtPayload {
  userId: number;
  role: UserRole;
}

