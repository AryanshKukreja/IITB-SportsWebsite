import React, { useEffect, useState } from 'react';
import '../turf-booking/BookingPage.css';
import './BookingPage.css';
import '../turf-booking/form.css';

const COURTS = [6, 7];
const API_BASE_URL = 'https://gymkhana.iitb.ac.in/sports';
const RULEBOOK_URL = 'https://docs.google.com/document/d/1PzsRNHQ4SHDt7LL77KNm9Mda_4z_HoqOnQwdc0UgysI/edit?tab=t.0#heading=h.x5e4q43qgafw';
const SLOT_TIMINGS = Array.from({ length: 11 }, (_, index) => {
  const startMinutes = 16 * 60 + index * 30;
  const endMinutes = startMinutes + 30;
  const formatTime = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
  };
  return `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`;
});

const getISTDate = (daysToAdd = 0) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const date = new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day) + daysToAdd));
  return date.toISOString().slice(0, 10);
};

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [courtAvailabilityReady, setCourtAvailabilityReady] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');
  const [noticeType, setNoticeType] = useState('error');
  const [formData, setFormData] = useState({
    name: '', rollNumber: '', email: '', playerRollNumbers: '', numberOfPlayers: '', acceptedTnc: false,
  });

  const todayDate = getISTDate();
  const bookingDate = getISTDate(1);

  const loadBookingData = async () => {
    const [slotsResponse, bookingsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/slots?sport=badminton`),
      fetch(`${API_BASE_URL}/students?sport=badminton`),
    ]);
    if (!slotsResponse.ok || !bookingsResponse.ok) {
      throw new Error('Could not load badminton booking information.');
    }
    const [slots, requests] = await Promise.all([slotsResponse.json(), bookingsResponse.json()]);
    setAvailableSlots(Array.isArray(slots) ? slots : []);
    setBookings(Array.isArray(requests) ? requests : []);
    const courtAware = Array.isArray(slots) && slots.some((entry) => entry.court !== undefined && entry.slot !== undefined);
    setCourtAvailabilityReady(courtAware);
    setAvailabilityError(courtAware ? '' : 'Badminton booking is unavailable until the Sports API provides court-specific availability.');
  };

  useEffect(() => {
    loadBookingData()
      .catch((error) => {
        console.error('Could not load badminton bookings:', error);
        setNotice('Unable to load court availability. Please refresh the page.');
      })
      .finally(() => setLoading(false));
  }, []);

  const getSlotStatus = (court, slot, date) => {
    const requests = bookings.filter((booking) =>
      booking.date === date && Number(booking.court) === court && Number(booking.slot) === slot && booking.status !== 'declined'
    );
    if (requests.some((request) => request.status === 'accepted')) return 'booked';
    if (requests.some((request) => request.status === 'pending')) return 'requested';
    const slotData = availableSlots.find((entry) =>
      entry.date === date && Number(entry.court) === court && Number(entry.slot) === slot
    );
    return slotData?.status || 'unavailable';
  };

  const getSlotColor = (status, isSelected) => {
    if (status === 'booked') return '#b93838';
    if (status === 'requested') return '#a85e24';
    if (isSelected) return '#2856a6';
    if (status !== 'available') return '#46505d';
    return '#16815d';
  };

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice('');
    const rollNumber = formData.rollNumber.trim().toLowerCase();
    if (!formData.acceptedTnc) {
      setNotice('Please accept the terms and conditions to continue.');
      return;
    }
    if (selectedSlot === null) {
      setNotice('Choose a badminton court and time slot first.');
      return;
    }
    if (bookings.some((booking) =>
      booking.date === bookingDate && String(booking.rollno || '').trim().toLowerCase() === rollNumber && booking.status !== 'declined'
    )) {
      setNotice('You already have an active badminton booking request for tomorrow.');
      return;
    }
    if (!courtAvailabilityReady || getSlotStatus(selectedSlot.court, selectedSlot.slot, bookingDate) !== 'available') {
      setNotice('That court and time slot is no longer available. Choose another slot.');
      setSelectedSlot(null);
      loadBookingData().catch((error) => console.error('Could not refresh badminton bookings:', error));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: 'badminton',
          court: selectedSlot.court,
          rollno: rollNumber,
          name: formData.name.trim(),
          email: formData.email.trim(),
          slot: selectedSlot.slot,
          purpose: 'match among friends',
          player_roll_no: formData.playerRollNumbers.split(',').map((entry) => entry.trim()).filter(Boolean).join(','),
          no_of_players: Number(formData.numberOfPlayers),
          status: 'pending',
          date: bookingDate,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || 'Booking request could not be submitted.');
      }

      setNoticeType('success');
      setNotice('Your badminton booking request has been submitted for admin review.');
      setFormData({ name: '', rollNumber: '', email: '', playerRollNumbers: '', numberOfPlayers: '', acceptedTnc: false });
      setSelectedSlot(null);
      loadBookingData().catch((error) => console.error('Could not refresh badminton bookings:', error));
    } catch (error) {
      console.error('Badminton booking request failed:', error);
      setNoticeType('error');
      setNotice(error.message || 'Unable to submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderSlot = (court, slot, date, disabled = false) => {
    const status = getSlotStatus(court, slot, date);
    const chosen = selectedSlot?.court === court && selectedSlot?.slot === slot;
    const unavailable = disabled || !courtAvailabilityReady || status !== 'available';
    return (
      <button
        className={`badminton-slot ${status} ${chosen ? 'selected' : ''}`}
        key={`${date}-${court}-${slot}`}
        type="button"
        disabled={unavailable || loading}
        onClick={() => { setSelectedSlot({ court, slot }); setNotice(''); setNoticeType('error'); }}
        style={{ backgroundColor: getSlotColor(status, chosen) }}
        aria-pressed={chosen}
      >
        <span>{SLOT_TIMINGS[slot - 1]}</span>
        <small>{status === 'booked' ? 'Confirmed' : status === 'requested' ? 'Request pending' : status === 'available' ? 'Available' : 'Unavailable'}</small>
      </button>
    );
  };

  const formatDisplayDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  });

  return (
    <main className="turf-booking-container badminton-booking-container">
      <h1 className="football-turf-heading">Badminton Court Booking</h1>

      <h2 className="football-turf-tomorrow-slots">Available Courts for Tomorrow ({formatDisplayDate(bookingDate)})</h2>
      <p className="slots-note badminton-slots-note">Select a court and a 30-minute session.</p>
      {loading && <p className="badminton-load-status" role="status">Loading court availability...</p>}
      {availabilityError && !loading && <p className="badminton-notice error" role="alert">{availabilityError}</p>}
      <section className="badminton-courts" aria-label="Tomorrow's badminton court availability">
        {COURTS.map((court) => (
          <div className="badminton-court" key={`tomorrow-${court}`}>
            <h3 className="badminton-court-heading">Court {court}</h3>
            <div className="slots badminton-slots">
              {SLOT_TIMINGS.map((_, index) => renderSlot(court, index + 1, bookingDate))}
            </div>
          </div>
        ))}
      </section>

      <h2 className="booking-form-heading">Booking Form</h2>
      <form className="booking-form badminton-booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="badminton-name">Name</label>
          <input id="badminton-name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="badminton-roll">Roll Number</label>
          <input id="badminton-roll" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="badminton-email">LDAP Email</label>
          <input id="badminton-email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="badminton-players">Player roll numbers (comma separated)</label>
          <input id="badminton-players" name="playerRollNumbers" value={formData.playerRollNumbers} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="badminton-player-count">Number of players</label>
          <input id="badminton-player-count" name="numberOfPlayers" type="number" min="2" max="4" value={formData.numberOfPlayers} onChange={handleInputChange} required />
        </div>
        <p className="badminton-selection">Selected: {selectedSlot ? `Court ${selectedSlot.court} · ${SLOT_TIMINGS[selectedSlot.slot - 1]}` : 'Choose a court and slot above'}</p>
        <div className="form-group form-checkbox">
          <input id="badminton-tnc" name="acceptedTnc" type="checkbox" checked={formData.acceptedTnc} onChange={handleInputChange} />
          <label htmlFor="badminton-tnc">I accept the Terms and Conditions mentioned in the <a href={RULEBOOK_URL} target="_blank" rel="noopener noreferrer">Rulebook</a>.</label>
        </div>
        <p className="disclaimer">The Institute Sports Council reserves the right to cancel any badminton court booking for valid reasons.</p>
        {notice && <p className={`badminton-notice ${noticeType}`} role={noticeType === 'error' ? 'alert' : 'status'}>{notice}</p>}
        <button type="submit" className="submit-btn" disabled={submitting || loading || !courtAvailabilityReady}>{submitting ? 'Submitting...' : 'Request Slot'}</button>
      </form>

      <h2 className="football-turf-today-slots">Today's Court Status ({formatDisplayDate(todayDate)}) - Display Only</h2>
      <section className="badminton-courts" aria-label="Today's badminton court status">
        {COURTS.map((court) => (
          <div className="badminton-court" key={`today-${court}`}>
            <h3 className="badminton-court-heading">Court {court}</h3>
            <div className="slots badminton-slots">
              {SLOT_TIMINGS.map((_, index) => renderSlot(court, index + 1, todayDate, true))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default BookingPage;