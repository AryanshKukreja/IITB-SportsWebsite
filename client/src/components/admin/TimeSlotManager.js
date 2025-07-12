import React, { useState, useEffect } from 'react';
import './TimeSlotManager.css';

const TimeSlotManager = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ hour: '' });
  const [bulkCreate, setBulkCreate] = useState({ startHour: '', endHour: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/timeslots', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTimeSlots(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch time slots:', error);
    }
  };

  const createTimeSlot = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/timeslots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSlot)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Time slot created successfully');
        setNewSlot({ hour: '' });
        fetchTimeSlots();
      } else {
        setMessage(data.error || 'Failed to create time slot');
      }
    } catch (error) {
      setMessage('Failed to create time slot');
    } finally {
      setLoading(false);
    }
  };

  const bulkCreateSlots = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/timeslots/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bulkCreate)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
        setBulkCreate({ startHour: '', endHour: '' });
        fetchTimeSlots();
      } else {
        setMessage(data.error || 'Failed to create time slots');
      }
    } catch (error) {
      setMessage('Failed to create time slots');
    } finally {
      setLoading(false);
    }
  };

  const deleteTimeSlot = async (id) => {
    if (!window.confirm('Are you sure you want to delete this time slot?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/timeslots/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Time slot deleted successfully');
        fetchTimeSlots();
      } else {
        setMessage(data.error || 'Failed to delete time slot');
      }
    } catch (error) {
      setMessage('Failed to delete time slot');
    }
  };

  return (
    <div className="timeslot-manager">
      <h2>Time Slot Management</h2>
      
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="timeslot-forms">
        <div className="form-section">
          <h3>Create Single Time Slot</h3>
          <form onSubmit={createTimeSlot}>
            <div className="form-group">
              <label>Hour (0-23):</label>
              <input
                type="number"
                min="0"
                max="23"
                value={newSlot.hour}
                onChange={(e) => setNewSlot({ hour: parseInt(e.target.value) })}
                required
                className="admin-input"
              />
            </div>
            <button type="submit" disabled={loading} className="admin-btn primary">
              Create Slot
            </button>
          </form>
        </div>

        <div className="form-section">
          <h3>Bulk Create Time Slots</h3>
          <form onSubmit={bulkCreateSlots}>
            <div className="form-row">
              <div className="form-group">
                <label>Start Hour:</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={bulkCreate.startHour}
                  onChange={(e) => setBulkCreate({...bulkCreate, startHour: parseInt(e.target.value)})}
                  required
                  className="admin-input"
                />
              </div>
              <div className="form-group">
                <label>End Hour:</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={bulkCreate.endHour}
                  onChange={(e) => setBulkCreate({...bulkCreate, endHour: parseInt(e.target.value)})}
                  required
                  className="admin-input"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="admin-btn primary">
              Create Slots
            </button>
          </form>
        </div>
      </div>

      <div className="timeslots-list">
        <h3>Existing Time Slots</h3>
        <div className="slots-grid">
          {timeSlots.map((slot) => (
            <div key={slot._id} className="slot-card">
              <div className="slot-info">
                <h4>{slot.formatted_slot}</h4>
                <p>Hour: {slot.hour}</p>
              </div>
              <button 
                onClick={() => deleteTimeSlot(slot._id)}
                className="admin-btn danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotManager;
