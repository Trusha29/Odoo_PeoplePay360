import {
  Bell, BriefcaseBusiness, CalendarDays, ChevronDown, Clock3, ClipboardList,
  LayoutDashboard, LogOut, Menu, Settings, Users,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

type AppShellProps = {
  title: string;
  trail?: string;
  active?: string;
  children: React.ReactNode;
  onNavigate: (path: string) => void;
};

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Employees", path: "/employees", icon: Users },
  { label: "Contracts", path: "/contracts", icon: BriefcaseBusiness },
  { label: "Attendance", path: "/attendance", icon: Clock3 },
  { label: "Time Off", path: "/time-off", icon: CalendarDays },
  { label: "Working Schedules", path: "/working-schedules", icon: ClipboardList },
];

export default function AppShell({ title, trail, active, children, onNavigate }: AppShellProps) {
  const { user, logout } = useAuth();
  return <div className="dashboard-layout">
    <aside className="sidebar">
      <button className="sidebar-brand" onClick={() => onNavigate("/dashboard")}><span className="sidebar-logo"><Users size={23} /></span><span><strong>PeoplePay360</strong><small>HR Management</small></span></button>
      <div className="sidebar-section-title">MAIN</div>
      <nav className="sidebar-nav">{navigation.map(({ label, path, icon: Icon }) => <button key={path} className={`sidebar-item ${active === label ? "active" : ""}`} onClick={() => onNavigate(path)}><Icon size={19} /><span>{label}</span></button>)}</nav>
      <div className="sidebar-section-title settings-title">SYSTEM</div><nav className="sidebar-nav"><button className={`sidebar-item ${active === "Settings" ? "active" : ""}`} onClick={() => onNavigate("/settings")}><Settings size={19} /><span>Settings</span></button></nav>
      <div className="sidebar-bottom"><div className="sidebar-user"><div className="avatar">HR</div><div><strong>HR Manager</strong><span>{user?.email}</span></div></div><button className="sidebar-logout" onClick={logout} aria-label="Log out"><LogOut size={18} /></button></div>
    </aside>
    <main className="dashboard-main"><header className="dashboard-navbar"><button className="mobile-menu" aria-label="Open navigation"><Menu size={21} /></button><div className="breadcrumb"><span>PeoplePay360</span><span>/</span><strong>{trail ?? title}</strong></div><div className="navbar-right"><button className="notification-button" aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button><div className="navbar-profile"><div className="navbar-avatar">HR</div><div className="navbar-user"><strong>HR Manager</strong><span>HR Manager <ChevronDown size={13} /></span></div></div></div></header>{children}</main>
  </div>;
}