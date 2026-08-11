import React, { useState, useEffect } from "react";
import LoginModal from "./Loginmodal";
import CertificateCard from "./Certificatecard";
import "./Certificates.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const CertificatesPage = () => {
  const [user, setCertUser]       = useState(null);
  const [certificates, setCerts]  = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [showLogin, setShowLogin] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const saved = localStorage.getItem("cert_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCertUser(parsed);
      fetchCertificates(parsed.token);
    }
  }, []);

  const fetchCertificates = async (token) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/certificates/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { handleLogout(); return; }
      const data = await res.json();
      setCerts(data.certificates || []);
    } catch {
      setError("Could not load certificates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setCertUser(userData);
    localStorage.setItem("cert_user", JSON.stringify(userData));
    setShowLogin(false);
    fetchCertificates(userData.token);
  };

  const handleLogout = () => {
    setCertUser(null);
    setCerts([]);
    localStorage.removeItem("cert_user");
  };

  return (
    <div className="cert-page">

      <div className="cert-hero">
        <div className="cert-hero-glow" />
        <div className="cert-hero-content">
          <p className="cert-eyebrow">IITB SPORTS COUNCIL</p>
          <h1 className="cert-title">Your Certificates</h1>
          <p className="cert-subtitle">
            Download your achievement certificates issued by IITB Sports Council.
          </p>
          {!user ? (
            <button className="cert-btn-primary" onClick={() => setShowLogin(true)}>
              Log In to View Certificates
            </button>
          ) : (
            <div className="cert-user-bar">
              <span className="cert-user-info">
                <span className="cert-user-dot" />
                {user.name}&nbsp;·&nbsp;{user.roll_number}
              </span>
              <button className="cert-btn-ghost" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="cert-content">
        {!user && (
          <div className="cert-empty">
            <div className="cert-empty-icon">🏅</div>
            <p className="cert-empty-title">Log in to access your certificates</p>
            <p className="cert-empty-sub">
              Use your roll number and password to view and download certificates
              issued to you by IITB Sports Council.
            </p>
          </div>
        )}

        {user && loading && (
          <div className="cert-loading">
            <div className="cert-spinner" />
            <p>Loading your certificates…</p>
          </div>
        )}

        {user && !loading && error && (
          <div className="cert-error">{error}</div>
        )}

        {user && !loading && !error && certificates.length === 0 && (
          <div className="cert-empty">
            <div className="cert-empty-icon">📋</div>
            <p className="cert-empty-title">No certificates yet</p>
            <p className="cert-empty-sub">
              Certificates will appear here once they have been approved and
              issued by the Sports Council.
            </p>
          </div>
        )}

        {user && !loading && certificates.length > 0 && (
          <>
            <p className="cert-count">
              {certificates.length} certificate{certificates.length !== 1 ? "s" : ""} issued to you
            </p>
            <div className="cert-grid">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} token={user.token} />
              ))}
            </div>
          </>
        )}
      </div>

      {showLogin && (
        <LoginModal
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}
    </div>
  );
};

export default CertificatesPage;