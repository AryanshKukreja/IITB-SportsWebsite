import React, { useState, useEffect } from 'react';
import './PlayerDatabase.css';

const PlayerDatabase = () => {
// Replace with your actual spreadsheet ID and API key
const SPREADSHEET_ID = '1ci3zIv3cVwjrLJZ4iZmQF-MW871vAal6opJIiSDZc88';
const API_KEY = 'AIzaSyB7cQym9gsDQ1vjO20LGBKeHzrrKyXT-Ik';

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
  const [allPlayers, setAllPlayers] = useState([]); // Stores all data from Sheet1
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [searchName, setSearchName] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterHostel, setFilterHostel] = useState('');

  // Fetch data from Google Sheets (Fetches once from Sheet1)
  const fetchAllPlayers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetching all data from Sheet1 based on Disha's backend code
      const range = 'Sheet1!A:F';
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.values || data.values.length === 0) {
        setAllPlayers([]);
        setFilteredPlayers([]);
        setLoading(false);
        return;
      }

      // Map data according to Disha's columns: Name, Sport, Hostel, Achievements, Level, Gender
      const playerData = data.values.slice(1).map((row) => ({
        name: row[0] || '',
        sport: row[1] || '',
        hostel: row[2] || '',
        achievements: row[3] || '',
        level: row[4] || '',
        gender: row[5] || ''
      }));

      setAllPlayers(playerData);
    } catch (err) {
      setError('Failed to fetch player data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all players only once when component mounts
  useEffect(() => {
    fetchAllPlayers();
  }, []);

  // Apply filters and search locally
  useEffect(() => {
    let result = [...allPlayers];

    // 1. Filter by selected sport
    if (selectedSport) {
      result = result.filter((player) =>
        player.sport.toLowerCase() === selectedSport.toLowerCase()
      );
    }

    // 2. Search by name
    if (searchName.trim()) {
      result = result.filter((player) =>
        player.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // 3. Filter by level
    if (filterLevel) {
      result = result.filter((player) => player.level === filterLevel);
    }

    // 4. Filter by gender
    if (filterGender) {
      result = result.filter((player) => player.gender === filterGender);
    }

    // 5. Filter by hostel
    if (filterHostel) {
      result = result.filter((player) => player.hostel === filterHostel);
    }

    // Always sort alphabetically by name automatically
    result.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredPlayers(result);
  }, [selectedSport, searchName, filterLevel, filterGender, filterHostel, allPlayers]); 

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
            <option value="Inter-IIT">Inter-IIT</option>
            <option value="Camp">Camp</option>
            <option value="Pre Camp">Pre Camp</option>
            <option value="NSO/Beginner">NSO/Beginner</option>
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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
            <option value="H1">H1</option>
            <option value="H2">H2</option>
            <option value="H3">H3</option>
            <option value="H4">H4</option>
            <option value="H5">H5</option>
            <option value="H6">H6</option>
            <option value="H7">H7</option>
            <option value="H8">H8</option>
            <option value="H9">H9</option>
            <option value="H10">H10</option>
            <option value="H11">H11</option>
            <option value="H12">H12</option>
            <option value="H13">H13</option>
            <option value="H14">H14</option>
            <option value="H15">H15</option>
            <option value="H16">H16</option>
            <option value="H17">H17</option>
            <option value="H18">H18</option>
            <option value="H19">H19</option>
            <option value="H20">H20</option>
            <option value="H21">H21</option>
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
                <th>Sport</th>
                <th>Hostel</th>
                <th>Achievements</th>
                <th>Level</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.sport}</td>
                  <td>{player.hostel}</td>
                  <td>{player.achievements}</td>
                  <td>{player.level}</td>
                  <td>{player.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredPlayers.length === 0 && !error && (
        <p className="pd-message">No players found. Try adjusting your filters.</p>
      )}

      {!loading && allPlayers.length > 0 && (
        <p className="pd-footer">
          Showing {filteredPlayers.length} players
        </p>
      )}
    </div>
  );
};

export default PlayerDatabase;
