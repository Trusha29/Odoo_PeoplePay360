import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import api from "../services/api";
import type {
  User,
  UserRole,
} from "./types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(
    () => {
      const savedUser =
        localStorage.getItem(
          "peoplepay360_user"
        );

      if (!savedUser) {
        return null;
      }

      try {
        return JSON.parse(savedUser);
      } catch {
        localStorage.removeItem(
          "peoplepay360_user"
        );
        return null;
      }
    }
  );

  const [token, setToken] = useState<string | null>(
    () => {
      return localStorage.getItem(
        "peoplepay360_token"
      );
    }
  );

  const [loading, setLoading] =
    useState(false);

  const login = async (
    email: string,
    password: string
  ): Promise<void> => {
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      const data = response.data.data;

      const loggedInUser: User = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role as UserRole,
      };

      const newToken: string = data.token;

      setToken(newToken);
      setUser(loggedInUser);

      localStorage.setItem(
        "peoplepay360_token",
        newToken
      );

      localStorage.setItem(
        "peoplepay360_user",
        JSON.stringify(loggedInUser)
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem(
      "peoplepay360_token"
    );

    localStorage.removeItem(
      "peoplepay360_user"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
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