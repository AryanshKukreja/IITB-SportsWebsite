import React, { useState } from "react";
import './GC.css';
// Sports data for Boys championship
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

// Boys standings data
const boysStandings = [
  { name: "H2", points: 99.5, logo: "/H2.png" },
  { name: "H3", points: 82.5, logo: "/H3.png" },
  { name: "H18", points: 65.5, logo: "/H18.png" },
  { name: "H6", points: 61.5, logo: "/H6.png" },
  { name: "H5", points: 61.5, logo: "/H5.png" },
  { name: "H9", points: 55, logo: "/H9.png" },
  { name: "H14", points: 24, logo: "/H14.png" },
  { name: "H1+16", points: 21.5, logo: "/H1.png" },
  { name: "H12", points: 20, logo: "/H12.png" },
  { name: "H13", points: 18.5, logo: "/H13.png" },
  { name: "H17", points: 12, logo: "/H17.png" },
  { name: "H4", points: 10, logo: "/H4.png" },
];

// Girls standings data
const girlsStandings = [
  { name: "H10", points: 116, logo: "/H10.png" },
  { name: "H15B", points: 100, logo: "/H15B.png" },
  { name: "H15A", points: 62, logo: "/H15A.png" },
  { name: "H11", points: 56, logo: "/H11.png" },
];

const GC = () => {
  const [selectedSport, setSelectedSport] = useState("");
  const [gcType, setGcType] = useState("boys"); // "boys" or "girls"
  
  const currentStandings = gcType === "boys" ? boysStandings : girlsStandings;
  const podium = currentStandings.slice(0, 3);

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
  };

  const handleGCTypeChange = (type) => {
    setGcType(type);
    setSelectedSport(""); // Reset sport selection when switching
  };

  const selectedSportData = sportsData[selectedSport] || [];

  return (
    <div className="gc-container">
      <header className="gc-header">
        <h1>Inter-Hostel {gcType === "boys" ? "Sports" : "Girls"} General Championship</h1>
        
        {/* GC Type Selector */}
        <div className="gc-type-selector">
          <button 
            className={`gc-type-btn ${gcType === "boys" ? "active" : ""}`}
            onClick={() => handleGCTypeChange("boys")}
          >
            Boys GC
          </button>
          <button 
            className={`gc-type-btn ${gcType === "girls" ? "active" : ""}`}
            onClick={() => handleGCTypeChange("girls")}
          >
            Girls GC
          </button>
        </div>
      </header>

      {/* Overall Podium Section */}
      <div className="gc-podium">
        <div className="podium second-place">
          <div className="podium-label">2nd</div>
          <div className="hostel-logo">
            <img src={podium[1]?.logo} alt={podium[1]?.name} />
          </div>
          <h2>{podium[1]?.name}</h2>
          <p>{podium[1]?.points} pts</p>
        </div>
        <div className="podium first-place">
          <div className="podium-label">1st</div>
          <div className="hostel-logo">
            <img src={podium[0]?.logo} alt={podium[0]?.name} />
          </div>
          <h2>{podium[0]?.name}</h2>
          <p>{podium[0]?.points} pts</p>
        </div>
        <div className="podium third-place">
          <div className="podium-label">3rd</div>
          <div className="hostel-logo">
            <img src={podium[2]?.logo} alt={podium[2]?.name} />
          </div>
          <h2>{podium[2]?.name}</h2>
          <p>{podium[2]?.points} pts</p>
        </div>
      </div>

      {/* Overall Standings Table */}
      <div className="gc-table">
        <h2>Overall Standings</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Logo</th>
              <th>Hostel</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {currentStandings.map((hostel, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-logo">
                    <img src={hostel.logo} alt={hostel.name} />
                  </div>
                </td>
                <td>{hostel.name}</td>
                <td>{hostel.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sport Selection Section - Only for Boys */}
      {gcType === "boys" && (
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
      )}

      {/* Sport-specific Results - Only for Boys */}
      {gcType === "boys" && selectedSport && (
        <div className="sport-results">
          <h3>{selectedSport} Rankings</h3>
          
          {/* Sport-specific Podium */}
          <div className="sport-podium">
            {selectedSportData.length > 1 && (
              <div className="podium second-place">
                <div className="podium-label">2nd</div>
                <div className="hostel-logo">
                  <img src={`/${selectedSportData[1].name}.png`} alt={selectedSportData[1].name} />
                </div>
                <h2>{selectedSportData[1].name}</h2>
                <p>{selectedSportData[1].points} pts</p>
              </div>
            )}
            
            {selectedSportData.length > 0 && (
              <div className="podium first-place">
                <div className="podium-label">1st</div>
                <div className="hostel-logo">
                  <img src={`/${selectedSportData[0].name}.png`} alt={selectedSportData[0].name} />
                </div>
                <h2>{selectedSportData[0].name}</h2>
                <p>{selectedSportData[0].points} pts</p>
              </div>
            )}
            
            {selectedSportData.length > 2 && (
              <div className="podium third-place">
                <div className="podium-label">3rd</div>
                <div className="hostel-logo">
                  <img src={`/${selectedSportData[2].name}.png`} alt={selectedSportData[2].name} />
                </div>
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
                <th>Logo</th>
                <th>Hostel</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {selectedSportData.map((hostel, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-logo">
                      <img src={`/${hostel.name}.png`} alt={hostel.name} />
                    </div>
                  </td>
                  <td>{hostel.name}</td>
                  <td>{hostel.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="gc-footer">
        <p>© 2024 Inter-Hostel {gcType === "boys" ? "Sports" : "Girls"} Championship</p>
      </footer>
    </div>
  );
};

export default GC;