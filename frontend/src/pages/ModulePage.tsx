import { useState } from "react";
import { CalendarCheck, Check, ClipboardCheck, Clock3, FileText, Plus, Save, Users } from "lucide-react";
import AppShell from "../components/layouts/AppShell";

type ModulePageProps = { kind: "Contracts" | "Attendance" | "Time Off" | "Working Schedules"; onNavigate: (path: string) => void };
const content = {
  Contracts: { description: "Track employment agreements, dates, and renewal status.", icon: FileText, action: "New contract", columns: ["Employee", "Contract type", "Start date", "End date", "Status"] },
  Attendance: { description: "Review daily attendance and keep working time accurate.", icon: Clock3, action: "Record attendance", columns: ["Employee", "Date", "Check in", "Check out", "Status"] },
  "Time Off": { description: "Review leave requests and manage employee balances.", icon: CalendarCheck, action: "New request", columns: ["Employee", "Leave type", "From", "To", "Status"] },
  "Working Schedules": { description: "Define working hours and assign schedules to teams.", icon: ClipboardCheck, action: "Create schedule", columns: ["Schedule", "Working days", "Hours per day", "Employees", "Status"] },
} as const;

export default function ModulePage({ kind, onNavigate }: ModulePageProps) {
  const [showForm, setShowForm] = useState(false);
  const page = content[kind];
  const Icon = page.icon;
  return <AppShell title={kind} active={kind} onNavigate={onNavigate}><section className="dashboard-content module-content">
    <div className="page-header"><div><h1>{kind}</h1><p>{page.description}</p></div><button className="add-employee-button" onClick={() => setShowForm(true)}><Plus size={17} /> {page.action}</button></div>
    <div className="module-stats"><div><Icon size={19} /><span>Total records</span><strong>0</strong></div><div><Users size={19} /><span>People affected</span><strong>0</strong></div><div><Check size={19} /><span>Active items</span><strong>0</strong></div></div>
    <section className="module-panel"><div className="panel-header"><div><h2>{kind} records</h2><p>Records will appear here once they are added.</p></div></div><div className="module-table-wrap"><table className="module-table"><thead><tr>{page.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody><tr><td colSpan={page.columns.length}><div className="module-empty"><Icon size={28} /><strong>No {kind.toLowerCase()} yet</strong><span>Use “{page.action}” to create the first record.</span><button onClick={() => setShowForm(true)}>{page.action}</button></div></td></tr></tbody></table></div></section>
    {showForm && <div className="module-dialog-backdrop" role="presentation"><section className="module-dialog" role="dialog" aria-modal="true" aria-labelledby="module-dialog-title"><div><h2 id="module-dialog-title">{page.action}</h2><p>The backend endpoint for {kind.toLowerCase()} is not connected yet.</p></div><label>Notes<input placeholder="Add a note for this record" /></label><div className="form-actions"><button className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button><button className="save-button" onClick={() => setShowForm(false)}><Save size={15} /> Save draft</button></div></section></div>}
  </section></AppShell>;
}