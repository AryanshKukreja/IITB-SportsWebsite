import React, { useState, useEffect, useRef } from "react";
import { Trophy, Medal, Award, Flame } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import "./GC.css";

/* ============================================================
   DATA (Season 2025–26, per GC_Points_2025-26.pdf)
============================================================ */
const sportsData = {
  LawnTennis: [
    { name: "H18+6", points: 10 },
    { name: "H1+16", points: 6 },
    { name: "H3+8", points: 4 },
  ],
  Athletics: [
    { name: "H3+8", points: 20 },
    { name: "H17+9", points: 12 },
    { name: "H2+7", points: 8 },
  ],
  Crossy1: [
    { name: "H17+9", points: 10 },
    { name: "H18+6", points: 6 },
    { name: "H2+7", points: 4 },
  ],
  Crossy2: [
    { name: "H17+9", points: 10 },
    { name: "H18+6", points: 6 },
    { name: "H3+8", points: 4 },
  ],
  Aquatics: [
    { name: "H2+7", points: 10 },
    { name: "H3+8", points: 6 },
    { name: "H13", points: 4 },
  ],
  Waterpolo: [
    { name: "H2+7", points: 2 },
  ],
  Triathlon: [
    { name: "H3+8", points: 10 },
    { name: "H18+6", points: 6 },
    { name: "H13", points: 4 },
  ],
  Badminton: [
    { name: "H3+8", points: 10 },
    { name: "H2+7", points: 6 },
    { name: "H18+6", points: 4 },
  ],
  Basketball: [
    { name: "H2+7", points: 10 },
    { name: "H1+16", points: 4 },
    { name: "H14", points: 3 },
  ],
  Carrom: [
    { name: "H12", points: 10 },
    { name: "H17+9", points: 6 },
    { name: "H3+8", points: 2 },
  ],
  Chess: [
    { name: "H2+7", points: 10 },
    { name: "H18+6", points: 6 },
    { name: "H3+8", points: 4 },
  ],
  Cricket: [
    { name: "H2+7", points: 10 },
    { name: "H14", points: 6 },
    { name: "H17+9", points: 4 },
  ],
  Football: [
    { name: "H17+9", points: 6 },
    { name: "H14", points: 5 },
    { name: "H13", points: 5 },
  ],
  Hockey: [
    { name: "H18+6", points: 10 },
    { name: "H5+Tansa+H4", points: 6 },
    { name: "H3+8", points: 4 },
  ],
  KhoKho: [
    { name: "H5+Tansa+H4", points: 10 },
    { name: "H2+7", points: 6 },
    { name: "H3+8", points: 4 },
  ],
  TugofWar: [
    { name: "H13", points: 10 },
    { name: "H14", points: 6 },
    { name: "H12", points: 4 },
  ],
  Frisbee: [
    { name: "H3+8", points: 10 },
    { name: "H2+7", points: 6 },
    { name: "H1+16", points: 4 },
  ],
  Kabaddi: [
    { name: "H17+9", points: 10 },
    { name: "H5+Tansa+H4", points: 6 },
    { name: "H1+16", points: 4 },
  ],
  Squash: [
    { name: "H17+9", points: 10 },
    { name: "H5+Tansa+H4", points: 6 },
    { name: "H18+6", points: 4 },
  ],
  TableTennis: [
    { name: "H17+9", points: 10 },
    { name: "H2+7", points: 6 },
    { name: "H3+8", points: 4 },
  ],
  Volleyball: [
    { name: "H17+9", points: 10 },
    { name: "H14", points: 6 },
    { name: "H18+6", points: 4 },
  ],
  Weightlifting: [
    { name: "H2+7", points: 10 },
    { name: "H3+8", points: 6 },
    { name: "H18+6", points: 4 },
  ],
};

