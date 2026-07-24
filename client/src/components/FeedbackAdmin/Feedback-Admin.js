import React, { useState, useEffect } from 'react';
import './Feedback.css'; // Using the same CSS file

// Configure API base URL using environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://feedbackbackend-mlc8bmyp.b4a.run';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch dashboard statistics and recent feedbacks
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStatistics(data.statistics);
        setRecentFeedbacks(data.recentFeedbacks);
      } else {
        console.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all feedbacks with filters
  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        status: filters.status,
        search: filters.search
      });

      const response = await fetch(`${API_BASE_URL}/api/admin/feedbacks?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data.feedbacks);
        setPagination(data.pagination);
      } else {
        console.error('Failed to fetch feedbacks');
      }
    } catch (error) {
      console.error('Feedbacks fetch error:', error);
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  // Update feedback status
  const updateFeedbackStatus = async (feedbackId, status, adminNotes = '') => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/feedbacks/${feedbackId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, adminNotes })
      });

      if (response.ok) {
        alert('Feedback status updated successfully!');
        fetchFeedbacks();
        fetchDashboardData();
        setSelectedFeedback(null);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Status update error:', error);
      alert('Error updating status. Please try again.');
    }
  };

  // Delete feedback
  const deleteFeedback = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/feedbacks/${feedbackId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Feedback deleted successfully!');
        fetchFeedbacks();
        fetchDashboardData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete feedback');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting feedback. Please try again.');
    }
  };

  // Export feedbacks
  const exportFeedbacks = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/export`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `feedbacks_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Failed to export feedbacks');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting feedbacks');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // Fetch feedbacks when filters change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isAuthenticated && activeTab === 'feedbacks') {
      fetchFeedbacks();
    }
  }, [filters, isAuthenticated, activeTab]);

  // Login form
  if (!isAuthenticated) {
    return (
      <div>
        <h1 className='football-turf-heading'>Admin Login</h1>
        <form className="booking-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className='football-turf-heading'>Admin Dashboard</h1>
        <button onClick={handleLogout} className="submit-btn" style={{ marginBottom: '1rem' }}>
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
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

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="dashboard-content">
          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Feedbacks</h3>
              <p className="stat-number">{statistics.total}</p>
            </div>
            <div className="stat-card pending">
              <h3>Pending</h3>
              <p className="stat-number">{statistics.pending}</p>
            </div>
            <div className="stat-card in-progress">
              <h3>In Progress</h3>
              <p className="stat-number">{statistics.inProgress}</p>
            </div>
            <div className="stat-card resolved">
              <h3>Resolved</h3>
              <p className="stat-number">{statistics.resolved}</p>
            </div>
            <div className="stat-card closed">
              <h3>Closed</h3>
              <p className="stat-number">{statistics.closed}</p>
            </div>
          </div>

          {/* Recent Feedbacks */}
          <div className="recent-feedbacks">
            <h2>Recent Feedbacks</h2>
            <div className="feedback-list">
              {recentFeedbacks.map(feedback => (
                <div key={feedback._id} className="feedback-item">
                  <div className="feedback-info">
                    <strong>{feedback.name}</strong> ({feedback.rollNumber})
                    <p>{feedback.problemDescription.substring(0, 100)}...</p>
                    <small>{new Date(feedback.createdAt).toLocaleDateString()}</small>
                  </div>
                  <div className={`status-badge ${feedback.status}`}>
                    {feedback.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feedbacks Management Tab */}
      {activeTab === 'feedbacks' && (
        <div className="feedbacks-content">
          {/* Filters and Export */}
          <div className="feedbacks-header">
            <div className="filters">
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <input
                type="text"
                placeholder="Search feedbacks..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                className="search-input"
              />
            </div>
            
            <button onClick={exportFeedbacks} className="export-btn">
              Export CSV
            </button>
          </div>

          {/* Feedbacks Table */}
          <div className="feedbacks-table">
            {feedbacks.map(feedback => (
              <div key={feedback._id} className="feedback-row">
                <div className="feedback-details">
                  <div className="feedback-header-row">
                    <strong>{feedback.name}</strong>
                    <span className="roll-number">({feedback.rollNumber})</span>
                    <div className={`status-badge ${feedback.status}`}>
                      {feedback.status}
                    </div>
                  </div>
                  <p className="problem-description">
                    {feedback.problemDescription}
                  </p>
                  <div className="feedback-meta">
                    <span>LDAP: {feedback.ldapId}</span>
                    <span>Tagged: {feedback.taggedPersons.map(p => p.entityName).join(', ')}</span>
                    <span>Created: {new Date(feedback.createdAt).toLocaleDateString()}</span>
                  </div>
                  {feedback.imageUrl && (
                    <div className="image-link">
                      <a href={feedback.imageUrl} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    </div>
                  )}
                </div>

                <div className="feedback-actions">
                  <button
                    onClick={() => setSelectedFeedback(feedback)}
                    className="action-btn update"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => deleteFeedback(feedback._id)}
                    className="action-btn delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {pagination.currentPage} of {pagination.totalPages} 
              ({pagination.totalCount} total)
            </span>
            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {selectedFeedback && (
        <div className="modal-overlay" onClick={() => setSelectedFeedback(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Update Feedback Status</h2>
            <div className="modal-feedback-info">
              <p><strong>Name:</strong> {selectedFeedback.name}</p>
              <p><strong>Problem:</strong> {selectedFeedback.problemDescription}</p>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              updateFeedbackStatus(
                selectedFeedback._id,
                formData.get('status'),
                formData.get('adminNotes')
              );
            }}>
              <div className="form-group">
                <label>Status:</label>
                <select name="status" defaultValue={selectedFeedback.status} required>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Admin Notes:</label>
                <textarea
                  name="adminNotes"
                  defaultValue={selectedFeedback.adminNotes}
                  className="Feedback-description-box"
                  rows="4"
                />
              </div>
              
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Update</button>
                <button
                  type="button"
                  onClick={() => setSelectedFeedback(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
