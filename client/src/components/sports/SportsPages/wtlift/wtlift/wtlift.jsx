import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './wtlift.css';
import Timel from './timeline';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import p6 from '../assets/p6.jpg';
import user from '../../../../Contact/pictures/Logos_for_Photos/Prateek.jpg';

const Wtlift = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'NSO Scheme',
      content: 'National Sports Organization academic training scheme providing structured bi-weekly weightlifting, snatch, and clean-and-jerk coaching for undergraduate freshmen.'
    },
    {
      title: 'Weightlifting GC',
      content: 'Inter-hostel general championship where lifters compete across weight classes to establish overall hostel strength supremacy.'
    },
    {
      title: 'Arm Wrestling Open',
      content: 'High-energy campus open tournament testing arm strength, grip, and leverage.'
    },
    {
      title: 'Calisthenics Open',
      content: 'Bodyweight strength competition showcasing pulls, muscle-ups, levers, and isometric holds.'
    },
    {
      title: 'Bodybuilding Open',
      content: 'Annual physique and muscularity competition celebrating campus bodybuilders.'
    },
    {
      title: 'Crossfit Challenge & Calisthenics GC',
      content: 'High-intensity endurance and bodyweight strength challenges testing overall athletic conditioning.'
    }
  ];

  const images = [p1, p2, p3, p4, p5, p6].filter(Boolean);

  const captions = [
    "Barbell Snatch Lift",
    "Clean & Jerk Technique",
    "Nelco Olympic Rods & Platforms",
    "Strength Training Session",
    "Calisthenics & Bodybuilding",
    "Institute Weightlifting Squad"
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

  const safeImages = images?.length > 0 ? images : [p3];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">W</span>
          IITB Weightlifting
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
            Weightlifting
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Weight<span className="italic">lifting</span>
              </h1>
              <p className="aq-hero-lede">
                Weightlifting is an Olympic discipline consisting of two main lifts: the snatch and the clean and jerk. Led for 20+ years by Head Coach Vijay Sonigra (retired Nationals lifter and former Maharashtra coach), the Weightlifting Club cultivates explosive power, mobility, joint health, and world-class strength.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Plates</span>
                <span className="v">Max<em></em></span>
                <span className="c">More plates than Old+New SAC combined</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v">20<em>yr+</em></span>
                <span className="c">Coach Vijay Sonigra (Ex-State Head)</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">7<em>+</em></span>
                <span className="c">GCs, Arm Wrestling &amp; Calisthenics</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Equipment</span>
                <span className="v">Nelco<em></em></span>
                <span className="c">State-level Olympic rods &amp; platforms</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={p3 || p1} alt="IITB Weightlifting Room" />
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
              Weightlifting <span className="italic">Room</span>
            </h2>
            <p className="aq-section-sub">State-level Olympic bars, platforms, and specialized strength machinery</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={p3 || p2} alt="Nelco Bars & Platforms" />
              </div>
              <h3 className="aq-facility-title">Nelco Olympic Rods &amp; Platforms</h3>
              <p className="aq-facility-body">
                The Weightlifting Room contains state-level <strong>Nelco Olympic weightlifting rods, powerlifting bars, and heavy-duty wooden platforms</strong>. Equipped with lat pulldowns, leg presses, hyper-extension units, forearm machinery, and daily 6 PM – 9 PM coaching support.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={p1 || p3} alt="Weightlifting Lift" />
          <div className="aq-photobreak-caption">
            <span>Explosive Strength</span>
            <span>IITB Weightlifting · Power, Technique &amp; Record Breaking</span>
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
            <p className="aq-section-sub">Inter-IIT Sports Meet strength medals</p>
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
            <p className="aq-section-sub">Reach out to our institute weightlifting secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Prateek Behera" className="aq-contact-img" />
              <p className="aq-contact-name">Prateek Behera</p>
              <p className="aq-contact-role">Institute Weightlifting Secretary</p>
              <p className="aq-contact-detail">+91 62979 57507</p>
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
            Moments from the <span className="italic">Platform</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Weightlifting Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Weightlifting'}</span>
            <span>IITB Weightlifting · {safeIndex + 1} / {safeImages.length}</span>
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
              Find the <span className="italic">Room</span>
            </h2>
            <p className="aq-section-sub">Weightlifting Room, Student Activity Center, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.379737570415!2d72.91305249999999!3d19.134848050000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b809cdbb26f9%3A0x1bc7aa048f060162!2sStudents%20Activity%20Center!5e0!3m2!1sen!2sin!4v1722158615027!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Weightlifting Room Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Weightlifting · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

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
    title: 'Weightlifting Room',
    image: p3,
    bullets: [
      'Many Nelco weightlifting rods up to state-level standards, plus powerlifting rods and platforms for training.',
      'Fun fact: the room holds more weight plates than the Old SAC and New SAC gyms combined.',
    ],
  },
  {
    title: 'Coaching',
    image: p1,
    bullets: [
      'A dedicated coach is present from 6 PM \u2013 9 PM on weekdays.',
      'Led by Vijay Sonigra, a retired Nationals weightlifter and former Maharashtra Weightlifting Team coach, with 20+ years coaching the club.',
    ],
  },
  {
    title: 'Machines',
    image: p2,
    bullets: [
      'Lat pulldown, leg extension/curl, and leg press machines.',
      'Forearm machine, hyperextension machine, and other accessory equipment.',
    ],
  },
];

