import React, { useEffect, useMemo, useState } from 'react';
import './AdminPage.css';

const API_BASE_URL = 'https://gymkhana.iitb.ac.in/sports';
const BADMINTON_ADMIN_PASSCODE = 'RADBADDY@2026';

const getISTDate = (daysToAdd = 0) => {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day) + daysToAdd)).toISOString().slice(0, 10);
};

const SLOT_TIMINGS = Array.from({ length: 11 }, (_, index) => {
  const toTime = (minutes) => {
    const hour = Math.floor(minutes / 60);
    return `${hour % 12 || 12}:${minutes % 60 ? '30' : '00'} ${hour >= 12 ? 'PM' : 'AM'}`;
  };
  return `${toTime(16 * 60 + index * 30)} - ${toTime(16 * 60 + (index + 1) * 30)}`;
});

export default function BadmintonAdminPage() {
  const [requests, setRequests] = useState([]);
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('badminton_admin_authed') === 'true');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courtFilter, setCourtFilter] = useState('all');
  const [updating, setUpdating] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const todayDate = getISTDate();
  const tomorrowDate = getISTDate(1);

  const loadRequests = async () => {
    const response = await fetch(`${API_BASE_URL}/students?sport=badminton`);
    if (!response.ok) throw new Error(`Could not load badminton requests (${response.status}).`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('The Sports API returned an invalid badminton request list.');
    if (data.some((request) => request.court === undefined || request.court === null)) {
      setRequests([]);
      throw new Error('The Sports API is not returning court-scoped badminton requests yet.');
    }
    setRequests(data);
  };

  useEffect(() => {
    loadRequests()
      .catch((loadError) => {
        console.error('Could not load badminton requests:', loadError);
        setError(loadError.message || 'Could not load badminton requests.');
      })
      .finally(() => setLoading(false));
  }, []);

  const sortedRequests = useMemo(() => requests
    .filter((request) => request.date === todayDate || request.date === tomorrowDate)
    .filter((request) => statusFilter === 'all' || request.status === statusFilter)
    .filter((request) => courtFilter === 'all' || Number(request.court) === Number(courtFilter))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()), [requests, statusFilter, courtFilter, todayDate, tomorrowDate]);

  const getQueuePosition = (request) => {
    if (request.status !== 'pending') return null;
    return requests
      .filter((entry) => entry.date === request.date && Number(entry.court) === Number(request.court) && Number(entry.slot) === Number(request.slot) && entry.status === 'pending')
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .findIndex((entry) => entry.id === request.id) + 1;
  };

  const login = (event) => {
    event.preventDefault();
    if (passcode === BADMINTON_ADMIN_PASSCODE) {
      sessionStorage.setItem('badminton_admin_authed', 'true');
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode.');
    }
  };

  const updateRequest = async (request, nextStatus) => {
    setUpdating(request.id);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/student/${request.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || `Could not update this request (${response.status}).`);
      await loadRequests();
    } catch (updateError) {
      console.error('Could not update badminton booking:', updateError);
      setError(updateError.message || 'Could not update the request. Refresh and try again.');
    } finally {
      setUpdating('');
    }
  };

  if (!authenticated) {
    return (
      <main className="badminton-admin-page">
        <form className="badminton-admin-login" onSubmit={login}>
          <p className="badminton-admin-eyebrow">Badminton bookings</p>
          <h1>Admin access</h1>
          <label htmlFor="badminton-admin-passcode">Passcode</label>
          <input id="badminton-admin-passcode" type="password" value={passcode} onChange={(event) => setPasscode(event.target.value)} required />
          {error && <p role="alert">{error}</p>}
          <button type="submit">Sign in</button>
        </form>
      </main>
    );
  }

  return (
    <main className="badminton-admin-page">
      <header className="badminton-admin-header">
        <div>
          <p className="badminton-admin-eyebrow">IIT Bombay Sports</p>
          <h1>Badminton booking requests</h1>
          <p>Requests are ordered by submission time. Accepting one declines the remaining requests for its court and slot.</p>
        </div>
        <div className="badminton-admin-actions">
          <button type="button" aria-label="Refresh requests" onClick={() => {
            setLoading(true);
            loadRequests().catch((loadError) => setError(loadError.message)).finally(() => setLoading(false));
          }}>Refresh</button>
          <label htmlFor="badminton-court-filter">Court</label>
          <select id="badminton-court-filter" value={courtFilter} onChange={(event) => setCourtFilter(event.target.value)}>
            <option value="all">All courts</option><option value="6">Court 6</option><option value="7">Court 7</option>
          </select>
          <label htmlFor="badminton-status-filter">Status</label>
          <select id="badminton-status-filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All statuses</option><option value="pending">Pending</option><option value="accepted">Accepted</option><option value="declined">Declined</option>
          </select>
          <button type="button" onClick={() => { sessionStorage.removeItem('badminton_admin_authed'); setAuthenticated(false); }}>Sign out</button>
        </div>
      </header>
      <div className="badminton-admin-counts">
        <span>Total {requests.length}</span><span>Pending {requests.filter((request) => request.status === 'pending').length}</span><span>Accepted {requests.filter((request) => request.status === 'accepted').length}</span><span>Declined {requests.filter((request) => request.status === 'declined').length}</span>
      </div>
      {error && <p className="badminton-admin-error" role="alert">{error}</p>}
      {loading && <p className="badminton-admin-loading" role="status">Loading requests...</p>}
      <ol className="badminton-request-list">
        {sortedRequests.map((request) => {
          const queuePosition = getQueuePosition(request);
          return (
          <li className={`badminton-request ${request.status}`} key={`${request.date}-${request.court}-${request.slot}-${request.id}`}>
            <header><div><span className="badminton-queue-number">{queuePosition ? `Slot queue #${queuePosition}` : request.status}</span><h2>{request.name}</h2></div><span className={`badminton-status ${request.status}`}>{request.status}</span></header>
            <div className="badminton-request-details">
              <p><strong>Student</strong>{request.rollno}</p><p><strong>Email</strong>{request.email}</p>
              <p><strong>Date</strong>{request.date}</p><p><strong>Court</strong>{request.court}</p>
              <p><strong>Time</strong>{SLOT_TIMINGS[Number(request.slot) - 1]}</p><p><strong>Players</strong>{request.no_of_players}</p>
              <p><strong>Player roll numbers</strong>{request.player_roll_no || 'Not provided'}</p>
              <p><strong>Requested at</strong>{new Date(request.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
            {request.status === 'pending' && <footer><button type="button" disabled={Boolean(updating)} onClick={() => {
              if (queuePosition > 1 && !window.confirm(`This is #${queuePosition} in its slot queue. Accepting it will decline the other pending requests for this slot. Continue?`)) return;
              updateRequest(request, 'accepted');
            }}>{updating === request.id ? 'Saving…' : 'Accept request'}</button><button type="button" disabled={Boolean(updating)} onClick={() => updateRequest(request, 'declined')}>Decline</button></footer>}
          </li>
          );
        })}
        {!sortedRequests.length && <li className="badminton-empty">No booking requests match this filter.</li>}
      </ol>
    </main>
  );
}