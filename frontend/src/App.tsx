import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "40px" }}>
      <h1>PeoplePay360 Dashboard</h1>

      <p>
        Login successful.
      </p>

      {user && (
        <>
          <p>
            Email: {user.email}
          </p>

          <p>
            Role: {user.role}
          </p>
        </>
      )}

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}