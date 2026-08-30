import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, set, push, update, remove, onValue } from "firebase/database";
import { Shield, Plus, Trash2, LogOut, RefreshCw, Send, Check } from "lucide-react";
import "./GcAdmin.css";

// Fallback / Initial bootstrap data
const BOOTSTRAP_DATA = {
  standings: {
    boys: [
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
      { name: "H4", points: 10 }
    ],
    girls: [
      { name: "H10", points: 116 },
      { name: "H15B", points: 100 },
      { name: "H15A", points: 62 },
      { name: "H11", points: 56 }
    ]
  },
  sportsData: {
    boys: {
      Aquatics: [{ name: "H3", points: 10 }, { name: "H18", points: 6 }, { name: "H2", points: 4 }],
      Athletics: [{ name: "H2", points: 20 }, { name: "H3", points: 12 }, { name: "H5", points: 8 }],
      Badminton: [{ name: "H6", points: 10 }, { name: "H2", points: 6 }, { name: "H3", points: 4 }],
      Basketball: [{ name: "H2", points: 10 }, { name: "H13-14", points: 6 }, { name: "H5", points: 4 }],
      Carrom: [{ name: "H12", points: 10 }, { name: "H1,16", points: 6 }, { name: "H6", points: 4 }],
      Chess: [{ name: "H6", points: 10 }, { name: "H2", points: 6 }, { name: "H9", points: 4 }],
      Cricket: [{ name: "H18", points: 10 }, { name: "H2", points: 6 }, { name: "H5", points: 4 }],
      Football: [{ name: "H2", points: 10 }, { name: "H3", points: 6 }],
      Hockey: [{ name: "H5", points: 10 }, { name: "H12,14", points: 6 }, { name: "H3", points: 4 }],
      KhoKho: [{ name: "H3", points: 10 }, { name: "H5", points: 6 }, { name: "H2", points: 4 }],
      LawnTennis: [{ name: "H3", points: 10 }, { name: "H6", points: 6 }, { name: "H1,16", points: 4 }],
      Squash: [{ name: "H5", points: 10 }, { name: "H6", points: 6 }, { name: "H18", points: 4 }],
      TableTennis: [{ name: "H9", points: 10 }, { name: "H1-16", points: 6 }, { name: "H2", points: 4 }],
      Triathlon: [{ name: "H18", points: 10 }, { name: "H9", points: 6 }, { name: "H5", points: 4 }],
      TugofWar: [{ name: "H18", points: 10 }, { name: "H14", points: 6 }, { name: "H13", points: 4 }],
      Volleyball: [{ name: "H9", points: 10 }, { name: "H3", points: 6 }, { name: "H12", points: 4 }],
      Waterpolo: [{ name: "H2", points: 10 }, { name: "H6", points: 6 }, { name: "H3", points: 4 }],
      Weightlifting: [{ name: "H2", points: 10 }, { name: "H6", points: 6 }, { name: "H18", points: 4 }]
    },
    girls: {
      Aquatics: [{ name: "H10", points: 10 }, { name: "H15A", points: 6 }, { name: "H15B", points: 4 }],
      Athletics: [{ name: "H15A", points: 20 }, { name: "H10", points: 12 }, { name: "H11", points: 8 }],
      Badminton: [{ name: "H15B", points: 10 }, { name: "H10", points: 6 }, { name: "H11", points: 4 }],
      Basketball: [{ name: "H10", points: 10 }, { name: "H15A", points: 6 }, { name: "H15B", points: 4 }],
      Carrom: [{ name: "H11", points: 10 }, { name: "H10", points: 6 }, { name: "H15A", points: 4 }],
      Chess: [{ name: "H15A", points: 10 }, { name: "H10", points: 6 }, { name: "H15B", points: 4 }],
      Cricket: [{ name: "H15B", points: 10 }, { name: "H10", points: 6 }, { name: "H11", points: 4 }],
      Football: [{ name: "H10", points: 10 }, { name: "H15A", points: 6 }],
      Hockey: [{ name: "H11", points: 10 }, { name: "H15B", points: 6 }, { name: "H10", points: 4 }],
      KhoKho: [{ name: "H10", points: 10 }, { name: "H11", points: 6 }, { name: "H15A", points: 4 }],
      LawnTennis: [{ name: "H10", points: 10 }, { name: "H15A", points: 6 }, { name: "H15B", points: 4 }],
      Squash: [{ name: "H11", points: 10 }, { name: "H15A", points: 6 }, { name: "H15B", points: 4 }],
      TableTennis: [{ name: "H15B", points: 10 }, { name: "H10", points: 6 }, { name: "H11", points: 4 }],
      Volleyball: [{ name: "H15B", points: 10 }, { name: "H10", points: 6 }, { name: "H11", points: 4 }],
      Waterpolo: [{ name: "H10", points: 10 }, { name: "H15A", points: 6 }, { name: "H15B", points: 4 }]
    }
  }
};

