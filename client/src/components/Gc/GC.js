import React, { useState } from "react";
//import { Link } from "react-router-dom";
import "./GC.css";


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

const girlssportsData = {
  Aquatics: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 }
  ],
  Athletics: [
    { name: "H15A", points: 20 },
    { name: "H10", points: 12 },
    { name: "H11", points: 8 }
  ],
  Badminton: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11", points: 4 }
  ],
  Basketball: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 }
  ],
  Carrom: [
    { name: "H11", points: 10 },
    { name: "H10", points: 6 },
    { name: "H15A", points: 4 }
  ],
  Chess: [
    { name: "H15A", points: 10 },
    { name: "H10", points: 6 },
    { name: "H15B", points: 4 }
  ],
  Cricket: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11", points: 4 }
  ],
  Football: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 }
  ],
  Hockey: [
    { name: "H11", points: 10 },
    { name: "H15B", points: 6 },
    { name: "H10", points: 4 }
  ],
  KhoKho: [
    { name: "H10", points: 10 },
    { name: "H11", points: 6 },
    { name: "H15A", points: 4 }
  ],
  LawnTennis: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 }
  ],
  Squash: [
    { name: "H11", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 }
  ],
  TableTennis: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11", points: 4 }
  ],
  Volleyball: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11", points: 4 }
  ],
  Waterpolo: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 }
  ]
};


// Overall standings data
const standings = [
  { name: "H2", points: 99.5, image:"/hostel_logos/H2.png" },
  { name: "H3", points: 82.5, image:"/hostel_logos/H2.png" },
  { name: "H18", points: 65.5, image:"/hostel_logos/H2.png"},
  { name: "H6", points: 61.5, image:"/hostel_logos/H2.png" },
  { name: "H5", points: 61.5, image:"/hostel_logos/H2.png" },
  { name: "H9", points: 55, image:"/hostel_logos/H2.png" },
  { name: "H14", points: 24, image:"/hostel_logos/H2.png" },
   { name: "H1+16", points: 21.5, image:"/hostel_logos/H2.png" },
  { name: "H12", points: 20, image:"/hostel_logos/H2.png" },
  { name: "H13", points: 18.5,image:"/hostel_logos/H2.png" },
  { name: "H17", points: 12, image:"/hostel_logos/H2.png" },
   { name: "H4", points: 10,  image:"/hostel_logos/H2.png"},
];

const girlsStandings = [
  { name: "H10", points: 116,  },
  { name: "H15B", points: 100,  },
  { name: "H15A", points: 62,  },
  { name: "H11", points: 56, }
];

const GC = () => {
  const [activeTab, setActiveTab] = useState("boys");
  const currentSportsData = activeTab === "boys" ? sportsData : girlssportsData;
  const currentStandings = activeTab === "boys" ? standings : girlsStandings;


  const [selectedSport, setSelectedSport] = useState("");
  const podium = currentStandings.slice(0, 3);

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
  };

  const selectedSportData = currentSportsData[selectedSport] || [];

  return (
    <div className="gc-container">
      <header className="gc-header">
        <h1>Inter-Hostel Sports General Championship</h1>
      </header>

      {/* Tab Switcher */}
      <div className="gc-tabs">
        <button
          className={`gc-tab-button ${activeTab === "boys" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("boys");
            setSelectedSport(""); // Reset selected sport
          }}
        >
          Boys GC
        </button>
        <button
          className={`gc-tab-button ${activeTab === "girls" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("girls");
            setSelectedSport(""); // Reset selected sport
          }}
        >
          Girls GC
        </button>
      </div>


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
                  <img
                    src={`${process.env.PUBLIC_URL}/hostel_logos/${
                      [ "H4", "H1+16", "H1-16"].includes(hostel.name) ? "H1" : hostel.name
                    }.png`}
                    alt={`${hostel.name} logo`}
                    className="hostel-logo"
                  />


                  <div 
                    className="hostel-logo-placeholder"
                    style={{ 
                      display: 'none',
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ccc',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#666'
                    }}
                  >
                    {hostel.name}
                  </div>
                </td>
                <td>{hostel.name}</td>
                <td>{hostel.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeTab === "boys" && (
        <>

      {/* Sport Selection Section */}
      <div className="sport-selection">
        <h2>Sport-wise Results</h2>
        <select 
          value={selectedSport} 
          onChange={handleSportChange}
          className="sport-dropdown"
        >
          <option value="">Select a Sport</option>
          {Object.keys(currentSportsData).map((sport) => (
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
      </>
      )}

      <footer className="gc-footer">
        <p>© 2024 Inter-Hostel Sports Championship</p>
      </footer>
    </div>
  );
};

export default GC;