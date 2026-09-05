export type UserRole =
  | "EMPLOYEE"
  | "HR_MANAGER"
  | "HR_PAYROLL_USER"
  | "HR_PAYROLL_MANAGER"
  | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}