const DEFAULT_PASSCODE = "GC_IITB_2026";

export default function GcAdmin() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("gc_admin_authed") === "true"
  );
  const [loginError, setLoginError] = useState("");
  const [dbPasscode, setDbPasscode] = useState(null);

  // GC Data State
  const [standings, setStandings] = useState({ boys: [], girls: [] });
  const [sportsData, setSportsData] = useState({ boys: {}, girls: {} });
  const [matches, setMatches] = useState({});

  // Active Management Tabs
  const [activeTab, setActiveTab] = useState("matches"); // matches | standings | sports
  const [activeCategory, setActiveCategory] = useState("boys"); // boys | girls

  // Forms State
  const [newMatch, setNewMatch] = useState({
    sport: "",
    category: "boys",
    stage: "Group Stage",
    teamA: "",
    teamB: "",
    scoreA: "0",
    scoreB: "0",
    venue: "",
    time: ""
  });

  const [commentaryInputs, setCommentaryInputs] = useState({});
  const [selectedSportKey, setSelectedSportKey] = useState("Aquatics");
  const [alert, setAlert] = useState(null);

  // Load Realtime Data
  useEffect(() => {
    const gcRef = ref(db, "gc");
    const unsub = onValue(gcRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.standings) {
          setStandings({
            boys: data.standings.boys || [],
            girls: data.standings.girls || []
          });
        }
        if (data.sportsData) {
          setSportsData({
            boys: data.sportsData.boys || {},
            girls: data.sportsData.girls || {}
          });
        }
        if (data.matches) {
          setMatches(data.matches || {});
        }
        if (data.config && data.config.adminPasscode) {
          setDbPasscode(data.config.adminPasscode);
        }
      }
    });

    return () => unsub();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const validPasscode = dbPasscode || DEFAULT_PASSCODE;
    if (passcode === validPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem("gc_admin_authed", "true");
      setLoginError("");
      triggerAlert("success", "Access granted.");
    } else {
      setLoginError("Invalid Passcode.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("gc_admin_authed");
  };

  const triggerAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  // Bootstrap Database
  const bootstrapDatabase = async () => {
    if (!window.confirm("Are you sure you want to bootstrap the GC database? This will overwrite existing standings & sports points.")) return;
    try {
      const updates = {};
      updates["/gc/standings"] = BOOTSTRAP_DATA.standings;
      updates["/gc/sportsData"] = BOOTSTRAP_DATA.sportsData;
      if (!dbPasscode) {
        updates["/gc/config/adminPasscode"] = DEFAULT_PASSCODE;
      }
      await update(ref(db), updates);
      triggerAlert("success", "Database Bootstrapped Successfully!");
    } catch (err) {
      triggerAlert("error", "Bootstrap Failed: " + err.message);
    }
  };

  // Overall Standings Management
  const handleStandingChange = (category, index, field, value) => {
    const updated = [...standings[category]];
    updated[index] = {
      ...updated[index],
      [field]: field === "points" ? parseFloat(value) || 0 : value
    };
    setStandings({
      ...standings,
      [category]: updated
    });
  };

  const addStandingRow = (category) => {
    setStandings({
      ...standings,
      [category]: [...standings[category], { name: "", points: 0 }]
    });
  };

  const removeStandingRow = (category, index) => {
    const updated = standings[category].filter((_, i) => i !== index);
    setStandings({
      ...standings,
      [category]: updated
    });
  };

  const saveStandings = async () => {
    try {
      // Sort standings by points desc before saving
      const sortedBoys = [...standings.boys].sort((a, b) => b.points - a.points);
      const sortedGirls = [...standings.girls].sort((a, b) => b.points - a.points);

      await set(ref(db, "gc/standings/boys"), sortedBoys);
      await set(ref(db, "gc/standings/girls"), sortedGirls);
      triggerAlert("success", "Overall Standings Saved!");
    } catch (err) {
      triggerAlert("error", "Save failed: " + err.message);
    }
  };

  // Sport-wise Points Management
  const handleSportPointChange = (category, sport, index, field, value) => {
    const sportList = sportsData[category][sport] ? [...sportsData[category][sport]] : [];
    if (!sportList[index]) return;

    sportList[index] = {
      ...sportList[index],
      [field]: field === "points" ? parseFloat(value) || 0 : value
    };

    setSportsData({
      ...sportsData,
      [category]: {
        ...sportsData[category],
        [sport]: sportList
      }
    });
  };

  const addSportRow = (category, sport) => {
    const sportList = sportsData[category][sport] ? [...sportsData[category][sport]] : [];
    sportList.push({ name: "", points: 0 });
    setSportsData({
      ...sportsData,
      [category]: {
        ...sportsData[category],
        [sport]: sportList
      }
    });
  };

  const removeSportRow = (category, sport, index) => {
    const sportList = sportsData[category][sport].filter((_, i) => i !== index);
    setSportsData({
      ...sportsData,
      [category]: {
        ...sportsData[category],
        [sport]: sportList
      }
    });
  };

  const saveSportPoints = async (category, sport) => {
    try {
      const sortedList = (sportsData[category][sport] || []).sort((a, b) => b.points - a.points);
      await set(ref(db, `gc/sportsData/${category}/${sport}`), sortedList);
      triggerAlert("success", `Points for ${sport} (${category}) Saved!`);
    } catch (err) {
      triggerAlert("error", "Save failed: " + err.message);
    }
  };

  // Matches Management
  const handleAddMatch = async (e) => {
    e.preventDefault();
    if (!newMatch.sport || !newMatch.teamA || !newMatch.teamB) {
      triggerAlert("error", "Please fill in Sport, Team A and Team B.");
      return;
    }

    try {
      const matchesRef = ref(db, "gc/matches");
      const matchId = push(matchesRef).key;
      const matchObject = {
        ...newMatch,
        id: matchId,
        status: "upcoming"
      };

      await set(ref(db, `gc/matches/${matchId}`), matchObject);
      triggerAlert("success", "Match added successfully!");
      setNewMatch({
        sport: "",
        category: "boys",
        stage: "Group Stage",
        teamA: "",
        teamB: "",
        scoreA: "0",
        scoreB: "0",
        venue: "",
        time: ""
      });
    } catch (err) {
      triggerAlert("error", "Failed to add match: " + err.message);
    }
  };

  const updateMatchScore = async (matchId, scoreA, scoreB, status) => {
    try {
      await update(ref(db, `gc/matches/${matchId}`), {
        scoreA,
        scoreB,
        status
      });
      triggerAlert("success", "Match score updated!");
    } catch (err) {
      triggerAlert("error", "Failed to update match: " + err.message);
    }
  };

  const addCommentary = async (matchId, scoreA, scoreB) => {
    const text = commentaryInputs[matchId];
    if (!text || !text.trim()) return;

    try {
      const commentaryRef = ref(db, `gc/matches/${matchId}/liveUpdates`);
      const newCommentaryRef = push(commentaryRef);
      await set(newCommentaryRef, {
        timestamp: Date.now(),
        message: text.trim(),
        scoreA,
        scoreB
      });

      setCommentaryInputs({
        ...commentaryInputs,
        [matchId]: ""
      });
      triggerAlert("success", "Commentary posted!");
    } catch (err) {
      triggerAlert("error", "Failed to add commentary: " + err.message);
    }
  };

  const handleDeleteMatch = async (matchId) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await remove(ref(db, `gc/matches/${matchId}`));
      triggerAlert("success", "Match deleted!");
    } catch (err) {
      triggerAlert("error", "Failed to delete match: " + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="gc-admin-login-container">
        <div className="gc-admin-login-card">
          <div className="gc-admin-logo-mark">
            <Shield className="logo-icon" />
          </div>
          <h1>GC Scorecard Admin</h1>
          <p>Provide secure passcode to manage live scores</p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="gc-admin-input"
              autoFocus
            />
            {loginError && <p className="gc-admin-login-error">{loginError}</p>}
            <button type="submit" className="gc-admin-btn primary">
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="gc-admin-root">
      {alert && (
        <div className={`gc-admin-alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* HEADER */}
      <header className="gc-admin-header">
        <div className="gc-admin-title-area">
          <Shield className="header-icon" size={24} />
          <div>
            <h1>GC Scoreboard Panel</h1>
            <p>IIT Bombay Inter-Hostel General Championship Management</p>
          </div>
        </div>
        <div className="gc-admin-header-actions">
          <button className="gc-admin-btn outline" onClick={bootstrapDatabase}>
            <RefreshCw size={16} /> Bootstrap Database
          </button>
          <button className="gc-admin-btn danger" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* TABS */}
      <div className="gc-admin-tabs">
        <button
          className={`gc-admin-tab ${activeTab === "matches" ? "active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          Manage Live Matches
        </button>
        <button
          className={`gc-admin-tab ${activeTab === "standings" ? "active" : ""}`}
          onClick={() => setActiveTab("standings")}
        >
          Overall Standings
        </button>
        <button
          className={`gc-admin-tab ${activeTab === "sports" ? "active" : ""}`}
          onClick={() => setActiveTab("sports")}
        >
          Sport-wise Points
        </button>
      </div>

      {/* MATCHES MANAGEMENT */}
      {activeTab === "matches" && (
        <div className="gc-admin-grid">
          {/* Add Match Form */}
          <div className="gc-admin-card form-card">
            <h2>Add New Match</h2>
            <form onSubmit={handleAddMatch}>
              <div className="form-group">
                <label>Sport</label>
                <input
                  type="text"
                  placeholder="e.g. Football, Basketball, Cricket"
                  value={newMatch.sport}
                  onChange={(e) => setNewMatch({ ...newMatch, sport: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newMatch.category}
                    onChange={(e) => setNewMatch({ ...newMatch, category: e.target.value })}
                  >
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Stage</label>
                  <input
                    type="text"
                    placeholder="e.g. Group Stage, Finals"
                    value={newMatch.stage}
                    onChange={(e) => setNewMatch({ ...newMatch, stage: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Hostel / Team A</label>
                  <input
                    type="text"
                    placeholder="e.g. H2"
                    value={newMatch.teamA}
                    onChange={(e) => setNewMatch({ ...newMatch, teamA: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Hostel / Team B</label>
                  <input
                    type="text"
                    placeholder="e.g. H3"
                    value={newMatch.teamB}
                    onChange={(e) => setNewMatch({ ...newMatch, teamB: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Initial Score A</label>
                  <input
                    type="text"
                    value={newMatch.scoreA}
                    onChange={(e) => setNewMatch({ ...newMatch, scoreA: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Initial Score B</label>
                  <input
                    type="text"
                    value={newMatch.scoreB}
                    onChange={(e) => setNewMatch({ ...newMatch, scoreB: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. Gymkhana Grounds"
                    value={newMatch.venue}
                    onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Time Details</label>
                  <input
                    type="text"
                    placeholder="e.g. 7:00 PM, Today"
                    value={newMatch.time}
                    onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="gc-admin-btn primary full-width">
                <Plus size={16} /> Create Match
              </button>
            </form>
          </div>

          {/* Active / Current Matches List */}
          <div className="gc-admin-card matches-list-card">
            <h2>Current Matches</h2>
            {Object.keys(matches).length === 0 ? (
              <p className="no-matches-msg">No matches configured. Use the form to add some matches.</p>
            ) : (
              <div className="matches-grid">
                {Object.values(matches).map((match) => (
                  <div key={match.id} className={`match-admin-card ${match.status}`}>
                    <div className="match-admin-header">
                      <span className={`status-badge ${match.status}`}>
                        {match.status.toUpperCase()}
                      </span>
                      <span className="match-meta">
                        {match.sport} ({match.category}) &middot; {match.stage}
                      </span>
                      <button
                        className="delete-match-btn"
                        onClick={() => handleDeleteMatch(match.id)}
                        title="Delete Match"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="match-teams-score">
                      <div className="team">
                        <span className="team-name">{match.teamA}</span>
                        <input
                          type="text"
                          value={match.scoreA}
                          onChange={(e) => {
                            const updatedMatches = { ...matches };
                            updatedMatches[match.id] = { ...match, scoreA: e.target.value };
                            setMatches(updatedMatches);
                          }}
                          className="score-edit-input"
                        />
                      </div>
                      <span className="vs-sign">VS</span>
                      <div className="team">
                        <input
                          type="text"
                          value={match.scoreB}
                          onChange={(e) => {
                            const updatedMatches = { ...matches };
                            updatedMatches[match.id] = { ...match, scoreB: e.target.value };
                            setMatches(updatedMatches);
                          }}
                          className="score-edit-input"
                        />
                        <span className="team-name">{match.teamB}</span>
                      </div>
                    </div>

                    <div className="match-status-row">
                      <label>Status:</label>
                      <select
                        value={match.status}
                        onChange={(e) => {
                          const updatedMatches = { ...matches };
                          updatedMatches[match.id] = { ...match, status: e.target.value };
                          setMatches(updatedMatches);
                        }}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="live">Live</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={() =>
                          updateMatchScore(match.id, match.scoreA, match.scoreB, match.status)
                        }
                        className="gc-admin-btn save-score-btn"
                      >
                        <Check size={14} /> Save
                      </button>
                    </div>

                    {/* Commentary Input */}
                    <div className="commentary-input-section">
                      <input
                        type="text"
                        placeholder="Add commentary update..."
                        value={commentaryInputs[match.id] || ""}
                        onChange={(e) =>
                          setCommentaryInputs({
                            ...commentaryInputs,
                            [match.id]: e.target.value
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addCommentary(match.id, match.scoreA, match.scoreB);
                          }
                        }}
                      />
                      <button
                        onClick={() => addCommentary(match.id, match.scoreA, match.scoreB)}
                        className="send-commentary-btn"
                      >
                        <Send size={14} />
                      </button>
                    </div>

                    {/* Live Commentary Feed Snippet */}
                    {match.liveUpdates && (
                      <div className="admin-commentary-feed">
                        <h4>Updates Posted:</h4>
                        <ul>
                          {Object.values(match.liveUpdates)
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .slice(0, 3)
                            .map((update, idx) => (
                              <li key={idx}>
                                <span className="time">
                                  {new Date(update.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </span>
                                <span className="score">
                                  [{update.scoreA} - {update.scoreB}]
                                </span>
                                <span className="msg">{update.message}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* OVERALL STANDINGS */}
      {activeTab === "standings" && (
        <div className="gc-admin-card full-width-card">
          <div className="card-header-with-tabs">
            <h2>Overall Leaderboard Standings</h2>
            <div className="category-toggles">
              <button
                className={`toggle-btn ${activeCategory === "boys" ? "active" : ""}`}
                onClick={() => setActiveCategory("boys")}
              >
                Boys Standings
              </button>
              <button
                className={`toggle-btn ${activeCategory === "girls" ? "active" : ""}`}
                onClick={() => setActiveCategory("girls")}
              >
                Girls Standings
              </button>
            </div>
          </div>

          <div className="standings-edit-table-wrap">
            <table className="admin-edit-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Hostel / Team Name</th>
                  <th>Points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {standings[activeCategory].map((hostel, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={hostel.name}
                        onChange={(e) =>
                          handleStandingChange(activeCategory, idx, "name", e.target.value)
                        }
                        placeholder="e.g. H2"
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.5"
                        value={hostel.points}
                        onChange={(e) =>
                          handleStandingChange(activeCategory, idx, "points", e.target.value)
                        }
                        placeholder="0.0"
                        className="table-input points-input"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => removeStandingRow(activeCategory, idx)}
                        className="action-btn delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-actions">
            <button className="gc-admin-btn outline" onClick={() => addStandingRow(activeCategory)}>
              <Plus size={16} /> Add Hostel
            </button>
            <button className="gc-admin-btn primary" onClick={saveStandings}>
              Save Standings
            </button>
          </div>
        </div>
      )}

      {/* SPORT-WISE POINTS */}
      {activeTab === "sports" && (
        <div className="gc-admin-card full-width-card">
          <div className="card-header-with-tabs">
            <h2>Sport-wise Winners Ledger</h2>
            <div className="category-toggles">
              <button
                className={`toggle-btn ${activeCategory === "boys" ? "active" : ""}`}
                onClick={() => setActiveCategory("boys")}
              >
                Boys
              </button>
              <button
                className={`toggle-btn ${activeCategory === "girls" ? "active" : ""}`}
                onClick={() => setActiveCategory("girls")}
              >
                Girls
              </button>
            </div>
          </div>

          <div className="sport-selector-row">
            <label htmlFor="sport-select">Select Sport to Manage:</label>
            <select
              id="sport-select"
              value={selectedSportKey}
              onChange={(e) => setSelectedSportKey(e.target.value)}
            >
              {Object.keys(sportsData[activeCategory] || {}).map((sportName) => (
                <option key={sportName} value={sportName}>
                  {sportName}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                const newSportName = window.prompt("Enter new sport name:");
                if (newSportName && newSportName.trim()) {
                  const cleaned = newSportName.trim();
                  setSportsData({
                    ...sportsData,
                    [activeCategory]: {
                      ...sportsData[activeCategory],
                      [cleaned]: []
                    }
                  });
                  setSelectedSportKey(cleaned);
                }
              }}
              className="gc-admin-btn outline"
            >
              <Plus size={14} /> Add New Sport
            </button>
          </div>

          <div className="standings-edit-table-wrap">
            <table className="admin-edit-table">
              <thead>
                <tr>
                  <th>Rank / Position</th>
                  <th>Hostel</th>
                  <th>Points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(sportsData[activeCategory][selectedSportKey] || []).map((entry, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={entry.name}
                        onChange={(e) =>
                          handleSportPointChange(
                            activeCategory,
                            selectedSportKey,
                            idx,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="e.g. H3"
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.5"
                        value={entry.points}
                        onChange={(e) =>
                          handleSportPointChange(
                            activeCategory,
                            selectedSportKey,
                            idx,
                            "points",
                            e.target.value
                          )
                        }
                        placeholder="0.0"
                        className="table-input points-input"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => removeSportRow(activeCategory, selectedSportKey, idx)}
                        className="action-btn delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {(!sportsData[activeCategory][selectedSportKey] ||
                  sportsData[activeCategory][selectedSportKey].length === 0) && (
                  <tr>
                    <td colSpan="4" className="empty-row-msg">
                      No point entries added for {selectedSportKey} yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="card-actions">
            <button
              className="gc-admin-btn outline"
              onClick={() => addSportRow(activeCategory, selectedSportKey)}
            >
              <Plus size={16} /> Add Entry Row
            </button>
            <button
              className="gc-admin-btn primary"
              onClick={() => saveSportPoints(activeCategory, selectedSportKey)}
            >
              Save Points for {selectedSportKey}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
