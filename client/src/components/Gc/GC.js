
import React, { useState, useEffect } from "react";
import { Trophy, Medal, Award, Flame } from "lucide-react";
import "./GC.css";

/* ============================================================
   DATA
============================================================ */
const sportsData = {
  Aquatics: [
    { name: "H3", points: 10 },
    { name: "H18", points: 6 },
    { name: "H2", points: 4 },
  ],
  Athletics: [
    { name: "H2", points: 20 },
    { name: "H3", points: 12 },
    { name: "H5", points: 8 },
  ],
  Badminton: [
    { name: "H6", points: 10 },
    { name: "H2", points: 6 },
    { name: "H3", points: 4 },
  ],
  Basketball: [
    { name: "H2", points: 10 },
    { name: "H13-14", points: 6 },
    { name: "H5", points: 4 },
  ],
  Carrom: [
    { name: "H12", points: 10 },
    { name: "H1,16", points: 6 },
    { name: "H6", points: 4 },
  ],
  Chess: [
    { name: "H6", points: 10 },
    { name: "H2", points: 6 },
    { name: "H9", points: 4 },
  ],
  Cricket: [
    { name: "H18", points: 10 },
    { name: "H2", points: 6 },
    { name: "H5", points: 4 },
  ],
  Football: [
    { name: "H2", points: 10 },
    { name: "H3", points: 6 },
  ],
  Hockey: [
    { name: "H5", points: 10 },
    { name: "H12,14", points: 6 },
    { name: "H3", points: 4 },
  ],
  KhoKho: [
    { name: "H3", points: 10 },
    { name: "H5", points: 6 },
    { name: "H2", points: 4 },
  ],
  LawnTennis: [
    { name: "H3", points: 10 },
    { name: "H6", points: 6 },
    { name: "H1,16", points: 4 },
  ],
  Squash: [
    { name: "H5", points: 10 },
    { name: "H6", points: 6 },
    { name: "H18", points: 4 },
  ],
  TableTennis: [
    { name: "H9", points: 10 },
    { name: "H1-16", points: 6 },
    { name: "H2", points: 4 },
  ],
  Triathlon: [
    { name: "H18", points: 10 },
    { name: "H9", points: 6 },
    { name: "H5", points: 4 },
  ],
  TugofWar: [
    { name: "H18", points: 10 },
    { name: "H14", points: 6 },
    { name: "H13", points: 4 },
  ],
  Volleyball: [
    { name: "H9", points: 10 },
    { name: "H3", points: 6 },
    { name: "H12", points: 4 },
  ],
  Waterpolo: [
    { name: "H2", points: 10 },
    { name: "H6", points: 6 },
    { name: "H3", points: 4 },
  ],
  Weightlifting: [
    { name: "H2", points: 10 },
    { name: "H6", points: 6 },
    { name: "H18", points: 4 },
  ],
};

const girlsSportsData = {
  Aquatics: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 },
  ],
  Athletics: [
    { name: "H15A", points: 20 },
    { name: "H10", points: 12 },
    { name: "H11", points: 8 },
  ],
  Badminton: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11", points: 4 },
  ],
  Basketball: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 },
  ],
  Carrom: [
    { name: "H11", points: 10 },
    { name: "H10", points: 6 },
    { name: "H15A", points: 4 },
  ],
  Chess: [
    { name: "H15A", points: 10 },
    { name: "H10", points: 6 },
    { name: "H15B", points: 4 },
  ],
  Cricket: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11", points: 4 },
  ],
  Football: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
  ],
  Hockey: [
    { name: "H11", points: 10 },
    { name: "H15B", points: 6 },
    { name: "H10", points: 4 },
  ],
  KhoKho: [
    { name: "H10", points: 10 },
    { name: "H11", points: 6 },
    { name: "H15A", points: 4 },
  ],
  LawnTennis: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 },
  ],
  Squash: [
    { name: "H11", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 },
  ],
  TableTennis: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11", points: 4 },
  ],
  Volleyball: [
    { name: "H15B", points: 10 },
    { name: "H10", points: 6 },
    { name: "H11", points: 4 },
  ],
  Waterpolo: [
    { name: "H10", points: 10 },
    { name: "H15A", points: 6 },
    { name: "H15B", points: 4 },
  ],
};

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

