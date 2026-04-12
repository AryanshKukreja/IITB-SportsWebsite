import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sortBy, setSortBy] = useState('time'); // 'time' for FIFO, 'slot' for slot-wise
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'accepted', 'declined'
  const [updatingStatus, setUpdatingStatus] = useState(null); // Track which request is being updated

  const correctPassword = 'ADIIFS@2026';

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

  // Improved date calculation function
  const getLocalDate = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  // Get today's and tomorrow's dates using improved function
  const todayDate = getLocalDate(0);
  const tomorrowDate = getLocalDate(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gymkhana.iitb.ac.in/sports/students');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Today:', todayDate, 'Tomorrow:', tomorrowDate); // Debug log
        
        // Strict filtering for only today and tomorrow with logging
        const filteredRequests = data.filter((request) => {
          const isToday = request.date === todayDate;
          const isTomorrow = request.date === tomorrowDate;
          const shouldInclude = isToday || isTomorrow;
          
          // Debug log (remove in production if needed)
          if (!shouldInclude) {
            console.log('Filtered out request with date:', request.date);
          }
          
          return shouldInclude;
        });
        
        console.log(`Showing ${filteredRequests.length} requests out of ${data.length} total`);
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
    
    return sameSlotPending.findIndex(req => req.id === request.id) + 1;
  };

  // Sort and filter requests with additional safeguard
  const getSortedAndFilteredRequests = () => {
    let filteredReqs = requests;
    
    // Extra safeguard: ensure only today/tomorrow requests
    filteredReqs = filteredReqs.filter(req => 
      req.date === todayDate || req.date === tomorrowDate
    );
    
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
    setUpdatingStatus(id); // Set loading state for this specific request
    
    try {
      const response = await fetch(`https://gymkhana.iitb.ac.in/sports/student/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      let result = {};
      
      // Try to parse response, but don't fail if it's not JSON
      try {
        result = await response.json();
      } catch (jsonError) {
        console.log('Response is not JSON, proceeding with status update');
      }

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status} ${response.statusText}`);
      }

      // Update the local state immediately for better UX
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );

      // Refresh the data to show updated statuses and auto-declined requests
      try {
        const refreshResponse = await fetch('https://gymkhana.iitb.ac.in/sports/students');
        if (refreshResponse.ok) {
          const refreshedData = await refreshResponse.json();
          // Apply the same strict filtering on refresh
          const filteredRequests = refreshedData.filter(
            (request) => request.date === todayDate || request.date === tomorrowDate
          );
          setRequests(filteredRequests);
        }
      } catch (refreshError) {
        console.log('Could not refresh data, but status update was successful');
      }

      // Show success message with additional info
      if (newStatus === 'accepted') {
        const autoDeclinedCount = result.autoDeclinedCount || 0;
        if (autoDeclinedCount > 0) {
          alert(`✅ Slot confirmed successfully! ${autoDeclinedCount} other pending request(s) for the same slot were automatically declined.`);
        } else {
          alert('✅ Slot confirmed successfully!');
        }
      } else if (newStatus === 'declined') {
        alert('❌ Request declined successfully!');
      }

    } catch (error) {
      console.error('Error updating status:', error);
      
      // Check if the error is just a fetch/parse issue but status might have been updated
      try {
        const checkResponse = await fetch('https://gymkhana.iitb.ac.in/sports/students');
        if (checkResponse.ok) {
          const checkData = await checkResponse.json();
          const updatedRequest = checkData.find(req => req.id === id);
          
          if (updatedRequest && updatedRequest.status === newStatus) {
            // Status was actually updated successfully
            const filteredRequests = checkData.filter(
              (request) => request.date === todayDate || request.date === tomorrowDate
            );
            setRequests(filteredRequests);
            
            if (newStatus === 'accepted') {
              alert('✅ Slot confirmed successfully!');
            } else {
              alert(`✅ Request ${newStatus} successfully!`);
            }
            return;
          }
        }
      } catch (checkError) {
        console.error('Could not verify status update:', checkError);
      }
      
      alert('❌ Error updating status. Please refresh the page and try again.');
    } finally {
      setUpdatingStatus(null); // Clear loading state
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
        <h1>Turf Booking Requests - {todayDate} & {tomorrowDate}</h1>
        
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
                key={request.id} 
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
                      disabled={updatingStatus === request.id}
                      onClick={() => {
                        if (queuePosition > 1) {
                          const confirm = window.confirm(
                            `This request is #${queuePosition} in queue. There are ${queuePosition - 1} earlier request(s) for this slot/date. Are you sure you want to accept this request? This will auto-decline the earlier requests.`
                          );
                          if (!confirm) return;
                        }
                        handleStatusUpdate(request.id, 'accepted');
                      }}
                    >
                      {updatingStatus === request.id ? 'Confirming...' : 'Accept'}
                    </button>
                    <button
                      className="reject-btn"
                      disabled={updatingStatus === request.id}
                      onClick={() => handleStatusUpdate(request.id, 'declined')}
                    >
                      {updatingStatus === request.id ? 'Declining...' : 'Decline'}
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
