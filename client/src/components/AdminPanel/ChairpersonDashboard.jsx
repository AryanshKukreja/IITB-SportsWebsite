import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./Admin.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

const STATUS_LABELS = {
  pending_chairperson: "Awaiting Your Review",
  pending_dean:        "Forwarded to Dean SA",
  approved:            "Approved ✓",
  rejected:            "Rejected",
};

const ChairpersonDashboard = () => {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem("admin_user") || "{}");
  const token    = user.token;

  const [pending, setPending]   = useState([]);
  const [history, setHistory]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [actionId, setActionId] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);   // batch_id
  const [rejectReason, setRejectReason] = useState("");
  const [alert, setAlert]       = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingRes, deanRes, approvedRes, rejectedRes] = await Promise.all([
        fetch(`${API}/admin/batches/pending-chairperson`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/admin/batches/pending-dean`,        { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/admin/batches/approved`,            { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/admin/batches/rejected`,            { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const [p, d, a, r] = await Promise.all([
        pendingRes.json(), deanRes.json(), approvedRes.json(), rejectedRes.json()
      ]);
      setPending(p.batches || []);
      setHistory([...(d.batches || []), ...(a.batches || []), ...(r.batches || [])]);
    } catch {
      setAlert({ type: "error", message: "Could not load data." });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (batch_id) => {
    setActionId(batch_id);
    setAlert(null);
    try {
      const res  = await fetch(`${API}/admin/batches/${batch_id}/chairperson-approve`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Approval failed");
      setAlert({ type: "success", message: data.message });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    setActionId(rejectModal);
    try {
      const res  = await fetch(`${API}/admin/batches/${rejectModal}/reject`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: rejectReason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Rejection failed");
      setAlert({ type: "success", message: "Batch rejected and GSSA has been notified." });
      setRejectModal(null);
      setRejectReason("");
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Chairperson Dashboard</h1>
        <p className="admin-page-sub">Review and approve certificate batches — Level 2 of 3.</p>
      </div>

      {alert && (
        <div className={`admin-alert admin-alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* Pending review */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-title">
            Pending Your Review
            {pending.length > 0 && (
              <span style={{
                marginLeft: "10px", background: "#C27803",
                color: "#fff", borderRadius: "50px",
                fontSize: "0.72rem", padding: "2px 8px", fontWeight: 700
              }}>
                {pending.length}
              </span>
            )}
          </span>
          <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={fetchData}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /> Loading…</div>
        ) : pending.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">✅</div>
            <p className="admin-empty-title">No batches pending your review</p>
            <p className="admin-empty-sub">All caught up!</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submitted By</th>
                  <th>Date</th>
                  <th>Certificates</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 600 }}>{b.submitted_by}</td>
                    <td>{new Date(b.created_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}</td>
                    <td>{b.total} certificates</td>
                    <td>
                      <div className="admin-btn-group">
                        <button
                          className="admin-btn admin-btn-outline admin-btn-sm"
                          onClick={() => navigate(`/admin/batches/${b.id}`)}
                        >
                          View Details
                        </button>
                        <button
                          className="admin-btn admin-btn-success admin-btn-sm"
                          onClick={() => handleApprove(b.id)}
                          disabled={actionId === b.id}
                        >
                          {actionId === b.id ? "Processing…" : "✓ Approve"}
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={() => { setRejectModal(b.id); setRejectReason(""); }}
                          disabled={actionId === b.id}
                        >
                          ✕ Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Previously Reviewed</span>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submitted By</th>
                  <th>Date</th>
                  <th>Certificates</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((b) => (
                  <tr key={b.id}>
                    <td>{b.submitted_by}</td>
                    <td>{new Date(b.created_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}</td>
                    <td>{b.total}</td>
                    <td>
                      <span className={`admin-badge ${b.status}`}>
                        {STATUS_LABELS[b.status]}
                      </span>
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
        </div>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="admin-modal-backdrop" onClick={() => setRejectModal(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Reject Batch</h3>
            <p>
              Please provide a reason for rejection. This will be visible to the
              GSSA on their dashboard.
            </p>
            <textarea
              placeholder="e.g. Incomplete event names, incorrect roll numbers…"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="admin-modal-actions">
              <button
                className="admin-btn admin-btn-outline"
                onClick={() => setRejectModal(null)}
              >
                Cancel
              </button>
              <button
                className="admin-btn admin-btn-danger"
                onClick={handleReject}
                disabled={!rejectReason.trim() || !!actionId}
              >
                {actionId ? "Rejecting…" : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ChairpersonDashboard;