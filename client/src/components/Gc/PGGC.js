import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Medal, Award } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import {
  PGGC_DB_PATH,
  PGGC_SEED,
  normalisePggc,
  rankDepartments,
  sportLeaders,
} from "./pggcData";
import "./GC.css";
import "./PGGC.css";

function initials(name) {
  return name.replace(/[^A-Za-z0-9]/g, "").slice(0, 4);
}

function formatPoints(n) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

/**
 * Placement highlight for a sport column: distinct scores above the
 * participation point (1) are ranked, and the top four get a class.
 */
function placementMap(departments, sportKey) {
  const distinct = [
    ...new Set(
      departments
        .map((d) => Number(d.scores?.[sportKey]) || 0)
        .filter((v) => v > 1)
    ),
  ].sort((a, b) => b - a);
  const classes = ["place-1", "place-2", "place-3", "place-4"];
  return Object.fromEntries(distinct.slice(0, 4).map((v, i) => [v, classes[i]]));
}

const PGGC = () => {
  // status: loading | live | snapshot (DB empty / unreachable → PDF seed)
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(PGGC_SEED);
  const [view, setView] = useState("overall"); // overall | breakdown

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, PGGC_DB_PATH),
      (snapshot) => {
        const live = normalisePggc(snapshot.val());
        if (live) {
          setData(live);
          setStatus("live");
        } else {
          setData(PGGC_SEED);
          setStatus("snapshot");
        }
      },
      () => setStatus("snapshot")
    );
    return () => unsubscribe();
  }, []);

  const { sports, departments } = data;
  const ranked = useMemo(() => rankDepartments(departments, sports), [departments, sports]);
  const placements = useMemo(
    () => Object.fromEntries(sports.map((s) => [s.key, placementMap(departments, s.key)])),
    [departments, sports]
  );
  const podium = ranked.slice(0, 3);
  const totalPoints = ranked.reduce((acc, d) => acc + d.total, 0);

  const rankClass = (rank) =>
    rank === 1 ? "rank-gold" : rank === 2 ? "rank-silver" : rank === 3 ? "rank-bronze" : "";

  const podiumMeta = [
    { cls: "rank-gold", label: "Leader", Icon: Trophy },
    { cls: "rank-silver", label: "Second", Icon: Medal },
    { cls: "rank-bronze", label: "Third", Icon: Award },
  ];

  return (
    <div className="gc-root pggc-root" data-testid="pggc-root">
      <div className="gc-app gc-app-visible">
        {/* MASTHEAD */}
        <header className="gc-masthead">
          <div className="gc-masthead-mark">
            <span className="crest">P</span>
            <span>The PG General Championship</span>
          </div>
          <div className="gc-masthead-meta">
            <span><strong>IIT Bombay</strong> · Powai</span>
            <span>Season <strong>2026–27</strong></span>
            <Link to="/GC" className="pggc-switch">Inter-Hostel GC →</Link>
          </div>
        </header>

        {/* HERO */}
        <section className="gc-hero">
          <div className="gc-hero-kicker">
            <span className="vol">Season 2026–27</span>
            <span className="sep">·</span>
            <span>Inter-Department Standings</span>
          </div>

          <div className="gc-hero-grid">
            <div>
              <h1 className="gc-hero-title">
                The <span className="italic">Post-Graduate</span>
                <br />
                General <span className="underline-mark">Championship</span>
              </h1>
              <p className="gc-hero-lede">
                Departments and centres across campus compete for the PG
                General Championship. Points are added as each sport finishes.
              </p>
            </div>

            <aside className="gc-hero-stats">
              <div className="gc-hero-stat">
                <span className="k">Departments</span>
                <span className="v">{departments.length}</span>
                <span className="c">On the table</span>
              </div>
              <div className="gc-hero-stat">
                <span className="k">Sports</span>
                <span className="v">{sports.length}</span>
                <span className="c">Concluded</span>
              </div>
              <div className="gc-hero-stat">
                <span className="k">Leader</span>
                <span className="v pggc-stat-name">{podium[0]?.name || "—"}</span>
                <span className="c">{podium[0] ? `${formatPoints(podium[0].total)} pts` : ""}</span>
              </div>
              <div className="gc-hero-stat">
                <span className="k">Points</span>
                <span className="v">{formatPoints(totalPoints)}</span>
                <span className="c">Awarded so far</span>
              </div>
            </aside>
          </div>
        </section>

        {/* PODIUM */}
        <section className="gc-section" aria-label="Top three departments">
          <div className="gc-eyebrow">
            <span>The Podium</span>
            <span className="bar" />
          </div>
          <div className="gc-section-head">
            <h2 className="gc-section-title">
              Who&rsquo;s <span className="italic">leading</span>
            </h2>
            <p className="gc-section-sub">The top three departments right now</p>
          </div>

          <div className="gc-podium">
            {podiumMeta.map(({ cls, label, Icon }, i) =>
              podium[i] ? (
                <div key={cls} className={`gc-podium-card ${cls}`}>
                  <div className="gc-podium-meta">
                    <span className="gc-podium-place">
                      <span className="ord">{String(podium[i].rank).padStart(2, "0")}</span> {label}
                    </span>
                    <Icon className="gc-podium-icon" size={20} strokeWidth={1.5} />
                  </div>
                  <h3>{podium[i].name}</h3>
                  <p><strong>{formatPoints(podium[i].total)}</strong> pts</p>
                  <div className="gc-podium-meta">
                    <span className="gc-emblem">{initials(podium[i].name)}</span>
                  </div>
                </div>
              ) : (
                <div key={cls} className="gc-podium-card" />
              )
            )}
          </div>
        </section>

        {/* LIVE STANDINGS */}
        <section className="gc-section" aria-label="Live standings" data-testid="pggc-standings-section">
          <div className="gc-eyebrow">
            <span>Live Standings</span>
            <span className="bar" />
          </div>
          <div className="gc-section-head">
            <h2 className="gc-section-title">
              The <span className="italic">points table</span>
            </h2>
            <div className="pggc-status-wrap">
              <span className={`pggc-status is-${status}`}>
                <span className="dot" aria-hidden="true" />
                {status === "live" ? "Live" : status === "loading" ? "Connecting…" : "Snapshot"}
              </span>
              {status === "live" && data.updatedAt && (
                <span className="pggc-updated">
                  Updated{" "}
                  {new Date(data.updatedAt).toLocaleString([], {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>

          <nav className="gc-tabs" aria-label="Standings view">
            <button
              className={`gc-tab ${view === "overall" ? "is-active" : ""}`}
              onClick={() => setView("overall")}
            >
              <span className="idx">A.</span>Overall
            </button>
            <button
              className={`gc-tab ${view === "breakdown" ? "is-active" : ""}`}
              onClick={() => setView("breakdown")}
            >
              <span className="idx">B.</span>Sport-wise
            </button>
          </nav>

          <div className="gc-table-wrap">
            <table
              className={`gc-table pggc-table ${view === "breakdown" ? "is-breakdown" : ""}`}
              data-testid="pggc-standings-table"
            >
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Department / Centre</th>
                  {view === "breakdown" &&
                    sports.map((s) => (
                      <th key={s.key} className="pggc-sport-col">{s.label}</th>
                    ))}
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((dept) => (
                  <tr key={dept.name} className={rankClass(dept.rank)}>
                    <td>
                      <span className="gc-rank-pill">
                        <span className="n">{String(dept.rank).padStart(2, "0")}</span>
                      </span>
                    </td>
                    <td>
                      <span className="gc-hostel-cell">
                        <span className="gc-emblem gc-emblem-sm">{initials(dept.name)}</span>
                        <span>{dept.name}</span>
                      </span>
                    </td>
                    {view === "breakdown" &&
                      sports.map((s) => {
                        const v = Number(dept.scores?.[s.key]) || 0;
                        return (
                          <td key={s.key} className="pggc-sport-col">
                            <span className={`pggc-cell ${placements[s.key][v] || ""}`}>
                              {formatPoints(v)}
                            </span>
                          </td>
                        );
                      })}
                    <td className="gc-points">{formatPoints(dept.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {view === "breakdown" && (
            <div className="pggc-legend" aria-label="Legend">
              <span><i className="pggc-cell place-1" /> Winner</span>
              <span><i className="pggc-cell place-2" /> Runner-up</span>
              <span><i className="pggc-cell place-3" /> Third</span>
              <span><i className="pggc-cell place-4" /> Fourth</span>
            </div>
          )}
        </section>

        {/* SPORT WINNERS */}
        <section className="gc-section" aria-label="Sport-wise winners">
          <div className="gc-eyebrow">
            <span>Results so far</span>
            <span className="bar" />
          </div>
          <div className="gc-section-head">
            <h2 className="gc-section-title">
              Sport-wise <span className="italic">winners</span>
            </h2>
            <p className="gc-section-sub">Top three in every sport played so far</p>
          </div>

          <div className="pggc-sport-grid">
            {sports.map((s) => {
              const leaders = sportLeaders(departments, s.key);
              return (
                <div key={s.key} className="pggc-sport-card">
                  <h3>{s.label}</h3>
                  <ol>
                    {leaders.map((l, i) => (
                      <li key={l.name}>
                        <span className="pos">{String(i + 1).padStart(2, "0")}</span>
                        <span className="name">{l.name}</span>
                        <span className="pts">{formatPoints(l.points)}</span>
                      </li>
                    ))}
                    {leaders.length === 0 && <li className="empty">Results awaited</li>}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PGGC;