const girlsSportsData = {
  LawnTennis: [
    { name: "H11+21", points: 10 },
  ],
  Athletics: [
    { name: "H11+21", points: 20 },
    { name: "H10", points: 12 },
    { name: "H15B", points: 8 },
  ],
  Crossy1: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
    { name: "H15B", points: 4 },
  ],
  Crossy2: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
    { name: "H15A", points: 4 },
  ],
  Aquatics: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H11+21", points: 4 },
  ],
  Triathlon: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
  ],
  Badminton: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
    { name: "H16C", points: 4 },
  ],
  Basketball: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
    { name: "H15B", points: 4 },
  ],
  Chess: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
    { name: "H15A", points: 4 },
  ],
  Football: [
    { name: "H11+21", points: 10 },
    { name: "H10", points: 6 },
    { name: "H15A", points: 2 },
  ],
  Hockey: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
  ],
  KhoKho: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11+21", points: 4 },
  ],
  TugofWar: [
    { name: "H11+21", points: 10 },
    { name: "H10", points: 6 },
  ],
  Squash: [
    { name: "H11+21", points: 10 },
    { name: "H10", points: 6 },
  ],
  TableTennis: [
    { name: "H15B", points: 10 },
    { name: "H11+21", points: 6 },
    { name: "H10", points: 4 },
  ],
  Volleyball: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
  ],
  Weightlifting: [
    { name: "H10", points: 10 },
    { name: "H11+21", points: 6 },
  ],
};

const standings = [
  { name: "H17+9", points: 95.5 },
  { name: "H3+8", points: 85.5 },
  { name: "H2+7", points: 83 },
  { name: "H18+6", points: 67.5 },
  { name: "H5+Tansa+H4", points: 55.5 },
  { name: "H14", points: 29.16 },
  { name: "H12", points: 26.66 },
  { name: "H13", points: 25.66 },
  { name: "H1+16", points: 19.5 },
];

const girlsStandings = [
  { name: "H10", points: 140 },
  { name: "H11+21", points: 128 },
  { name: "H15B", points: 43 },
  { name: "H15A", points: 25 },
  { name: "H16C", points: 6 },
];

/* ============================================================
   INTRO CONTENT — dossier reveal frames
============================================================ */
const introSteps = [
  {
    value: 14,
    label: "Hostels",
    sub: "Fourteen houses. One campus.",
    fileTag: "§ I  ·  ROSTER",
    metaL: ["FRAME / 01", "VOL. LXVI"],
    metaR: ["EST. 1958", "POWAI"],
  },
  {
    value: 22,
    label: "Sports",
    sub: "Every arena. Every discipline.",
    fileTag: "§ II  ·  ARENA",
    metaL: ["FRAME / 02", "DISCIPLINES"],
    metaR: ["LAND · WATER", "INDOOR · OUTDOOR"],
  },
  {
    isSilencio: true,
  },
];

/* ============================================================
   HELPERS
============================================================ */
function useCountUp(target, durationMs) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    let start;
    let cancelled = false;
    const tick = (t) => {
      if (cancelled) return;
      if (start === undefined) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);
  return value;
}

function initials(name) {
  return name.replace(/[^A-Za-z0-9]/g, "").slice(0, 4);
}

/* ============================================================
   SILENCIO FRAME — kinetic payoff frame (frame 3)
============================================================ */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#§%";

