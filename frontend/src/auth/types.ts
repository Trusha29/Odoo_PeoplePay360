export type UserRole =
  | "EMPLOYEE"
  | "HR_MANAGER"
  | "HR_PAYROLL_USER"
  | "HR_PAYROLL_MANAGER"
  | "ADMIN";

export interface User {
  id: number;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}