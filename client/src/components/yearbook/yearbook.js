import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import "./yearbook.css";

/* ============================================================
   CLEAN VECTOR SVG ICONS (NO EMOJIS)
============================================================ */
const Icons = {
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Services: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Activity: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  Account: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Car: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  MapPin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Star: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Clock: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Signal: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="16" width="3" height="6" rx="1" />
      <rect x="7" y="12" width="3" height="10" rx="1" />
      <rect x="12" y="8" width="3" height="14" rx="1" />
      <rect x="17" y="4" width="3" height="18" rx="1" />
    </svg>
  ),
  Wifi: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
    </svg>
  ),
  Battery: () => (
    <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="18" height="12" rx="2" />
      <path d="M23 13v-2" />
      <rect x="3" y="8" width="13" height="8" rx="1" fill="currentColor" />
    </svg>
  ),
  Mentor: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Chat: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Trophy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
      <path d="M18 4H6v7a6 6 0 0 0 12 0V4Z" />
    </svg>
  ),
  Energy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Route: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  ),
  Music: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Friendly: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
    </svg>
  ),
  Legend: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Clutch: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Clean: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  GradCap: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Layers: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
};

/* ============================================================
   AWS S3 & LOCAL FALLBACK CONFIGURATION
============================================================ */
const workbookUrl = `${process.env.PUBLIC_URL}/responses1.csv.xlsx`;
const yearbookPdfUrl = `${process.env.PUBLIC_URL}/yearbook.pdf`;
const YEARBOOK_YEAR = "2026";
const assetsBaseUrl = "https://isc-yearbook-2026.s3.ap-south-1.amazonaws.com/assets";

// Local project picture overrides for Disha and Viral (since they are in the project folder)
const PERSON_PHOTOS = {
  "Disha Jain": `${process.env.PUBLIC_URL}/pictures/disha.jpeg`,
  "Viral Chhaperwal": `${process.env.PUBLIC_URL}/pictures/viral.JPG`,
};

const assetFolderNames = {
  "Institute Sports Council": "Council",
  "Ultimate Frisbee": "Frisbee",
};

function isAwsS3PhotoUrl(value) {
  return typeof value === "string" && /amazonaws\.com|s3\./i.test(value);
}

const FLEET_INFO = {
  "Institute Sports Council": { cmd: "#CMD-001", venue: "Gymkhana Indoors", code: "ISC", rating: "5.0", count: "16 Seniors", color: "#06C167" },
  "Aquatics": { cmd: "#CMD-002", venue: "Gymkhana Swimming Pool", code: "AQU", rating: "4.6", count: "9 Seniors", color: "#38bdf8" },
  "Athletics": { cmd: "#CMD-003", venue: "Gymkhana Synthetic Track", code: "ATH", rating: "4.9", count: "12 Seniors", color: "#f97316" },
  "Badminton": { cmd: "#CMD-004", venue: "Gymkhana Indoor Courts", code: "BAD", rating: "4.8", count: "4 Seniors", color: "#a855f7" },
  "Basketball": { cmd: "#CMD-005", venue: "Gymkhana Indoor Courts", code: "BSK", rating: "4.7", count: "13 Seniors", color: "#ea580c" },
  "Board Games": { cmd: "#CMD-006", venue: "New SAC", code: "BRD", rating: "4.9", count: "5 Seniors", color: "#eab308" },
  "Cricket": { cmd: "#CMD-007", venue: "Gymkhana Ground", code: "CRK", rating: "4.8", count: "14 Seniors", color: "#22c55e" },
  "Football": { cmd: "#CMD-008", venue: "Gymkhana Grounds", code: "FTB", rating: "4.9", count: "13 Seniors", color: "#10b981" },
  "Hockey": { cmd: "#CMD-009", venue: "Gymkhana Hockey Ground", code: "HCK", rating: "4.7", count: "12 Seniors", color: "#06b6d4" },
  "Indian Games": { cmd: "#CMD-010", venue: "New SAC", code: "IND", rating: "4.9", count: "23 Seniors", color: "#ec4899" },
  "Lawn Tennis": { cmd: "#CMD-011", venue: "Gymkhana Tennis Courts", code: "TEN", rating: "4.8", count: "5 Seniors", color: "#84cc16" },
  "Squash": { cmd: "#CMD-012", venue: "New SAC", code: "SQS", rating: "4.6", count: "7 Seniors", color: "#14b8a6" },
  "Table Tennis": { cmd: "#CMD-013", venue: "Gymkhana Indoor Courts", code: "TTN", rating: "4.9", count: "10 Seniors", color: "#6366f1" },
  "Ultimate Frisbee": { cmd: "#CMD-014", venue: "Gymkhana Grounds", code: "FRS", rating: "4.8", count: "9 Seniors", color: "#f43f5e" },
  "Volleyball": { cmd: "#CMD-015", venue: "Gymkhana Indoor Courts", code: "VLB", rating: "4.9", count: "23 Seniors", color: "#3b82f6" },
  "Weightlifting": { cmd: "#CMD-016", venue: "Old SAC", code: "WTL", rating: "4.9", count: "4 Seniors", color: "#ef4444" },
  "Aavhan": { cmd: "#CMD-017", venue: "Gymkhana Arena", code: "AVH", rating: "5.0", count: "6 Seniors", color: "#e11d48" },
};

