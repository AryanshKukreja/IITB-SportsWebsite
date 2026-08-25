import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
//import "./aquatics.css";
import "./yearbook.css";

/* ============================================================
   REVEAL — same as homepage / aquatics
============================================================ */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let done = false;
    const reveal = () => { if (!done) { done = true; setVisible(true); } };
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fallback = setTimeout(reveal, 1200);
    if (reduce || typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => clearTimeout(fallback);
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`aq-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   WAVE DIVIDER
============================================================ */
function WaveDivider() {
  return (
    <div className="aq-wave" aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path className="aq-wave-path aq-wave-path-1"
          d="M0 20 Q 100 0 200 20 T 400 20 T 600 20 T 800 20 T 1000 20 T 1200 20 V40 H0 Z" />
        <path className="aq-wave-path aq-wave-path-2"
          d="M0 26 Q 100 6 200 26 T 400 26 T 600 26 T 800 26 T 1000 26 T 1200 26 V40 H0 Z" />
      </svg>
    </div>
  );
}

/* ============================================================
   YEARBOOK
============================================================ */
const workbookUrl = `${process.env.PUBLIC_URL}/responses1.csv.xlsx`;
const yearbookPdfUrl = `${process.env.PUBLIC_URL}/yearbook.pdf`;
const YEARBOOK_YEAR = '2026–27';
const assetsBaseUrl = 'https://isc-yearbook-2026.s3.ap-south-1.amazonaws.com/assets';
const PERSON_PHOTOS = {};
const assetFolderNames = {
  'Institute Sports Council': 'Council',
  'Ultimate Frisbee': 'Frisbee',
};

function normaliseRows(rows) {
  const responses = rows.map((row) => ({
    name: String(row.selectedName || '').trim(),
    sport: String(row.selectedSport || 'Other').trim(),
    text: String(row.description || '').replace(/_x000D_/g, '\r').trim(),
    photo: String(row.photo || '').trim(),
    author: String(row.userName || 'Anonymous').trim(),
  })).filter((row) => row.name && (row.text || row.photo));
  const people = responses.reduce((groups, response) => {
    const person = groups[response.name] || { name: response.name, sports: [], responses: [], photo: PERSON_PHOTOS[response.name] || '' };
    person.responses.push(response);
    if (!person.sports.includes(response.sport)) person.sports.push(response.sport);
    groups[response.name] = person;
    return groups;
  }, {});
  return Object.values(people).sort((a, b) => a.name.localeCompare(b.name));
}

function PersonPhoto({ person, initials }) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const fileStem = person.name.split(/\s+/)[0];
  const fileStemVariants = [...new Set([fileStem, fileStem.toLowerCase(), `${fileStem.charAt(0).toUpperCase()}${fileStem.slice(1).toLowerCase()}`])];
  const candidates = person.photo ? [person.photo] : person.sports.map((personSport) => (
    fileStemVariants.flatMap((stem) => ['jpeg', 'jpg', 'png', 'JPG', 'JPEG', 'PNG'].map((extension) => `${assetsBaseUrl}/${encodeURIComponent(assetFolderNames[personSport] || personSport)}/${encodeURIComponent(stem)}.${extension}`))
  )).flat();

  if (!candidates[candidateIndex]) return <span className="yb-initials">{initials}</span>;
  return <img src={candidates[candidateIndex]} alt={person.name} onError={() => setCandidateIndex((index) => index + 1)} />;
}

const Yearbook = () => {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');
  const [sport, setSport] = useState('');
  const [selected, setSelected] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    fetch(workbookUrl).then((response) => {
      if (!response.ok) throw new Error('Workbook unavailable');
      return response.arrayBuffer();
    }).then((buffer) => {
      const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: '' });
      setEntries(normaliseRows(rows));
    }).catch(() => setLoadError('The yearbook responses could not be loaded.'));
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const sports = [...new Set(entries.flatMap((person) => person.sports))].sort();
  const filtered = entries.filter((person) => person.name.toLowerCase().includes(query.toLowerCase().trim()) && (!sport || person.sports.includes(sport)));
  const grouped = filtered.reduce((groups, entry) => {
    const letter = entry.name[0].toUpperCase();
    groups[letter] = groups[letter] || [];
    groups[letter].push(entry);
    return groups;
  }, {});
  const letters = Object.keys(grouped).sort();
  const initials = (name) => name.split(/\s+/).map((word) => word[0]).slice(0, 2).join('');

  return (
    <div className="aq-root yb-root-overrides">
      <a className="yb-download-sticky" href={yearbookPdfUrl} download="yearbook.pdf">
        <span aria-hidden="true">↓</span>
        Download yearbook
      </a>

      {/* MASTHEAD */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">S</span>
          <span>Institute Sports Council&nbsp;·&nbsp;Sports Yearbook</span>
        </div>
        <div className="aq-masthead-meta">
          {/* <span><strong>Powai</strong>&nbsp;·&nbsp;Mumbai</span>
          <span>Est.&nbsp;<strong>1958</strong></span> */}
          <span><strong>Until. Victory. Always.</strong></span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* HERO */}
        <Reveal as="section" className="aq-hero yb-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Annual Publication</span>
            <span className="sep">§</span>
            <span>Academic Year {YEARBOOK_YEAR}</span>
          </div>

          <div className="aq-hero-grid yb-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Sports
                <br />
                <span className="italic">Yearbook</span>.
              </h1>
              <p className="aq-hero-lede">
                The people, messages, and memories behind a year of IIT Bombay sport. Search the
                responses, browse by sport, and open each story to read it in full.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Edition</span>
                <span className="v">{YEARBOOK_YEAR}</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Published by</span>
                <span className="v" style={{ fontSize: '1.2rem', lineHeight: 1.3 }}>Institute Sports<em> Council</em></span>
              </div>
              <div className="aq-hero-stat"><span className="k">Stories</span><span className="v"><em>{entries.length ? entries.reduce((total, person) => total + person.responses.length, 0) : '—'}</em></span><span className="c">responses</span></div>
            </aside>
          </div>
        </Reveal>

        <WaveDivider />

        {/* INTERACTIVE DIRECTORY */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 01</span>&nbsp;·&nbsp;People &amp; Stories
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Find your <span className="italic">people</span>.
            </h2>
            <p className="aq-section-sub">{filtered.length} of {entries.length || '...'} people</p>
          </div>
          <div className="yb-controls"><label className="yb-search"><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name..." /></label><label className="yb-filter"><span>Sport</span><select value={sport} onChange={(event) => setSport(event.target.value)}><option value="">All sports</option>{sports.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div>
          <nav className="yb-alpha" aria-label="Jump to surname initial">{letters.map((letter) => <a key={letter} href={`#yb-${letter}`}>{letter}</a>)}</nav>
          {loadError && <div className="yb-empty">{loadError}</div>}
          {!loadError && entries.length === 0 && <div className="yb-empty">Loading responses...</div>}
          {letters.map((letter) => <section className="yb-group" id={`yb-${letter}`} key={letter}><div className="yb-group-title"><span>{letter}</span><small>{grouped[letter].length} {grouped[letter].length === 1 ? 'person' : 'people'}</small></div><div className="yb-grid">{grouped[letter].map((person, index) => <button className="yb-person" key={`${person.name}-${index}`} onClick={() => setSelected(person)}><PersonPhoto person={person} initials={initials(person.name)} /><span className="yb-person-copy"><strong>{person.name}</strong><small>{person.sports.join(' · ')}</small></span></button>)}</div></section>)}
        </Reveal>

        {selected && <div className="yb-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><article className="yb-modal" role="dialog" aria-modal="true" aria-labelledby="yb-modal-name"><button className="yb-modal-close" onClick={() => setSelected(null)} aria-label="Close response">×</button><div className="yb-modal-head"><PersonPhoto person={selected} initials={initials(selected.name)} /><div><h3 id="yb-modal-name">{selected.name}</h3><p>{selected.sports.join(' · ')} · {selected.responses.length} {selected.responses.length === 1 ? 'response' : 'responses'}</p></div></div><div className="yb-responses">{selected.responses.map((response, index) => <div className="yb-response-item" key={`${response.text}-${index}`}><div><p className="yb-response-author">{response.author}</p><p className="yb-response">{response.text}</p></div>{response.photo && <img className="yb-response-photo" src={response.photo} alt="" />}</div>)}</div></article></div>}

        {/* FOOTER */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay · Sports Council</span>
          <span>Until. Victory. Always.</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Yearbook;