function useScramble(target, active) {
  const [display, setDisplay] = useState(target);
  const ref = useRef(null);
  useEffect(() => {
    if (!active) { setDisplay(target); return; }
    let iter = 0;
    clearInterval(ref.current);
    ref.current = setInterval(() => {
      setDisplay(
        target.split("").map((c, i) => {
          if (c === " ") return " ";
          if (i < iter) return target[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      iter += 0.45;
      if (iter >= target.length) clearInterval(ref.current);
    }, 28);
    return () => clearInterval(ref.current);
  }, [target, active]);
  return display;
}

function SilencioFrame({ onWipeStart, onFinish }) {
  const [phase, setPhase] = useState("enter");
  const [scrambleActive, setScrambleActive] = useState(false);
  const gcDisplay = useScramble("TITLE", scrambleActive);
  const subDisplay = useScramble("GENERAL CHAMPIONSHIP", scrambleActive);

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;
    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = ctx.createImageData(canvas.width, canvas.height);
      const buf = new Uint32Array(img.data.buffer);
      for (let i = 0; i < buf.length; i++) {
        const v = (Math.random() * 255) | 0;
        buf[i] = (255 << 24) | (v << 16) | (v << 8) | v;
      }
      ctx.putImageData(img, 0, 0);
      frame = setTimeout(draw, 80);
    };
    draw();
    return () => clearTimeout(frame);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setScrambleActive(true), 400);
    const t2 = setTimeout(() => {
      setPhase("exit");
      onWipeStart();
    }, 2400);
    const t3 = setTimeout(() => onFinish(), 2400 + 900);
  //   const t3 = setTimeout(() => {
  //   const whoosh = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
  //   whoosh.volume = 0.5;
  //   whoosh.play().catch(() => {});
  //   onFinish();
  // }, 2400 + 900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    if (phase !== "exit") {
      setPhase("exit");
      onWipeStart();
      setTimeout(onFinish, 900);
    }
  };

  return (
    <div
      className={`gc-intro gc-silencio-frame ${phase === "exit" ? "gc-intro-wiping" : ""}`}
      onClick={skip}
      style={{ cursor: "pointer", background: "#000" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          zIndex: 0, opacity: 0.045, mixBlendMode: "screen",
        }}
      />

      <div className="gc-intro-corners" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="gc-silencio-ticker" aria-hidden="true">
        <div className="gc-silencio-ticker-inner">
          {Array(6).fill(null).map((_, i) => (
            <React.Fragment key={i}>
              <span>Inter-Hostel</span>
              <span className="gc-silencio-ticker-dot">✦</span>
              <span>General Championship</span>
              <span className="gc-silencio-ticker-dot">✦</span>
              <span>Vol. LXVI</span>
              <span className="gc-silencio-ticker-dot">✦</span>
              <span>IIT Bombay</span>
              <span className="gc-silencio-ticker-dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={`gc-silencio-stage ${phase === "enter" ? "gc-silencio-enter" : ""}`}>
        <div className="gc-silencio-eyebrow">
          <span className="gc-silencio-eyebrow-line" />
          <span>§ III · THE PRIZE</span>
          <span className="gc-silencio-eyebrow-line" />
        </div>

        <div className="gc-silencio-numeral" aria-hidden="true">1</div>

        <div className="gc-silencio-gc" aria-label="General Championship">
          {gcDisplay}
        </div>

        <div className="gc-silencio-sub">{subDisplay}</div>

        <div className="gc-silencio-meta">
          <span>14 Hostels</span>
          <span className="gc-silencio-meta-sep">·</span>
          <span>22 Sports</span>
          <span className="gc-silencio-meta-sep">·</span>
          <span>One name engraved</span>
        </div>
      </div>

      <div className="gc-intro-progress" aria-hidden="true">
        <span className="pip is-done" />
        <span className="pip is-done" />
        <span className="pip is-active" />
      </div>

      <div className="gc-silencio-ticker gc-silencio-ticker-bottom" aria-hidden="true">
        <div className="gc-silencio-ticker-inner gc-silencio-ticker-reverse">
          {Array(6).fill(null).map((_, i) => (
            <React.Fragment key={i}>
              <span>Aquatics</span><span className="gc-silencio-ticker-dot">✦</span>
              <span>Athletics</span><span className="gc-silencio-ticker-dot">✦</span>
              <span>Cricket</span><span className="gc-silencio-ticker-dot">✦</span>
              <span>Football</span><span className="gc-silencio-ticker-dot">✦</span>
              <span>Hockey</span><span className="gc-silencio-ticker-dot">✦</span>
              <span>Basketball</span><span className="gc-silencio-ticker-dot">✦</span>
              <span>Volleyball</span><span className="gc-silencio-ticker-dot">✦</span>
              <span>Chess</span><span className="gc-silencio-ticker-dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <button className="gc-intro-skip" onClick={skip}>
        Skip <span aria-hidden="true">→</span>
      </button>

      <div className="gc-intro-wipe" aria-hidden="true" />
    </div>
  );
}

/* ============================================================
   INTRO ANIMATION — Dossier teletype reveal
============================================================ */
// Dossier steps — only the first two (Hostels, Sports)
const dossierSteps = introSteps.filter((s) => !s.isSilencio);

function IntroSequence({ onDossierDone }) {
  const [stage, setStage] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) onDossierDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (wiping) {
      const t = setTimeout(onDossierDone, 900);
      return () => clearTimeout(t);
    }
    const holdTime = 1300;
    const t1 = setTimeout(() => setExiting(true), holdTime);
    const t2 = setTimeout(() => {
      if (stage < dossierSteps.length - 1) {
        setStage((s) => s + 1);
        setExiting(false);
      } else {
        // Hand off to Silencio frame — no wipe, just cut
        onDossierDone();
      }
    }, holdTime + 240);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, wiping]);

  const skip = () => {
    if (!wiping) {
      setWiping(true);
    }
  };

  const step = dossierSteps[stage];
  const count = useCountUp(step.value, 650);

  return (
    <div
      data-testid="gc-intro"
      className={`gc-intro ${wiping ? "gc-intro-wiping" : ""}`}
      onClick={skip}
    >
      <div className="gc-intro-corners" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="gc-intro-stamp" data-testid="gc-intro-stamp">
        <span className="dot" aria-hidden="true" />
        <span>Inter-Hostel · General Championship</span>
        <span>·</span>
        <span>{step.fileTag}</span>
      </div>

      {!wiping && (
        <div
          className={`gc-intro-stage ${exiting ? "is-exit" : "is-enter"}`}
        >
          <div className="gc-intro-content">
            <div className="gc-intro-meta-l">
              {step.metaL.map((line, i) => (
                <React.Fragment key={i}>
                  {i === 1 && <hr />}
                  <div>{i === 0 ? line : <strong>{line}</strong>}</div>
                </React.Fragment>
              ))}
            </div>

            <div className="gc-intro-center">
              <div className="gc-intro-number" data-testid="gc-intro-number">
                {count}
              </div>
              <div className="gc-intro-divider" />
              <div className="gc-intro-label">{step.label}</div>
              <div className="gc-intro-sub">{step.sub}</div>
            </div>

            <div className="gc-intro-meta-r">
              {step.metaR.map((line, i) => (
                <React.Fragment key={i}>
                  {i === 1 && <hr />}
                  <div>{i === 0 ? line : <strong>{line}</strong>}</div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="gc-intro-progress" aria-hidden="true">
            {introSteps.map((_, i) => (
              <span
                key={i}
                className={`pip ${
                  i === stage ? "is-active" : i < stage ? "is-done" : ""
                }`}
              />
            ))}
          </div>

          <button
            className="gc-intro-skip"
            onClick={skip}
            data-testid="gc-intro-skip-btn"
          >
            Skip Briefing <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
      <div className="gc-intro-wipe" aria-hidden="true" />
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
const GC = () => {
  const [phase, setPhase] = useState("dossier"); // dossier | silencio | wipe | done
  const [activeTab, setActiveTab] = useState("boys");
  const [selectedSport, setSelectedSport] = useState("");
  const [liveMatches, setLiveMatches] = useState([]);

  useEffect(() => {
    const matchesRef = ref(db, "gc/matches");
    const unsubscribe = onValue(matchesRef, (snapshot) => {
      const data = snapshot.val();
      const matches = data ? Object.values(data) : [];
      setLiveMatches(matches);
    });

    return () => unsubscribe();
  }, []);

  const currentSportsData = activeTab === "boys" ? sportsData : girlsSportsData;
  const currentStandings = activeTab === "boys" ? standings : girlsStandings;
  const podium = currentStandings.slice(0, 3);
  const selectedSportData = currentSportsData[selectedSport] || [];

  const rankClass = (i) =>
    i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "";

  const sportsCount = Object.keys(sportsData).length;
  const hostelsCount = 14;

  return (
    <div className="gc-root" data-testid="gc-root">
      {phase === "dossier" && (
        <IntroSequence
          onDossierDone={() => setPhase("silencio")}
        />
      )}

      {phase === "silencio" && (
        <SilencioFrame
          onWipeStart={() => setPhase("wipe")}
          onFinish={() => setPhase("done")}
        />
      )}

      <div
        className={`gc-app ${phase === "dossier" || phase === "silencio" ? "gc-app-hidden" : "gc-app-visible"}`}
        data-testid="gc-app"
      >
        {/* MASTHEAD */}
        <header className="gc-masthead" data-testid="gc-masthead">
          <div className="gc-masthead-mark">
            <span className="crest">G</span>
            <span>The General Championship&nbsp;/&nbsp;Vol. LXVI</span>
          </div>
          <div className="gc-masthead-meta">
            <span><strong>IIT Bombay</strong> · Powai</span>
            <span>Est. <strong>1958</strong></span>
            <span>Season <strong>2025–26</strong></span>
          </div>
        </header>

        {/* HERO */}
        <section className="gc-hero" data-testid="gc-hero">
          <div className="gc-hero-kicker">
            <span className="vol">Issue No. 66</span>
            <span className="sep">§</span>
            <span>An Inter-Hostel Dossier</span>
          </div>

          <div className="gc-hero-grid">
            <div>
              <h1 className="gc-hero-title">
                The <span className="italic">Inter-Hostel</span>
                <br />
                General{" "}
                <span className="underline-mark">Championship</span>.
              </h1>
              <p className="gc-hero-lede">
                Fourteen houses. Every arena on campus. One name gets etched into
                the trophy &mdash; the rest go home rewriting their story for
                next season.
              </p>
            </div>

            <aside className="gc-hero-stats" data-testid="gc-hero-stats">
              <div className="gc-hero-stat">
                <span className="k">Hostels</span>
                <span className="v">14</span>
                <span className="c">Contesting</span>
              </div>
              <div className="gc-hero-stat">
                <span className="k">Sports</span>
                <span className="v">{sportsCount}</span>
                <span className="c">Disciplines</span>
              </div>
              <div className="gc-hero-stat">
                <span className="k">Houses</span>
                <span className="v">{hostelsCount}</span>
                <span className="c">On record</span>
              </div>
              <div className="gc-hero-stat">
                <span className="k">Trophy</span>
                <span className="v"><em>I</em></span>
                <span className="c">Engraved name</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="gc-section" aria-label="Live scorecard">
          <div className="gc-eyebrow">
            <span>
              <span className="num">§ 01</span> &nbsp;·&nbsp; Live Scorecard
            </span>
            <span className="bar" />
          </div>
          <div className="gc-section-head">
            <h2 className="gc-section-title">
              Live <span className="italic">match centre</span>.
            </h2>
            <p className="gc-section-sub">
              Scores update in real time from the admin panel.
            </p>
          </div>

          {liveMatches.length === 0 ? (
            <div className="gc-table-wrap">
              <p style={{ padding: "1.5rem", textAlign: "center", color: "#c8d1ef" }}>
                No matches scheduled yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="gc-podium" style={{ marginTop: "1.2rem" }}>
              {liveMatches.map((match) => (
                <div key={match.id} className="gc-podium-card" style={{ minWidth: "220px" }}>
                  <div className="gc-podium-meta">
                    <span className="gc-podium-place">
                      <span className="ord">{(match.status || "upcoming").toUpperCase()}</span>
                    </span>
                    <span className="gc-podium-place" style={{ fontSize: "0.72rem" }}>
                      {match.sport} · {match.category}
                    </span>
                  </div>
                  <h3 style={{ margin: "0.5rem 0" }}>{match.stage}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", fontWeight: 700, fontSize: "1.1rem" }}>
                    <span>{match.teamA}</span>
                    <span>{match.scoreA ?? 0}</span>
                    <span>:</span>
                    <span>{match.scoreB ?? 0}</span>
                    <span>{match.teamB}</span>
                  </div>
                  {(match.venue || match.time) && (
                    <p style={{ marginTop: "0.8rem", color: "#dfe7ff", fontSize: "0.82rem" }}>
                      {match.venue || "Venue TBD"} · {match.time || "Time TBD"}
                    </p>
                  )}
                  {match.liveUpdates && (
                    <div style={{ marginTop: "0.8rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "0.8rem" }}>
                      {Object.values(match.liveUpdates)
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .slice(0, 2)
                        .map((update, idx) => (
                          <p key={idx} style={{ margin: "0.25rem 0", fontSize: "0.8rem", color: "#dfe7ff" }}>
                            {new Date(update.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })} · {update.message}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* TABS */}
        <div className="gc-eyebrow">
          <span><span className="num">§ 02</span> &nbsp;·&nbsp; Category</span>
          <span className="bar" />
        </div>
        <nav
          className="gc-tabs"
          aria-label="General Championship category"
          data-testid="gc-tabs"
        >
          <button
            data-testid="gc-tab-boys"
            className={`gc-tab ${activeTab === "boys" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("boys");
              setSelectedSport("");
            }}
          >
            <span className="idx">A.</span>Boys&rsquo; GC
          </button>
          <button
            data-testid="gc-tab-girls"
            className={`gc-tab ${activeTab === "girls" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("girls");
              setSelectedSport("");
            }}
          >
            <span className="idx">B.</span>Girls&rsquo; GC
          </button>
        </nav>

        {/* PODIUM */}
        <section className="gc-section" aria-label="Top three overall">
          <div className="gc-eyebrow">
            <span>
              <span className="num">§ 02</span> &nbsp;·&nbsp; The Podium
            </span>
            <span className="bar" />
          </div>
          <div className="gc-section-head">
            <h2 className="gc-section-title">
              Who&rsquo;s <span className="italic">leading</span>.
            </h2>
            <p className="gc-section-sub">
              The three names making the rest of the table chase shadows.
            </p>
          </div>

          <div className="gc-podium" data-testid="gc-podium">
            <div className="gc-podium-card rank-gold" data-testid="gc-podium-1">
              <div className="gc-podium-meta">
                <span className="gc-podium-place">
                  <span className="ord">01</span> Champion
                </span>
                <Trophy className="gc-podium-icon" size={22} strokeWidth={1.5} />
              </div>
              <h3>{podium[0]?.name}</h3>
              <p>
                <strong>{podium[0]?.points}</strong> pts &nbsp;·&nbsp; leader
              </p>
              <div className="gc-podium-meta">
                <span className="gc-emblem">{initials(podium[0]?.name || "")}</span>
              </div>
            </div>

            <div className="gc-podium-card rank-silver" data-testid="gc-podium-2">
              <div className="gc-podium-meta">
                <span className="gc-podium-place">
                  <span className="ord">02</span> Runner-up
                </span>
                <Medal className="gc-podium-icon" size={20} strokeWidth={1.5} />
              </div>
              <h3>{podium[1]?.name}</h3>
              <p>
                <strong>{podium[1]?.points}</strong> pts
              </p>
              <div className="gc-podium-meta">
                <span className="gc-emblem">{initials(podium[1]?.name || "")}</span>
              </div>
            </div>

            {podium[2] ? (
              <div className="gc-podium-card rank-bronze" data-testid="gc-podium-3">
                <div className="gc-podium-meta">
                  <span className="gc-podium-place">
                    <span className="ord">03</span> Third
                  </span>
                  <Award className="gc-podium-icon" size={20} strokeWidth={1.5} />
                </div>
                <h3>{podium[2].name}</h3>
                <p>
                  <strong>{podium[2].points}</strong> pts
                </p>
                <div className="gc-podium-meta">
                  <span className="gc-emblem">{initials(podium[2].name)}</span>
                </div>
              </div>
            ) : (
              <div className="gc-podium-card" />
            )}
          </div>
        </section>

        {/* STANDINGS TABLE */}
        <section className="gc-section" data-testid="gc-standings-section">
          <div className="gc-eyebrow">
            <span>
              <span className="num">§ 03</span> &nbsp;·&nbsp; The Ledger
            </span>
            <span className="bar" />
          </div>
          <div className="gc-section-head">
            <h2 className="gc-section-title">
              Overall <span className="italic">standings</span>.
            </h2>
            <p className="gc-section-sub">
              Every house, every point. Read it like the morning paper.
            </p>
          </div>

          <div className="gc-table-wrap">
            <table className="gc-table" data-testid="gc-standings-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Hostel</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {currentStandings.map((hostel, index) => (
                  <tr
                    key={hostel.name}
                    className={rankClass(index)}
                    data-testid={`gc-standing-row-${index}`}
                  >
                    <td>
                      <span className="gc-rank-pill">
                        <span className="n">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </span>
                    </td>
                    <td>
                      <span className="gc-hostel-cell">
                        <span className="gc-emblem gc-emblem-sm">
                          {initials(hostel.name)}
                        </span>
                        <span>{hostel.name}</span>
                      </span>
                    </td>
                    <td className="gc-points">{hostel.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {activeTab === "boys" && (
          <>
            {/* SPORT SELECTOR */}
            <section
              className="gc-section gc-sport-select"
              data-testid="gc-sport-select-section"
            >
              <div className="gc-eyebrow">
                <span>
                  <span className="num">§ 04</span> &nbsp;·&nbsp; Sport-wise
                </span>
                <span className="bar" />
              </div>
              <div className="gc-section-head">
                <h2 className="gc-section-title">
                  Pick a <span className="italic">battleground</span>.
                </h2>
                <p className="gc-section-sub">
                  Drill into a single discipline to see who came out on top.
                </p>
              </div>

              <div className="gc-select-wrap">
                <label className="gc-select-label" htmlFor="gc-sport-select">
                  Select discipline
                </label>
                <select
                  id="gc-sport-select"
                  data-testid="gc-sport-select"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="gc-select"
                  aria-label="Select a sport"
                >
                  <option value="">— Choose a sport —</option>
                  {Object.keys(currentSportsData).map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            {/* SPORT RESULTS */}
            {selectedSport && (
              <section
                className="gc-section gc-sport-results"
                data-testid="gc-sport-results"
              >
                <div className="gc-eyebrow">
                  <span>
                    <span className="num">§ 05</span> &nbsp;·&nbsp; Result Card
                  </span>
                  <span className="bar" />
                </div>
                <div className="gc-section-head">
                  <h2 className="gc-section-title">
                    <Flame size={26} strokeWidth={1.6} />
                    <span>{selectedSport}</span>
                  </h2>
                  <p className="gc-section-sub">
                    Filed under {selectedSport.toLowerCase()} &mdash; the verdict.
                  </p>
                </div>

                <div className="gc-podium gc-podium-sport">
                  {selectedSportData.length > 0 && (
                    <div className="gc-podium-card rank-gold">
                      <div className="gc-podium-meta">
                        <span className="gc-podium-place">
                          <span className="ord">01</span> Winner
                        </span>
                        <Trophy size={20} strokeWidth={1.5} className="gc-podium-icon" />
                      </div>
                      <h3>{selectedSportData[0].name}</h3>
                      <p>
                        <strong>{selectedSportData[0].points}</strong> pts
                      </p>
                    </div>
                  )}

                  {selectedSportData.length > 1 && (
                    <div className="gc-podium-card rank-silver">
                      <div className="gc-podium-meta">
                        <span className="gc-podium-place">
                          <span className="ord">02</span> Second
                        </span>
                        <Medal size={20} strokeWidth={1.5} className="gc-podium-icon" />
                      </div>
                      <h3>{selectedSportData[1].name}</h3>
                      <p>
                        <strong>{selectedSportData[1].points}</strong> pts
                      </p>
                    </div>
                  )}

                  {selectedSportData.length > 2 ? (
                    <div className="gc-podium-card rank-bronze">
                      <div className="gc-podium-meta">
                        <span className="gc-podium-place">
                          <span className="ord">03</span> Third
                        </span>
                        <Award size={20} strokeWidth={1.5} className="gc-podium-icon" />
                      </div>
                      <h3>{selectedSportData[2].name}</h3>
                      <p>
                        <strong>{selectedSportData[2].points}</strong> pts
                      </p>
                    </div>
                  ) : (
                    <div className="gc-podium-card" />
                  )}
                </div>

                <div className="gc-table-wrap">
                  <table className="gc-table gc-table-sport">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Hostel</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSportData.map((hostel, index) => (
                        <tr key={hostel.name} className={rankClass(index)}>
                          <td>
                            <span className="gc-rank-pill">
                              <span className="n">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </span>
                          </td>
                          <td>
                            <span className="gc-hostel-cell">
                              <span className="gc-emblem gc-emblem-sm">
                                {initials(hostel.name)}
                              </span>
                              <span>{hostel.name}</span>
                            </span>
                          </td>
                          <td className="gc-points">{hostel.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}

        {/* FOOTER */}
        {/* <footer className="gc-footer" data-testid="gc-footer">
          <span className="colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay · Inter-Hostel · § Vol. LXVI · {new Date().getFullYear()}</span>
          <span>Print / Digital · Final Edition</span>
        </footer> */}
      </div>
    </div>
  );
};

export default GC;