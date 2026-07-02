import React, { useState, useEffect } from 'react';
import './PlayerDatabase.css';

const PlayerDatabase = () => {
  const SPREADSHEET_ID = '13wB7unK9gNHWPHxJBOK5R86Oi69evxQYEgcf8mY5-2A';
  const API_KEY = 'AIzaSyB9LGXywL87P0FrFyaOkdo-V11_-ESg7nk';

  const sports = [
    'Aquatics',
    'Athletics',
    'Badminton',
    'Basketball',
    'Board Games',
    'Cricket',
    'Football',
    'Hockey',
    'Indian Games',
    'Lawn Tennis',
    'Squash',
    'Table Tennis',
    'Volleyball',
    'Weightlifting'
  ];

  const [selectedSport, setSelectedSport] = useState('Aquatics');
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [searchName, setSearchName] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterHostel, setFilterHostel] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Fetch data from Google Sheets
  const fetchPlayers = async (sport) => {
    setLoading(true);
    setError(null);
    try {
      const range = `${sport}!A:F`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.values || data.values.length === 0) {
        setPlayers([]);
        setFilteredPlayers([]);
        setLoading(false);
        return;
      }

      // Skip header row and map data
      const playerData = data.values.slice(1).map((row) => ({
        name: row[0] || '',
        hostel: row[1] || '',
        achievements: row[2] || '',
        level: row[3] || '',
        gender: row[4] || '',
        rollNo: row[5] || ''
      }));

      setPlayers(playerData);
      setFilteredPlayers(playerData);
    } catch (err) {
      setError('Failed to fetch player data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch players when sport changes
  useEffect(() => {
    fetchPlayers(selectedSport);
  }, [selectedSport]);

  // Apply filters and search
  useEffect(() => {
    let result = [...players];

    // Search by name
    if (searchName.trim()) {
      result = result.filter((player) =>
        player.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Filter by level
    if (filterLevel) {
      result = result.filter((player) => player.level === filterLevel);
    }

    // Filter by gender
    if (filterGender) {
      result = result.filter((player) => player.gender === filterGender);
    }

    // Filter by hostel
    if (filterHostel) {
      result = result.filter((player) => player.hostel === filterHostel);
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'level') {
      result.sort((a, b) => a.level.localeCompare(b.level));
    } else if (sortBy === 'hostel') {
      result.sort((a, b) => a.hostel.localeCompare(b.hostel));
    }

    setFilteredPlayers(result);
  }, [searchName, filterLevel, filterGender, filterHostel, sortBy, players]);

  // Get unique values for filters
  const uniqueLevels = [...new Set(players.map((p) => p.level).filter(Boolean))];
  const uniqueGenders = [...new Set(players.map((p) => p.gender).filter(Boolean))];
  const uniqueHostels = [...new Set(players.map((p) => p.hostel).filter(Boolean))];

  return (
    <div className="pd-container">
      <div className="pd-header">
        <h1>Player Database</h1>
        <p>Explore and search players across all sports at IIT Bombay</p>
      </div>

      <div className="pd-controls">
        {/* Sport Dropdown */}
        <div className="control-group">
          <label>Select Sport:</label>
          <select
            value={selectedSport}
            onChange={(e) => {
              setSelectedSport(e.target.value);
              setSearchName('');
              setFilterLevel('');
              setFilterGender('');
              setFilterHostel('');
            }}
            className="control-input"
          >
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        {/* Search by Name */}
        <div className="control-group">
          <label>Search by Name:</label>
          <input
            type="text"
            placeholder="Enter player name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="control-input"
          />
        </div>

        {/* Filter by Level */}
        <div className="control-group">
          <label>Filter by Level:</label>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="control-input"
          >
            <option value="">All Levels</option>
            {uniqueLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Gender */}
        <div className="control-group">
          <label>Filter by Gender:</label>
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="control-input"
          >
            <option value="">All Genders</option>
            {uniqueGenders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Hostel */}
        <div className="control-group">
          <label>Filter by Hostel:</label>
          <select
            value={filterHostel}
            onChange={(e) => setFilterHostel(e.target.value)}
            className="control-input"
          >
            <option value="">All Hostels</option>
            {uniqueHostels.map((hostel) => (
              <option key={hostel} value={hostel}>
                {hostel}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="control-group">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="control-input"
          >
            <option value="name">Name</option>
            <option value="level">Level</option>
            <option value="hostel">Hostel</option>
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="pd-message">Loading players...</p>}
      {error && <p className="pd-error">{error}</p>}

      {/* Players Table */}
      {!loading && filteredPlayers.length > 0 && (
        <div className="pd-table-wrapper">
          <table className="pd-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Hostel</th>
                <th>Achievements</th>
                <th>Level</th>
                <th>Gender</th>
                <th>Roll No</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.hostel}</td>
                  <td>{player.achievements}</td>
                  <td>{player.level}</td>
                  <td>{player.gender}</td>
                  <td>{player.rollNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredPlayers.length === 0 && !error && (
        <p className="pd-message">No players found. Try adjusting your filters.</p>
      )}

      {!loading && players.length > 0 && (
        <p className="pd-footer">
          Showing {filteredPlayers.length} of {players.length} players
        </p>
      )}
    </div>
  );
};

export default PlayerDatabase;
