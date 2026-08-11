import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./Admin.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const STATUS_LABELS = {
  pending_chairperson: "Awaiting Chairperson",
  pending_dean:        "Awaiting Dean SA",
  approved:            "Approved",
  rejected:            "Rejected",
};

const SuperadminDashboard = () => {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem("admin_user") || "{}");
  const token    = user.token;

  const [batches, setBatches]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [alert, setAlert]             = useState(null);
  const [revokeId, setRevokeId]       = useState("");
  const [revoking, setRevoking]       = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchBatches(); }, []);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/admin/batches`, {
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

  const handleRevoke = async () => {
    if (!revokeId.trim()) return;
    setRevoking(true);
    setAlert(null);
    try {
      const res  = await fetch(`${API}/admin/certificates/${revokeId.trim()}/revoke`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Revocation failed");
      setAlert({ type: "success", message: `Certificate ${revokeId} has been revoked.` });
      setRevokeId("");
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setRevoking(false);
    }
  };

  const filtered = statusFilter === "all"
    ? batches
    : batches.filter(b => b.status === statusFilter);

  const counts = {
    all:                    batches.length,
    pending_chairperson:    batches.filter(b => b.status === "pending_chairperson").length,
    pending_dean:           batches.filter(b => b.status === "pending_dean").length,
    approved:               batches.filter(b => b.status === "approved").length,
    rejected:               batches.filter(b => b.status === "rejected").length,
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Superadmin Dashboard</h1>
        <p className="admin-page-sub">Full system view — all batches and certificate management.</p>
      </div>

      {alert && (
        <div className={`admin-alert admin-alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <p className="admin-stat-label">Total Batches</p>
          <p className="admin-stat-value">{counts.all}</p>
        </div>
        <div className="admin-stat-card amber">
          <p className="admin-stat-label">Awaiting Chairperson</p>
          <p className="admin-stat-value">{counts.pending_chairperson}</p>
        </div>
        <div className="admin-stat-card blue">
          <p className="admin-stat-label">Awaiting Dean SA</p>
          <p className="admin-stat-value">{counts.pending_dean}</p>
        </div>
        <div className="admin-stat-card green">
          <p className="admin-stat-label">Approved</p>
          <p className="admin-stat-value">{counts.approved}</p>
        </div>
        <div className="admin-stat-card red">
          <p className="admin-stat-label">Rejected</p>
          <p className="admin-stat-value">{counts.rejected}</p>
        </div>
      </div>

      {/* Revoke a certificate */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-title">Revoke a Certificate</span>
        </div>
        <div className="admin-section-body">
          <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "14px" }}>
            Enter the certificate UUID to revoke it. The QR code will immediately
            show as invalid when scanned.
          </p>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Certificate UUID"
              value={revokeId}
              onChange={(e) => setRevokeId(e.target.value)}
              style={{
                flex: 1, padding: "10px 14px",
                border: "1px solid #E2E8F0", borderRadius: "10px",
                fontSize: "0.9rem", fontFamily: "monospace", outline: "none",
              }}
            />
            <button
              className="admin-btn admin-btn-danger"
              onClick={handleRevoke}
              disabled={!revokeId.trim() || revoking}
            >
              {revoking ? "Revoking…" : "Revoke"}
            </button>
          </div>
        </div>
      </div>

      {/* All batches */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-title">All Batches</span>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "6px 10px", border: "1px solid #E2E8F0",
                borderRadius: "8px", fontSize: "0.82rem", color: "#374151",
                outline: "none", cursor: "pointer",
              }}
            >
              <option value="all">All ({counts.all})</option>
              <option value="pending_chairperson">Awaiting Chairperson ({counts.pending_chairperson})</option>
              <option value="pending_dean">Awaiting Dean SA ({counts.pending_dean})</option>
              <option value="approved">Approved ({counts.approved})</option>
              <option value="rejected">Rejected ({counts.rejected})</option>
            </select>
            <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={fetchBatches}>
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /> Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">📋</div>
            <p className="admin-empty-title">No batches found</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submitted By</th>
                  <th>Date</th>
                  <th>Certificates</th>
                  <th>Status</th>
                  <th>Rejected By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 600 }}>{b.submitted_by}</td>
                    <td>{new Date(b.created_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}</td>
                    <td>{b.total}</td>
                    <td>
                      <span className={`admin-badge ${b.status}`}>
                        {STATUS_LABELS[b.status]}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "#6B7280" }}>
                      {b.rejected_by || "—"}
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

export default SuperadminDashboard;