import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Users,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");

    console.log("Login submitted:", {
      email,
      password,
    });
  }

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="brand">
          <div className="brand-icon">
            <Users size={28} />
          </div>

          <div>
            <h1>PeoplePay360</h1>
            <p>HR & Payroll Management</p>
          </div>
        </div>

        <div className="login-promo">
          <h2>
            Manage your people.
            <br />
            Empower your business.
          </h2>

          <p>
            A centralized HR management platform
            for employees, attendance, contracts,
            time off and payroll.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-card">

          <div className="login-heading">
            <h2>Welcome back</h2>

            <p>
              Sign in to your account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-field">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-container">

                <Mail size={18} />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="form-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-container">

                <LockKeyhole size={18} />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* ERROR */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-submit"
            >
              Sign in
            </button>

          </form>

          {/* DEMO CREDENTIALS */}
          <div className="demo-box">
            <strong>Demo HR Manager</strong>

            <p>
              Email:
              <br />
              hrmanager@peoplepay360.com
            </p>

            <p>
              Password:
              <br />
              Admin@123
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}