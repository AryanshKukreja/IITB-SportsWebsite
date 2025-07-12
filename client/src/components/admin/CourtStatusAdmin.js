import React, { useState, useEffect } from 'react';
import './CourtStatusAdmin.css';

const CourtStatusAdmin = () => {
  const [courtData, setCourtData] = useState(null);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourtStatus();
  }, [selectedSport, selectedDate]);

  const fetchCourtStatus = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sport: selectedSport,
        date: selectedDate
      });
      
      const response = await fetch(`/api/bookings/court-status?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        setCourtData(data);
        if (!selectedSport && data.sports.length > 0) {
          setSelectedSport(data.sports[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch court status:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (courtId, timeSlotId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/bookings/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courtId,
          timeSlotId,
          status: newStatus,
          date: selectedDate
        })
      });

      if (response.ok) {
        fetchCourtStatus(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#22c55e';
      case 'booked': return '#ef4444';
      case 'maintenance': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading court status...</div>;
  }

  return (
    <div className="court-status-admin">
      <h2>Court Status Management</h2>
      
      <div className="admin-controls">
        <div className="control-group">
          <label>Sport:</label>
          <select 
            value={selectedSport} 
            onChange={(e) => setSelectedSport(e.target.value)}
            className="admin-select"
          >
            {courtData?.sports.map(sport => (
              <option key={sport.id} value={sport.id}>{sport.name}</option>
            ))}
          </select>
        </div>
        
        <div className="control-group">
          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="admin-input"
          />
        </div>
      </div>

      <div className="courts-grid">
        {courtData?.courts.map(court => (
          <div key={court.id} className="court-admin-card">
            <h3>{court.name}</h3>
            <div className="slots-admin-grid">
              {Object.entries(court.slots).map(([slotId, slot]) => (
                <div key={slotId} className="slot-admin-item">
                  <div className="slot-time">{slot.time}</div>
                  <div className="slot-status-controls">
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(slot.status) }}
                    >
                      {slot.status}
                    </div>
                    <div className="status-buttons">
                      <button
                        onClick={() => updateBookingStatus(court.id, slotId, 'available')}
                        className={`status-btn ${slot.status === 'available' ? 'active' : ''}`}
                        title="Set Available"
                      >
                        A
                      </button>
                      <button
                        onClick={() => updateBookingStatus(court.id, slotId, 'booked')}
                        className={`status-btn ${slot.status === 'booked' ? 'active' : ''}`}
                        title="Set Booked"
                      >
                        B
                      </button>
                      <button
                        onClick={() => updateBookingStatus(court.id, slotId, 'maintenance')}
                        className={`status-btn ${slot.status === 'maintenance' ? 'active' : ''}`}
                        title="Set Maintenance"
                      >
                        M
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtStatusAdmin;
