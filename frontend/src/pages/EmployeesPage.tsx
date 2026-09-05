
import { useEffect, useMemo, useState } from "react";
import {
  Bell, BriefcaseBusiness, CalendarDays, ChevronDown, ChevronLeft, ChevronRight,
  Clock3, ClipboardList, Edit3, LayoutDashboard, LogOut, Menu, MoreHorizontal,
  Plus, Search, Settings, UserCheck, UserMinus, UserRoundX, Users, X,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import api from "../services/api";

type EmployeesPageProps = {
  onBack: () => void;
  onCreateEmployee: () => void;
};
type Employee = {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string | null;
  joiningDate: string | null;
  status: "ACTIVE" | "INACTIVE" | "TERMINATED";
  department: { name: string } | null;
};

export default function EmployeesPage({ onBack, onCreateEmployee }: EmployeesPageProps) {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [status, setStatus] = useState("All statuses");
  const [notice, setNotice] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.get<{ success: boolean; data: Employee[] }>("/employees")
      .then((response) => {
        if (active) {
          setEmployees(response.data.data);
        }
      })
      .catch(() => {
        if (active) {
          setNotice("Unable to load employees from the backend.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredEmployees = useMemo(() => employees.filter((employee) => {
    const name = `${employee.firstName} ${employee.lastName}`;
    const departmentName = employee.department?.name ?? "Unassigned";
    const displayStatus = employee.status[0] + employee.status.slice(1).toLowerCase();
    const matchSearch = `${name} ${employee.email} ${employee.employeeCode}`.toLowerCase().includes(search.toLowerCase());
    const matchDepartment = department === "All departments" || departmentName === department;
    const matchStatus = status === "All statuses" || displayStatus === status;
    return matchSearch && matchDepartment && matchStatus;
  }), [employees, search, department, status]);

  const activeCount = employees.filter((employee) => employee.status === "ACTIVE").length;
  const inactiveCount = employees.filter((employee) => employee.status === "INACTIVE").length;
  const terminatedCount = employees.filter((employee) => employee.status === "TERMINATED").length;

  const clearFilters = () => { setSearch(""); setDepartment("All departments"); setStatus("All statuses"); };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand"><div className="sidebar-logo"><Users size={23} /></div><div><h2>PeoplePay360</h2><span>HR Management</span></div></div>
        <div className="sidebar-section-title">MAIN</div>
        <nav className="sidebar-nav">
          <SideItem icon={<LayoutDashboard size={19} />} label="Dashboard" onClick={onBack} />
          <SideItem icon={<Users size={19} />} label="Employees" active />
          <SideItem icon={<BriefcaseBusiness size={19} />} label="Contracts" />
          <SideItem icon={<Clock3 size={19} />} label="Attendance" />
          <SideItem icon={<CalendarDays size={19} />} label="Time Off" />
          <SideItem icon={<ClipboardList size={19} />} label="Working Schedules" />
        </nav>
        <div className="sidebar-section-title settings-title">SYSTEM</div><nav className="sidebar-nav"><SideItem icon={<Settings size={19} />} label="Settings" /></nav>
        <div className="sidebar-bottom"><div className="sidebar-user"><div className="avatar">HR</div><div><strong>HR Manager</strong><span>{user?.email}</span></div></div><button className="sidebar-logout" onClick={logout} aria-label="Log out"><LogOut size={18} /></button></div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-navbar"><div className="mobile-menu"><Menu size={21} /></div><div className="breadcrumb"><span>PeoplePay360</span><span>/</span><strong>Employees</strong></div><div className="navbar-right"><button className="notification-button" aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button><div className="navbar-profile"><div className="navbar-avatar">HR</div><div className="navbar-user"><strong>HR Manager</strong><span>HR Manager <ChevronDown size={13} /></span></div></div></div></header>

        <section className="dashboard-content employees-page-content">
          <div className="employees-header"><div><h1>Employees</h1><p>Manage your workforce and employee information.</p></div><button className="add-employee-button" onClick={onCreateEmployee}><Plus size={17} /> Add Employee</button></div>
          {notice && <div className="employee-notice"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15} /></button></div>}

          <div className="employee-kpi-grid">
            <EmployeeKpi icon={<Users />} label="Total Employees" value={String(employees.length)} tone="blue" />
            <EmployeeKpi icon={<UserCheck />} label="Active" value={String(activeCount)} tone="green" />
            <EmployeeKpi icon={<UserMinus />} label="Inactive" value={String(inactiveCount)} tone="amber" />
            <EmployeeKpi icon={<UserRoundX />} label="Terminated" value={String(terminatedCount)} tone="red" />
          </div>

          <section className="employee-list-card">
            <div className="employee-filter-bar">
              <label className="employee-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employees" aria-label="Search employees" /></label>
              <FilterSelect label="Department" value={department} onChange={setDepartment} options={["All departments", "Engineering", "Finance", "Human Resources", "Operations", "Sales & Marketing"]} />
              <FilterSelect label="Status" value={status} onChange={setStatus} options={["All statuses", "Active", "Inactive", "Terminated"]} />
              <button className="clear-filter-button" onClick={clearFilters}>Clear filters</button>
            </div>
            <div className="employee-table-wrap"><table className="employee-table"><thead><tr><th>Employee</th><th>Employee Code</th><th>Department</th><th>Job Title</th><th>Joining Date</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>
              {loading && <tr><td className="no-employees" colSpan={7}>Loading employees...</td></tr>}
              {!loading && filteredEmployees.map((employee) => { const name = `${employee.firstName} ${employee.lastName}`; const displayStatus = employee.status[0] + employee.status.slice(1).toLowerCase(); return <tr key={employee.id}><td><div className="employee-identity"><div className="employee-avatar">{employee.firstName[0]}{employee.lastName[0]}</div><div><strong>{name}</strong><span>{employee.email}</span></div></div></td><td>{employee.employeeCode}</td><td>{employee.department?.name ?? "Unassigned"}</td><td>{employee.jobTitle ?? "-"}</td><td>{employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : "-"}</td><td><span className={`employee-status ${displayStatus.toLowerCase()}`}>{displayStatus}</span></td><td><div className="row-actions"><button aria-label={`Edit ${name}`}><Edit3 size={16} /></button><button aria-label={`More options for ${name}`}><MoreHorizontal size={18} /></button></div></td></tr>; })}
              {!loading && !filteredEmployees.length && <tr><td className="no-employees" colSpan={7}>No employees match these filters.</td></tr>}
            </tbody></table></div>
            <div className="employee-pagination"><span>Showing <strong>{filteredEmployees.length ? 1 : 0}</strong> to <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong> employees</span><div><button aria-label="Previous page" disabled><ChevronLeft size={17} /></button><button className="active-page">1</button><button aria-label="Next page" disabled><ChevronRight size={17} /></button></div></div>
          </section>
        </section>
      </main>
    </div>
  );
}

function SideItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) { return <button className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>{icon}<span>{label}</span></button>; }
function EmployeeKpi({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) { return <div className="employee-kpi"><div className={`employee-kpi-icon ${tone}`}>{icon}</div><div><span>{label}</span><strong>{value}</strong></div></div>; }
function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) { return <label className="employee-filter-select"><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={16} /></label>; }


