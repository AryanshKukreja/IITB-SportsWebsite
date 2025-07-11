import React, { useState } from "react";
import "./GC.css";

// Sports data for the championship
const sportsData = {
  Aquatics: [
    { name: "H3", points: 10 },
    { name: "H18", points: 6 },
    { name: "H2", points: 4 }
  ],
  Athletics: [
    { name: "H2", points: 20 },
    { name: "H3", points: 12 },
    { name: "H5", points: 8 }
  ],
  Badminton: [
    { name: "H6", points: 10 },
    { name: "H2", points: 6 },
    { name: "H3", points: 4 }
  ],
  Basketball: [
    { name: "H2", points: 10 },
    { name: "H13-14", points: 6 },
    { name: "H5", points: 4 }
  ],
  Carrom: [
    { name: "H12", points: 10 },
    { name: "H1,16", points: 6 },
    { name: "H6", points: 4 }
  ],
  Chess: [
    { name: "H6", points: 10 },
    { name: "H2", points: 6 },
    { name: "H9", points: 4 }
  ],
  Cricket: [
    { name: "H18", points: 10 },
    { name: "H2", points: 6 },
    { name: "H5", points: 4 }
  ],
  Football: [
    { name: "H2", points: 10 },
    { name: "H3", points: 6 }
  ],
  Hockey: [
    { name: "H5", points: 10 },
    { name: "H12,14", points: 6 },
    { name: "H3", points: 4 }
  ],
  KhoKho: [
    { name: "H3", points: 10 },
    { name: "H5", points: 6 },
    { name: "H2", points: 4 }
  ],
  LawnTennis: [
    { name: "H3", points: 10 },
    { name: "H6", points: 6 },
    { name: "H1,16", points: 4 }
  ],
  Squash: [
    { name: "H5", points: 10 },
    { name: "H6", points: 6 },
    { name: "H18", points: 4 }
  ],
  TableTennis: [
    { name: "H9", points: 10 },
    { name: "H1-16", points: 6 },
    { name: "H2", points: 4 }
  ],
  Triathlon: [
    { name: "H18", points: 10 },
    { name: "H9", points: 6 },
    { name: "H5", points: 4 }
  ],
  TugofWar: [
    { name: "H18", points: 10 },
    { name: "H14", points: 6 },
    { name: "H13", points: 4 }
  ],
  Volleyball: [
    { name: "H9", points: 10 },
    { name: "H3", points: 6 },
    { name: "H12", points: 4 }
  ],
  Waterpolo: [
    { name: "H2", points: 10 },
    { name: "H6", points: 6 },
    { name: "H3", points: 4 }
  ],
  Weightlifting: [
    { name: "H2", points: 10 },
    { name: "H6", points: 6 },
    { name: "H18", points: 4 }
  ]
};


// Overall standings data
const standings = [
  { name: "H2", points: 99.5 },
  { name: "H3", points: 82.5 },
  { name: "H18", points: 65.5 },
  { name: "H6", points: 61.5 },
  { name: "H5", points: 61.5 },
  { name: "H9", points: 55 },
  { name: "H14", points: 24 },
   { name: "H1+16", points: 21.5 },
  { name: "H12", points: 20 },
  { name: "H13", points: 18.5 },
  { name: "H17", points: 12 },
   { name: "H4", points: 10 },
];

const GC = () => {
  const [selectedSport, setSelectedSport] = useState("");
  const podium = standings.slice(0, 3);

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
  };

  const selectedSportData = sportsData[selectedSport] || [];

  return (
    <div className="gc-container">
      <header className="gc-header">
        <h1>Inter-Hostel Sports General Championship</h1>
      </header>

      {/* Overall Podium Section */}
      <div className="gc-podium">
        <div className="podium second-place">
          <div className="podium-label">2nd</div>
          <h2>{podium[1].name}</h2>
          <p>{podium[1].points} pts</p>
        </div>
        <div className="podium first-place">
          <div className="podium-label">1st</div>
          <h2>{podium[0].name}</h2>
          <p>{podium[0].points} pts</p>
        </div>
        <div className="podium third-place">
          <div className="podium-label">3rd</div>
          <h2>{podium[2].name}</h2>
          <p>{podium[2].points} pts</p>
        </div>
      </div>

      {/* Overall Standings Table */}
      <div className="gc-table">
        <h2>Overall Standings</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Hostel</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((hostel, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{hostel.name}</td>
                <td>{hostel.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sport Selection Section */}
      <div className="sport-selection">
        <h2>Sport-wise Results</h2>
        <select 
          value={selectedSport} 
          onChange={handleSportChange}
          className="sport-dropdown"
        >
          <option value="">Select a Sport</option>
          {Object.keys(sportsData).map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>

      {/* Sport-specific Results */}
      {selectedSport && (
        <div className="sport-results">
          <h3>{selectedSport} Rankings</h3>
          
          {/* Sport-specific Podium */}
          <div className="sport-podium">
            {selectedSportData.length > 1 && (
              <div className="podium second-place">
                <div className="podium-label">2nd</div>
                <h2>{selectedSportData[1].name}</h2>
                <p>{selectedSportData[1].points} pts</p>
              </div>
            )}
            
            {selectedSportData.length > 0 && (
              <div className="podium first-place">
                <div className="podium-label">1st</div>
                <h2>{selectedSportData[0].name}</h2>
                <p>{selectedSportData[0].points} pts</p>
              </div>
            )}
            
            {selectedSportData.length > 2 && (
              <div className="podium third-place">
                <div className="podium-label">3rd</div>
                <h2>{selectedSportData[2].name}</h2>
                <p>{selectedSportData[2].points} pts</p>
              </div>
            )}
          </div>
          
          {/* Sport-specific Table */}
          <table className="sports-gc-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Hostel</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {selectedSportData.map((hostel, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{hostel.name}</td>
                  <td>{hostel.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="gc-footer">
        <p>© 2024 Inter-Hostel Sports Championship</p>
      </footer>
    </div>
  );
};

export default GC;