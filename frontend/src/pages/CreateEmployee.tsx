import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Clock3,
  ClipboardList,
  Landmark,
  LogOut,
  Mail,
  Menu,
  Settings,
  Upload,
  UserCircle2,
  Users,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import api from "../services/api";

type CreateEmployeeProps = {
  onBack: () => void;
  onDashboard: () => void;
};

const initialForm = {
  firstName: "",
  lastName: "",
  workEmail: "",
  phone: "",
  dateOfBirth: "",
  joiningDate: "",
  jobTitle: "",
  department: "",
  employmentType: "FULL_TIME",
  manager: "",
  status: "ACTIVE",
  bankName: "",
  accountNumber: "",
  ifsc: "",
};

export default function CreateEmployee({ onBack, onDashboard }: CreateEmployeeProps) {
  const { user, logout } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (name: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
    setSaved(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.firstName || !form.lastName || !form.workEmail || !form.joiningDate) {
      setError("Please complete the required employee details.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await api.post("/employees", {
        employeeCode: `EMP-${Date.now()}`,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.workEmail,
        phone: form.phone || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        joiningDate: form.joiningDate,
        jobTitle: form.jobTitle || undefined,
        bankName: form.bankName || undefined,
        bankAccountNo: form.accountNumber || undefined,
        bankIfsc: form.ifsc || undefined,
        status: form.status,
      });
      setSaved(true);
      setTimeout(onBack, 500);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save employee."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo"><Users size={23} /></div>
          <div><h2>PeoplePay360</h2><span>HR Management</span></div>
        </div>
        <div className="sidebar-section-title">MAIN</div>
        <nav className="sidebar-nav">
          <SideItem icon={<ClipboardList size={19} />} label="Dashboard" onClick={onDashboard} />
          <SideItem icon={<Users size={19} />} label="Employees" active />
          <SideItem icon={<BriefcaseBusiness size={19} />} label="Contracts" />
          <SideItem icon={<Clock3 size={19} />} label="Attendance" />
          <SideItem icon={<CalendarDays size={19} />} label="Time Off" />
          <SideItem icon={<ClipboardList size={19} />} label="Working Schedules" />
        </nav>
        <div className="sidebar-section-title settings-title">SYSTEM</div>
        <nav className="sidebar-nav"><SideItem icon={<Settings size={19} />} label="Settings" /></nav>
        <div className="sidebar-bottom">
          <div className="sidebar-user"><div className="avatar">HR</div><div><strong>HR Manager</strong><span>{user?.email}</span></div></div>
          <button className="sidebar-logout" onClick={logout} aria-label="Log out"><LogOut size={18} /></button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-navbar">
          <div className="mobile-menu"><Menu size={21} /></div>
          <div className="breadcrumb"><span>PeoplePay360</span><span>/</span><span>Employees</span><span>/</span><strong>Add Employee</strong></div>
          <div className="navbar-right"><button className="notification-button" aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button><div className="navbar-profile"><div className="navbar-avatar">HR</div><div className="navbar-user"><strong>HR Manager</strong><span>HR Manager <ChevronDown size={13} /></span></div></div></div>
        </header>

        <section className="dashboard-content employee-page-content">
          <div className="employee-page-header">
            <div>
              <button className="back-link" onClick={onBack}><ArrowLeft size={17} /> Back to employees</button>
              <h1>Add Employee</h1>
              <p>Create a new employee record and assign their work details.</p>
            </div>
            <div className="employee-code"><span>Employee ID</span><strong>Generated automatically</strong></div>
          </div>

          <form className="employee-form" onSubmit={submit}>
            <div className="form-card">
              <div className="form-card-heading"><div className="form-heading-icon"><UserCircle2 size={19} /></div><div><h2>Personal information</h2><p>Basic information about the employee.</p></div></div>
              <div className="photo-upload"><div className="photo-placeholder"><UserCircle2 size={38} /></div><div><strong>Employee photo</strong><span>JPG or PNG, maximum size 2 MB</span><button type="button" className="upload-button"><Upload size={15} /> Upload photo</button></div></div>
              <div className="field-grid">
                <Field label="First name" required><input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Enter first name" /></Field>
                <Field label="Last name" required><input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Enter last name" /></Field>
                <Field label="Work email" required><div className="field-with-icon"><Mail size={16} /><input type="email" value={form.workEmail} onChange={(e) => update("workEmail", e.target.value)} placeholder="name@company.com" /></div></Field>
                <Field label="Phone number"><input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Enter phone number" /></Field>
                <Field label="Date of birth"><input type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} /></Field>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-heading"><div className="form-heading-icon"><BriefcaseBusiness size={19} /></div><div><h2>Employment details</h2><p>Set the employee's role and organization details.</p></div></div>
              <div className="field-grid">
                <Field label="Job title"><input value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} placeholder="e.g. Software Engineer" /></Field>
                <Field label="Department"><Select value={form.department} onChange={(value) => update("department", value)} placeholder="Select department" options={["Engineering", "Human Resources", "Finance", "Sales & Marketing", "Operations"]} /></Field>
                <Field label="Joining date" required><input type="date" value={form.joiningDate} onChange={(e) => update("joiningDate", e.target.value)} /></Field>
                <Field label="Employment type"><Select value={form.employmentType} onChange={(value) => update("employmentType", value)} options={["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"]} /></Field>
                <Field label="Reporting manager"><Select value={form.manager} onChange={(value) => update("manager", value)} placeholder="Select manager" options={["Anita Sharma", "Rahul Mehta", "Priya Nair"]} /></Field>
                <Field label="Employee status"><Select value={form.status} onChange={(value) => update("status", value)} options={["ACTIVE", "INACTIVE"]} /></Field>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-heading"><div className="form-heading-icon"><Landmark size={19} /></div><div><h2>Bank details</h2><p>Optional information used for payroll processing.</p></div></div>
              <div className="field-grid three-columns">
                <Field label="Bank name"><input value={form.bankName} onChange={(e) => update("bankName", e.target.value)} placeholder="Enter bank name" /></Field>
                <Field label="Account number"><input value={form.accountNumber} onChange={(e) => update("accountNumber", e.target.value)} placeholder="Enter account number" /></Field>
                <Field label="IFSC code"><input value={form.ifsc} onChange={(e) => update("ifsc", e.target.value)} placeholder="Enter IFSC code" /></Field>
              </div>
            </div>

            {error && <div className="form-message error-message">{error}</div>}
            {saved && <div className="form-message success-message">Employee details are ready to be saved. Backend employee creation will be connected when the API is available.</div>}
            <div className="form-actions"><button type="button" className="cancel-button" onClick={onBack}>Cancel</button><button type="submit" className="save-button" disabled={saving}>{saving ? "Saving..." : "Save employee"}</button></div>
          </form>
        </section>
      </main>
    </div>
  );
}

function SideItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return <button className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>{icon}<span>{label}</span></button>;
}

function Field({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="employee-field"><span>{label}{required && <b> *</b>}</span>{children}</label>;
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (value: string) => void; options: string[]; placeholder?: string }) {
  return <div className="select-wrap"><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">{placeholder ?? "Select an option"}</option>{options.map((option) => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}</select><ChevronDown size={16} /></div>;
}


