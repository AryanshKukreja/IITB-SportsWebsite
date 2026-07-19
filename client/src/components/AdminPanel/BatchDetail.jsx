import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./Admin.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const STATUS_LABELS = {
  pending_chairperson: "Awaiting Chairperson Review",
  pending_dean:        "Awaiting Dean SA Review",
  approved:            "Fully Approved",
  rejected:            "Rejected",
};

const POSITION_LABELS = {
  first: "1st Place", second: "2nd Place",
  third: "3rd Place", participation: "Participation",
};

const BatchDetail = () => {
  const { batchId } = useParams();
  const navigate    = useNavigate();
  const user        = JSON.parse(localStorage.getItem("admin_user") || "{}");
  const token       = user.token;

  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res  = await fetch(`${API}/admin/batches/${batchId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.detail || "Failed to load batch");
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [batchId]);

  const fmt = (dt) => dt
    ? new Date(dt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  if (loading) return (
    <AdminLayout>
      <div className="admin-loading"><div className="admin-spinner" /> Loading batch…</div>
    </AdminLayout>
  );

  if (error) return (
    <AdminLayout>
      <div className="admin-alert admin-alert-error">{error}</div>
      <button className="admin-btn admin-btn-outline" onClick={() => navigate(-1)}>← Back</button>
    </AdminLayout>
  );

  const { batch, certificates } = data;

  // Build approval timeline steps
  const steps = [
    {
      label:  "Submitted by GSSA",
      meta:   `${batch.submitted_by} · ${fmt(batch.created_at)}`,
      status: "done",
    },
    {
      label:  "Chairperson Review",
      meta:   batch.chairperson_reviewed_by
        ? `${batch.chairperson_reviewed_by} · ${fmt(batch.chairperson_reviewed_at)}`
        : batch.status === "rejected" && !batch.chairperson_reviewed_by
          ? "Skipped (rejected at this stage)"
          : "Pending",
      status: batch.chairperson_reviewed_by ? "done"
            : batch.status === "rejected" && !batch.chairperson_reviewed_by ? "rejected"
            : batch.status === "pending_chairperson" ? "active"
            : "pending",
    },
    {
      label:  "Dean SA — Final Approval",
      meta:   batch.dean_reviewed_by
        ? `${batch.dean_reviewed_by} · ${fmt(batch.dean_reviewed_at)}`
        : batch.status === "approved" ? "Approved"
        : batch.status === "rejected" && batch.chairperson_reviewed_by ? "Rejected at this stage"
        : "Pending",
      status: batch.status === "approved" ? "done"
            : batch.status === "rejected" && batch.chairperson_reviewed_by ? "rejected"
            : batch.status === "pending_dean" ? "active"
            : "pending",
    },
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: "20px" }}>
        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="admin-page-header">
        <h1 className="admin-page-title">Batch Details</h1>
        <p className="admin-page-sub">{certificates.length} certificate(s) in this batch</p>
      </div>

      {/* Rejection banner */}
      {batch.status === "rejected" && (
        <div className="admin-rejection-banner">
          <h4>❌ This batch was rejected by {batch.rejected_by}</h4>
          <p>
            {batch.rejection_reason
              ? `Reason: ${batch.rejection_reason}`
              : "No reason provided."}
          </p>
        </div>
      )}

      {/* Meta */}
      <div className="admin-detail-meta">
        <div className="admin-meta-item">
          <p className="admin-meta-label">Status</p>
          <span className={`admin-badge ${batch.status}`} style={{ fontSize: "0.82rem" }}>
            {STATUS_LABELS[batch.status]}
          </span>
        </div>
        <div className="admin-meta-item">
          <p className="admin-meta-label">Submitted By</p>
          <p className="admin-meta-value">{batch.submitted_by}</p>
        </div>
        <div className="admin-meta-item">
          <p className="admin-meta-label">Submitted On</p>
          <p className="admin-meta-value">{fmt(batch.created_at)}</p>
        </div>
        <div className="admin-meta-item">
          <p className="admin-meta-label">Total Certificates</p>
          <p className="admin-meta-value">{certificates.length}</p>
        </div>
      </div>

      {/* Approval timeline */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-title">Approval Trail</span>
        </div>
        <div className="admin-section-body">
          <div className="admin-timeline">
            {steps.map((step, i) => (
              <div className="admin-timeline-step" key={i}>
                <div className={`admin-timeline-dot ${step.status}`}>
                  {step.status === "done"    ? "✓"
                   : step.status === "active"  ? "●"
                   : step.status === "rejected" ? "✕"
                   : "○"}
                </div>
                <div className="admin-timeline-content">
                  <p className="admin-timeline-label">{step.label}</p>
                  <p className="admin-timeline-meta">{step.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates table */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-title">Certificate Entries</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Event</th>
                <th>Position</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c, i) => (
                <tr key={c.id}>
                  <td style={{ color: "#9CA3AF" }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{c.roll_number}</td>
                  <td>{c.event}</td>
                  <td>{POSITION_LABELS[c.position] || c.position}</td>
                  <td>
                    <span className={`admin-badge ${c.status}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BatchDetail;