import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Get today's and tomorrow's dates
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayDate = formatDate(today);
  const tomorrowDate = formatDate(tomorrow);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://turfbackend1-l63zjkfl.b4a.run/students');
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

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`https://turfbackend1-l63zjkfl.b4a.run/student/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      setRequests((prevRequests) =>
        prevRequests.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
      );
    } catch (error) {
      console.error('Error updating status:', error);
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

  return (
    <div className="admin-page-container">
      <h1>Booking Requests (Today & Tomorrow)</h1>
      <ul>
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <li key={request._id}>
              <h3>Student Request</h3>
              <p><strong>Name:</strong> {request.name}</p>
              <p><strong>Roll No:</strong> {request.rollno}</p>
              <p><strong>No. of Players:</strong> {request.no_of_players}</p>
              <p><strong>Player Roll Nos:</strong> {request.player_roll_no || 'N/A'}</p>
              <p><strong>Date:</strong> {request.date}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Slot Time:</strong> {slotTimings[request.slot - 1]}</p>

              {request.status === 'pending' && (
                <div>
                  <button
                    onClick={() => handleStatusUpdate(request._id, 'accepted')}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(request._id, 'declined')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No student requests for today or tomorrow.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPage;