const BADGE_OPTIONS = [
  { id: "mentor", label: "Master mentor", tag: "Pro", IconComp: Icons.Mentor, bg: "#153324", color: "#06C167" },
  { id: "convo", label: "Great conversation", tag: "5★", IconComp: Icons.Chat, bg: "#1f2937", color: "#38bdf8" },
  { id: "beyond", label: "Above & beyond", tag: "3★", IconComp: Icons.Trophy, bg: "#362208", color: "#fbbf24" },
  { id: "energy", label: "High energy", tag: "Max", IconComp: Icons.Energy, bg: "#381313", color: "#f87171" },
  { id: "route", label: "Fantastic route", tag: "New", IconComp: Icons.Route, bg: "#1a2e05", color: "#a3e635" },
  { id: "music", label: "Awesome music", tag: "New", IconComp: Icons.Music, bg: "#31103f", color: "#c084fc" },
  { id: "friendly", label: "Super friendly", tag: "4★", IconComp: Icons.Friendly, bg: "#382305", color: "#fb923c" },
  { id: "legend", label: "Fleet legend", tag: "OG", IconComp: Icons.Legend, bg: "#25123a", color: "#e879f9" },
  { id: "clutch", label: "Clutch performer", tag: "Top", IconComp: Icons.Clutch, bg: "#3b111e", color: "#fb7185" },
  { id: "clean", label: "Clean car", tag: "New", IconComp: Icons.Clean, bg: "#0f2f38", color: "#2dd4bf" },
];

function getBadgesForPerson(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const count = 3 + (Math.abs(hash) % 2);
  const selected = [];
  for (let i = 0; i < count; i++) {
    const idx = (Math.abs(hash) + i * 3) % BADGE_OPTIONS.length;
    if (!selected.includes(BADGE_OPTIONS[idx])) {
      selected.push(BADGE_OPTIONS[idx]);
    }
  }
  return selected;
}

function getRatingForPerson(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const r = 4.7 + (Math.abs(hash) % 30) / 100;
  return r.toFixed(2);
}

function normaliseRows(rows) {
  const responses = rows.map((row) => ({
    name: String(row.selectedName || "").trim(),
    sport: String(row.selectedSport || "Other").trim(),
    text: String(row.description || "").replace(/_x000D_/g, "\r").trim(),
    photo: String(row.photo || "").trim(),
    author: String(row.userName || "Anonymous").trim(),
  })).filter((row) => row.name && (row.text || row.photo));

  const people = responses.reduce((groups, response) => {
    const person = groups[response.name] || {
      name: response.name,
      sports: [],
      responses: [],
      photo: PERSON_PHOTOS[response.name] || "",
    };
    person.responses.push(response);
    if (!person.sports.includes(response.sport)) person.sports.push(response.sport);
    groups[response.name] = person;
    return groups;
  }, {});

  return Object.values(people).sort((a, b) => a.name.localeCompare(b.name));
}

