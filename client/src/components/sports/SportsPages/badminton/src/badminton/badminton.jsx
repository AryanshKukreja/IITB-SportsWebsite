import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
//import './badminton.css';
import Timel from './timeline';
import bm1 from '../assets/bm1.jpeg';
import bm2 from '../assets/bm2.jpeg';
import bm3 from '../assets/bm3.jpeg';
import bm4 from '../assets/bm4.jpeg';
import bm5 from '../assets/bm5.jpeg';
import bm6 from '../assets/bm6.jpeg';
import bm7 from '../assets/bm7.jpeg';
import bm8 from '../assets/bm8.jpeg';
import user from '../assets/user.jpg';

const Badminton = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Institute Badminton Open (IBO)',
      content: 'The flagship individual tournament bringing together badminton players across all batches to compete for the Institute singles and doubles titles.'
    },
    {
      title: 'Institute Badminton League (IBL)',
      content: 'Franchise-style league where top campus players are drafted into competitive teams, featuring intense round-robin fixtures and playoffs.'
    },
    {
      title: 'General Championship',
      content: 'Inter-hostel general championship where hostel squads clash for supreme bragging rights and valuable GC points.'
    },
    {
      title: 'Institute Freshman Open',
      content: 'Dedicated tournament designed for incoming first-year students to showcase their racquet skills and join the institute team pipeline.'
    },
    {
      title: 'PGGC',
      content: 'Postgraduate General Championship celebrating the badminton talent among M.Tech, M.Des, M.Sc, and Ph.D. scholars.'
    },
    {
      title: 'Battle of Batches',
      content: 'Competitive intra-campus tournament pitting senior and junior year batches against each other in team matches.'
    }
  ];

  const images = [bm1, bm2, bm3, bm4, bm6, bm7, bm8].filter(Boolean);

  const captions = [
    "Smash Practice",
    "Court Action",
    "Doubles Match",
    "Training Drill",
    "Team Photo",
    "Tournament Play",
    "Campus Cup"
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

  const safeImages = images?.length > 0 ? images : [bm1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">B</span>
          IITB Badminton
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
            Badminton
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Badmin<span className="italic">ton</span>
              </h1>
              <p className="aq-hero-lede">
                Badminton is one of the most popular sports on our campus, catering to all residents including students, professors, and staff members. Located right in front of Hostel 2 and beside the Swimming Pool in the Old Gymkhana, the courts are a constant hub of energy, high-velocity rallies, and dedicated training throughout the year.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v">7<em></em></span>
                <span className="c">Synthetic flooring indoor hall</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Climate</span>
                <span className="v">AC<em></em></span>
                <span className="c">Centralised air conditioning</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">Leagues, IBO &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Location</span>
                <span className="v">H2<em></em></span>
                <span className="c">Opposite Hostel 2</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={bm1 || bm5} alt="IITB Badminton Hall" />
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
              Indoor <span className="italic">Badminton Hall</span>
            </h2>
            <p className="aq-section-sub">State-of-the-art synthetic courts with professional coaching support</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={bm5 || bm2} alt="7 Synthetic Courts with AC" />
              </div>
              <h3 className="aq-facility-title">7 Synthetic AC Courts</h3>
              <p className="aq-facility-body">
                Our institute features a separate, dedicated indoor badminton hall equipped with <strong>7 synthetic flooring courts</strong> built with a centralised air conditioning system for optimal playing conditions in all seasons.
              </p>
            </div>

            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={bm3 || bm4} alt="Coaching & Guidance" />
              </div>
              <h3 className="aq-facility-title">Coaching &amp; Mentorship</h3>
              <p className="aq-facility-body">
                We have a dedicated coach and sports officer providing professional training, tactical guidance, and fitness drills for the institute team as well as developing campus players.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={bm7 || bm1} alt="Badminton Action" />
          <div className="aq-photobreak-caption">
            <span>High Voltage Rallies</span>
            <span>IITB Badminton · Precision &amp; Agility</span>
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
            <p className="aq-section-sub">Podium finishes at the Inter-IIT Sports Meet</p>
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
            <p className="aq-section-sub">Reach out to our coach and institute secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Shelendra Rasaniya" className="aq-contact-img" />
              <p className="aq-contact-name">Shelendra Rasaniya</p>
              <p className="aq-contact-role">Coach &amp; Sports Officer</p>
              <p className="aq-contact-detail">+91 97939 90585</p>
            </div>
            <div className="aq-contact-card">
              <img src={user} alt="J Sai Charan" className="aq-contact-img" />
              <p className="aq-contact-name">J Sai Charan</p>
              <p className="aq-contact-role">Institute Badminton Secretary</p>
              <p className="aq-contact-detail">+91 73581 79779</p>
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
            Moments from the <span className="italic">Court</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Badminton Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Badminton'}</span>
            <span>IITB Badminton · {safeIndex + 1} / {safeImages.length}</span>
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
              Find the <span className="italic">Courts</span>
            </h2>
            <p className="aq-section-sub">Badminton Court, Old Gymkhana, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.3410964230648!2d72.91128878064984!3d19.1355206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80707f747dd%3A0x2836a7e40ba1c6e5!2sBadminton%20Court!5e0!3m2!1sen!2sin!4v1720102713953!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Badminton Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Badminton · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};
=======
import councilLogo from '../../../../../Contact/pictures/Logos_for_Photos/IITB Sports Logo BW.png';
import radhika from '../../../../../Contact/pictures/Logos_for_Photos/radhika.JPG';

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
    title: 'Indoor Badminton Hall',
    image: bm5,
    bullets: [
      '7 courts with professional synthetic flooring.',
      'Centralised air conditioning for comfortable year-round play.',
      'Dedicated changing rooms and equipment storage.',
    ],
  },
  {
    title: 'Dedicated Coach',
    image: bm2,
    bullets: [
      'Full-time coaching from Shelendra Rasaniya, Sports Officer.',
      'Structured training sessions for institute players across all skill levels.',
    ],
  },
  {
    title: 'Open to All',
    image: bm3,
    bullets: [
      'Courts available to students, professors, and all campus staff.',
      'Located in the Old Gymkhana — in front of Hostel 2, beside the Swimming Pool.',
    ],
  },
  {
    title: 'Equipment',
    image: bm4,
    bullets: [
      'Rackets and shuttlecocks available for loan during open sessions.',
      'All courts equipped with standard BWF-compliant nets and lighting.',
    ],
  },
];

