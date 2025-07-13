import React, { useState, useEffect } from 'react';
import './BookingPage.css';
import './form.css';

const slotTimings = [
  "6:30 AM - 7:30 AM",
  "7:30 AM - 8:30 AM",
  "8:30 AM - 9:30 AM",
  "9:30 AM - 10:30 AM",
  "10:30 AM - 11:30 AM",
  "11:30 AM - 12:30 PM",
  "12:30 PM - 1:30 PM",
  "1:30 PM - 2:30 PM",
  "2:30 PM - 3:30 PM",
  "3:30 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:30 PM",
];

// Utility function to get current IST date
const getISTDate = (daysToAdd = 0) => {
  const date = new Date();

  date.setHours(date.getUTCHours() + 5);
  date.setMinutes(date.getUTCMinutes() + 30);
  date.setDate(date.getDate() + daysToAdd);

  return date.toISOString().split('T')[0];
};

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [existingBookings, setExistingBookings] = useState([]); // Changed from existingRollNumbers
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    purpose: "match among friends",
    email: '',
    rollnumberOfPlayers: [],
    numberOfPlayers: 0,
    acceptedTnc: false,
  });

  const todayDate = getISTDate();
  const tomorrowDate = getISTDate(1);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch('https://turfbackend1-l63zjkfl.b4a.run/api/slots');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const slots = await response.json();
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    const fetchExistingBookings = async () => {
      try {
        const response = await fetch('https://turfbackend1-l63zjkfl.b4a.run/students');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const students = await response.json();
        setExistingBookings(students); // Store full booking data instead of just roll numbers
      } catch (error) {
        console.error('Error fetching existing bookings:', error);
      }
    };

    fetchSlots();
    fetchExistingBookings();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptedTnc) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    // Check if user has already booked for tomorrow's date specifically
    const hasBookingForTomorrow = existingBookings.some(
      (booking) => booking.rollno === formData.rollNumber && booking.date === tomorrowDate
    );

    if (hasBookingForTomorrow) {
      alert('You have already booked a slot for tomorrow. Please contact administration for further assistance.');
      return;
    }

    // Check local bookings for tomorrow's date
    const userBookingsCount = bookings.filter(
      (booking) => booking.rollNumber === formData.rollNumber && booking.date === tomorrowDate
    ).length;

    if (userBookingsCount >= 1) {
      alert('You can only book a maximum of 1 slot per day.');
      return;
    }

    if (selectedSlotIndex !== null) {
      try {
        const response = await fetch('https://turfbackend1-l63zjkfl.b4a.run/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rollno: formData.rollNumber,
            name: formData.name,
            email: formData.email,
            slot: selectedSlotIndex + 1,
            purpose: formData.purpose,
            player_roll_no: formData.rollnumberOfPlayers.join(','),
            no_of_players: formData.numberOfPlayers,
            status: 'pending',
            date: tomorrowDate,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          const newBooking = {
            ...formData,
            slotTime: `Slot ${selectedSlotIndex + 1}`,
            id: bookings.length + 1,
            status: 'requested',
            date: tomorrowDate,
          };
          setBookings([...bookings, newBooking]);
          updateSlotStatus(selectedSlotIndex, 'requested');
          alert('Slot requested successfully!');
          window.location.reload();
        } else {
          alert(result.message || 'Booking failed.');
        }
      } catch (error) {
        console.error('Error while booking slot:', error);
        alert('An error occurred while booking the slot.');
      }
    } else {
      alert('Slot is not available.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSlotClick = (slotIndex) => setSelectedSlotIndex(slotIndex);

  const updateSlotStatus = (slotIndex, status) => {
    setAvailableSlots((prevSlots) =>
      prevSlots.map((slot, index) =>
        index === slotIndex ? { ...slot, status } : slot
      )
    );
  };

  const getSlotColor = (status, isSelected) => {
    if (status === 'booked') return '#DC143C';
    if (status === 'requested') return '#ff6d40';
    if (isSelected) return '#4096ff';
    return '#29AB87';
  };

  return (
    <div className='turf-booking-container'>
      <h1 className='football-turf-heading'>Football Turf Booking</h1>

      {/* Today's Slots */}
      <h2 className='football-turf-today-slots'>Today's Slots ({new Date().toLocaleDateString()}) - Display Only</h2>
      <h4 className='slots-note'>Note : Slots can only be booked for Tomorrow</h4>
      <div className="slots">
        {availableSlots
          .filter((slot) => slot.date === todayDate)
          .map((slot, index) => {
            // Force "8:00 PM - 9:30 PM" slot to show as booked
            const isSpecialSlot = slotTimings[index] === "8:00 PM - 9:30 PM";
            const status = isSpecialSlot ? 'booked' : slot.status;
            return (
              <button
                key={`today-slot-${slot.slot}`}
                style={{
                  padding: '10px',
                  backgroundColor: getSlotColor(status, false),
                  cursor: 'not-allowed',
                }}
                disabled
              >
                {slotTimings[index]} <br />
                Status: {status}
              </button>
            );
          })}
      </div>

      <h2 className='booking-form-heading'>Booking Form</h2>
      <form className="booking-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Ldap ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollnumberOfPlayers">Roll Numbers of Players (Comma Separated):</label>
          <input
            type="text"
            id="rollnumberOfPlayers"
            name="rollnumberOfPlayers"
            value={formData.rollnumberOfPlayers}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                rollnumberOfPlayers: e.target.value.split(',').map((num) => num.trim()),
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players:</label>
          <input
            type="number"
            id="numberOfPlayers"
            name="numberOfPlayers"
            value={formData.numberOfPlayers}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Tomorrow's Slots */}
        <h2 className='football-turf-tomorrow-slots'>Available Slots for Tomorrow ({new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })})</h2>
        <div className="slots">
          {availableSlots
            .filter((slot) => slot.date === tomorrowDate)
            .map((slot, index) => {
              // Force "8:00 PM - 9:30 PM" slot to show as booked
              const isSpecialSlot = slotTimings[index] === "8:00 PM - 9:30 PM";
              const status = isSpecialSlot ? 'booked' : slot.status;
              return (
                <button
                  key={`tomorrow-slot-${slot.slot}`}
                  onClick={() => handleSlotClick(index)}
                  style={{
                    padding: '10px',
                    backgroundColor: getSlotColor(status, index === selectedSlotIndex),
                    cursor: status === 'available' ? 'pointer' : 'not-allowed',
                  }}
                  disabled={status === 'booked'}
                >
                  {slotTimings[index]} <br />
                  Status: {status}
                </button>
              );
            })}
        </div>

        <div className="form-group form-checkbox">
          <input
            type="checkbox"
            name="acceptedTnc"
            id="acceptedTnc"
            checked={formData.acceptedTnc}
            onChange={handleInputChange}
          />
          <label htmlFor="tnc">
            I accept the Terms and Conditions mentioned in the <a href="https://docs.google.com/document/d/1_fEFMokJl8iC8Jt5ivA2x-5yqGFHtS5FlJNtMvUiKog/edit?addon_store&tab=t.0"> Rulebook </a>
          </label>
        </div>

        <p className="disclaimer">
          The Institute Sports Council reserves the right to cancel any turf booking at any time for valid reasons.
        </p>

        <button type="submit" className="submit-btn">Book Slot</button>
      </form>
    </div>
  );
};

export default BookingPage;
