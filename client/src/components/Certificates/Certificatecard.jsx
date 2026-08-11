import React, { useState } from "react";
import "./Certificates.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const POSITION_LABELS = {
  first:         "🥇 1st Place",
  second:        "🥈 2nd Place",
  third:         "🥉 3rd Place",
  participation: "🎖️ Participation",
};

const POSITION_COLORS = {
  first:         "#FFD700",
  second:        "#C0C0C0",
  third:         "#CD7F32",
  participation: "#00C8FF",
};

const CertificateCard = ({ cert, token }) => {
  const [downloading, setDownloading] = useState(false);
  const [error, setError]             = useState("");

  const handleDownload = async () => {
    setDownloading(true);
    setError("");
    try {
      const res = await fetch(`${API}/certificates/download/${cert.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Download failed. Please try again.");

      const blob = await res.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `certificate_${cert.event.replace(/\s+/g, "_")}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  };

  const positionColor = POSITION_COLORS[cert.position] || "#00C8FF";
  const positionLabel = POSITION_LABELS[cert.position]  || cert.position;

  const formattedDate = cert.approved_at
    ? new Date(cert.approved_at).toLocaleDateString("en-IN", {
        day:   "numeric",
        month: "long",
        year:  "numeric",
      })
    : null;

  return (
    <div className="cert-card" style={{ "--pos-color": positionColor }}>
      <div className="cert-card-glow" />

      {/* Top accent bar */}
      <div className="cert-card-bar" style={{ background: positionColor }} />

      <div className="cert-card-body">
        <span className="cert-card-position">{positionLabel}</span>
        <h3 className="cert-card-event">{cert.event}</h3>
        {formattedDate && (
          <p className="cert-card-date">Issued {formattedDate}</p>
        )}
      </div>

      <div className="cert-card-footer">
        {error && <p className="cert-card-error">{error}</p>}
        <button
          className="cert-btn-download"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? (
            <span className="cert-btn-download-loading">
              <span className="cert-spinner-sm" /> Downloading…
            </span>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;