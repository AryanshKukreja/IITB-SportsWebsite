import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Certificates.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const VerificationPage = () => {
  const { certId }              = useParams();
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const res  = await fetch(`${API}/certificate-verification/${certId}`);
        const data = await res.json();
        setResult(data);
      } catch {
        setResult({ valid: false, message: "Could not reach verification server." });
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [certId]);

  return (
    <div className="verify-page">
      <div className="verify-card">

        {/* IITB Sports branding */}
        <div className="verify-brand">
          <p className="verify-brand-text">IITB Sports Council</p>
          <p className="verify-brand-sub">Certificate Verification</p>
        </div>

        {loading && (
          <div className="verify-loading">
            <div className="cert-spinner" />
            <p>Verifying certificate…</p>
          </div>
        )}

        {!loading && result && (
          <div className={`verify-result ${result.valid ? "valid" : "invalid"}`}>

            <div className="verify-icon">
              {result.valid ? "✅" : "❌"}
            </div>

            <h2 className="verify-status">
              {result.valid ? "Valid Certificate" : "Invalid Certificate"}
            </h2>

            {result.valid ? (
              <div className="verify-details">
                <div className="verify-row">
                  <span className="verify-label">Name</span>
                  <span className="verify-value">{result.name}</span>
                </div>
                <div className="verify-row">
                  <span className="verify-label">Event</span>
                  <span className="verify-value">{result.event}</span>
                </div>
                <div className="verify-row">
                  <span className="verify-label">Position</span>
                  <span className="verify-value" style={{ textTransform: "capitalize" }}>
                    {result.position}
                  </span>
                </div>
                {result.issued_on && (
                  <div className="verify-row">
                    <span className="verify-label">Issued On</span>
                    <span className="verify-value">{result.issued_on}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="verify-message">
                {result.message || "This certificate could not be verified."}
              </p>
            )}
          </div>
        )}

        <p className="verify-footer">
          gymkhana.iitb.ac.in/sports
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;