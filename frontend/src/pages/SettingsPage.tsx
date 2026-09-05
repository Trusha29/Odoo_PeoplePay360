import { useState } from "react";
import { Bell, Building2, Check, LockKeyhole, Save, UserRound } from "lucide-react";
import AppShell from "../components/layouts/AppShell";

export default function SettingsPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [saved, setSaved] = useState(false);
  return <AppShell title="Settings" active="Settings" onNavigate={onNavigate}><section className="dashboard-content module-content">
    <div className="page-header"><div><h1>Settings</h1><p>Manage workspace preferences and your account.</p></div></div>
    <div className="settings-grid">
      <section className="module-panel settings-panel"><div className="form-card-heading"><div className="form-heading-icon"><Building2 size={19} /></div><div><h2>Organization</h2><p>Details shown across your HR workspace.</p></div></div><label className="settings-field">Organization name<input defaultValue="PeoplePay360" /></label><label className="settings-field">Timezone<select defaultValue="Asia/Kolkata"><option>Asia/Kolkata</option><option>UTC</option><option>America/New_York</option></select></label></section>
      <section className="module-panel settings-panel"><div className="form-card-heading"><div className="form-heading-icon"><UserRound size={19} /></div><div><h2>Account</h2><p>Update the details for your HR manager account.</p></div></div><label className="settings-field">Display name<input defaultValue="HR Manager" /></label><label className="settings-field">Email<input defaultValue="hr@peoplepay360.com" type="email" /></label></section>
      <section className="module-panel settings-panel"><div className="form-card-heading"><div className="form-heading-icon"><Bell size={19} /></div><div><h2>Notifications</h2><p>Choose which updates appear in your workspace.</p></div></div><label className="settings-toggle"><input type="checkbox" defaultChecked /> <span>Leave request notifications</span></label><label className="settings-toggle"><input type="checkbox" defaultChecked /> <span>Attendance reminders</span></label></section>
      <section className="module-panel settings-panel"><div className="form-card-heading"><div className="form-heading-icon"><LockKeyhole size={19} /></div><div><h2>Security</h2><p>Keep your PeoplePay360 account protected.</p></div></div><button className="secondary-action">Change password</button></section>
    </div>
    <div className="settings-save"><button className="save-button" onClick={() => setSaved(true)}><Save size={15} /> Save settings</button>{saved && <span><Check size={15} /> Settings saved locally</span>}</div>
  </section></AppShell>;
}