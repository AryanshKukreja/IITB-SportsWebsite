/* ============================================================
   PGGC (Post-Graduate General Championship) — shared data
   Firebase RTDB layout:
     pggc/sports       [{ key, label }]          column order
     pggc/departments  [{ name, scores: { [sportKey]: number } }]
     pggc/updatedAt    ms timestamp
   Totals are always derived from scores, never stored.
============================================================ */

export const PGGC_DB_PATH = "pggc";

// Season 2026–27, per "PGGC 2026-27 Points Table"
export const PGGC_SEED = {
  sports: [
    { key: "ttBoys", label: "TT Boys" },
    { key: "ttGirls", label: "TT Girls" },
    { key: "chessMixed", label: "Chess (Mixed)" },
    { key: "carromBoys", label: "Carrom (Boys)" },
    { key: "carromGirls", label: "Carrom (Girls)" },
    { key: "squashBoys", label: "Squash (Boys)" },
  ],
  departments: [
    ["ADCPS", 0, 0, 0, 0, 0, 0],
    ["Aerospace", 1, 1, 1, 1, 1, 1],
    ["BSBE", 1, 5, 1, 1, 1, 1.5],
    ["C-MInDS", 1, 0, 5, 1, 1, 0],
    ["C-TARA", 1, 1, 1, 1, 3, 1],
    ["CCS", 1, 3, 1, 1, 1, 1],
    ["CET", 1, 0, 1, 1, 0, 0],
    ["CSIF", 0.5, 0, 0.5, 0.5, 0, 0],
    ["Chemical", 1, 0.5, 1, 7, 1, 0],
    ["Chemistry", 1, 0, 1, 0, 0, 0],
    ["Civil", 1, 10, 7, 1, 10, 1],
    ["CSE", 1, 0.5, 1, 1, 1, 1],
    ["CSRE", 1, 0, 1, 1, 7, 1],
    ["DSSE", 0, 0, 0, 0, 0, 0],
    ["Earth Science", 3, 7, 1, 0, 1, 0],
    ["Economics", 0, 0, 1, 0, 0, 0],
    ["Electrical", 5, 0, 1, 3, 1, 1],
    ["DESE", 1, 0, 1, 1, 0, 1],
    ["ESED", 1, 0, 10, 1, 0, 0],
    ["HSS", 1, 1, 1, 0, 1, 0],
    ["IDC", 0, 0, 1, 0, 0, 0],
    ["IEOR", 1, 0, 1, 1, 5, 0],
    ["KCDH", 0, 0, 0.5, 0.5, 0, 0],
    ["Mathematics", 1, 1, 1, 1, 1, 5],
    ["Mechanical", 10, 1, 1, 1, 1, 1.5],
    ["MEMS", 1, 1, 1, 1, 1, 1],
    ["Physics", 1, 0, 1, 10, 0, 1],
    ["SJMSOM", 7, 1, 3, 5, 1, 7],
    ["SysCon", 0.5, 0, 0, 0, 0, 10],
  ].map(([name, ...pts]) => ({
    name,
    scores: Object.fromEntries(
      ["ttBoys", "ttGirls", "chessMixed", "carromBoys", "carromGirls", "squashBoys"].map(
        (key, i) => [key, pts[i]]
      )
    ),
  })),
};

/** Normalise a raw RTDB snapshot (arrays may come back as objects). */
export function normalisePggc(raw) {
  if (!raw) return null;
  const toList = (v) => (Array.isArray(v) ? v : v ? Object.values(v) : []);
  const sports = toList(raw.sports).filter((s) => s && s.key);
  const departments = toList(raw.departments)
    .filter((d) => d && d.name)
    .map((d) => ({ name: d.name, scores: d.scores || {} }));
  if (sports.length === 0 && departments.length === 0) return null;
  return { sports, departments, updatedAt: raw.updatedAt || null };
}

export function departmentTotal(dept, sports) {
  const sum = sports.reduce((acc, s) => acc + (Number(dept.scores?.[s.key]) || 0), 0);
  return Math.round(sum * 100) / 100;
}

/**
 * Sort departments by total (desc, then name) and assign standard
 * competition ranks — tied totals share a rank ("1, 2, 2, 4").
 */
export function rankDepartments(departments, sports) {
  const rows = departments
    .map((d) => ({ ...d, total: departmentTotal(d, sports) }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  rows.forEach((row, i) => {
    row.rank = i > 0 && row.total === rows[i - 1].total ? rows[i - 1].rank : i + 1;
  });
  return rows;
}

/** Top `n` finishers of a single sport, used for the per-sport winners strip. */
export function sportLeaders(departments, sportKey, n = 3) {
  return departments
    .map((d) => ({ name: d.name, points: Number(d.scores?.[sportKey]) || 0 }))
    .filter((d) => d.points > 0)
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
    .slice(0, n);
}
