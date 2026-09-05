
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clock3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  UserCheck,
  UserPlus,
  CalendarCheck,
  ClipboardList,
  BriefcaseBusiness,
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";

export default function Dashboard({
  onEmployees,
  onCreateEmployee,
  onNavigate,
}: {
  onEmployees: () => void;
  onCreateEmployee: () => void;
  onNavigate: (path: string) => void;
}) {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-layout">

      {/* =========================
          SIDEBAR
      ========================== */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            <Users size={23} />
          </div>

          <div>
            <h2>PeoplePay360</h2>
            <span>HR Management</span>
          </div>

        </div>

        <div className="sidebar-section-title">
          MAIN
        </div>

        <nav className="sidebar-nav">

          <SidebarItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active
          />

          <SidebarItem
            icon={<Users size={19} />}
            label="Employees"
            onClick={onEmployees}
          />

          <SidebarItem
            icon={<BriefcaseBusiness size={19} />}
            label="Contracts"
            onClick={() => onNavigate("/contracts")}
          />

          <SidebarItem
            icon={<Clock3 size={19} />}
            label="Attendance"
            onClick={() => onNavigate("/attendance")}
          />

          <SidebarItem
            icon={<CalendarDays size={19} />}
            label="Time Off"
            onClick={() => onNavigate("/time-off")}
          />

          <SidebarItem
            icon={<ClipboardList size={19} />}
            label="Working Schedules"
            onClick={() => onNavigate("/working-schedules")}
          />

        </nav>

        <div className="sidebar-section-title settings-title">
          SYSTEM
        </div>

        <nav className="sidebar-nav">

          <SidebarItem
            icon={<Settings size={19} />}
            label="Settings"
            onClick={() => onNavigate("/settings")}
          />

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="avatar">
              HR
            </div>

            <div>
              <strong>HR Manager</strong>
              <span>{user?.email}</span>
            </div>

          </div>

          <button
            className="sidebar-logout"
            onClick={logout}
          >
            <LogOut size={18} />
          </button>

        </div>

      </aside>

      {/* =========================
          MAIN
      ========================== */}

      <main className="dashboard-main">

        {/* TOP NAVBAR */}

        <header className="dashboard-navbar">

          <div className="mobile-menu">
            <Menu size={21} />
          </div>

          <div className="breadcrumb">
            <span>PeoplePay360</span>
            <span>/</span>
            <strong>Dashboard</strong>
          </div>

          <div className="navbar-right">

            <button className="notification-button">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="navbar-profile">

              <div className="navbar-avatar">
                HR
              </div>

              <div className="navbar-user">

                <strong>HR Manager</strong>

                <span>
                  HR Manager
                  <ChevronDown size={13} />
                </span>

              </div>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <section className="dashboard-content">

          {/* PAGE HEADER */}

          <div className="page-header">

            <div>
              <h1>HR Dashboard</h1>

              <p>
                Welcome back! Here's what's
                happening with your workforce today.
              </p>
            </div>

            <div className="page-date">
              <CalendarDays size={17} />
              <span>Today</span>
            </div>

          </div>

          {/* KPI CARDS */}

          <div className="kpi-grid">

            <KpiCard
              icon={<Users />}
              title="Total Employees"
              value="128"
              change="+8.2%"
              description="vs last month"
            />

            <KpiCard
              icon={<UserCheck />}
              title="Active Employees"
              value="116"
              change="+4.5%"
              description="currently active"
            />

            <KpiCard
              icon={<BriefcaseBusiness />}
              title="Active Contracts"
              value="104"
              change="+3.1%"
              description="running contracts"
            />

            <KpiCard
              icon={<CalendarCheck />}
              title="Pending Time Off"
              value="12"
              change="+2"
              description="requests to review"
              warning
            />

          </div>

          {/* SECOND ROW */}

          <div className="dashboard-columns">

            {/* ATTENDANCE */}

            <section className="dashboard-panel attendance-panel">

              <div className="panel-header">

                <div>
                  <h2>Today's Attendance</h2>
                  <p>
                    Employee attendance overview
                  </p>
                </div>

                <button className="panel-link">
                  View all
                </button>

              </div>

              <div className="attendance-summary">

                <AttendanceStat
                  label="Present"
                  value="96"
                  percentage="75%"
                />

                <AttendanceStat
                  label="Late"
                  value="8"
                  percentage="6%"
                />

                <AttendanceStat
                  label="On Leave"
                  value="12"
                  percentage="9%"
                />

                <AttendanceStat
                  label="Absent"
                  value="12"
                  percentage="9%"
                />

              </div>

              <div className="attendance-bar">

                <div
                  className="attendance-present"
                  style={{
                    width: "75%",
                  }}
                />

                <div
                  className="attendance-late"
                  style={{
                    width: "6%",
                  }}
                />

                <div
                  className="attendance-leave"
                  style={{
                    width: "9%",
                  }}
                />

                <div
                  className="attendance-absent"
                  style={{
                    width: "10%",
                  }}
                />

              </div>

            </section>

            {/* TIME OFF */}

            <section className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h2>Time Off Requests</h2>

                  <p>
                    Requests awaiting approval
                  </p>
                </div>

                <button className="panel-link">
                  View all
                </button>

              </div>

              <div className="request-list">

                <TimeOffRequest
                  initials="JD"
                  name="John Doe"
                  type="Annual Leave"
                  dates="Sep 08 - Sep 10"
                />

                <TimeOffRequest
                  initials="AS"
                  name="Alice Smith"
                  type="Sick Leave"
                  dates="Sep 09 - Sep 09"
                />

                <TimeOffRequest
                  initials="MK"
                  name="Michael Kumar"
                  type="Annual Leave"
                  dates="Sep 12 - Sep 16"
                />

              </div>

            </section>

          </div>

          {/* THIRD ROW */}

          <div className="dashboard-columns">

            {/* EMPLOYEE OVERVIEW */}

            <section className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h2>Employee Overview</h2>
                  <p>
                    Current workforce distribution
                  </p>
                </div>

                <button className="panel-link">
                  Employees
                </button>

              </div>

              <div className="employee-overview">

                <div className="employee-total">
                  <span>Total Workforce</span>
                  <strong>128</strong>
                </div>

                <div className="department-list">

                  <DepartmentRow
                    name="Engineering"
                    count="42"
                    percentage="33%"
                  />

                  <DepartmentRow
                    name="Human Resources"
                    count="18"
                    percentage="14%"
                  />

                  <DepartmentRow
                    name="Finance"
                    count="21"
                    percentage="16%"
                  />

                  <DepartmentRow
                    name="Sales & Marketing"
                    count="27"
                    percentage="21%"
                  />

                  <DepartmentRow
                    name="Operations"
                    count="20"
                    percentage="16%"
                  />

                </div>

              </div>

            </section>

            {/* QUICK ACTIONS */}

            <section className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h2>Quick Actions</h2>
                  <p>
                    Common HR operations
                  </p>
                </div>

              </div>

              <div className="quick-actions">

                <QuickAction
                  icon={<UserPlus />}
                  title="Add Employee"
                  description="Create employee record"
                  onClick={onCreateEmployee}
                />

                <QuickAction
                  icon={<FileText />}
                  title="New Contract"
                  description="Create employment contract"
                />

                <QuickAction
                  icon={<Clock3 />}
                  title="Attendance"
                  description="Review today's attendance"
                />

                <QuickAction
                  icon={<CalendarDays />}
                  title="Time Off"
                  description="Review leave requests"
                />

              </div>

            </section>

          </div>

        </section>

      </main>

    </div>
  );
}


