import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { User } from "./types";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => boolean;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

const DEMO_EMAIL =
  "hrmanager@peoplepay360.com";

const DEMO_PASSWORD = "Admin@123";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(
    () => {
      const saved =
        localStorage.getItem("peoplepay360_user");

      if (!saved) return null;

      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
  );

  const login = (
    email: string,
    password: string
  ) => {
    if (
      email.trim().toLowerCase() === DEMO_EMAIL &&
      password === DEMO_PASSWORD
    ) {
      const loggedInUser: User = {
        id: "demo-user-1",
        email: DEMO_EMAIL,
        role: "HR_MANAGER",
      };

      setUser(loggedInUser);

      localStorage.setItem(
        "peoplepay360_user",
        JSON.stringify(loggedInUser)
      );

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(
      "peoplepay360_user"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}