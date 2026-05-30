import React, { useState, useEffect } from "react";
import "./matchprediction.css";
import { db } from "../../firebase";
import { ref, push, onValue, query, orderByChild, equalTo } from "firebase/database";

// ─── MATCH CONFIG ─────────────────────────────────────────────────────────────
const MATCH_CONFIG = {
  id:          "ipl-finals-2026",
  event:       "IPL FINALS 2026",
  subtitle:    "IITB Sports · Cricket",
  allowDraw:   false,
  teamA: {
    name:   "Royal Challengers Bengaluru",
    short:  "RCB",
    color:  "#CC0000",
    accent: "#FF4444",
    logo:   "https://scores.iplt20.com/ipl/teamlogos/RCB.png",
    logoBg: "#CC0000",   // used only in intro circle
  },
  teamB: {
    name:      "Gujarat Titans",
    short:     "GT",
    color:     "#E6AF00",   // original — unchanged
    //accent:    "#FFD700",
    textColor: "#fff",
    logo:      "https://scores.iplt20.com/ipl/teamlogos/GT.png",
    logoBg:    "#1C3B6E",  // used only in intro circle
  },
  scoreLabel:   "Predicted Score",
  scoreSuffix:  "runs",
  maxScore:     350,
  minScore:     49,
  defaultScore: 0,
};
// ──────────────────────────────────────────────────────────────────────────────

// Inline SVG fallbacks if CDN logos fail to load
const RCB_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23CC0000'/><text x='50' y='62' text-anchor='middle' font-family='Impact,sans-serif' font-size='32' font-weight='bold' fill='white'>RCB</text></svg>`;
const GT_SVG  = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%231C3B6E' stroke='%23E6AF00' stroke-width='3'/><text x='50' y='62' text-anchor='middle' font-family='Impact,sans-serif' font-size='36' font-weight='bold' fill='%23E6AF00'>GT</text></svg>`;

function safeColor(color, fallback) {
  return color === "#F9CD05" ? "#b8940a" : (fallback || color);
}

