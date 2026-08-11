import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './football.css';
import Timel from './timeline';
import p1 from '../assets/p1.jpeg';
import football_ground from '../assets/football_ground.jpeg';
import football_team from '../assets/football_team.jpeg';
import logo from '../assets/logo.jpeg';
import turf from '../assets/turf.jpeg';
import user from '../../../../Contact/pictures/Logos_for_Photos/Yash.jpg';

const Football = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Institute Turf League',
      content: 'Gaming enthusiasts do cherish this one! It is an open tournament, one of its kind in the institute.'
    },
    {
      title: 'NSO',
      content: 'The Government of India, through its National Sports Organization, provides a scheme in all IITs, where all incoming first year students sign up for a sport and undergo regular coaching.'
    },
    {
      title: 'Freshie Tournament',
      content: 'Freshie tournament is the first competitive event of the even semester. A platform for all the freshmen to show their skills in an 11-on-11 format.'
    },
    {
      title: 'Football GC',
      content: 'The football inter-hostel general championship is the most celebrated football event in the Institute. A professional 11-a-side tournament where hostels battle for GC glory!'
    },
    {
      title: 'Institute Football League',
      content: 'With football being the most followed sport in the Institute, the IFL includes everyone from students to research scholars and professors participating as team managers and players!'
    },
    {
      title: 'Fantasy League',
      content: 'The first of its kind and most recent addition, the Fantasy League conducted on the FPL Platform sees huge participation across the institute!'
    }
  ];

  const images = [p1, football_ground, football_team, logo, turf].filter(Boolean);

  const captions = [
    "11-a-side Match Action",
    "Main Football Ground",
    "Institute Squad",
    "Football Crest",
    "6-a-side Turf Pitch"
  ];
=======
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
    title: '11-a-Side Ground',
    image: football_ground,
    bullets: [
      'Full-size professional football ground at the heart of the Gymkhana.',
      'Hosts Football GC, Institute Football League, and Inter-IIT training camps.',
    ],
  },
  {
    title: '6-a-Side Turf',
    image: turf,
    bullets: [
      'Newly constructed 6-aside turf for smaller-format and recreational play.',
      'Bookable via the IITB Sports App — slot availability visible in real time.',
    ],
  },
  {
    title: 'Training Equipment',
    image: p1,
    bullets: [
      'Full suite of latest training equipment to supplement team practices.',
      'On-site refrigerator for ice packs and a water cooler in the equipment shed.',
    ],
  },
  {
    title: 'Sports App Booking',
    image: football_team,
    bullets: [
      'IITB students can book turf and ground slots directly from the Sports Application.',
      'Timetable view shows all booked and available slots across both surfaces.',
    ],
  },
];

const cards = [
  {
    title: 'Institute Turf League',
    content:
      'One of its kind in the institute — an open turf tournament that draws gaming enthusiasts and serious footballers alike. The compact 6-aside format makes it one of the most fast-paced and entertaining fixtures on the football calendar.',
  },
  {
    title: 'NSO',
    content:
      'The National Sports Organization scheme, available to all first-year students as part of the academic curriculum. Students who opt for Football undergo structured training throughout the year, two days a week, building a strong foundation for competitive play.',
  },
  {
    title: 'Freshie Tournament',
    content:
      'The first competitive football event of the even semester, giving freshmen their first platform to showcase skills developed through NSO and informal play. An 11-on-11 format that mirrors the GC experience for new students.',
  },
  {
    title: 'Football GC',
    content:
      'The most celebrated football event in the institute — the inter-hostel General Championship. A professional 11-a-side tournament where hostels battle for GC glory. Matches are fierce, the stands are packed, and every point counts toward the overall championship.',
  },
  {
    title: 'Institute Football League',
    content:
      'With football being the most followed sport in the institute, the IFL includes everyone — students, research scholars, and even professors participating as team managers and players. The league format ensures maximum matches and maximum involvement.',
  },
  {
    title: 'Fantasy League',
    content:
      'The first of its kind and the most recent addition to the football events calendar. Conducted on the FPL platform, the Fantasy League has seen huge participation across the institute, bringing a new dimension of engagement to the football community.',
  },
];

const galleryImages = [p1, football_ground, football_team, logo, turf];

