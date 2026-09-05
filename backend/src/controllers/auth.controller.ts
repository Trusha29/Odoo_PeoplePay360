import { Request, Response } from "express";
import { login } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const result = await login({
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
};

export const meController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Authenticated user",
      data: req.user,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};