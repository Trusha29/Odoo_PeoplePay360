import "dotenv/config";

const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  DATABASE_URL: requiredEnv("DATABASE_URL"),
  JWT_SECRET: requiredEnv("JWT_SECRET"),

  PORT: Number(process.env.PORT) || 5000,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",

  NODE_ENV: process.env.NODE_ENV || "development",
};