const cards = [
  {
    title: 'NSO',
    content:
      'Part of the Government of India\u2019s National Sports Organization scheme, under which all incoming first-year IIT students sign up for a sport and undergo structured training. Weightlifting sessions run through the semester under Vijay Sonigra\u2019s coaching, covering the snatch, the clean and jerk, and foundational strength work.',
  },
  {
    title: 'Weightlifting GC',
    content:
      'The Weightlifting General Championship pits hostel athletes against each other across weight classes in the snatch and clean and jerk. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'Arm Wrestling Open',
    content:
      'An open tournament testing raw strength and technique across weight categories, welcoming competitors of all experience levels. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'Calisthenics Open',
    content:
      'An open competition showcasing bodyweight strength, control, and skill work. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'Bodybuilding Open',
    content:
      'An open stage competition judged on physique, conditioning, and presentation. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'Crossfit Challenge',
    content:
      'A high-intensity, mixed-modal event combining strength, conditioning, and endurance workouts. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'Calisthenics GC',
    content:
      'The Calisthenics General Championship brings hostel athletes together to compete in bodyweight strength and skill movements. Details for this year\u2019s edition will be announced soon.',
  },
];

const galleryImages = [p1, p2, p3, p4, p5, p6];

/* ============================================================
   WEIGHTLIFTING
============================================================ */
const Wtlift = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir]         = useState('next');

  const eventsCount = useCountUp(cards.length, 800);
  const yearsCount   = useCountUp(20, 800);

  const toggleContent = (i) => setExpandedCard((prev) => (prev === i ? null : i));

  const handlePrev = useCallback(() => {
    setSlideDir('prev');
    setCurrentIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSlideDir('next');
    setCurrentIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1));
  }, []);

  return (
    <div className="aq-root wl-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">WL</span>
          <span>IIT Bombay Weightlifting&nbsp;/&nbsp;Students' Activity Centre</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Coach&nbsp;<strong>Vijay Sonigra</strong></span>
          <span><strong>20+</strong> Years Coaching the Club</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 14</span>
            <span className="sep">§</span>
            <span>Weightlifting&nbsp;·&nbsp;Students' Activity Centre</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Weightlifting</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Weightlifting is a strength sport in which athletes attempt to lift heavy weights
                mounted on barbells in a series of highly technical movements — an Olympic
                discipline built on two lifts, the snatch and the clean and jerk, demanding
                explosive power, flexibility, balance, coordination, and mental focus. Led by Vijay
                Sonigra, a retired Nationals player and former Maharashtra Weightlifting Team coach,
                the club is a community of hardworking athletes united by one goal: getting
                stronger, pushing limits, and breaking records.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Coaching</span>
                <span className="v"><em>{yearsCount}+</em></span>
                <span className="c">Years under Vijay Sonigra</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Annual Events</span>
                <span className="v">{eventsCount}</span>
                <span className="c">GCs, opens &amp; challenges</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Core Lifts</span>
                <span className="v" style={{ fontSize: '1.05rem' }}>
                  <em>Snatch · C&amp;J</em>
                </span>
                <span className="c">Olympic weightlifting</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Secretary</span>
                <span className="v" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
                  <em>Prateek</em>
                </span>
                <span className="c">Institute Weightlifting Secretary</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={p1} alt="IIT Bombay Weightlifting" />
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
            <p className="aq-section-sub">State-level rods · Full machine stack · Coached daily.</p>
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

        <PhotoBreak image={p4} tag="Fig. A" caption="Training under Coach Vijay Sonigra's watch." />

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
            <p className="aq-section-sub">Seven events. Tap a headline to read the full brief.</p>
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

        <PhotoBreak image={p5} tag="Fig. B" caption="Weightlifting GC — the season's marquee meet." />

        {/* ── § 03 CONTACT ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 03</span>&nbsp;·&nbsp;Contact
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Get in <span className="italic">touch</span>.
            </h2>
          </div>
          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img alt="Prateek Behera" src={user} className="aq-contact-img" />
              <p className="aq-contact-name">Sayam</p>
              <p className="aq-contact-role">Institute Weightlifting Secretary</p>
              <p className="aq-contact-detail">+91 77424 26328</p>
            </div>
          </div>
        </Reveal>

        {/* ── § 04 GALLERY ── */}
        <Reveal as="section" className="aq-section aq-gallery-section">
          <div className="aq-eyebrow">
            <span className="num">§ 04</span>&nbsp;·&nbsp;Gallery
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
              alt={`Weightlifting gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Weightlifting&nbsp;·&nbsp;SAC</span>
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

        {/* ── § 05 LOCATION ── */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 05</span>&nbsp;·&nbsp;Location
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Find <span className="italic">us</span>.
            </h2>
            <p className="aq-section-sub">Students' Activity Centre&nbsp;·&nbsp;IIT Bombay&nbsp;·&nbsp;Powai</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.379737570415!2d72.91305249999999!3d19.134848050000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b809cdbb26f9%3A0x1bc7aa048f060162!2sStudents%20Activity%20Center!5e0!3m2!1sen!2sin!4v1722158615027!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Weightlifting Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Weightlifting&nbsp;·&nbsp;SAC</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Wtlift;