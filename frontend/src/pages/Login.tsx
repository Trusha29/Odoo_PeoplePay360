import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <main className="login-page">
      <section className="login-left" aria-label="PeoplePay360 introduction">
        <div className="brand">
          <div className="brand-icon"><ShieldCheck size={26} /></div>
          <div>
            <h1>PeoplePay360</h1>
            <p>People operations, made clear.</p>
          </div>
        </div>
        <div className="login-promo">
          <h2>One calm place for your people operations.</h2>
          <p>Manage payroll, attendance, contracts, and time off from one secure workspace.</p>
        </div>
      </section>

      <section className="login-right">
        <div className="login-card">
          <div className="mobile-brand brand">
            <div className="brand-icon"><ShieldCheck size={24} /></div>
            <strong>PeoplePay360</strong>
          </div>
          <div className="login-heading">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="email">Work email</label>
              <div className="input-container">
                <Mail size={18} aria-hidden="true" />
                <input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} disabled={loading} />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <LockKeyhole size={18} aria-hidden="true" />
                <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={loading} />
                <button className="show-password" type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <div className="login-error" role="alert">{error}</div>}
            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="login-copyright">PeoplePay360 · Secure people operations</p>
        </div>
      </section>
    </main>
  );
}