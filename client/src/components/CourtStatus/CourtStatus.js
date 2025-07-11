import React, { useState, useEffect, useRef } from 'react';
import './CourtStatus.css';
import axios from 'axios';
import mapImage from './assets/maps.png';

// Manual coordinates mapped by sport name
const SPORTS_COORDINATES_BY_NAME = {
  Badminton:     { coords: { x: 430, y: 60 }, color: '#FF5722' },
  Volleyball:    { coords: { x: 330, y: 100 }, color: '#4CAF50' },
  Basketball:    { coords: { x: 260, y: 120 }, color: '#2196F3' },
  Squash:        { coords: { x: 300, y: 400 }, color: '#00BCD4' },
  "Table Tennis":   { coords: { x: 360, y: 420 }, color: '#FFC107' },
  Cricket:       { coords: { x: 80, y: 130 }, color: '#9C27B0' },
};

// 1-hour time slots from 7:00 AM to 10:00 PM
const generateOneHourTimeSlots = () => {
  const slots = [];
  let id = 1;
  for (let hour = 7; hour <= 22; hour++) {
    const date = new Date(0, 0, 0, hour, 0, 0);
    const formatted = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(/^0/, '');
    slots.push({
      id: id++,
      formatted_slot: formatted
    });
  }
  return slots;
};
const MANUAL_TIME_SLOTS = generateOneHourTimeSlots();

const API_BASE_URL = 'https://courtstatusbackend-lo8700s6.b4a.run';