/* ============================================================
   PERSON AVATAR COMPONENT (AWS S3 + LOCAL OVERRIDES)
============================================================ */
function PersonAvatar({ person, size = 64 }) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const initials = (person.name || "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  const fileStem = (person.name || "").split(/\s+/)[0];
  
  const fileStemVariants = useMemo(() => {
    if (!fileStem) return [];
    return [
      ...new Set([
        fileStem,
        fileStem.toLowerCase(),
        `${fileStem.charAt(0).toUpperCase()}${fileStem.slice(1).toLowerCase()}`,
        person.name,
        (person.name || "").replace(/\s+/g, "")
      ])
    ];
  }, [fileStem, person.name]);

  const candidates = useMemo(() => {
    if (PERSON_PHOTOS[person.name]) return [PERSON_PHOTOS[person.name]];

    const awsCandidates = [];
    if (isAwsS3PhotoUrl(person.photo)) {
      awsCandidates.push(person.photo);
    }

    const sportsList = person.sports && person.sports.length > 0
      ? person.sports
      : ["Council", "Institute Sports Council"];

    const extensions = ["jpeg", "jpg", "png", "JPG", "JPEG", "PNG", "webp", "WEBP"];

    const generatedCandidates = sportsList.flatMap((personSport) => {
      const folder = assetFolderNames[personSport] || personSport;
      return fileStemVariants.flatMap((stem) =>
        extensions.map(
          (ext) => `${assetsBaseUrl}/${encodeURIComponent(folder)}/${encodeURIComponent(stem)}.${ext}`
        )
      );
    });

    return [...awsCandidates, ...generatedCandidates];
  }, [person.name, person.photo, person.sports, fileStemVariants]);

  const style = { width: `${size}px`, height: `${size}px`, minWidth: `${size}px` };

  if (!candidates[candidateIndex]) {
    return (
      <div className="ub-avatar ub-avatar-initials" style={style}>
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <div className="ub-avatar" style={style}>
      <img
        src={candidates[candidateIndex]}
        alt={person.name}
        onError={() => setCandidateIndex((idx) => idx + 1)}
      />
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function Yearbook() {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [currentTime, setCurrentTime] = useState("19:02");

  // Keep live time updated for Uber phone status bar feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch responses
  useEffect(() => {
    fetch(workbookUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Workbook unavailable");
        return response.arrayBuffer();
      })
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });
        setEntries(normaliseRows(rows));
      })
      .catch(() => setLoadError("The yearbook responses could not be loaded."));
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedPerson) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPerson]);

  // Keyboard navigation for Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPerson) return;
      if (e.key === "Escape") setSelectedPerson(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPerson]);

  const sportsList = useMemo(() => {
    return ["All", ...Object.keys(FLEET_INFO)];
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter((person) => {
      const matchesQuery = person.name.toLowerCase().includes(query.toLowerCase().trim());
      const matchesSport = selectedSport === "All" || person.sports.includes(selectedSport);
      return matchesQuery && matchesSport;
    });
  }, [entries, query, selectedSport]);

  const alphabetGroups = useMemo(() => {
    const groups = {};
    filteredEntries.forEach((entry) => {
      const letter = (entry.name[0] || "").toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(entry);
    });
    return groups;
  }, [filteredEntries]);

  const letters = Object.keys(alphabetGroups).sort();
  const totalResponses = useMemo(() => {
    return entries.reduce((tot, p) => tot + p.responses.length, 0);
  }, [entries]);

  // Recent debriefs feed for "Activity" tab
  const recentDebriefs = useMemo(() => {
    const list = [];
    entries.forEach((person) => {
      person.responses.forEach((res) => {
        if (res.text && res.text.length > 20) {
          list.push({
            seniorName: person.name,
            seniorSport: person.sports[0] || "Sports",
            author: res.author,
            text: res.text,
            photo: res.photo,
            personObj: person,
          });
        }
      });
    });
    return list.slice(0, 40);
  }, [entries]);

  return (
    <div className="ub-root">
      {/* BACKGROUND GPS ROUTE MESH */}
      <div className="ub-bg-grid" aria-hidden="true">
        <div className="ub-bg-glow ub-bg-glow-1"></div>
        <div className="ub-bg-glow ub-bg-glow-2"></div>
        <svg className="ub-bg-routes" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          <path d="M-100 200 C300 150, 600 450, 900 300 C1200 150, 1400 400, 1600 350" stroke="rgba(6, 193, 103, 0.15)" strokeWidth="3" strokeDasharray="8 6" />
          <path d="M0 650 C400 600, 700 800, 1100 650 C1300 550, 1500 700, 1600 680" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
          <path d="M200 -50 C400 300, 300 700, 600 950" stroke="rgba(6, 193, 103, 0.08)" strokeWidth="2" />
          <path d="M1200 -50 C1100 300, 1300 600, 1200 950" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="2" />
        </svg>
      </div>

      {/* STICKY DOWNLOAD CTA */}
      <a className="ub-download-fab" href={yearbookPdfUrl} download="IITB-Sports-Yearbook-2026.pdf" title="Download Yearbook PDF">
        <span className="ub-download-icon"><Icons.Download /></span>
        <span className="ub-download-text">Download Yearbook PDF</span>
      </a>

      {/* TOP UBER SIMULATOR APP CONTAINER */}
      <div className="ub-container">
        
        {/* PHONE / APP TOP STATUS BAR */}
        <header className="ub-status-bar">
          <div className="ub-status-time">{currentTime}</div>
          <div className="ub-status-notch">
            <span className="ub-notch-cam"></span>
            <span className="ub-notch-speaker"></span>
          </div>
          <div className="ub-status-icons">
            <span className="ub-signal-wrap"><Icons.Signal /></span>
            <span className="ub-wifi-wrap"><Icons.Wifi /></span>
            <span className="ub-battery-wrap"><Icons.Battery /></span>
          </div>
        </header>

        {/* UBER BRAND MASTHEAD */}
        <nav className="ub-top-nav">
          <div className="ub-brand-wrap">
            <div className="ub-logo-badge">Uber</div>
            <span className="ub-brand-sub">IITB Sports • Yearbook {YEARBOOK_YEAR}</span>
          </div>
          <div className="ub-tagline">
            <span>UNTIL. VICTORY. ALWAYS.</span>
          </div>
        </nav>

        {/* TRIP LIVE STATUS BANNER */}
        <section className="ub-trip-banner">
          <div className="ub-trip-meta">
            <div className="ub-trip-status-chip">
              <span className="ub-pulse-dot"></span>
              <span>ON TRIP • CLASS OF {YEARBOOK_YEAR}</span>
            </div>
            <div className="ub-trip-caption">Arriving at Convocation Hall</div>
          </div>
          <div className="ub-trip-route-line">
            <div className="ub-route-point ub-point-pickup">
              <span className="ub-pin-dot ub-pin-pickup"></span>
              <div className="ub-pin-label">
                <small>PICK UP</small>
                <strong>Gymkhana Grounds</strong>
              </div>
            </div>
            <div className="ub-route-track">
              <div className="ub-route-progress"></div>
              <span className="ub-car-marker" title="Cruising to Convocation">
                <Icons.Car />
              </span>
            </div>
            <div className="ub-route-point ub-point-drop">
              <span className="ub-pin-dot ub-pin-drop"></span>
              <div className="ub-pin-label">
                <small>DROP OFF</small>
                <strong>Convocation Hall</strong>
              </div>
            </div>
          </div>
        </section>

        {/* TOP TAB NAVIGATION */}
        <div className="ub-tabs-bar">
          <button
            className={`ub-tab-btn ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <span className="ub-tab-icon"><Icons.Home /></span>
            <span>Rides &amp; Directory</span>
          </button>
          <button
            className={`ub-tab-btn ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            <span className="ub-tab-icon"><Icons.Services /></span>
            <span>Fleet Venues</span>
          </button>
          <button
            className={`ub-tab-btn ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            <span className="ub-tab-icon"><Icons.Activity /></span>
            <span>Live Activity</span>
          </button>
          <button
            className={`ub-tab-btn ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <span className="ub-tab-icon"><Icons.Account /></span>
            <span>Crew &amp; Credits</span>
          </button>
        </div>

        {/* TAB CONTENT: 1. HOME / DIRECTORY */}
        {activeTab === "home" && (
          <main className="ub-tab-content ub-home-view">
            
            {/* HERO HEROIC SECTION */}
            <section className="ub-hero-card">
              <div className="ub-hero-left">
                <div className="ub-hero-eyebrow">
                  <span className="ub-uber-green-text">Official Publication</span> • Academic Year {YEARBOOK_YEAR}
                </div>
                <h1 className="ub-hero-title">
                  SPORTS<br />
                  <span className="ub-uber-accent">YEARBOOK.</span>
                </h1>
                <p className="ub-hero-desc">
                  The people, messages, and memories behind an unforgettable year of IIT Bombay sport.
                  Inspect the fleet manifest, search senior commanders, and read their debrief reviews.
                </p>

                {/* TRIP SEARCH BOX ("WHERE TO?") */}
                <div className="ub-search-box">
                  <div className="ub-search-row">
                    <span className="ub-search-dot-green"><Icons.Search /></span>
                    <input
                      type="text"
                      className="ub-search-input"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Where to? (Search senior by name...)"
                    />
                    {query && (
                      <button className="ub-clear-btn" onClick={() => setQuery("")}>✕</button>
                    )}
                  </div>
                  <div className="ub-search-footer">
                    <span className="ub-search-dot-square">■</span>
                    <span className="ub-location-target">
                      {selectedSport === "All" ? "All Sports Fleets" : `${selectedSport} Fleet (${FLEET_INFO[selectedSport]?.venue || "IIT Bombay"})`}
                    </span>
                    <button className="ub-now-pill">
                      <span>Now ▾</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* HERO STATS / RIDE METRICS */}
              <div className="ub-hero-stats">
                <div className="ub-stat-box">
                  <div className="ub-stat-head">
                    <span className="ub-stat-icon-svg"><Icons.GradCap /></span>
                    <span className="ub-stat-label">BATCH EDITION</span>
                  </div>
                  <div className="ub-stat-val">CLASS OF {YEARBOOK_YEAR}</div>
                  <div className="ub-stat-sub">IIT Bombay Sports Council</div>
                </div>

                <div className="ub-stat-box">
                  <div className="ub-stat-head">
                    <span className="ub-stat-icon-svg"><Icons.Layers /></span>
                    <span className="ub-stat-label">TOTAL FLEETS</span>
                  </div>
                  <div className="ub-stat-val">17 Active Fleets</div>
                  <div className="ub-stat-sub">Spanning all Sports Venues</div>
                </div>

                <div className="ub-stat-box">
                  <div className="ub-stat-head">
                    <span className="ub-stat-icon-svg"><Icons.Activity /></span>
                    <span className="ub-stat-label">STORIES LOGGED</span>
                  </div>
                  <div className="ub-stat-val">{entries.length ? `${totalResponses} Reviews` : "Loading..."}</div>
                  <div className="ub-stat-sub">{entries.length} Drivers &amp; Fleet Commanders</div>
                </div>
              </div>
            </section>

            {/* FLEET SELECTOR CAROUSEL / PILLS */}
            <section className="ub-fleet-selector-section">
              <div className="ub-section-title-row">
                <div>
                  <h2 className="ub-sec-title">CHOOSE A SPORT FLEET</h2>
                  <p className="ub-sec-subtitle">Filter commanders and senior drivers by sports category</p>
                </div>
                <span className="ub-filter-count-badge">
                  {filteredEntries.length} {filteredEntries.length === 1 ? "Senior" : "Seniors"} found
                </span>
              </div>

              <div className="ub-fleets-scroll">
                {sportsList.map((sport) => {
                  const isSelected = selectedSport === sport;
                  const info = FLEET_INFO[sport];
                  return (
                    <button
                      key={sport}
                      className={`ub-fleet-card ${isSelected ? "is-selected" : ""}`}
                      onClick={() => setSelectedSport(sport)}
                    >
                      <div className="ub-fleet-badge-code">
                        {sport === "All" ? "ALL" : info?.code || "SPT"}
                      </div>
                      <div className="ub-fleet-info">
                        <div className="ub-fleet-name">{sport === "All" ? "All Fleets" : sport}</div>
                        <div className="ub-fleet-meta">
                          {sport === "All" ? `${entries.length} Drivers` : info?.cmd || ""}
                        </div>
                      </div>
                      {isSelected && <span className="ub-fleet-check"><Icons.Check /></span>}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ALPHABET JUMP BAR */}
            {letters.length > 0 && (
              <nav className="ub-alpha-nav" aria-label="Alphabetical Jump">
                <span className="ub-alpha-label">JUMP TO:</span>
                {letters.map((l) => (
                  <a key={l} href={`#letter-${l}`} className="ub-alpha-link">{l}</a>
                ))}
              </nav>
            )}

            {/* ERROR / LOADING STATES */}
            {loadError && (
              <div className="ub-empty-state">
                <div className="ub-empty-icon-clean">!</div>
                <h3>{loadError}</h3>
                <p>Please check your network connection or try refreshing the page.</p>
              </div>
            )}

            {!loadError && entries.length === 0 && (
              <div className="ub-empty-state">
                <div className="ub-spinner"></div>
                <h3>Fetching Fleet Manifest...</h3>
                <p>Loading responses and senior profiles...</p>
              </div>
            )}

            {!loadError && entries.length > 0 && filteredEntries.length === 0 && (
              <div className="ub-empty-state">
                <div className="ub-empty-icon-clean">
                  <Icons.Search />
                </div>
                <h3>No Driver Found</h3>
                <p>No senior matched &ldquo;{query}&rdquo; in {selectedSport === "All" ? "any fleet" : selectedSport}.</p>
                <button
                  className="ub-btn-pill"
                  onClick={() => {
                    setQuery("");
                    setSelectedSport("All");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* SENIORS GRID GROUPED BY ALPHABET */}
            <div className="ub-alphabet-sections">
              {letters.map((letter) => {
                const group = alphabetGroups[letter];
                return (
                  <section key={letter} id={`letter-${letter}`} className="ub-letter-group">
                    <div className="ub-group-header">
                      <div className="ub-group-badge">{letter}</div>
                      <span className="ub-group-count">
                        {group.length} {group.length === 1 ? "Driver" : "Drivers"}
                      </span>
                      <div className="ub-group-line"></div>
                    </div>

                    <div className="ub-drivers-grid">
                      {group.map((person) => {
                        const primarySport = person.sports[0] || "Institute Sports Council";
                        const fleetData = FLEET_INFO[primarySport] || { cmd: "#CMD-000", venue: "Gymkhana", color: "#06C167" };
                        const rating = getRatingForPerson(person.name);

                        return (
                          <div
                            key={person.name}
                            className="ub-driver-card"
                            onClick={() => setSelectedPerson(person)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedPerson(person);
                              }
                            }}
                          >
                            <div className="ub-driver-card-top">
                              <PersonAvatar person={person} size={54} />
                              <div className="ub-driver-main-info">
                                <div className="ub-driver-name-row">
                                  <h3 className="ub-driver-name">{person.name}</h3>
                                  <span className="ub-driver-rating">
                                    <Icons.Star /> {rating}
                                  </span>
                                </div>
                                <div className="ub-driver-fleet-tag">
                                  {fleetData.cmd} • {primarySport}
                                </div>
                              </div>
                            </div>

                            <div className="ub-driver-venue">
                              <span className="ub-venue-icon"><Icons.MapPin /></span>
                              <span className="ub-venue-text">{fleetData.venue}</span>
                            </div>

                            {person.responses[0]?.text && (
                              <p className="ub-driver-quote-preview">
                                &ldquo;{person.responses[0].text}&rdquo;
                              </p>
                            )}

                            <div className="ub-driver-card-footer">
                              <div className="ub-driver-stats-pill">
                                <span>{person.responses.length} {person.responses.length === 1 ? "Review" : "Reviews"}</span>
                              </div>
                              <button className="ub-view-manifest-btn">
                                <span>Manifest</span>
                                <span className="ub-arrow">→</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </main>
        )}

        {/* TAB CONTENT: 2. FLEET VENUES (SERVICES) */}
        {activeTab === "services" && (
          <main className="ub-tab-content ub-services-view">
            <div className="ub-section-title-row">
              <div>
                <h2 className="ub-sec-title">CAMPUS SPORTING FLEETS &amp; VENUES</h2>
                <p className="ub-sec-subtitle">Overview of sports councils, courts, and training grounds</p>
              </div>
            </div>

            <div className="ub-venues-grid">
              {Object.entries(FLEET_INFO).map(([sport, info]) => (
                <div key={sport} className="ub-venue-card">
                  <div className="ub-venue-card-header">
                    <div className="ub-venue-code-circle">{info.code}</div>
                    <div className="ub-venue-info-box">
                      <span className="ub-venue-cmd">{info.cmd}</span>
                      <h3 className="ub-venue-name">{sport}</h3>
                    </div>
                    <div className="ub-venue-rating-badge">
                      <Icons.Star /> {info.rating}
                    </div>
                  </div>
                  <div className="ub-venue-location">
                    <Icons.MapPin />
                    <strong>{info.venue}</strong>
                  </div>
                  <div className="ub-venue-footer">
                    <span className="ub-venue-seniors">{info.count}</span>
                    <button
                      className="ub-btn-pill ub-venue-explore-btn"
                      onClick={() => {
                        setSelectedSport(sport);
                        setActiveTab("home");
                      }}
                    >
                      Explore Drivers →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* TAB CONTENT: 3. ACTIVITY (RECENT DEBRIEFS) */}
        {activeTab === "activity" && (
          <main className="ub-tab-content ub-activity-view">
            <div className="ub-section-title-row">
              <div>
                <h2 className="ub-sec-title">LIVE RIDE ACTIVITY &amp; DEBRIEFS</h2>
                <p className="ub-sec-subtitle">Testimonials, jokes, and memories recorded across the council</p>
              </div>
            </div>

            <div className="ub-activity-feed">
              {recentDebriefs.map((item, idx) => (
                <article key={idx} className="ub-activity-card">
                  <div className="ub-activity-header">
                    <PersonAvatar person={item.personObj} size={44} />
                    <div>
                      <h3
                        className="ub-activity-senior"
                        onClick={() => setSelectedPerson(item.personObj)}
                      >
                        {item.seniorName}
                      </h3>
                      <span className="ub-activity-sport">
                        {item.seniorSport} Fleet • Verified Senior
                      </span>
                    </div>
                    <span className="ub-activity-time">Trip #{idx + 101}</span>
                  </div>

                  <p className="ub-activity-quote">&ldquo;{item.text}&rdquo;</p>

                  {item.photo && (
                    <div className="ub-activity-polaroid">
                      <div className="ub-tape"></div>
                      <img src={item.photo} alt={`Memory with ${item.seniorName}`} />
                    </div>
                  )}

                  <div className="ub-activity-footer">
                    <div className="ub-activity-author">
                      <span>Reviewed by:</span> <strong>{item.author}</strong>
                    </div>
                    <button
                      className="ub-btn-small"
                      onClick={() => setSelectedPerson(item.personObj)}
                    >
                      View Full Profile →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>
        )}

        {/* TAB CONTENT: 4. ACCOUNT / LEADERSHIP & MENTIONS */}
        {activeTab === "account" && (
          <main className="ub-tab-content ub-account-view">
            <section className="ub-leadership-hero">
              <div className="ub-section-title-row">
                <div>
                  <h2 className="ub-sec-title">DRIVER PROFILES &amp; CREW</h2>
                  <p className="ub-sec-subtitle">Yearbook leads and production credits</p>
                </div>
              </div>

              {/* HEAD DRIVERS */}
              <div className="ub-heads-grid">
                {/* DISHA JAIN */}
                <div className="ub-lead-profile-card">
                  <div className="ub-lead-top">
                    <div className="ub-lead-avatar-ring">
                      <img
                        src={`${process.env.PUBLIC_URL}/pictures/disha.jpeg`}
                        alt="Disha Jain"
                        className="ub-lead-img"
                      />
                    </div>
                    <h3 className="ub-lead-name">Disha Jain</h3>
                    <div className="ub-lead-role-pill">Web Head • Institute Sports Council</div>
                    <div className="ub-lead-rating">4.67 ★ Rating • 2 Years Tenure • 75+ Rides</div>
                  </div>
                  <div className="ub-lead-cards">
                    <div className="ub-lead-box">
                      <strong>My Experience:</strong>
                      <p>
                        Putting this yearbook together has been my little way of pausing for a moment and looking back at everything that happened here — chaos, laughter, inside jokes, the random photos, the long days, and all those little moments we never thought much about at the time, but somehow became memories.
                      </p>
                    </div>
                    <div className="ub-lead-box ub-farewell-box">
                      <strong>Farewell message:</strong>
                      <p>
                        So, to the graduating seniors: thank you for giving this year something worth remembering. Wherever life takes you next, I hope you look back at these pages someday and remember not just how we looked, but how it felt to be here.
                      </p>
                    </div>
                  </div>
                </div>

                {/* VIRAL CHHAPERWAL */}
                <div className="ub-lead-profile-card">
                  <div className="ub-lead-top">
                    <div className="ub-lead-avatar-ring">
                      <img
                        src={`${process.env.PUBLIC_URL}/pictures/viral.JPG`}
                        alt="Viral Chhaperwal"
                        className="ub-lead-img"
                      />
                    </div>
                    <h3 className="ub-lead-name">Viral Chhaperwal</h3>
                    <div className="ub-lead-role-pill">Creative Head • Institute Sports Council</div>
                    <div className="ub-lead-rating">4.98 ★ Rating • 2 Years Tenure • 100+ Rides</div>
                  </div>
                  <div className="ub-lead-cards">
                    <div className="ub-lead-box">
                      <strong>My Experience:</strong>
                      <p>
                        Being part of this sports journey, first as Convener, and now as the Institute Sports Creatives Head — has been one of the most rewarding chapters of my college life, and a huge part of that is because of all of you. Every senior I got to work with taught me something.
                      </p>
                    </div>
                    <div className="ub-lead-box ub-farewell-box">
                      <strong>Farewell message:</strong>
                      <p>
                        As you step into the next chapter, I wish you nothing but the best, may your journey ahead be as memorable and fulfilling as the one you’ve had here. This little effort of ours is our way of saying thank you!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCTION & MENTIONS */}
              <div className="ub-credits-card">
                <div className="ub-credits-brand">MENTIONS &amp; PRODUCTION</div>
                <div className="ub-credits-grid">
                  <div className="ub-credit-box">
                    <span className="ub-credit-role">TEMPLATE IDEA</span>
                    <strong>VIRAL CHHAPERWAL</strong>
                  </div>
                  <div className="ub-credit-box">
                    <span className="ub-credit-role">DESIGN &amp; IDEATION</span>
                    <strong>SHIVAM VISHWEKAR</strong>
                  </div>
                  <div className="ub-credit-box">
                    <span className="ub-credit-role">EXECUTION</span>
                    <strong>SHIVAM VISHWEKAR</strong>
                  </div>
                  <div className="ub-credit-box">
                    <span className="ub-credit-role">MENTIONS &amp; CONTENT</span>
                    <strong>ISHIKA JAIN</strong>
                  </div>
                </div>
                <div className="ub-credits-foot">
                  <p>Made with love for the graduating batch of 2026 by the design and web teams, Institute Sports Council, IIT Bombay.</p>
                  <h4>UNTIL. VICTORY. ALWAYS.</h4>
                </div>
              </div>
            </section>
          </main>
        )}

        {/* BOTTOM UBER APP NAVIGATION BAR */}
        <footer className="ub-bottom-bar">
          <button
            className={`ub-bot-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <span className="ub-bot-icon"><Icons.Home /></span>
            <span className="ub-bot-label">Home</span>
          </button>
          <button
            className={`ub-bot-item ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            <span className="ub-bot-icon"><Icons.Services /></span>
            <span className="ub-bot-label">Services</span>
          </button>
          <button
            className={`ub-bot-item ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            <span className="ub-bot-icon"><Icons.Activity /></span>
            <span className="ub-bot-label">Activity</span>
          </button>
          <button
            className={`ub-bot-item ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <span className="ub-bot-icon"><Icons.Account /></span>
            <span className="ub-bot-label">Account</span>
          </button>
        </footer>

      </div>

      {/* ============================================================
          FLEET COMMANDER MANIFEST MODAL (UBER DETAIL VIEW)
      ============================================================ */}
      {selectedPerson && (
        <div
          className="ub-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedPerson(null);
          }}
        >
          <article
            className="ub-manifest-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ub-modal-driver-name"
          >
            {/* MODAL TOP HEADER */}
            <div className="ub-modal-header">
              <button
                className="ub-modal-back-btn"
                onClick={() => setSelectedPerson(null)}
                aria-label="Close manifest"
              >
                ‹ FLEET COMMANDER MANIFEST
              </button>
              <div className="ub-header-actions">
                <button
                  className="ub-modal-close-icon"
                  onClick={() => setSelectedPerson(null)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* MODAL BODY */}
            <div className="ub-modal-body">
              {/* VENUE PILL */}
              <div className="ub-modal-venue-pill">
                <span className="ub-pill-clock"><Icons.Clock /></span>
                <span>
                  {FLEET_INFO[selectedPerson.sports[0]]?.venue || "Gymkhana Grounds"}
                </span>
                <span className="ub-pill-sub">Sports Council</span>
              </div>

              {/* DRIVER HERO */}
              <div className="ub-modal-driver-hero">
                <div className="ub-driver-avatar-large">
                  <PersonAvatar person={selectedPerson} size={110} />
                </div>
                <div className="ub-driver-hero-text">
                  <h2 id="ub-modal-driver-name" className="ub-modal-name">
                    {selectedPerson.name}
                  </h2>
                  <div className="ub-modal-cmd-badge">
                    {selectedPerson.sports[0]} Fleet (
                    {FLEET_INFO[selectedPerson.sports[0]]?.cmd || "#CMD-000"}
                    )
                  </div>
                </div>
              </div>

              {/* RIDE BADGES ROW */}
              <div className="ub-badges-row">
                <div className="ub-badge-chip">
                  <span className="ub-chip-icon"><Icons.Check /></span>
                  <span>Points Earned</span>
                </div>
                <div className="ub-badge-chip">
                  <span className="ub-chip-icon"><Icons.Star /></span>
                  <span>Great Service</span>
                </div>
                <div className="ub-badge-chip">
                  <span className="ub-chip-icon">◆</span>
                  <span>New Tiers Unlocked</span>
                </div>
              </div>

              {/* DEBRIEF & REVIEWS SECTION */}
              <div className="ub-modal-reviews-section">
                <div className="ub-reviews-title">
                  <span>Crew Debrief &amp; Captain Reviews</span>
                  <span className="ub-reviews-count-pill">
                    ({selectedPerson.responses.length} {selectedPerson.responses.length === 1 ? "Review" : "Reviews"})
                  </span>
                </div>

                <div className="ub-reviews-list">
                  {selectedPerson.responses.map((response, index) => (
                    <div key={index} className="ub-review-bubble">
                      <div className="ub-review-text-wrap">
                        <p className="ub-review-text">{response.text}</p>
                        <div className="ub-review-author-row">
                          <span className="ub-review-author-tag">
                            — {response.author}
                          </span>
                        </div>
                      </div>

                      {response.photo && (
                        <div className="ub-polaroid-frame">
                          <div className="ub-tape"></div>
                          <img
                            src={response.photo}
                            alt={`Submitted by ${response.author}`}
                            className="ub-polaroid-img"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* POSITIVE RATINGS CHIPS */}
              <div className="ub-positive-ratings-section">
                <h4 className="ub-positive-title">Positive Ratings</h4>
                <div className="ub-positive-badges-grid">
                  {getBadgesForPerson(selectedPerson.name).map((badge) => {
                    const BadgeIcon = badge.IconComp;
                    return (
                      <div
                        key={badge.id}
                        className="ub-pos-badge"
                        style={{ background: badge.bg, borderColor: badge.color }}
                      >
                        <div className="ub-pos-icon-wrap">
                          <span className="ub-pos-tag" style={{ background: badge.color }}>
                            {badge.tag}
                          </span>
                          <span className="ub-pos-icon" style={{ color: badge.color }}>
                            <BadgeIcon />
                          </span>
                        </div>
                        <span className="ub-pos-label" style={{ color: badge.color }}>
                          {badge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="ub-modal-footer">
              <button
                className="ub-btn-pill ub-modal-dismiss-btn"
                onClick={() => setSelectedPerson(null)}
              >
                Close Manifest
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}