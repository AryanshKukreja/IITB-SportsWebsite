import React, { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, getBlob, ref } from 'firebase/storage';
import './Feedback.css';
import { adminAuth, adminDb, adminStorage } from '../../firebase';

const PAGE_SIZE = 10;
const STATUSES = ['pending', 'in-progress', 'resolved', 'closed'];

const toFeedback = (snapshot) => {
  const data = snapshot.data();
  return {
    ...data,
    _id: snapshot.id,
    createdAt: data.createdAt?.toDate().toISOString() || '',
  };
};

const csvCell = (value) => {
  const text = String(value ?? '');
  const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safeText.replace(/"/g, '""')}"`;
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', search: '', page: 1 });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const loadFeedbacks = async () => {
    const snapshot = await getDocs(query(collection(adminDb, 'feedback'), orderBy('createdAt', 'desc')));
    setFeedbacks(snapshot.docs.map(toFeedback));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(adminAuth, async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setFeedbacks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const adminSnapshot = await getDoc(doc(adminDb, 'feedbackAdmins', user.uid));
        if (!adminSnapshot.exists()) {
          await signOut(adminAuth);
          setError('This account is not authorized to manage feedback.');
          return;
        }
        setIsAuthenticated(true);
        await loadFeedbacks();
        setError('');
      } catch (loadError) {
        console.error('Could not load Firebase feedback:', loadError);
        setError('Could not load feedback. Please refresh and try again.');
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const filteredFeedbacks = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return feedbacks.filter((feedback) => {
      const matchesStatus = filters.status === 'all' || feedback.status === filters.status;
      const matchesSearch = !search || [
        feedback.name,
        feedback.rollNumber,
        feedback.ldapId,
        feedback.problemDescription,
        ...(feedback.taggedPersons || []).map((person) => person.entityName),
      ].some((value) => String(value || '').toLowerCase().includes(search));
      return matchesStatus && matchesSearch;
    });
  }, [feedbacks, filters.search, filters.status]);

  const totalPages = Math.max(1, Math.ceil(filteredFeedbacks.length / PAGE_SIZE));
  const pageFeedbacks = filteredFeedbacks.slice((filters.page - 1) * PAGE_SIZE, filters.page * PAGE_SIZE);
  const statistics = {
    total: feedbacks.length,
    pending: feedbacks.filter((feedback) => feedback.status === 'pending').length,
    inProgress: feedbacks.filter((feedback) => feedback.status === 'in-progress').length,
    resolved: feedbacks.filter((feedback) => feedback.status === 'resolved').length,
    closed: feedbacks.filter((feedback) => feedback.status === 'closed').length,
  };
  const recentFeedbacks = feedbacks.slice(0, 5);

  useEffect(() => {
    if (filters.page > totalPages) {
      setFilters((prev) => ({ ...prev, page: totalPages }));
    }
  }, [filters.page, totalPages]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const credential = await signInWithEmailAndPassword(adminAuth, loginForm.email, loginForm.password);
      const adminSnapshot = await getDoc(doc(adminDb, 'feedbackAdmins', credential.user.uid));
      if (!adminSnapshot.exists()) {
        await signOut(adminAuth);
        throw new Error('This account is not authorized to manage feedback.');
      }
    } catch (loginError) {
      console.error('Firebase admin login failed:', loginError);
      setError(loginError.message === 'This account is not authorized to manage feedback.'
        ? loginError.message
        : 'Login failed. Check your email and password, then try again.');
    }
  };

  const updateFeedbackStatus = async (feedbackId, status, adminNotes = '') => {
    try {
      await updateDoc(doc(adminDb, 'feedback', feedbackId), {
        status,
        adminNotes,
        updatedAt: serverTimestamp(),
      });
      await loadFeedbacks();
      setSelectedFeedback(null);
      setError('');
    } catch (updateError) {
      console.error('Could not update Firebase feedback:', updateError);
      setError('Could not update this feedback. Please try again.');
    }
  };

  const deleteFeedback = async (feedback) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      if (feedback.imagePath) {
        await deleteObject(ref(adminStorage, feedback.imagePath));
      }
      await deleteDoc(doc(adminDb, 'feedback', feedback._id));
      await loadFeedbacks();
      setError('');
    } catch (deleteError) {
      console.error('Could not delete Firebase feedback:', deleteError);
      setError('Could not delete this feedback. Please try again.');
    }
  };

  const openFeedbackImage = async (imagePath) => {
    const imageWindow = window.open('', '_blank');
    if (!imageWindow) {
      setError('Allow pop-ups to view feedback images.');
      return;
    }
    try {
      const imageBlob = await getBlob(ref(adminStorage, imagePath));
      const objectUrl = URL.createObjectURL(imageBlob);
      imageWindow.location.href = objectUrl;
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    } catch (imageError) {
      imageWindow.close();
      console.error('Could not load feedback image:', imageError);
      setError('Could not open this feedback image.');
    }
  };

  const exportFeedbacks = () => {
    const headers = ['Name', 'Roll Number', 'LDAP ID', 'Description', 'Tagged Persons', 'Status', 'Admin Notes', 'Created At'];
    const rows = feedbacks.map((feedback) => [
      feedback.name,
      feedback.rollNumber,
      feedback.ldapId,
      feedback.problemDescription,
      (feedback.taggedPersons || []).map((person) => person.entityName).join(', '),
      feedback.status,
      feedback.adminNotes,
      feedback.createdAt,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `feedbacks_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    try {
      await signOut(adminAuth);
      setActiveTab('dashboard');
      setError('');
    } catch (logoutError) {
      console.error('Firebase admin logout failed:', logoutError);
      setError('Could not sign out. Please try again.');
    }
  };

  if (loading) return <div>Loading feedback dashboard...</div>;

  if (!isAuthenticated) {
    return (
      <div>
        <h1 className="football-turf-heading">Admin Login</h1>
        <form className="booking-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={loginForm.email}
              onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={loginForm.password}
              onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
          </div>
          {error && <p role="alert">{error}</p>}
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="football-turf-heading">Admin Dashboard</h1>
        <button onClick={handleLogout} className="submit-btn" style={{ marginBottom: '1rem' }}>
          Logout
        </button>
      </div>
      {error && <p role="alert">{error}</p>}

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'feedbacks' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedbacks')}
        >
          Manage Feedbacks
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card"><h3>Total Feedbacks</h3><p className="stat-number">{statistics.total}</p></div>
            <div className="stat-card pending"><h3>Pending</h3><p className="stat-number">{statistics.pending}</p></div>
            <div className="stat-card in-progress"><h3>In Progress</h3><p className="stat-number">{statistics.inProgress}</p></div>
            <div className="stat-card resolved"><h3>Resolved</h3><p className="stat-number">{statistics.resolved}</p></div>
            <div className="stat-card closed"><h3>Closed</h3><p className="stat-number">{statistics.closed}</p></div>
          </div>

          <div className="recent-feedbacks">
            <h2>Recent Feedbacks</h2>
            <div className="feedback-list">
              {recentFeedbacks.map((feedback) => (
                <div key={feedback._id} className="feedback-item">
                  <div className="feedback-info">
                    <strong>{feedback.name}</strong> ({feedback.rollNumber})
                    <p>{feedback.problemDescription.substring(0, 100)}...</p>
                    <small>{feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : 'Just now'}</small>
                  </div>
                  <div className={`status-badge ${feedback.status}`}>{feedback.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedbacks' && (
        <div className="feedbacks-content">
          <div className="feedbacks-header">
            <div className="filters">
              <select
                value={filters.status}
                onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value, page: 1 }))}
                className="filter-select"
              >
                <option value="all">All Status</option>
                {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <input
                type="text"
                placeholder="Search feedbacks..."
                value={filters.search}
                onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value, page: 1 }))}
                className="search-input"
              />
            </div>
            <button onClick={exportFeedbacks} className="export-btn">Export CSV</button>
          </div>

          <div className="feedbacks-table">
            {pageFeedbacks.map((feedback) => (
              <div key={feedback._id} className="feedback-row">
                <div className="feedback-details">
                  <div className="feedback-header-row">
                    <strong>{feedback.name}</strong>
                    <span className="roll-number">({feedback.rollNumber})</span>
                    <div className={`status-badge ${feedback.status}`}>{feedback.status}</div>
                  </div>
                  <p className="problem-description">{feedback.problemDescription}</p>
                  <div className="feedback-meta">
                    <span>LDAP: {feedback.ldapId}</span>
                    <span>Tagged: {(feedback.taggedPersons || []).map((person) => person.entityName).join(', ')}</span>
                    <span>Created: {feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : 'Just now'}</span>
                  </div>
                  {feedback.imagePath && (
                    <div className="image-link">
                      <button type="button" onClick={() => openFeedbackImage(feedback.imagePath)}>View Image</button>
                    </div>
                  )}
                </div>
                <div className="feedback-actions">
                  <button onClick={() => setSelectedFeedback(feedback)} className="action-btn update">Update Status</button>
                  <button onClick={() => deleteFeedback(feedback)} className="action-btn delete">Delete</button>
                </div>
              </div>
            ))}
            {!pageFeedbacks.length && <p>No feedback matches these filters.</p>}
          </div>

          <div className="pagination">
            <button
              disabled={filters.page <= 1}
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {filters.page} of {totalPages} ({filteredFeedbacks.length} total)
            </span>
            <button
              disabled={filters.page >= totalPages}
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedFeedback && (
        <div className="modal-overlay" onClick={() => setSelectedFeedback(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <h2>Update Feedback Status</h2>
            <div className="modal-feedback-info">
              <p><strong>Name:</strong> {selectedFeedback.name}</p>
              <p><strong>Problem:</strong> {selectedFeedback.problemDescription}</p>
            </div>
            <form onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.target);
              updateFeedbackStatus(selectedFeedback._id, formData.get('status'), formData.get('adminNotes'));
            }}>
              <div className="form-group">
                <label>Status:</label>
                <select name="status" defaultValue={selectedFeedback.status} required>
                  {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Admin Notes:</label>
                <textarea name="adminNotes" defaultValue={selectedFeedback.adminNotes} className="Feedback-description-box" rows="4" />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Update</button>
                <button type="button" onClick={() => setSelectedFeedback(null)} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