const cards = [
  {
    title: 'Institute Badminton Open (IBO)',
    content:
      'The flagship open tournament of IIT Bombay Badminton, open to all campus residents. Players across skill levels compete across singles, doubles, and mixed doubles categories in a knock-out format.',
  },
  {
    title: 'Institute Badminton League (IBL)',
    content:
      'A league-format tournament that ensures every registered team plays multiple matches. The IBL is designed to maximise court time and competitive experience across the semester.',
  },
  {
    title: 'General Championship',
    content:
      'The inter-hostel Badminton General Championship — the most hotly contested fixture on the campus badminton calendar. Hostels field squads in singles and doubles categories, with points feeding into the overall GC standings.',
  },
  {
    title: 'Institute Freshman Open',
    content:
      'An open tournament exclusively for first-year students, giving freshers their first competitive badminton experience on campus in a supportive, high-energy environment.',
  },
  {
    title: 'PGGC',
    content:
      'The Post-Graduate General Championship — a dedicated inter-hostel badminton competition for PG students, mirroring the format of the main GC and running alongside the broader sports calendar.',
  },
  {
    title: 'Battle of Batches',
    content:
      'An annual grudge match between graduating batches, where each year group fields its best players in a team-format showdown to claim bragging rights before graduation.',
  },
];

const galleryImages = [bm1, bm2, bm3, bm4, bm6, bm7, bm8];

/* ============================================================
   BADMINTON
============================================================ */
const Badminton = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('next');
  const timelineWrapRef = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const courtsCount = useCountUp(7, 800);
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
    <div className="aq-root bm-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">B</span>
          <span>IIT Bombay Badminton&nbsp;/&nbsp;Old Gymkhana</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Coach&nbsp;<strong>Shelendra Rasaniya</strong></span>
          <span><strong>7</strong> Indoor Courts</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 03</span>
            <span className="sep">§</span>
            <span>Racket Sports&nbsp;·&nbsp;Old Gymkhana</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Badminton</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Badminton is one of the most popular sports on campus, and we cater to everyone —
                students, professors, and all staff members. Located in front of Hostel 2 and beside
                the Swimming Pool in the Old Gymkhana, the facility runs year-round with a dedicated
                coach, seven air-conditioned synthetic courts, and a packed calendar of events that
                keep competition fierce and participation high.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Indoor Courts</span>
                <span className="v"><em>{courtsCount}</em></span>
                <span className="c">Synthetic flooring · A/C</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v" style={{ fontSize: '1.2rem', lineHeight: 1.4 }}>
                  Shelendra<em> R.</em>
                </span>
                <span className="c">Sports Officer</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Fixtures</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Annual tournaments</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Open to</span>
                <span className="v" style={{ fontSize: '1.2rem', lineHeight: 1.4 }}>
                  All<em> campus</em>
                </span>
                <span className="c">Students · Staff · Faculty</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={bm1} alt="IIT Bombay Badminton courts" />
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
            <p className="aq-section-sub">Seven courts. One membership. Everyone welcome.</p>
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

        <PhotoBreak image={bm6} tag="Fig. A" caption="The indoor hall — seven courts, full capacity." />

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

        <PhotoBreak image={bm7} tag="Fig. B" caption="General Championship — hostel rivalries at their finest." />

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
              <img alt="Shelendra Rasaniya" src={councilLogo} className="aq-contact-img" />
              <p className="aq-contact-name">Shelendra Rasaniya</p>
              <p className="aq-contact-role">Coach, Sports Officer</p>
              <p className="aq-contact-detail">+91 97939 90585</p>
            </div>
            <div className="aq-contact-card">
              <img alt="Radhika Bansal" src={radhika} className="aq-contact-img" />
              <p className="aq-contact-name">Radhika Bansal</p>
              <p className="aq-contact-role">Institute Badminton Secretary</p>
              <p className="aq-contact-detail">+91 96495 70774</p>
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
              From the <span className="italic">court</span>.
            </h2>
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Badminton gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Badminton&nbsp;·&nbsp;Old Gymkhana</span>
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
            <p className="aq-section-sub">Old Gymkhana&nbsp;·&nbsp;Opp. Hostel 2&nbsp;·&nbsp;IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.3410964230648!2d72.91128878064984!3d19.1355206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80707f747dd%3A0x2836a7e40ba1c6e5!2sBadminton%20Court!5e0!3m2!1sen!2sin!4v1720102713953!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Badminton Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Badminton&nbsp;·&nbsp;Old Gymkhana</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer>

      </div>
    </div>
  );
};

export default Badminton;