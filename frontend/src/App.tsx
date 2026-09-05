import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import CreateEmployee from "./pages/CreateEmployee";

function DashboardRoute() {
  const navigate = useNavigate();

  return (
    <Dashboard
      onEmployees={() => navigate("/employees")}
      onCreateEmployee={() => navigate("/employees/new")}
    />
  );
}

function EmployeesRoute() {
  const navigate = useNavigate();

  return (
    <EmployeesPage
      onBack={() => navigate("/dashboard")}
      onCreateEmployee={() => navigate("/employees/new")}
    />
  );
}

function CreateEmployeeRoute() {
  const navigate = useNavigate();

  return (
    <CreateEmployee
      onBack={() => navigate("/employees")}
      onDashboard={() => navigate("/dashboard")}
    />
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
                <DashboardRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeesRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees/new"
            element={
              <ProtectedRoute>
                <CreateEmployeeRoute />
              </ProtectedRoute>
            }
          />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}