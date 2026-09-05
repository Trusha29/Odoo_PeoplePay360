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
import CreateEmployee from "./pages/EmployeeForm.tsx";

import ModulePage from "./pages/ModulePage";
import SettingsPage from "./pages/SettingsPage";
function DashboardRoute() {
  const navigate = useNavigate();

  return (
    <Dashboard
      onEmployees={() => navigate("/employees")}
      onCreateEmployee={() => navigate("/employees/new")}
      onNavigate={navigate}
    />
  );
}

function EmployeesRoute() {
  const navigate = useNavigate();

  return (
    <EmployeesPage
      onBack={() => navigate("/dashboard")}
      onCreateEmployee={() => navigate("/employees/new")}
      onNavigate={navigate}
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

function ModuleRoute({ kind }: { kind: "Contracts" | "Attendance" | "Time Off" | "Working Schedules" }) {
  const navigate = useNavigate();
  return <ModulePage kind={kind} onNavigate={navigate} />;
}

function SettingsRoute() {
  const navigate = useNavigate();
  return <SettingsPage onNavigate={navigate} />;
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

          <Route path="/contracts" element={<ProtectedRoute><ModuleRoute kind="Contracts" /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><ModuleRoute kind="Attendance" /></ProtectedRoute>} />
          <Route path="/time-off" element={<ProtectedRoute><ModuleRoute kind="Time Off" /></ProtectedRoute>} />
          <Route path="/working-schedules" element={<ProtectedRoute><ModuleRoute kind="Working Schedules" /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsRoute /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}