/* ============================================================
   FOOTBALL
============================================================ */
const Football = () => {
  const [expandedCard, setExpandedCard]       = useState(null);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [slideDir, setSlideDir]               = useState('next');
  const timelineWrapRef                       = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const eventsCount = useCountUp(cards.length, 800);
  const pitchCount  = useCountUp(2, 800);

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
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  const handlePrev = () => {
    setSlideDir('prev');
    setCurrentIndex((i) => (i === 0 ? (images?.length || 1) - 1 : i - 1));
  };

  const handleNext = () => {
    setSlideDir('next');
    setCurrentIndex((i) => (i === (images?.length || 1) - 1 ? 0 : i + 1));
  };

  const handleThumb = (i) => {
    setSlideDir(i > currentIndex ? 'next' : 'prev');
    setCurrentIndex(i);
  };

  const toggleStory = (i) => setOpenStory(openStory === i ? null : i);

  const safeImages = images?.length > 0 ? images : [p1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">F</span>
          IITB Football
        </span>
        <div className="aq-masthead-meta">
          <span>Sports Gymkhana</span>
          <span><strong>IIT Bombay</strong></span>
        </div>
      </header>

      <main className="aq-app">

        {/* ══════════════════════════════════
            §0  HERO / OVERVIEW
        ══════════════════════════════════ */}
        <section className="aq-hero">
          <p className="aq-hero-kicker">
            <span className="vol">Vol. 1</span>
            <span className="sep">◆</span>
            Institute Sports
            <span className="sep">◆</span>
            Football
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Foot<span className="italic">ball</span>
              </h1>
              <p className="aq-hero-lede">
                Football is a family of team sports that involves kicking a ball to score goals. Being the most followed sport at IIT Bombay, the beautiful game brings together students, research scholars, and faculty. Students can easily book turf and ground slots directly through the Sports Application timetable.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Ground</span>
                <span className="v">11<em>s</em></span>
                <span className="c">Full-size 11-a-side field</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Turf</span>
                <span className="v">6<em>s</em></span>
                <span className="c">Newly built 6-a-side turf</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">IFL, Turf League &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Booking</span>
                <span className="v">App<em></em></span>
                <span className="c">Live slot booking on App</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={football_team || football_ground} alt="IITB Football Team" />
          </div>

          <div className="aq-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 30" preserveAspectRatio="none">
              <path className="aq-wave-path aq-wave-path-1"
                d="M0,15 C150,0 300,30 450,15 C600,0 750,30 900,15 C1050,0 1200,30 1200,15" />
              <path className="aq-wave-path aq-wave-path-2"
                d="M0,15 C200,30 400,0 600,15 C800,30 1000,0 1200,15" />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════
            §1  FACILITIES
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">01</span>
            <span className="bar" />
            Facilities
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Main Ground &amp; <span className="italic">Artificial Turf</span>
            </h2>
            <p className="aq-section-sub">State-of-the-art pitches and training equipment</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={football_ground || p1} alt="11-a-side Main Field" />
              </div>
              <h3 className="aq-facility-title">11-a-side Main Field</h3>
              <p className="aq-facility-body">
                IIT Bombay houses a full-size 11-a-side natural grass football ground bordered by the athletic track. It hosts the Inter-IIT squad practices, IFL matches, and the annual Football General Championship.
              </p>
            </div>

            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={turf || p1} alt="6-a-side Artificial Turf" />
              </div>
              <h3 className="aq-facility-title">6-a-side Turf &amp; Equipment</h3>
              <p className="aq-facility-body">
                Features a newly constructed 6-a-side synthetic turf with lighting for evening matches. The facility is equipped with modern training gear, agility ladders, cones, a refrigerator for instant ice packs, and a dedicated water cooler in the shed.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={p1 || football_team} alt="Football Match Action" />
          <div className="aq-photobreak-caption">
            <span>The Beautiful Game</span>
            <span>IITB Football · Passion, Teamwork &amp; Grit</span>
          </div>
        </div>

        {/* ══════════════════════════════════
            §2  EVENTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">02</span>
            <span className="bar" />
            Events &amp; Leagues
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Annual <span className="italic">Tournaments</span>
            </h2>
            <p className="aq-section-sub">Click any event card to view details</p>
          </div>

          <div className="aq-story-columns">
            {(cards || []).map((card, i) => (
              <div
                key={i}
                className={`aq-story${openStory === i ? ' is-open' : ''}`}
                onClick={() => toggleStory(i)}
              >
                <div className="aq-story-photo">
                  <img src={safeImages[i % safeImages.length]} alt={card?.title || 'Event'} />
                </div>
                <span className="aq-story-no">Event {String(i + 1).padStart(2, '0')}</span>
                <h3 className="aq-story-title">{card?.title}</h3>
                <p className={`aq-story-content${openStory === i ? ' is-full' : ' is-clamped'}`}>
                  {card?.content}
                </p>
                <span className="aq-story-toggle">
                  {openStory === i ? '↑ Collapse' : '↓ Read more'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            §3  ACHIEVEMENTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">03</span>
            <span className="bar" />
            Achievements &amp; Honours
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              A Legacy of <span className="italic">Excellence</span>
            </h2>
            <p className="aq-section-sub">Inter-IIT Sports Meet performances</p>
          </div>

          <div className="aq-timeline-wrap">
            <Timel />
          </div>
        </section>

        {/* ══════════════════════════════════
            §4  CONTACT
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">04</span>
            <span className="bar" />
            People &amp; Leadership
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Get in <span className="italic">Touch</span>
            </h2>
            <p className="aq-section-sub">Reach out to our institute football secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Yash Shah" className="aq-contact-img" />
              <p className="aq-contact-name">Yash Shah</p>
              <p className="aq-contact-role">Institute Football Secretary</p>
              <p className="aq-contact-detail">+91 88494 68317</p>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════
          §5  GALLERY
      ══════════════════════════════════ */}
      <section className="aq-gallery-section">
        <div className="aq-eyebrow" style={{ marginTop: '56px', paddingLeft: 'clamp(16px,3vw,48px)' }}>
          <span className="num">05</span>
          <span className="bar" />
          Gallery
        </div>
        <div
          className="aq-section-head"
          style={{ paddingLeft: 'clamp(16px,3vw,48px)', paddingRight: 'clamp(16px,3vw,48px)' }}
        >
          <h2 className="aq-section-title">
            Moments from the <span className="italic">Pitch</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Football Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Football'}</span>
            <span>IITB Football · {safeIndex + 1} / {safeImages.length}</span>
          </div>
          <button className="aq-strip-btn aq-strip-prev" onClick={handlePrev} aria-label="Previous">
            &#8249;
          </button>
          <button className="aq-strip-btn aq-strip-next" onClick={handleNext} aria-label="Next">
            &#8250;
          </button>
        </div>

        <div className="aq-strip-thumbs">
          {(safeImages || []).map((img, i) => (
            <button
              key={i}
              className={`aq-strip-thumb${i === safeIndex ? ' is-active' : ''}`}
              onClick={() => handleThumb(i)}
              aria-label={captions[i] || `Image ${i + 1}`}
            >
              <img src={img} alt={captions[i] || `Thumb ${i + 1}`} />
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          §6  LOCATION
      ══════════════════════════════════ */}
      <div className="aq-app" style={{ paddingTop: '56px' }}>
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">06</span>
            <span className="bar" />
            Location
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Find the <span className="italic">Ground</span>
            </h2>
            <p className="aq-section-sub">Football Ground &amp; Turf, IIT Bombay</p>
=======
    <div className="aq-root fb-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">F</span>
          <span>IIT Bombay Football&nbsp;/&nbsp;Ground &amp; Turf</span>
        </div>
        <div className="aq-masthead-meta">
          <span>11-a-Side Ground&nbsp;·&nbsp;6-a-Side Turf</span>
          <span>Most <strong>followed</strong> sport on campus</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 07</span>
            <span className="sep">§</span>
            <span>Football&nbsp;·&nbsp;Ground &amp; Turf</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Football</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Football is the most followed sport at IIT Bombay. From the 11-a-side General
                Championship to late-evening turf sessions, the passion for the game cuts across
                every year group — students, research scholars, and faculty alike. IITB students
                can book the turf and ground via the Sports App, with slot availability visible
                in real time.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Playing Surfaces</span>
                <span className="v"><em>{pitchCount}</em></span>
                <span className="c">Ground + Turf</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Format</span>
                <span className="v" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
                  11<em>v</em>11
                </span>
                <span className="c">Also 6-a-side turf</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Fixtures</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Annual events</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Booking</span>
                <span className="v" style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                  Sports<em> App</em>
                </span>
                <span className="c">Live slot availability</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={football_ground} alt="IIT Bombay Football Ground" />
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
            <p className="aq-section-sub">Ground · Turf · Equipment · App booking.</p>
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

        <PhotoBreak image={turf} tag="Fig. A" caption="The 6-a-side turf — bookable via the Sports App." />

        {/* ── § 02 EVENTS ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 02</span>&nbsp;·&nbsp;Events
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              The <span className="italic">fixtures</span>.
            </h2>
            <p className="aq-section-sub">Six events. Tap a headline to read the full brief.</p>
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

        <PhotoBreak image={football_team} tag="Fig. B" caption="Football GC — 11-a-side inter-hostel championship." />

        {/* ── § 03 ACHIEVEMENTS ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 03</span>&nbsp;·&nbsp;Achievements
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

        {/* ── § 04 CONTACT ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 04</span>&nbsp;·&nbsp;Contact
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Get in <span className="italic">touch</span>.
            </h2>
          </div>
          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img alt="Yash Shah" src={user} className="aq-contact-img" />
              <p className="aq-contact-name">Aditya Patil</p>
              <p className="aq-contact-role">Institute Football Secretary</p>
              <p className="aq-contact-detail">+91 75079 90444</p>
            </div>
          </div>
        </Reveal>

        {/* ── § 05 GALLERY ── */}
        <Reveal as="section" className="aq-section aq-gallery-section">
          <div className="aq-eyebrow">
            <span className="num">§ 05</span>&nbsp;·&nbsp;Gallery
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              From the <span className="italic">pitch</span>.
            </h2>
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Football gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Football&nbsp;·&nbsp;IIT Bombay</span>
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

        {/* ── § 06 LOCATION ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 06</span>&nbsp;·&nbsp;Location
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Find <span className="italic">us</span>.
            </h2>
            <p className="aq-section-sub">Football Ground&nbsp;·&nbsp;IIT Bombay Gymkhana&nbsp;·&nbsp;Powai</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3869185665076!2d72.90968797511066!3d19.134533450132537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820fd0657%3A0xe732ba0e0eb134b1!2sCricket%20Ground!5e0!3m2!1sen!2sin!4v1720263060691!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Football Ground Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Football&nbsp;·&nbsp;Ground &amp; Turf</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Football;
