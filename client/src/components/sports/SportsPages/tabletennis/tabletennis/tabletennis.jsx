import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './tabletennis.css';
import Timel from './timeline';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import user from '../assets/user.jpg';

const Tabletennis = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Summer & Semester Camps',
      content: 'Structured training camps held across semester breaks and weekends for beginners, intermediate, and advanced players.'
    },
    {
      title: 'NSO Scheme',
      content: 'Undergraduate National Sports Organization scheme providing structured bi-weekly training sessions under Coach Dhaval Karnik.'
    },
    {
      title: 'Table Tennis GC',
      content: 'Inter-hostel General Championship featuring high-stakes singles and doubles rubbers for hostelite supremacy.'
    },
    {
      title: 'Institute Table Tennis League',
      content: 'Franchise team league drafting players across batches for competitive round-robin and playoff action.'
    },
    {
      title: 'Institute Table Tennis Open',
      content: 'Flagship individual open singles and doubles tournament open to students, faculty, and alumni.'
    }
  ];

  const images = [p3, p2, p1, p4, p5].filter(Boolean);

  const captions = [
    "Table Tennis Hall",
    "High-Speed Counter Play",
    "Air-Conditioned Arena",
    "Doubles Match",
    "Team Training Session"
  ];

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
          <span className="aq-crest">T</span>
          IITB Table Tennis
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
            Table Tennis
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Table <span className="italic">Tennis</span>
              </h1>
              <p className="aq-hero-lede">
                Table Tennis at IIT Bombay is a thriving sport defined by passion, precision, and perseverance. Under Coach Dhaval Karnik, the TT community has celebrated notable podium victories at the Inter-IIT Sports Meet. Equipped with world-class tables, specialized flooring, and a training robot, the TT hall provides the ultimate arena.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Tables</span>
                <span className="v">8<em></em></span>
                <span className="c">Stag Americas &amp; 1000Dx</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v">DK<em></em></span>
                <span className="c">Coach Dhaval Karnik</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Climate</span>
                <span className="v">AC<em></em></span>
                <span className="c">Full AC with anti-glare diffusers</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Inter-IIT</span>
                <span className="v">Podium<em>s</em></span>
                <span className="c">2022 &amp; 2023 Medallists</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={p1 || p3} alt="IITB Table Tennis Hall" />
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
              Air-Conditioned <span className="italic">TT Hall</span>
            </h2>
            <p className="aq-section-sub">International standard tables, robot training, and mat flooring</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={p1 || p2} alt="8 World Class Tables" />
              </div>
              <h3 className="aq-facility-title">8 World-Class Tables &amp; Equipment</h3>
              <p className="aq-facility-body">
                The air-conditioned TT hall at Gymkhana contains <strong>8 widely used international tables</strong> (Stag Americas &amp; Stag 1000Dx) with TT-specific matting to prevent slipping. Features 3-star balls, custom rackets, equipment lockers for 30+ players, and a training robot for automated multi-ball drills.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={p2 || p1} alt="Table Tennis Action" />
          <div className="aq-photobreak-caption">
            <span>Precision &amp; Spin</span>
            <span>IITB Table Tennis · Fast Rallies &amp; Podiums</span>
          </div>
        </div>

        {/* ══════════════════════════════════
            §2  EVENTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">02</span>
            <span className="bar" />
            Events &amp; Tournaments
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Annual <span className="italic">Events</span>
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
            <p className="aq-section-sub">Podium finishes at Inter-IIT 2022 &amp; 2023</p>
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
            <p className="aq-section-sub">Reach out to our institute TT secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Sameer Chopra" className="aq-contact-img" />
              <p className="aq-contact-name">Sameer Chopra</p>
              <p className="aq-contact-role">Institute Table Tennis Secretary</p>
              <p className="aq-contact-detail">+91 97177 77763</p>
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
            Moments from the <span className="italic">Arena</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Table Tennis Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Table Tennis'}</span>
            <span>IITB Table Tennis · {safeIndex + 1} / {safeImages.length}</span>
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
              Find the <span className="italic">Hall</span>
            </h2>
            <p className="aq-section-sub">Table Tennis Hall, IITB Gymkhana, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4020806480025!2d72.9093683747526!3d19.133869182082652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1721551340933!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Table Tennis Hall Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Table Tennis · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Tabletennis;
=======
import tableTennisLogo from '../../../../Contact/pictures/Logos_for_Photos/tabletennis.png';

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
    title: 'Eight Tables, AC Hall',
    image: p1,
    bullets: [
      'An air-conditioned court at the Gymkhana with 8 of the most widely used tables in the world, including the Stag Americas and Stag 1000Dx.',
      'Beginner-friendly rackets and balls provided through an issuance system.',
    ],
  },
  {
    title: 'TT-Focused Flooring',
    image: p2,
    bullets: [
      'Floor fully matted with TT-specific flooring to avoid slips and injuries.',
      'Curtains and AC-diffusers being installed to reduce glare and ball wobble.',
    ],
  },
  {
    title: 'Team Practice Gear',
    image: p3,
    bullets: [
      'Ladders, ropes, custom-made rackets, and 3-star balls available for team practice and exercise.',
      'A robot has also been ordered to enhance team practice.',
    ],
  },
  {
    title: 'Lockers & Storage',
    image: p4,
    bullets: [
      'More than 30 players can get access to lockers to store their equipment.',
      'Structured sessions emphasise technique, strategy, and sportsmanship for all skill levels.',
    ],
  },
];

const cards = [
  {
    title: 'Camps',
    content:
      'Regular camps are held for beginners, intermediate, and advanced players, run by Coach Dhaval Karnik. Sessions focus on technique, strategy, and match play, welcoming players of all skill levels across the academic year.',
  },
  {
    title: 'NSO',
    content:
      'Part of the Government of India\u2019s National Sports Organization scheme, under which all incoming first-year IIT students sign up for a sport and undergo structured training. Table tennis sessions run through the semester under coaching staff at the Gymkhana hall.',
  },
  {
    title: 'Table Tennis GC',
    content:
      'The Table Tennis General Championship is one of the most keenly contested hostel events of the season, with teams competing for the title across singles and doubles formats. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'Institute Table Tennis League',
    content:
      'An open-format league bringing together the institute\u2019s strongest players for a season-long competitive circuit. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'Institute Table Tennis Open',
    content:
      'An open tournament for all skill levels, from first-time players to seasoned competitors. Details for this year\u2019s edition will be announced soon.',
  },
];

const galleryImages = [p3, p2, p1, p4, p5];

/* ============================================================
   TABLE TENNIS
============================================================ */
const Tabletennis = () => {
  const [expandedCard, setExpandedCard]       = useState(null);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [slideDir, setSlideDir]               = useState('next');
  const timelineWrapRef                       = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const eventsCount = useCountUp(cards.length, 800);
  const tablesCount = useCountUp(8, 800);

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
    <div className="aq-root tt-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">TT</span>
          <span>IIT Bombay Table Tennis&nbsp;/&nbsp;Gymkhana Hall</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Coach&nbsp;<strong>Dhaval Karnik</strong></span>
          <span>Podium Finishes&nbsp;<strong>2022 &amp; 2023</strong></span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 11</span>
            <span className="sep">§</span>
            <span>Table Tennis&nbsp;·&nbsp;Gymkhana Hall</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Table Tennis</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Table Tennis at IIT Bombay is a thriving sport, defined by passion, precision, and
                perseverance. Under the guidance of Coach Dhaval Karnik, the TT community has seen
                remarkable growth in both participation and performance, with podium finishes at the
                Inter-IIT Sports Meet in 2022 and 2023. Whether it's intense team practices, spirited
                ladder matches, or late-night recreational games, the energy in the TT hall is always
                amazing — players of all skill levels are welcomed and supported.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Tables</span>
                <span className="v"><em>{tablesCount}</em></span>
                <span className="c">Air-conditioned hall</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Annual Events</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Camps, GC &amp; leagues</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Inter-IIT Podiums</span>
                <span className="v" style={{ fontSize: '1.2rem' }}>
                  <em>2022, 2023</em>
                </span>
                <span className="c">Back-to-back finishes</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Secretary</span>
                <span className="v" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
                  <em>Sameer</em>
                </span>
                <span className="c">Institute Table Tennis Secretary</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={p3} alt="IIT Bombay Table Tennis" />
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
            <p className="aq-section-sub">Eight tables · Air-conditioned · World-class kit.</p>
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

        <PhotoBreak image={p5} tag="Fig. A" caption="Team practice in the Gymkhana TT hall." />

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
            <p className="aq-section-sub">Five events. Tap a headline to read the full brief.</p>
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

        <PhotoBreak image={p4} tag="Fig. B" caption="Table Tennis GC — the hostel season's marquee event." />

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
              <img alt="Sameer Chopra" src={tableTennisLogo} className="aq-contact-img" />
              <p className="aq-contact-name">Supan Shah</p>
              <p className="aq-contact-role">Institute Table Tennis Secretary</p>
              <p className="aq-contact-detail">+91 96533 96151</p>
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
              From the <span className="italic">hall</span>.
            </h2>
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Table Tennis gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Table Tennis&nbsp;·&nbsp;Gymkhana Hall</span>
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
            <p className="aq-section-sub">Gymkhana Hall&nbsp;·&nbsp;IIT Bombay&nbsp;·&nbsp;Powai</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4020806480025!2d72.9093683747526!3d19.133869182082652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1721551340933!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Table Tennis Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Table Tennis&nbsp;·&nbsp;Gymkhana Hall</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Tabletennis;