/* =========================================
   SIDEBAR ITEM
========================================= */

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`sidebar-item ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


/* =========================================
   KPI CARD
========================================= */

function KpiCard({
  icon,
  title,
  value,
  change,
  description,
  warning = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  description: string;
  warning?: boolean;
}) {
  return (
    <div className="kpi-card">

      <div
        className={`kpi-icon ${
          warning ? "warning" : ""
        }`}
      >
        {icon}
      </div>

      <div className="kpi-info">

        <span className="kpi-title">
          {title}
        </span>

        <div className="kpi-value-row">
          <strong>{value}</strong>

          <span
            className={`kpi-change ${
              warning ? "warning-text" : ""
            }`}
          >
            {change}
          </span>
        </div>

        <span className="kpi-description">
          {description}
        </span>

      </div>

    </div>
  );
}


/* =========================================
   ATTENDANCE STAT
========================================= */

function AttendanceStat({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: string;
}) {
  return (
    <div className="attendance-stat">

      <span>{label}</span>

      <strong>{value}</strong>

      <small>{percentage}</small>

    </div>
  );
}


/* =========================================
   TIME OFF REQUEST
========================================= */

function TimeOffRequest({
  initials,
  name,
  type,
  dates,
}: {
  initials: string;
  name: string;
  type: string;
  dates: string;
}) {
  return (
    <div className="request-item">

      <div className="request-avatar">
        {initials}
      </div>

      <div className="request-info">

        <strong>{name}</strong>

        <span>
          {type} • {dates}
        </span>

      </div>

      <span className="pending-badge">
        Pending
      </span>

    </div>
  );
}


/* =========================================
   DEPARTMENT ROW
========================================= */

function DepartmentRow({
  name,
  count,
  percentage,
}: {
  name: string;
  count: string;
  percentage: string;
}) {
  return (
    <div className="department-row">

      <div className="department-name">
        <span>{name}</span>

        <strong>{count}</strong>
      </div>

      <div className="department-progress">

        <div
          style={{
            width: percentage,
          }}
        />

      </div>

      <span className="department-percentage">
        {percentage}
      </span>

    </div>
  );
}


/* =========================================
   QUICK ACTION
========================================= */

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <button className="quick-action" onClick={onClick}>

      <div className="quick-action-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

    </button>
  );
}
