import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeSlotManager from './TimeSlotManager';
import CourtStatusAdmin from './CourtStatusAdmin';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeSlots: 0,
    totalCourts: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      navigate('/sports/admin/login');
      return;
    }
    
    setAdminUser(JSON.parse(user));
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/sports/admin/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeslots':
        return <TimeSlotManager />;
      case 'courts':
        return <CourtStatusAdmin />;
      default:
        return (
          <div className="overview-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Bookings</h3>
                <p className="stat-number">{stats.totalBookings}</p>
              </div>
              <div className="stat-card">
                <h3>Active Time Slots</h3>
                <p className="stat-number">{stats.activeSlots}</p>
              </div>
              <div className="stat-card">
                <h3>Total Courts</h3>
                <p className="stat-number">{stats.totalCourts}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-dashboard">
        <header className="admin-header">
          <h1>Sports Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>Welcome, {adminUser?.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </header>

        <nav className="admin-nav">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'timeslots' ? 'active' : ''}
            onClick={() => setActiveTab('timeslots')}
          >
            Time Slots
          </button>
          <button 
            className={activeTab === 'courts' ? 'active' : ''}
            onClick={() => setActiveTab('courts')}
          >
            Court Status
          </button>
        </nav>

        <main className="admin-content">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
