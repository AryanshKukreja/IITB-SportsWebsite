import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./Admin.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const STATUS_LABELS = {
  pending_chairperson: "Awaiting Chairperson",
  pending_dean:        "Awaiting Dean SA",
  approved:            "Approved ✓",
  rejected:            "Rejected",
};

const SecyDashboard = () => {
  const navigate           = useNavigate();
  const user               = JSON.parse(localStorage.getItem("admin_user") || "{}");
  const token              = user.token;
  const fileInputRef       = useRef();

  const [batches, setBatches]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [file, setFile]           = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert]         = useState(null);   // { type, message }
  const [dragOver, setDragOver]   = useState(false);

  useEffect(() => { fetchBatches(); }, []);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/admin/batches/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBatches(data.batches || []);
    } catch {
      setAlert({ type: "error", message: "Could not load batches." });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setAlert(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res  = await fetch(`${API}/admin/upload-csv`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Upload failed");
      setAlert({
        type: "success",
        message: `✓ ${data.message}. ${data.skipped > 0 ? `${data.skipped} row(s) skipped.` : ""}`,
      });
      setFile(null);
      fetchBatches();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setUploading(false);
    }
  };

  const pending     = batches.filter(b => b.status === "pending_chairperson").length;
  const inProgress  = batches.filter(b => b.status === "pending_dean").length;
  const approved    = batches.filter(b => b.status === "approved").length;
  const rejected    = batches.filter(b => b.status === "rejected").length;

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">GSSA Dashboard</h1>
        <p className="admin-page-sub">Upload CSV batches and track their approval status.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="admin-stat-card amber">
          <p className="admin-stat-label">Awaiting Chairperson</p>
          <p className="admin-stat-value">{pending}</p>
        </div>
        <div className="admin-stat-card blue">
          <p className="admin-stat-label">Awaiting Dean SA</p>
          <p className="admin-stat-value">{inProgress}</p>
        </div>
        <div className="admin-stat-card green">
          <p className="admin-stat-label">Approved</p>
          <p className="admin-stat-value">{approved}</p>
        </div>
        <div className="admin-stat-card red">
          <p className="admin-stat-label">Rejected</p>
          <p className="admin-stat-value">{rejected}</p>
        </div>
      </div>

      {/* Upload */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-title">Upload New Batch</span>
        </div>
        <div className="admin-section-body">
          <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "16px" }}>
            CSV must have columns: <strong>roll_number, name, event, position</strong>
            &nbsp;(position: first / second / third / participation)
          </p>

          {alert && (
            <div className={`admin-alert admin-alert-${alert.type}`}>
              {alert.message}
            </div>
          )}

          {/* Drop zone */}
          <div
            className={`admin-upload-zone ${dragOver ? "drag-over" : ""}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const dropped = e.dataTransfer.files[0];
              if (dropped?.name.endsWith(".csv")) setFile(dropped);
              else setAlert({ type: "error", message: "Only CSV files are accepted." });
            }}
          >
            <div className="admin-upload-icon">📂</div>
            <p className="admin-upload-title">
              {file ? "File selected" : "Click or drag a CSV file here"}
            </p>
            <p className="admin-upload-sub">Only .csv files are accepted</p>
            {file && (
              <div className="admin-upload-selected">
                📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="admin-upload-input"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </div>

          <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <button
              className="admin-btn admin-btn-primary"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading…" : "Submit Batch"}
            </button>
            {file && (
              <button
                className="admin-btn admin-btn-outline"
                onClick={() => setFile(null)}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Batches list */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-title">Your Submitted Batches</span>
          <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={fetchBatches}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" /> Loading batches…
          </div>
        ) : batches.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">📋</div>
            <p className="admin-empty-title">No batches submitted yet</p>
            <p className="admin-empty-sub">Upload a CSV to get started.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submitted</th>
                  <th>Certificates</th>
                  <th>Status</th>
                  <th>Rejection Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((b) => (
                  <tr key={b.id}>
                    <td>{new Date(b.created_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}</td>
                    <td>{b.total}</td>
                    <td>
                      <span className={`admin-badge ${b.status}`}>
                        {STATUS_LABELS[b.status] || b.status}
                      </span>
                    </td>
                    <td>
                      {b.status === "rejected" && b.rejection_reason ? (
                        <span style={{ color: "#C81E1E", fontSize: "0.83rem" }}>
                          {b.rejection_reason}
                        </span>
                      ) : (
                        <span style={{ color: "#9CA3AF" }}>—</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="admin-btn admin-btn-outline admin-btn-sm"
                        onClick={() => navigate(`/admin/batches/${b.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SecyDashboard;