const girlsStandings = [
  { name: "H10", points: 116 },
  { name: "H15B", points: 100 },
  { name: "H15A", points: 62 },
  { name: "H11", points: 56 },
];

/* ============================================================
   INTRO CONTENT — dossier reveal frames
============================================================ */
const introSteps = [
  {
    value: 12,
    label: "Hostels",
    sub: "Twelve houses. One campus.",
    fileTag: "§ I  ·  ROSTER",
    metaL: ["FRAME / 01", "VOL. LXVI"],
    metaR: ["EST. 1958", "POWAI"],
  },
  {
    value: 14,
    label: "Sports",
    sub: "Every arena. Every discipline.",
    fileTag: "§ II  ·  ARENA",
    metaL: ["FRAME / 02", "DISCIPLINES"],
    metaR: ["LAND · WATER", "INDOOR · OUTDOOR"],
  },
  {
    value: 1,
    label: "Trophy",
    sub: "Only one name gets engraved.",
    isTrophy: true,
    fileTag: "§ III  ·  THE PRIZE",
    metaL: ["FRAME / 03", "FINAL"],
    metaR: ["GENERAL", "CHAMPIONSHIP"],
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
   INTRO ANIMATION — Dossier teletype reveal
============================================================ */
function IntroSequence({ onWipeStart, onFinish }) {
  const [stage, setStage] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onWipeStart();
      onFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (wiping) {
      const t = setTimeout(onFinish, 900);
      return () => clearTimeout(t);
    }
    const holdTime = stage === 2 ? 1700 : 1300;
    const t1 = setTimeout(() => setExiting(true), holdTime);
    const t2 = setTimeout(() => {
      if (stage < introSteps.length - 1) {
        setStage((s) => s + 1);
        setExiting(false);
      } else {
        setWiping(true);
        onWipeStart();
      }
    }, holdTime + 240);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, wiping]);

  const skip = () => {
    if (!wiping) {
      setWiping(true);
      onWipeStart();
    }
  };

  const step = introSteps[stage];
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
          className={`gc-intro-stage ${exiting ? "is-exit" : "is-enter"} ${
            step.isTrophy ? "is-trophy" : ""
          }`}
        >
          <div className="gc-intro-content">
            <div className="gc-intro-meta-l">
              {step.metaL.map((line, i) => (
                <React.Fragment key={i}>
                  {i === 1 && <hr />}
                  <div>
                    {i === 0 ? line : <strong>{line}</strong>}
                  </div>
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
                  <div>
                    {i === 0 ? line : <strong>{line}</strong>}
                  </div>
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
  const [phase, setPhase] = useState("intro"); // intro | wipe | done
  const [activeTab, setActiveTab] = useState("boys");
  const [selectedSport, setSelectedSport] = useState("");

  const currentSportsData = activeTab === "boys" ? sportsData : girlsSportsData;
  const currentStandings = activeTab === "boys" ? standings : girlsStandings;
  const podium = currentStandings.slice(0, 3);
  const selectedSportData = currentSportsData[selectedSport] || [];

  const rankClass = (i) =>
    i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "";

  const sportsCount = Object.keys(sportsData).length;
  const hostelsCount = 18;

  return (
    <div className="gc-root" data-testid="gc-root">
      {phase !== "done" && (
        <IntroSequence
          onWipeStart={() => setPhase("wipe")}
          onFinish={() => setPhase("done")}
        />
      )}

      <div
        className={`gc-app ${phase === "intro" ? "gc-app-hidden" : "gc-app-visible"}`}
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
            <span>Season <strong>2024–25</strong></span>
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
                Twelve houses. Every arena on campus. One name gets etched into
                the trophy &mdash; the rest go home rewriting their story for
                next season.
              </p>
            </div>

            <aside className="gc-hero-stats" data-testid="gc-hero-stats">
              <div className="gc-hero-stat">
                <span className="k">Hostels</span>
                <span className="v">12</span>
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

        {/* TABS */}
        <div className="gc-eyebrow">
          <span><span className="num">§ 01</span> &nbsp;·&nbsp; Category</span>
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
        <footer className="gc-footer" data-testid="gc-footer">
          <span className="colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay · Inter-Hostel · § Vol. LXVI · {new Date().getFullYear()}</span>
          <span>Print / Digital · Final Edition</span>
        </footer>
      </div>
    </div>
  );
};

export default GC;
