import './form.css';
import React, { useState, useEffect } from 'react';

const BookingForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [purpose, setPurpose] = useState('');
  const [rollnumberOfPlayers, setRollNumberOfPlayers] = useState([]);
  const [acceptedTnc, setAcceptedTnc] = useState(false);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  const getISTDate = (daysToAdd = 0) => {
    const date = new Date();
  
    // Adjust the time to IST by adding 5 hours and 30 minutes
    date.setHours(date.getUTCHours() + 5);
    date.setMinutes(date.getUTCMinutes() + 30);
  
    // Add any extra days (like for tomorrow's date)
    date.setDate(date.getDate() + daysToAdd);
  
    return date.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
  };

  useEffect(() => {
    // Set selectedDate to tomorrow's date (IST)
    setSelectedDate(getISTDate(1));
  }, []);

  const handleBookingSubmit = (event) => {
    event.preventDefault();

    if (!acceptedTnc) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    const bookingData = {
      name,
      rollNumber,
      purpose,
      rollnumberOfPlayers: rollnumberOfPlayers.map(num => num.trim()),
      numberOfPlayers,
      date: selectedDate, // Use the selectedDate from the state, which should already be set to tomorrow's date
      status: "pending",
    };

    // Send the bookingData in the onSubmit callback
    onSubmit(bookingData);
  };

  return (
    <form className="booking-form" onSubmit={handleBookingSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rollNumber">Roll Number:</label>
        <input
          type="text"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value.trim().toLowerCase())}
          required
        />
      </div>
  
      <div className="form-group">
        <label htmlFor="purpose">Purpose:</label>
        <select
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        >
          <option value="">Select Purpose</option>
          <option value="match among friends">match among friends</option>
          <option value="council match">council match</option>
          <option value="frisbee club">frisbee club</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="players">Roll Numbers of Players (Comma Separated):</label>
        <input
          type="text"
          id="players"
          value={rollnumberOfPlayers.join(',')}
          onChange={(e) => setRollNumberOfPlayers(e.target.value.split(',').map(num => num.trim()))}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Number">Number of players:</label>
        <input
          type="number"
          id="Number"
          value={numberOfPlayers}
          onChange={(e) => setNumberOfPlayers(parseInt(e.target.value, 10))}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Booking Date (Tomorrow):</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          readOnly
          required
        />
      </div>
      

      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="tnc"
          checked={acceptedTnc}
          onChange={(e) => setAcceptedTnc(e.target.checked)}
        />
        <label htmlFor="tnc">
          I accept the Terms and Conditions mentioned in the <a href="https://docs.google.com/document/d/1_fEFMokJl8iC8Jt5ivA2x-5yqGFHtS5FlJNtMvUiKog/edit?addon_store&tab=t.0"> Rulebook </a>
        </label>
      </div>
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default BookingForm;
