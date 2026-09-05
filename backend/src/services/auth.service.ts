import { prisma } from "../config/prisma";
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { LoginInput } from "../types/auth.types";

export const login = async (input: LoginInput) => {
  const { email, password } = input;

  // 1. Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // 2. Check if user exists
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 3. Compare entered password with hashed password
  const passwordValid = await comparePassword(
    password,
    user.passwordHash
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  // 4. Generate JWT
  const token = generateToken(
    user.id,
    user.role
  );

  // 5. Return safe user information + token
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};