import React, { useState } from "react";
import "./Certificates.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const LoginModal = ({ onSuccess, onClose }) => {
  const [tab, setTab]         = useState("login");
  const [identifier, setId]   = useState("");
  const [name, setName]       = useState("");
  const [password, setPass]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.trim().toUpperCase(),
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");
      if (data.role !== "student")
        throw new Error("Please use the admin portal to log in.");
      onSuccess({
        token:       data.access_token,
        name:        data.name,
        roll_number: identifier.trim().toUpperCase(),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/student/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roll_number: identifier.trim().toUpperCase(),
          name:        name.trim(),
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Registration failed");
      setTab("login");
      setName("");
      setPass("");
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-logo-ring"><span>🏅</span></div>

        <h2 className="modal-title">
          {tab === "login" ? "Welcome back" : "Create account"}
        </h2>
        <p className="modal-sub">
          {tab === "login"
            ? "Log in with your roll number to view your certificates."
            : "Register with your IITB roll number to get started."}
        </p>

        <div className="modal-tabs">
          <button
            className={`modal-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setError(""); }}
          >Log In</button>
          <button
            className={`modal-tab ${tab === "register" ? "active" : ""}`}
            onClick={() => { setTab("register"); setError(""); }}
          >Register</button>
        </div>

        <form onSubmit={tab === "login" ? handleLogin : handleRegister} className="modal-form">
          {tab === "register" && (
            <div className="modal-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Disha Jain"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="modal-field">
            <label>Roll Number</label>
            <input
              type="text"
              placeholder="e.g. 22B12345"
              value={identifier}
              onChange={(e) => setId(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="modal-field">
            <label>Password</label>
            <input
              type="password"
              placeholder={tab === "register" ? "Min. 8 characters" : "Enter your password"}
              value={password}
              onChange={(e) => setPass(e.target.value)}
              required
              autoComplete={tab === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          <button
            type="submit"
            className="cert-btn-primary modal-submit"
            disabled={loading}
          >
            {loading ? "Please wait…" : tab === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        {tab === "register" && (
          <p className="modal-hint">
            After registering, switch to Log In to access your certificates.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginModal;