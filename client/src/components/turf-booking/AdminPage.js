import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sortBy, setSortBy] = useState('time'); // 'time' for FIFO, 'slot' for slot-wise
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'accepted', 'declined'

  const correctPassword = 'RAJIFS@2024';

  // Array to map slot numbers to corresponding timings
  const slotTimings = [
    '6:30 AM - 7:30 AM',
    '7:30 AM - 8:30 AM',
    '8:30 AM - 9:30 AM',
    '9:30 AM - 10:30 AM',
    '10:30 AM - 11:30 AM',
    '11:30 AM - 12:30 PM',
    '12:30 PM - 1:30 PM',
    '1:30 PM - 2:30 PM',
    '2:30 PM - 3:30 PM',
    '3:30 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:30 PM',
  ];

  // Function to format date as 'YYYY-MM-DD'
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Function to format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Function to calculate time difference for priority display
  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const requestTime = new Date(timestamp);
    const diffMs = now - requestTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m ago`;
    }
    return `${diffMinutes}m ago`;
  };

  // Get today's and tomorrow's dates
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayDate = formatDate(today);
  const tomorrowDate = formatDate(tomorrow);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://turf-backend-production.up.railway.app/students');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter requests for today and tomorrow
        const filteredRequests = data.filter(
          (request) => request.date === todayDate || request.date === tomorrowDate
        );
        setRequests(filteredRequests);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [todayDate, tomorrowDate]);

  // Function to get queue position for pending requests
  const getQueuePosition = (request) => {
    if (request.status !== 'pending') return null;
    
    const sameSlotPending = requests
      .filter(req => 
        req.slot === request.slot && 
        req.date === request.date && 
        req.status === 'pending'
      )
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    return sameSlotPending.findIndex(req => req._id === request._id) + 1;
  };

  // Sort and filter requests
  const getSortedAndFilteredRequests = () => {
    let filteredReqs = requests;
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filteredReqs = filteredReqs.filter(req => req.status === filterStatus);
    }
    
    // Apply sorting
    if (sortBy === 'time') {
      // Sort by request time (FIFO)
      filteredReqs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'slot') {
      // Sort by slot number, then by time within each slot
      filteredReqs.sort((a, b) => {
        if (a.slot !== b.slot) return a.slot - b.slot;
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    
    return filteredReqs;
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`https://turf-backend-production.up.railway.app/student/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      const result = await response.json();

      // Refresh the data to show updated statuses and auto-declined requests
      const refreshResponse = await fetch('https://turf-backend-production.up.railway.app/students');
      const refreshedData = await refreshResponse.json();
      
      const filteredRequests = refreshedData.filter(
        (request) => request.date === todayDate || request.date === tomorrowDate
      );
      setRequests(filteredRequests);

      // Show success message with additional info
      if (newStatus === 'accepted' && result.autoDeclinedCount > 0) {
        alert(`Request accepted! ${result.autoDeclinedCount} other pending request(s) for the same slot were automatically declined.`);
      } else {
        alert(`Request ${newStatus} successfully!`);
      }

    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (enteredPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password, please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page-container">
        <h1>Admin Login</h1>
        <form onSubmit={handlePasswordSubmit}>
          <label htmlFor="password">Enter Password:</label>
          <input
            className="password"
            type="password"
            id="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-page-container">
        <div>Loading...</div>
      </div>
    );
  }

  const sortedAndFilteredRequests = getSortedAndFilteredRequests();

  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <h1>Turf Booking Requests (Today & Tomorrow)</h1>
        
        {/* Controls for sorting and filtering */}
        <div className="admin-controls">
          <div className="filter-group">
            <label htmlFor="sortBy">Sort by:</label>
            <select 
              id="sortBy" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="time">Request Time (FIFO)</option>
              <option value="slot">Slot Number</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="filterStatus">Filter by Status:</label>
            <select 
              id="filterStatus" 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending Only</option>
              <option value="accepted">Accepted Only</option>
              <option value="declined">Declined Only</option>
            </select>
          </div>
        </div>

        {/* Summary statistics */}
        <div className="admin-stats">
          <span className="stat">
            Total: {requests.length}
          </span>
          <span className="stat pending">
            Pending: {requests.filter(r => r.status === 'pending').length}
          </span>
          <span className="stat accepted">
            Accepted: {requests.filter(r => r.status === 'accepted').length}
          </span>
          <span className="stat declined">
            Declined: {requests.filter(r => r.status === 'declined').length}
          </span>
        </div>
      </div>

      <ul className="requests-list">
        {sortedAndFilteredRequests && sortedAndFilteredRequests.length > 0 ? (
          sortedAndFilteredRequests.map((request) => {
            const queuePosition = getQueuePosition(request);
            const isPriorityRequest = request.status === 'pending' && queuePosition === 1;
            
            return (
              <li 
                key={request._id} 
                className={`request-item ${request.status} ${isPriorityRequest ? 'priority' : ''}`}
              >
                <div className="request-header">
                  <h3>
                    {request.name}
                    {isPriorityRequest && <span className="priority-badge">NEXT IN QUEUE</span>}
                    {queuePosition && queuePosition > 1 && (
                      <span className="queue-position">Queue: #{queuePosition}</span>
                    )}
                  </h3>
                  <span className={`status-badge ${request.status}`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>

                <div className="request-details">
                  <div className="detail-row">
                    <p><strong>Roll No:</strong> {request.rollno}</p>
                    <p><strong>Email:</strong> {request.email}</p>
                  </div>
                  
                  <div className="detail-row">
                    <p><strong>Date:</strong> {request.date}</p>
                    <p><strong>Slot:</strong> {request.slot} ({slotTimings[request.slot - 1]})</p>
                  </div>
                  
                  <div className="detail-row">
                    <p><strong>No. of Players:</strong> {request.no_of_players}</p>
                    <p><strong>Player Roll Nos:</strong> {request.player_roll_no || 'N/A'}</p>
                  </div>

                  <div className="timing-info">
                    <p><strong>Request Time:</strong> {formatTimestamp(request.createdAt)}</p>
                    <p><strong>Submitted:</strong> {getTimeDifference(request.createdAt)}</p>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="action-buttons">
                    <button
                      className="accept-btn"
                      onClick={() => {
                        if (queuePosition > 1) {
                          const confirm = window.confirm(
                            `This request is #${queuePosition} in queue. There are ${queuePosition - 1} earlier request(s) for this slot/date. Are you sure you want to accept this request? This will auto-decline the earlier requests.`
                          );
                          if (!confirm) return;
                        }
                        handleStatusUpdate(request._id, 'accepted');
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleStatusUpdate(request._id, 'declined')}
                    >
                      Decline
                    </button>
                  </div>
                )}

                {request.status === 'accepted' && (
                  <div className="status-info accepted-info">
                    ✅ Booking Confirmed
                  </div>
                )}

                {request.status === 'declined' && (
                  <div className="status-info declined-info">
                    ❌ Request Declined
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <div className="no-requests">
            <p>No requests found for the selected criteria.</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default AdminPage;