const CourtStatus = () => {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [sportsCoordinates, setSportsCoordinates] = useState({});
  const [timeSlots, setTimeSlots] = useState(MANUAL_TIME_SLOTS);
  const [courtData, setCourtData] = useState([]);
  const [setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [authToken] = useState(localStorage.getItem('authToken') || '');
  const [showMapMarkers] = useState(true);
  const [isEditingMap] = useState(false);
  const mapRef = useRef(null);

  // Fetch sports and align coordinates
  useEffect(() => {
    fetchSports();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch court data when sport or date changes
  useEffect(() => {
    if (selectedSport) {
      fetchCourtStatus(selectedSport, selectedDate);
    }
  },);

  // Fetch sports from API and align coordinates
  const fetchSports = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/sports/`);
      setSports(response.data);
      if (response.data.length > 0) {
        setSelectedSport(response.data[0].id);
      }
      // Build coordinates map: API sport.id -> {coords, color, name}
      const coordsMap = {};
      response.data.forEach(sport => {
        const pin = SPORTS_COORDINATES_BY_NAME[sport.name];
        if (pin) {
          coordsMap[sport.id] = { ...pin, name: sport.name };
        }
      });
      setSportsCoordinates(coordsMap);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching sports:', error);
      setIsLoading(false);
    }
  };

  // Fetch court status
  const fetchCourtStatus = async (sportId, date) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/court-status/`, {
        params: { sport: sportId, date: date }
      });
      setTimeSlots(MANUAL_TIME_SLOTS); // Always use manual 1-hr slots
      setCourtData(response.data.courts);
      setCurrentDate(response.data.date);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching court status:', error);
      setIsLoading(false);
    }
  };

  // Handle sport change
  const handleSportChange = (sportId) => {
    setSelectedSport(sportId);
  };


  // Toggle booking status (requires authentication)
  const toggleBooking = async (courtId, timeSlotId, currentStatus) => {
    if (!authToken) {
      alert('You need to be logged in as an admin to change booking status');
      return;
    }
    const statusCycle = {
      'available': 'booked',
      'booked': 'maintenance',
      'maintenance': 'available'
    };
    const newStatus = statusCycle[currentStatus] || 'available';
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/update-booking/`,
        {
          courtId: courtId,
          timeSlotId: timeSlotId,
          status: newStatus,
          date: selectedDate
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      if (response.data.success) {
        fetchCourtStatus(selectedSport, selectedDate);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      if (error.response && error.response.status === 401) {
        alert('Authentication failed. Please log in again.');
      } else {
        alert('Failed to update booking status.');
      }
    }
  };

  // Format date for display
  const getFormattedDate = () => {
    const dateObj = new Date(selectedDate);
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get the status label
  const getStatusLabel = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'booked':
        return 'Booked';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  // Check if a time slot is current or past
  const isCurrentOrPast = (timeString) => {
    if (!timeString) return false;
    try {
      const [time, period] = timeString.split(' ');
      if (!time || !period) return false;
      let [hour, minute] = time.split(':').map(num => parseInt(num));
      if (isNaN(hour) || isNaN(minute)) return false;
      if (period === 'PM' && hour < 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      if (selectedDate === new Date().toISOString().split('T')[0]) {
        if (currentHour > hour) return true;
        if (currentHour === hour && currentMinute >= minute) return true;
      }
      return false;
    } catch (error) {
      console.error('Error in isCurrentOrPast:', error);
      return false;
    }
  };

  // Find current time slot
  const getCurrentTimeSlotId = () => {
    if (!timeSlots || !Array.isArray(timeSlots) || timeSlots.length === 0) {
      return null;
    }
    try {
      const currentHour = currentTime.getHours();
      const currentSlot = timeSlots.find(slot => {
        if (!slot || !slot.formatted_slot || typeof slot.formatted_slot !== 'string') return false;
        const parts = slot.formatted_slot.split(' ');
        if (parts.length !== 2) return false;
        const [time, period] = parts;
        if (!time || !period) return false;
        const timeParts = time.split(':');
        if (timeParts.length !== 2) return false;
        let [hour, minute] = timeParts.map(num => parseInt(num));
        if (isNaN(hour) || isNaN(minute)) return false;
        if (period === 'PM' && hour < 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        return currentHour === hour;
      });
      return currentSlot?.id || null;
    } catch (error) {
      console.error('Error in getCurrentTimeSlotId:', error);
      return null;
    }
  };

  const currentTimeSlotId = getCurrentTimeSlotId();


  // Facility map related functions
  const handleMapClick = (e) => {
    if (!isEditingMap || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (selectedSport && sportsCoordinates[selectedSport]) {
      const updatedCoordinates = { ...sportsCoordinates };
      updatedCoordinates[selectedSport] = {
        ...updatedCoordinates[selectedSport],
        coords: { x, y }
      };
      setSportsCoordinates(updatedCoordinates);
      localStorage.setItem('sportsCoordinates', JSON.stringify(updatedCoordinates));
    }
  };

  useEffect(() => {
    const savedCoordinates = localStorage.getItem('sportsCoordinates');
    if (savedCoordinates) {
      try {
        const parsed = JSON.parse(savedCoordinates);
        setSportsCoordinates(parsed);
      } catch (error) {
        console.error('Error parsing saved coordinates:', error);
      }
    }
  }, []);

  const getCoordinatesString = () => {
    return JSON.stringify(sportsCoordinates, null, 2);
  };

  const importCoordinates = () => {
    const input = prompt("Paste coordinates JSON:", "");
    if (input) {
      try {
        const parsed = JSON.parse(input);
        setSportsCoordinates(parsed);
        localStorage.setItem('sportsCoordinates', input);
        alert("Coordinates imported successfully!");
      } catch (error) {
        alert("Invalid JSON format!");
      }
    }
  };

  return (
    <div className="court-status-container">
      <header className="cs-header">
        <h1>IITB Sports Facility Booking Status</h1>
        <div className="cs-date-display">
          <span className="cs-date">{getFormattedDate()}</span>
          <span className="cs-time">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </header>

      {/* Sport Selection */}
      <div className="cs-sport-tabs">
        {sports.map(sport => (
          <button
            key={sport.id}
            onClick={() => handleSportChange(sport.id)}
            className={`cs-sport-tab ${selectedSport === sport.id ? 'active' : ''}`}
          >
            <span className="cs-sport-name" style={{
              fontFamily: 'Georgia, Times New Roman, Times, serif',
              fontSize: '1.1rem',
              textAlign: 'center',
            }}>
              {sport.name}
            </span>
          </button>
        ))}
      </div>

      {/* Facility Map */}
      <div className="cs-facility-map-container">
        <h2>IITB Sports Facilities Map</h2>
        <div className="cs-map-controls">
          {isEditingMap && (
            <>
              <button 
                onClick={() => alert(getCoordinatesString())}
                className="cs-map-control-btn"
              >
                Export Coordinates
              </button>
              <button 
                onClick={importCoordinates}
                className="cs-map-control-btn"
              >
                Import Coordinates
              </button>
            </>
          )}
        </div>
        <div 
          className="cs-facility-map" 
          ref={mapRef}
          onClick={handleMapClick}
          style={{
            /* position: 'relative',
            width: '800px',
            height: '500px',
            margin: '0 auto', */
            backgroundImage: `url(${mapImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #1e293b',
            cursor: isEditingMap ? 'crosshair' : 'default'
          }}
        >
          {showMapMarkers && sportsCoordinates[selectedSport] && (
            <div
              className="cs-map-marker selected"
              style={{
                position: 'absolute',
                left: `${sportsCoordinates[selectedSport].coords.x/8}%`,
                top: `${sportsCoordinates[selectedSport].coords.y/5}%`,
                transform: 'translate(-50%, -50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: sportsCoordinates[selectedSport].color,
                border: '2px solid #FFFFFF',
                boxShadow: '0 0 0 2px #000000',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '10px',
                cursor: 'pointer',
              }}
              title={sportsCoordinates[selectedSport].name}
            >
              {sportsCoordinates[selectedSport].name[0]}
            </div>
          )}
          {isEditingMap && (
            <div className="cs-map-edit-info" style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Click on the map to set location for {sportsCoordinates[selectedSport]?.name || 'selected sport'}
            </div>
          )}
        </div>
      </div>

      {/* Status Legend */}
      <div className="cs-legend">
        <div className="cs-legend-item">
          <div className="cs-legend-color available"></div>
          <span >Available</span>
        </div>
        <div className="cs-legend-item">
          <div className="cs-legend-color booked"></div>
          <span >Booked</span>
        </div>
        <div className="cs-legend-item">
          <div className="cs-legend-color maintenance"></div>
          <span >Maintenance</span>
        </div>
      </div>

      {/* Court Status Table */}
      <div className="cs-table-container">
        {isLoading ? (
          <div className="cs-loading">
            <div className="cs-spinner"></div>
            <p>Loading booking data...</p>
          </div>
        ) : (
          <table className="cs-table">
            <thead>
              <tr>
                <th className="cs-court-column">Court / Time</th>
                {timeSlots.map(slot => (
                  <th 
                    key={slot.id}
                    className={`cs-time-column ${slot.id === currentTimeSlotId ? 'current-time' : ''} ${
                      isCurrentOrPast(slot.formatted_slot) ? 'past-time' : ''
                    }`}
                  >
                    {slot.formatted_slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courtData.map(court => (
                <tr key={court.id}>
                  <td className="cs-court-name">{court.name}</td>
                  {timeSlots.map(slot => {
                    const slotInfo = court.slots[slot.id];
                    return (
                      <td 
                        key={slot.id}
                        className={`cs-slot ${slotInfo?.status || 'unknown'} ${slot.id === currentTimeSlotId ? 'current-time' : ''}`}
                        onClick={() => slotInfo && toggleBooking(court.id, slot.id, slotInfo.status)}
                        title={slotInfo ? `${getStatusLabel(slotInfo.status)} - Click to change status` : 'Unknown status'}
                      >
                        <span className="cs-status-indicator">
                          {slotInfo ? getStatusLabel(slotInfo.status).charAt(0) : '?'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <footer className="cs-footer">
        {authToken ? (
          <p>Admin mode: Click on any cell to cycle through booking statuses</p>
        ) : (
          <p></p>
        )}
        <p className="cs-facility-info"></p>
      </footer>
    </div>
  );
};

export default CourtStatus;
