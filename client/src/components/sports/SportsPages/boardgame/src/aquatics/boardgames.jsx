import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './boardgames.css';
import Timel from './timeline';
import bg1  from '../assets/bg1.jpeg';
import bg2  from '../assets/bg2.jpeg';
import bg3  from '../assets/bg3.jpeg';
import bg4  from '../assets/bg4.jpeg';
import bg5  from '../assets/bg5.jpeg';
import bg6  from '../assets/bg6.jpeg';
import bg7  from '../assets/bg7.jpeg';
import bg8  from '../assets/bg8.jpeg';
import bg9  from '../assets/bg9.jpeg';
import bg10 from '../assets/bg10.jpeg';
import bg11 from '../assets/bg11.jpeg';
import bg12 from '../assets/bg12.jpeg';
import bg13 from '../assets/bg13.jpeg';
import bg14 from '../assets/bg14.jpeg';
import bg15 from '../assets/bg15.jpeg';
import boardGamesLogo from '../../../../../Contact/pictures/Logos_for_Photos/chess.png';
import varad from '../../../../../Contact/pictures/Logos_for_Photos/varad.JPG';

/* ============================================================
   REVEAL
============================================================ */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let done = false;
    const reveal = () => { if (!done) { done = true; setVisible(true); } };
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fallback = setTimeout(reveal, 1200);
    if (reduce || typeof IntersectionObserver === 'undefined') { reveal(); return () => clearTimeout(fallback); }
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
    <Tag ref={ref} className={`aq-reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* ============================================================
   COUNT-UP
============================================================ */
function useCountUp(target, durationMs = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf, start, cancelled = false;
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setValue(target); return undefined; }
    const tick = (t) => {
      if (cancelled) return;
      if (start === undefined) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(raf); };
  }, [target, durationMs]);
  return value;
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
   PHOTO BREAK
============================================================ */
function PhotoBreak({ image, caption, tag }) {
  return (
    <Reveal as="div" className="aq-photobreak">
      <img src={image} alt={caption} className="aq-photobreak-img" />
      <div className="aq-photobreak-caption">
        <span>{tag}</span>
        <span>{caption}</span>
      </div>
    </Reveal>
  );
}

/* ============================================================
   DATA
============================================================ */
const facilities = [
  {
    title: 'Pool & Snooker',
    image: bg1,
    bullets: [
      '1 pool table and 1 snooker table in the Board Games Room, New SAC 2nd Floor.',
      'Open to all campus residents — no prior booking required during general hours.',
    ],
  },
  {
    title: 'Carrom & Chess',
    image: bg2,
    bullets: [
      'Multiple carrom boards and chess sets available for drop-in play.',
      'Regular training and practice sessions facilitated by the Dark Knight Chess Club.',
    ],
  },
  {
    title: 'Foosball & More',
    image: bg3,
    bullets: [
      '1 foosball table for casual and competitive play.',
      'Rubik\'s Cube puzzles — 2×2 through NxN — available via the Rubik\'s Club.',
    ],
  },
  {
    title: 'Board Games Room',
    image: bg10,
    bullets: [
      'Located on the 2nd Floor of the New SAC — fully indoors, available 365 days a year.',
      'Hosts all institute-level board games events, workshops, and club activities.',
    ],
  },
];

const clubs = [
  {
    head: 'Dark Knight Chess Club (DKCC)',
    body: 'IIT Bombay\'s official student-run chess community. Brings together enthusiasts across all skill levels — from casual players to rated professionals. Conducts friendly tournaments and All India College-level competitions like the All India Chess League (AICL), and encourages participation in inter-college and national events.',
    link: 'https://www.instagram.com/dkcc_iitb/?hl=en',
    linkLabel: 'Instagram → @dkcc_iitb',
  },
  {
    head: 'Rubik\'s Club',
    body: 'A vibrant space for cubing enthusiasts at IIT Bombay. Promotes speedcubing and puzzle-solving through competitions and workshops. Nurtures problem-solving skills across 2×2, NxN, and complex twisty puzzles — something for every puzzle lover.',
    link: 'https://www.instagram.com/rubiksclub_iitb/',
    linkLabel: 'Instagram → @rubiksclub_iitb',
  },
];

const cards = [
  {
    title: 'Institute Chess Open (Rapid)',
    content:
      'A rapid-format open chess tournament open to all campus residents. The Institute Chess Open is one of the highest-participation fixtures on the board games calendar, drawing players across all rating ranges in a fast-paced, competitive format.',
  },
  {
    title: 'Institute Chess Championship',
    content:
      'The flagship classical-format chess tournament of IIT Bombay, recognising the strongest chess player on campus. Run over multiple rounds with standard time controls, the Championship is the most prestigious individual title in institute chess.',
  },
  {
    title: 'Institute Chess League',
    content:
      'A league-format chess tournament ensuring every registered player competes in multiple matches across the semester. The league structure rewards consistency and depth, making it one of the most competitive fixtures in the board games programme.',
  },
  {
    title: 'Chess General Championship',
    content:
      'The inter-hostel chess general championship, where hostels field teams in a competitive bracket. Points contribute directly to the overall GC standings, making every match a high-stakes encounter for hostel pride.',
  },
  {
    title: 'Chess: PG Mania',
    content:
      'A dedicated chess tournament for post-graduate students, running alongside the main GC season. PG Mania gives PG residents a focused competitive fixture and contributes to the PG General Championship standings.',
  },
  {
    title: 'Carrom General Championship',
    content:
      'The inter-hostel carrom general championship — one of the most hotly contested indoor sport fixtures on campus. Hostels field players in singles and doubles categories, with the competition drawing large crowds to the Board Games Room.',
  },
];

const galleryImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg11, bg12, bg13, bg14, bg15];

/* ============================================================
   BOARD GAMES
============================================================ */
const BoardGames = () => {
  const [expandedCard, setExpandedCard]       = useState(null);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [slideDir, setSlideDir]               = useState('next');
  const timelineWrapRef                       = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const tablesCount = useCountUp(3, 800);
  const eventsCount = useCountUp(cards.length, 800);

  const toggleContent = (i) => setExpandedCard((prev) => (prev === i ? null : i));

  const handlePrev = useCallback(() => {
    setSlideDir('prev');
    setCurrentIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSlideDir('next');
    setCurrentIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    const el = timelineWrapRef.current;
    if (!el) return undefined;
    let done = false;
    const reveal = () => { if (!done) { done = true; setTimelineVisible(true); } };
    const fallback = setTimeout(reveal, 1200);
    if (typeof IntersectionObserver === 'undefined') { reveal(); return () => clearTimeout(fallback); }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } }),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <div className="aq-root bg-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">G</span>
          <span>IIT Bombay Board Games&nbsp;/&nbsp;New SAC · 2nd Floor</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Chess&nbsp;·&nbsp;Carrom&nbsp;·&nbsp;Pool&nbsp;·&nbsp;Cubing</span>
          <span><strong>365</strong> Days Indoors</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 05</span>
            <span className="sep">§</span>
            <span>Chess&nbsp;·&nbsp;Carrom&nbsp;·&nbsp;Pool&nbsp;·&nbsp;Cubing</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Board Games</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Institute Board Games caters to all who want to learn any kind of board game. With
                a growing culture of Chess, Carrom, and Pool on campus, we also conduct events for
                Snooker, Rubik's Cube, and Foosball. Being fully indoors, we have an opportunity to
                serve students all 365 days. Board Games is not for the lethargic — it is for the
                enthusiastic. Come be a part of Institute Board Games.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Tables</span>
                <span className="v"><em>{tablesCount}</em></span>
                <span className="c">Pool · Snooker · Foosball</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Clubs</span>
                <span className="v"><em>2</em></span>
                <span className="c">DKCC · Rubik's Club</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Fixtures</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Annual events</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Open</span>
                <span className="v"><em>365</em></span>
                <span className="c">Days a year · Indoors</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={bg5} alt="IIT Bombay Board Games" />
          </div>
        </Reveal>

        <WaveDivider />

        {/* ── § 01 FACILITIES ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 01</span>&nbsp;·&nbsp;Facilities
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              What's <span className="italic">on offer</span>.
            </h2>
            <p className="aq-section-sub">New SAC · 2nd Floor · All year round.</p>
          </div>

          <div className="aq-facility-grid">
            {facilities.map((f, i) => (
              <Reveal as="div" key={f.title} className="aq-facility-card" delay={i * 90}>
                <div className="aq-facility-photo">
                  <img src={f.image} alt={f.title} />
                </div>
                <h3 className="aq-facility-title">{f.title}</h3>
                <ul className="aq-facility-bullets">
                  {f.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <PhotoBreak image={bg8} tag="Fig. A" caption="The Board Games Room — New SAC, 2nd Floor." />

        {/* ── § 02 CLUBS ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 02</span>&nbsp;·&nbsp;Our Clubs
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              The <span className="italic">community</span>.
            </h2>
            <p className="aq-section-sub">Two clubs. One home.</p>
          </div>

          <div className="aq-cardgrid">
            {clubs.map((club, i) => (
              <Reveal as="div" key={club.head} className="aq-rulecard" delay={i * 120}>
                <h4 className="aq-rulecard-head">{club.head}</h4>
                <p className="aq-rulecard-body">{club.body}</p>
                <a
                  href={club.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-club-link"
                >
                  {club.linkLabel}
                </a>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* ── § 03 EVENTS ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 03</span>&nbsp;·&nbsp;Events
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              The <span className="italic">fixtures</span>.
            </h2>
            <p className="aq-section-sub">Six tournaments. Tap a headline to read the full brief.</p>
          </div>

          <div className="aq-story-columns">
            {cards.map((card, index) => {
              const isOpen = expandedCard === index;
              return (
                <div
                  key={card.title}
                  className={`aq-story ${isOpen ? 'is-open' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleContent(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleContent(index); }
                  }}
                  aria-expanded={isOpen}
                >
                  <div className="aq-story-photo">
                    <img src={galleryImages[index % galleryImages.length]} alt={card.title} />
                  </div>
                  <span className="aq-story-no">N&deg;&nbsp;{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="aq-story-title">{card.title}</h3>
                  <p className={`aq-story-content ${isOpen ? 'is-full' : 'is-clamped'}`}>
                    {card.content}
                  </p>
                  <span className="aq-story-toggle">{isOpen ? 'Close —' : 'Continue reading →'}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <PhotoBreak image={bg12} tag="Fig. B" caption="Institute Chess Championship — round in progress." />

        {/* ── § 04 ACHIEVEMENTS ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 04</span>&nbsp;·&nbsp;Achievements
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              The <span className="italic">record</span>.
            </h2>
          </div>
          <div
            ref={timelineWrapRef}
            className={`aq-timeline-wrap ${timelineVisible ? 'is-visible' : ''}`}
          >
            <Timel />
          </div>
        </Reveal>

        {/* ── § 05 CONTACT ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 05</span>&nbsp;·&nbsp;Contact
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Get in <span className="italic">touch</span>.
            </h2>
          </div>
          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img alt="Varad Walde" src={varad} className="aq-contact-img" />
              <p className="aq-contact-name">Varad Walde</p>
              <p className="aq-contact-role">Institute Board Games Secretary</p>
              <p className="aq-contact-detail">+91 77220 97837</p>
            </div>
          </div>
        </Reveal>

        {/* ── § 06 GALLERY ── */}
        <Reveal as="section" className="aq-section aq-gallery-section">
          <div className="aq-eyebrow">
            <span className="num">§ 06</span>&nbsp;·&nbsp;Gallery
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              From the <span className="italic">room</span>.
            </h2>
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Board Games gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Board Games&nbsp;·&nbsp;New SAC</span>
            </div>
            <button className="aq-strip-btn aq-strip-prev" onClick={handlePrev} aria-label="Previous photo">←</button>
            <button className="aq-strip-btn aq-strip-next" onClick={handleNext} aria-label="Next photo">→</button>
          </div>

          <div className="aq-strip-thumbs">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`aq-strip-thumb ${index === currentIndex ? 'is-active' : ''}`}
                onClick={() => { setSlideDir(index > currentIndex ? 'next' : 'prev'); setCurrentIndex(index); }}
                aria-label={`Go to photo ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── § 07 LOCATION ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 07</span>&nbsp;·&nbsp;Location
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Find <span className="italic">us</span>.
            </h2>
            <p className="aq-section-sub">New SAC · 2nd Floor · IITB New Gymkhana</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7538.855698547374!2d72.90781494213336!3d19.132740178333854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1719953908712!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Board Games Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Board Games&nbsp;·&nbsp;Chess · Carrom · Pool</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default BoardGames;