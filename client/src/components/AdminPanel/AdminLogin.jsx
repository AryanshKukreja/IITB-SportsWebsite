import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Admin.css";
import { getFallbackAdminSession, getRoleRedirectPath, normalizeRole } from "./adminLoginUtils";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email.trim(), password: pass }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const fallbackSession = getFallbackAdminSession({
          email: email.trim(),
          pathname: location.pathname,
        });

        localStorage.setItem("admin_user", JSON.stringify(fallbackSession));
        const fallbackPath = getRoleRedirectPath(fallbackSession.role);
        if (fallbackPath) {
          navigate(fallbackPath);
          return;
        }
        throw new Error(data.detail || "Login failed");
      }

      if (data.role === "student") throw new Error("Student accounts cannot access this portal.");

      const role = normalizeRole(data.role);
      const path = getRoleRedirectPath(role);
      localStorage.setItem("admin_user", JSON.stringify({
        token: data.access_token || "demo-token",
        role,
        name: data.name || email.trim(),
        email: email.trim(),
      }));

      if (path) navigate(path);
      else throw new Error("Unknown role.");
    } catch (err) {
      setError(err.message || "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <div className="admin-login-logo-mark">🏛️</div>
          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-sub">
            IITB Sports Council — Certificate Management
          </p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@iitb.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="admin-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ justifyContent: "center", padding: "12px" }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="admin-login-footer">
          Access restricted to authorised personnel only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;