function clamp(val, min, max) {
  const n = parseInt(val, 10);
  if (isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

// ── Intro Animation Overlay ───────────────────────────────────────────────────
function IntroOverlay({ teamA, teamB, onDone }) {
  const [phase, setPhase] = useState("enter"); // enter → clash → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("clash"), 900);
    const t2 = setTimeout(() => setPhase("exit"),  1700);
    const t3 = setTimeout(() => onDone(),           2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`mp-intro mp-intro--${phase}`}>
      <div className="mp-intro-bg" />
      <div className="mp-intro-content">
        <div className="mp-intro-team mp-intro-team--a">
          <div className="mp-intro-logo-wrap" style={{ background: teamA.logoBg }}>
            <img
              src={teamA.logo}
              alt={teamA.short}
              className="mp-intro-logo"
              onError={e => { e.target.src = RCB_SVG; }}
            />
          </div>
          <span className="mp-intro-short" style={{ color: teamA.accent }}>{teamA.short}</span>
        </div>

        <div className="mp-intro-center">
          <span className="mp-intro-vs">VS</span>
          <div className="mp-intro-spark" />
        </div>

        <div className="mp-intro-team mp-intro-team--b">
          <div className="mp-intro-logo-wrap" style={{ background: teamB.logoBg }}>
            <img
              src={teamB.logo}
              alt={teamB.short}
              className="mp-intro-logo"
              onError={e => { e.target.src = GT_SVG; }}
            />
          </div>
          <span className="mp-intro-short" style={{ color: safeColor(teamB.color, teamB.accent) }}>{teamB.short}</span>
        </div>
      </div>
      <div className="mp-intro-tagline">IPL FINALS 2026</div>
    </div>
  );
}

// ── Prediction Meter ──────────────────────────────────────────────────────────
function PredictionMeter({ teamA, teamB, pctA, pctB, total }) {
  return (
    <div className="mp-meter-wrap">
      <div className="mp-meter-labels">
        <span className="mp-meter-pct" style={{ color: teamA.accent }}>{pctA}%</span>
        <span className="mp-votes">{total} {total === 1 ? "prediction" : "predictions"}</span>
        <span className="mp-meter-pct" style={{ color: safeColor(teamB.color, teamB.accent) }}>{pctB}%</span>
      </div>
      <div className="mp-bar">
        <div className="mp-bar-seg" style={{ width: `${pctA}%`, background: teamA.color }} />
        <div className="mp-bar-seg" style={{ width: `${pctB}%`, background: teamB.color }} />
      </div>
      <div className="mp-team-names">
        <span style={{ color: teamA.accent }}>{teamA.short}</span>
        <span style={{ color: safeColor(teamB.color, teamB.accent) }}>{teamB.short}</span>
      </div>
      <div className="mp-live-pill">● LIVE</div>
    </div>
  );
}

// ── Score Input ───────────────────────────────────────────────────────────────
function ScoreInput({ team, value, onChange, config }) {
  const [inputVal, setInputVal] = useState(String(value));
  useEffect(() => { setInputVal(String(value)); }, [value]);

  const handleTextChange = (e) => {
    setInputVal(e.target.value);
    const clamped = clamp(e.target.value, config.minScore, config.maxScore);
    if (!isNaN(parseInt(e.target.value, 10))) onChange(clamped);
  };

  const handleTextBlur = () => {
    const clamped = clamp(inputVal, config.minScore, config.maxScore);
    onChange(clamped);
    setInputVal(String(clamped));
  };

  const tc = safeColor(team.color, team.accent);

  return (
    <div className="mp-score-block">
      <div className="mp-score-team" style={{ color: tc }}>{team.short}</div>
      <div className="mp-score-input-wrap">
        <input
          className="mp-score-number"
          type="number"
          min={config.minScore}
          max={config.maxScore}
          value={inputVal}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          style={{ borderColor: tc, color: tc }}
        />
        <span className="mp-score-suffix">{config.scoreSuffix}</span>
      </div>
      <input
        className="mp-range"
        type="range"
        min={config.minScore}
        max={config.maxScore}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ "--thumb-color": tc }}
      />
      <div className="mp-range-labels">
        <span>{config.minScore}</span>
        <span>{config.maxScore}</span>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MatchPrediction() {
  const cfg = MATCH_CONFIG;

  const [showIntro,   setShowIntro]   = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [predictions, setPredictions] = useState({ total: 0, aVotes: 0 });
  const [fbError,     setFbError]     = useState(false);

  const handleIntroDone = () => {
    setShowIntro(false);
    setFormVisible(true);
  };

  useEffect(() => {
    try {
      const matchRef = query(
        ref(db, "predictions"),
        orderByChild("matchId"),
        equalTo(cfg.id)
      );
      const unsub = onValue(
        matchRef,
        (snapshot) => {
          const data = snapshot.val();
          if (!data) { setPredictions({ total: 0, aVotes: 0 }); return; }
          const votes  = Object.values(data);
          const aVotes = votes.filter(v => v.winner === "A").length;
          setPredictions({ total: votes.length, aVotes });
        },
        (err) => { console.error("Firebase read error:", err); setFbError(true); }
      );
      return () => unsub();
    } catch (err) { console.error("Firebase setup error:", err); setFbError(true); }
  }, [cfg.id]);

  const pctA = predictions.total ? Math.round((predictions.aVotes / predictions.total) * 100) : 50;
  const pctB = 100 - pctA;

  const [scoreA,    setScoreA]    = useState(cfg.defaultScore);
  const [scoreB,    setScoreB]    = useState(cfg.defaultScore);
  const [name,      setName]      = useState("");
  const [roll,      setRoll]      = useState("");
  const [winner,    setWinner]    = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!roll.trim()) { setError("Please enter your roll number."); return; }
    if (!winner)      { setError("Please pick a winner."); return; }
    setLoading(true);
    const entry = {
      name: name.trim(), roll: roll.trim(),
      scoreA, scoreB, winner,
      matchId: cfg.id, timestamp: Date.now(),
    };
    try {
      await push(ref(db, "predictions"), entry);
      setSubmitted(true);
    } catch (err) {
      console.error("Firebase write error:", err);
      setError("Could not save your prediction. Please try again.");
    } finally { setLoading(false); }
  };

  // ── Success ───────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="mp-page">
        <div className="mp-card mp-success">
          <div className="mp-success-icon">🏏</div>
          <h2>Prediction Locked!</h2>
          <p>Thanks, <strong>{name}</strong>. You predicted:</p>
          <div className="mp-success-scores">
            <div style={{ color: cfg.teamA.accent }}>{cfg.teamA.short} · {scoreA} {cfg.scoreSuffix}</div>
            <div className="mp-vs-small">vs</div>
            <div style={{ color: safeColor(cfg.teamB.color, cfg.teamB.accent) }}>{cfg.teamB.short} · {scoreB} {cfg.scoreSuffix}</div>
          </div>
          <p className="mp-winner-text">
            You picked <strong>{winner === "A" ? cfg.teamA.name : cfg.teamB.name}</strong> to win.
          </p>
          <PredictionMeter teamA={cfg.teamA} teamB={cfg.teamB} pctA={pctA} pctB={pctB} total={predictions.total} />
        </div>
      </div>
    );
  }

  // ── Intro + Main Form ─────────────────────────────────────────────────────
  return (
    <div className="mp-page">
      {showIntro && <IntroOverlay teamA={cfg.teamA} teamB={cfg.teamB} onDone={handleIntroDone} />}

      <div className={`mp-card mp-card--animate${formVisible ? " mp-card--visible" : ""}`}>

        {/* Header — exactly as original, logo added */}
        <div className="mp-header">
          <div className="mp-team-badge" style={{ background: cfg.teamA.color }}>
            {cfg.teamA.logo
              ? <img src={cfg.teamA.logo} alt={cfg.teamA.name} className="mp-logo"
                  onError={e => { e.target.src = RCB_SVG; }} />
              : <span className="mp-badge-text">{cfg.teamA.short}</span>}
          </div>
          <div className="mp-header-center">
            <div className="mp-event-label">{cfg.event}</div>
            <div className="mp-vs">VS</div>
            <div className="mp-subtitle">{cfg.subtitle}</div>
          </div>
          <div className="mp-team-badge" style={{ background: cfg.teamB.color }}>
            {cfg.teamB.logo
              ? <img src={cfg.teamB.logo} alt={cfg.teamB.name} className="mp-logo"
                  onError={e => { e.target.src = GT_SVG; }} />
              : <span className="mp-badge-text" style={{ color: cfg.teamB.textColor || "#fff" }}>{cfg.teamB.short}</span>}
          </div>
        </div>

        <div className="mp-team-fullnames">
          <span style={{ color: cfg.teamA.accent }}>{cfg.teamA.name}</span>
          <span style={{ color: safeColor(cfg.teamB.color, cfg.teamB.accent) }}>{cfg.teamB.name}</span>
        </div>

        {fbError && <div className="mp-fb-error">Could not connect to live data.</div>}
        <PredictionMeter teamA={cfg.teamA} teamB={cfg.teamB} pctA={pctA} pctB={pctB} total={predictions.total} />

        <div className="mp-divider" />

        <div className="mp-body-grid">
          {/* Left col */}
          <div className="mp-col">
            <div className="mp-section-label">WHO WINS?</div>
            <div className="mp-winner-btns">
              <button
                className={`mp-win-btn${winner === "A" ? " active" : ""}`}
                style={{ "--wc": cfg.teamA.color }}
                onClick={() => setWinner("A")}
              >{cfg.teamA.name}</button>
              {cfg.allowDraw && (
                <button
                  className={`mp-win-btn mp-draw-btn${winner === "draw" ? " active" : ""}`}
                  style={{ "--wc": "#888" }}
                  onClick={() => setWinner("draw")}
                >DRAW</button>
              )}
              <button
                className={`mp-win-btn${winner === "B" ? " active" : ""}`}
                style={{ "--wc": safeColor(cfg.teamB.color, cfg.teamB.color) }}
                onClick={() => setWinner("B")}
              >{cfg.teamB.name}</button>
            </div>

            <div className="mp-section-label" style={{ marginTop: "1.6rem" }}>YOUR DETAILS</div>
            <div className="mp-inputs">
              <input className="mp-input" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
              <input className="mp-input" placeholder="Roll Number (e.g. 22B00001)" value={roll} onChange={e => setRoll(e.target.value)} />
            </div>
          </div>

          {/* Right col */}
          <div className="mp-col">
            <div className="mp-section-label">SET THE {cfg.scoreLabel.toUpperCase()}</div>
            <div className="mp-scores-row">
              <ScoreInput team={cfg.teamA} value={scoreA} onChange={setScoreA} config={cfg} />
              <div className="mp-colon">:</div>
              <ScoreInput team={cfg.teamB} value={scoreB} onChange={setScoreB} config={cfg} />
            </div>
          </div>
        </div>

        {error && <div className="mp-error">{error}</div>}

        <button className="mp-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "LOCKING IN…" : "LOCK IN MY PREDICTION"}
        </button>

        <div className="mp-live-note">Live · updates instantly</div>
      </div>
    </div>
  );
}