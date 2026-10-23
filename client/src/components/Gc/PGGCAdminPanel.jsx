import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { ref, set, onValue } from "firebase/database";
import { Plus, Trash2, RefreshCw } from "lucide-react";
import { PGGC_DB_PATH, PGGC_SEED, normalisePggc, departmentTotal } from "./pggcData";

const EMPTY = { sports: [], departments: [] };

export default function PGGCAdminPanel({ triggerAlert }) {
  const [data, setData] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [hasRemoteData, setHasRemoteData] = useState(false);
  const [dirty, setDirtyState] = useState(false);
  const dirtyRef = useRef(false);
  const setDirty = (value) => {
    dirtyRef.current = value;
    setDirtyState(value);
  };

  useEffect(() => {
    const unsub = onValue(ref(db, PGGC_DB_PATH), (snapshot) => {
      const live = normalisePggc(snapshot.val());
      setHasRemoteData(Boolean(live));
      // Don't clobber unsaved local edits with incoming snapshots
      if (!dirtyRef.current) setData(live || EMPTY);
      setLoaded(true);
    });
    return () => unsub();
  }, []);

  const edit = (next) => {
    setData(next);
    setDirty(true);
  };

  const setScore = (deptIdx, sportKey, value) => {
    const departments = data.departments.map((d, i) =>
      i === deptIdx ? { ...d, scores: { ...d.scores, [sportKey]: value } } : d
    );
    edit({ ...data, departments });
  };

  const setDeptName = (deptIdx, name) => {
    const departments = data.departments.map((d, i) => (i === deptIdx ? { ...d, name } : d));
    edit({ ...data, departments });
  };

  const addDepartment = () => {
    edit({ ...data, departments: [...data.departments, { name: "", scores: {} }] });
  };

  const removeDepartment = (deptIdx) => {
    const name = data.departments[deptIdx].name || "this row";
    if (!window.confirm(`Remove ${name} from the PGGC table?`)) return;
    edit({ ...data, departments: data.departments.filter((_, i) => i !== deptIdx) });
  };

  const addSport = () => {
    const label = window.prompt("Sport name (e.g. Badminton (Boys)):");
    if (!label || !label.trim()) return;
    const key = `s${Date.now().toString(36)}`;
    edit({ ...data, sports: [...data.sports, { key, label: label.trim() }] });
  };

  const renameSport = (sportIdx, label) => {
    const sports = data.sports.map((s, i) => (i === sportIdx ? { ...s, label } : s));
    edit({ ...data, sports });
  };

  const removeSport = (sportIdx) => {
    const sport = data.sports[sportIdx];
    if (!window.confirm(`Remove the "${sport.label}" column and all its points?`)) return;
    const departments = data.departments.map((d) => {
      const { [sport.key]: _removed, ...rest } = d.scores || {};
      return { ...d, scores: rest };
    });
    edit({ sports: data.sports.filter((_, i) => i !== sportIdx), departments });
  };

  const save = async () => {
    const sports = data.sports.map((s) => ({ key: s.key, label: s.label.trim() || "Untitled" }));
    const names = new Set();
    for (const d of data.departments) {
      const n = d.name.trim();
      if (!n) return triggerAlert("error", "Every department needs a name.");
      if (names.has(n.toLowerCase())) return triggerAlert("error", `Duplicate department: ${n}`);
      names.add(n.toLowerCase());
    }
    const departments = data.departments.map((d) => ({
      name: d.name.trim(),
      scores: Object.fromEntries(sports.map((s) => [s.key, parseFloat(d.scores?.[s.key]) || 0])),
    }));
    try {
      await set(ref(db, PGGC_DB_PATH), { sports, departments, updatedAt: Date.now() });
      setDirty(false);
      triggerAlert("success", "PGGC table saved — live page updated.");
    } catch (err) {
      triggerAlert("error", "Save failed: " + err.message);
    }
  };

  const discard = () => {
    setDirty(false);
    onValue(ref(db, PGGC_DB_PATH), (s) => setData(normalisePggc(s.val()) || EMPTY), { onlyOnce: true });
  };

  const loadSeed = () => {
    if (
      hasRemoteData &&
      !window.confirm("Replace the current table with the 2026-27 points sheet? (Not saved until you click Save.)")
    )
      return;
    edit(PGGC_SEED);
  };

  if (!loaded) return <div className="gc-admin-card full-width-card">Loading PGGC table…</div>;

  return (
    <div className="gc-admin-card full-width-card">
      <div className="card-header-with-tabs">
        <h2>PGGC Points Table</h2>
        <button className="gc-admin-btn outline" onClick={loadSeed}>
          <RefreshCw size={16} /> Load 2026-27 sheet
        </button>
      </div>
      <p className="pggc-admin-hint">
        Enter each department&rsquo;s points per sport. Totals and ranks are calculated
        automatically. Changes go live on <code>/PGGC</code> when you click Save.
        {!hasRemoteData && " The database is empty — the public page is showing the built-in sheet until you save."}
      </p>

      <div className="standings-edit-table-wrap">
        <table className="admin-edit-table pggc-admin-table">
          <thead>
            <tr>
              <th>Department / Centre</th>
              {data.sports.map((s, i) => (
                <th key={s.key}>
                  <div className="pggc-admin-sport-head">
                    <input
                      className="table-input"
                      value={s.label}
                      onChange={(e) => renameSport(i, e.target.value)}
                      aria-label="Sport name"
                    />
                    <button
                      className="action-btn delete"
                      onClick={() => removeSport(i)}
                      title={`Remove ${s.label}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </th>
              ))}
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.departments.map((d, di) => (
              <tr key={di}>
                <td>
                  <input
                    className="table-input"
                    value={d.name}
                    onChange={(e) => setDeptName(di, e.target.value)}
                    placeholder="e.g. Civil"
                  />
                </td>
                {data.sports.map((s) => (
                  <td key={s.key}>
                    <input
                      type="number"
                      step="0.5"
                      className="table-input pggc-admin-score"
                      value={d.scores?.[s.key] ?? ""}
                      onChange={(e) => setScore(di, s.key, e.target.value)}
                      placeholder="0"
                    />
                  </td>
                ))}
                <td className="pggc-admin-total">{departmentTotal(d, data.sports)}</td>
                <td>
                  <button className="action-btn delete" onClick={() => removeDepartment(di)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {data.departments.length === 0 && (
              <tr>
                <td colSpan={data.sports.length + 3} className="empty-row-msg">
                  No departments yet. Click &ldquo;Load 2026-27 sheet&rdquo; to start from the official table.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card-actions">
        <button className="gc-admin-btn outline" onClick={addDepartment}>
          <Plus size={16} /> Add Department
        </button>
        <button className="gc-admin-btn outline" onClick={addSport}>
          <Plus size={16} /> Add Sport
        </button>
        {dirty && (
          <button className="gc-admin-btn outline" onClick={discard}>
            Discard changes
          </button>
        )}
        <button className="gc-admin-btn primary" onClick={save} disabled={!dirty}>
          {dirty ? "Save PGGC Table" : "Saved"}
        </button>
      </div>
    </div>
  );
}
