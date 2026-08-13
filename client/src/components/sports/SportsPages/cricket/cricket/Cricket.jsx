import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './cricket.css';
import Timel from './timeline';
import cricket1 from '../images/cricket_1.jpg';
import cric1 from '../images/cric1.jpg';
import cric2 from '../images/cric2.jpg';
import cric3 from '../images/cric3.jpg';
import cric4 from '../images/cric4.jpg';
import cricketLogo from '../../../../Contact/pictures/Logos_for_Photos/Cricket.png';
import param from '../../../../Contact/pictures/Logos_for_Photos/param.JPG';
import user from '../../../../Contact/pictures/Logos_for_Photos/param.JPG';

const LegacyCricket = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'NSO',
      content: "It's a part of the academic curriculum for the undergraduate students. Through selections for students who opted for cricket, nearly 30-40 are selected and trained throughout the academic year, 2 days a week (Monday and Tuesday)."
    },
    {
      title: 'Cricmania',
      content: 'It is the flagship open tournament for Cricket in IIT Bombay. This tournament is open to all students, alumni, professors and staff. It is held in the Spring Semester. Highly competitive and a must-play for all cricket enthusiasts as it presents a great opportunity for intermediates to test their skills against experienced Inter-IIT players.'
    },
    {
      title: 'Cricket GC',
      content: 'This is the inter-hostel cricket tournament which takes place every year on the main ground in which hostels bring their best players to win and grab valuable points for the sports General Championship. It comprises 15-over matches played with white balls in January.'
    },
    {
      title: 'Mixed Cricket League',
      content: "It's a fun event taking place in the Open Air Theatre (OAT) where 32 teams each comprising 5 guys and 2 girls play against each other with street cricket rules. It usually takes place in October."
    },
    {
      title: 'FreshMan League',
      content: 'Initiated to give freshmen an opportunity to showcase their talent gained through NSO, GC, Cricmania and camps. The league of 4 bidding-formed teams takes place in March, serving as a breeding ground for future Inter-IIT stars.'
    }
  ];

  const images = [cricket1, cric1, cric2, cric3, cric4].filter(Boolean);

  const captions = [
    "Inter-IIT Gold Champions",
    "Main Ground Match",
    "Day & Night Cricket",
    "Net Practice Session",
    "Team Huddle"
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

  const safeImages = images?.length > 0 ? images : [cricket1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">C</span>
          IITB Cricket
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
            Cricket
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Cric<span className="italic">ket</span>
              </h1>
              <p className="aq-hero-lede">
                Cricket is as much a religion at IIT Bombay as it is across the country. From Day &amp; Night matches on our main field to late-night sessions in the Indoor Nets, the passion runs deep. Last year, the institute made history by winning Gold in Inter-IIT Cricket after 16 years — a proud moment for the entire campus!
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Ground</span>
                <span className="v">Main<em></em></span>
                <span className="c">Full-size main Oval ground</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Indoor Nets</span>
                <span className="v">4<em></em></span>
                <span className="c">Pitches opposite Hostel 3</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">5<em>+</em></span>
                <span className="c">Cricmania, GC &amp; Leagues</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Inter-IIT</span>
                <span className="v">GOLD<em></em></span>
                <span className="c">2024 Gold Medallists</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={cricket1 || cric1} alt="IITB Cricket Team" />
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
              Main Ground &amp; <span className="italic">Indoor Nets</span>
            </h2>
            <p className="aq-section-sub">State-of-the-art turf, floodlights, and year-round practice nets</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={cric2 || cricket1} alt="Main Ground & Floodlights" />
              </div>
              <h3 className="aq-facility-title">Main Ground &amp; Night Lights</h3>
              <p className="aq-facility-body">
                The main cricket ground is situated in the heart of the gymkhana bordered by the athletic track. High-intensity floodlights are installed on the gymkhana structure to enable top-tier Day &amp; Night matches for institute tournaments and General Championships.
              </p>
            </div>

            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={cric3 || cric4} alt="Indoor Nets & Monsoon Pitches" />
              </div>
              <h3 className="aq-facility-title">4 Indoor Nets &amp; monsoon pitches</h3>
              <p className="aq-facility-body">
                There are <strong>4 indoor cricket pitches</strong> located directly opposite Hostel 3 for uninterrupted monsoon practice and late-night net sessions. Customized net pitches and full gear bags ensure players develop skills year-round.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={cric1 || cricket1} alt="Cricket Match Action" />
          <div className="aq-photobreak-caption">
            <span>Inter-IIT Champions</span>
            <span>IITB Cricket · Passion, Skill &amp; Glory</span>
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
            <p className="aq-section-sub">Inter-IIT Gold Champions &amp; historic podium finishes</p>
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
            <p className="aq-section-sub">Reach out to our institute cricket secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Pradyumna Gugulothu" className="aq-contact-img" />
              <p className="aq-contact-name">Pradyumna Gugulothu</p>
              <p className="aq-contact-role">Institute Cricket Secretary</p>
              <p className="aq-contact-detail">+91 70139 54490</p>
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
            Moments from the <span className="italic">Field</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Cricket Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Cricket'}</span>
            <span>IITB Cricket · {safeIndex + 1} / {safeImages.length}</span>
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
            <p className="aq-section-sub">Cricket Ground, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3869185665076!2d72.90968797511066!3d19.134533450132537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820fd0657%3A0xe732ba0e0eb134b1!2sCricket%20Ground!5e0!3m2!1sen!2sin!4v1720263060691!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Cricket Ground Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Cricket · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

const imageAlignments = {
  [cric3]: '50% 29%',
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
      <img 
        src={image} 
        alt={caption} 
        className="aq-photobreak-img" 
        style={imageAlignments[image] ? { objectPosition: imageAlignments[image] } : {}}
      />
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
    title: 'Main Cricket Ground',
    image: cricket1,
    bullets: [
      'Situated in the heart of the Gymkhana, bordered by the athletic tracks.',
      'New floodlights installed to facilitate Day & Night matches on the main field.',
    ],
  },
  {
    title: 'Indoor Nets',
    image: cric1,
    bullets: [
      '4 indoor cricket pitches for practice during the Monsoon season.',
      'Located just opposite Hostel 3 — customised pitches upcoming.',
    ],
  },
  {
    title: 'Equipment',
    image: cric3,
    bullets: [
      'Institute Cricket team is fully equipped with all necessary gear.',
      'White balls, protective equipment, and training aids provided for GC and open events.',
    ],
  },
  {
    title: 'Open to New Talent',
    image: cric4,
    bullets: [
      'New players are welcomed, given space and opportunity to grow and develop game skills.',
      'NSO training runs 2 days a week (Mon & Tue), open to ~30–40 selected students.',
    ],
  },
];

const cards = [
  {
    title: 'NSO',
    content:
      'Part of the academic curriculum for undergraduate students. Through selections, 30–40 students who opted for cricket are trained throughout the academic year, two days a week (Monday and Tuesday). NSO is the structured entry point for serious cricket development at IITB.',
  },
  {
    title: 'Cricmania',
    content:
      'The flagship open tournament for Cricket at IIT Bombay. Open to all students, alumni, professors, and staff, it is held in the Spring Semester. Highly competitive, it is a must-play for all cricket enthusiasts — an especially valuable platform for intermediates to go up against experienced Inter-IIT team members.',
  },
  {
    title: 'Cricket GC',
    content:
      'The inter-hostel cricket tournament held annually on the main ground. Hostels bring their best players to compete for valuable General Championship points. Comprises 15-over matches played with white balls, taking place in January.',
  },
  {
    title: 'Mixed Cricket League',
    content:
      'A fun event held at the Open Air Theatre (OAT) where 32 teams — each of 5 guys and 2 girls — play against each other with rules similar to street cricket. Usually takes place in October, it\'s one of the most inclusive and high-energy events on the cricket calendar.',
  },
  {
    title: 'Freshman League',
    content:
      'A league initiated to give freshmen an opportunity to showcase talent developed through NSO, GC, Cricmania, and camps. Four teams formed through bidding compete in March. It has been a consistent source of raw talent and an encouragement for cricket enthusiasts to pursue the game throughout their time at the institute.',
  },
];

const galleryImages = [cricket1, cric1, cric2, cric3, cric4];

/* ============================================================
   CRICKET
============================================================ */
const Cricket = () => {
  const [expandedCard, setExpandedCard]       = useState(null);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [slideDir, setSlideDir]               = useState('next');
  const timelineWrapRef                       = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const pitchCount  = useCountUp(4, 800);
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
    <div className="aq-root cr-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">C</span>
          <span>IIT Bombay Cricket&nbsp;/&nbsp;Main Ground &amp; Indoor Nets</span>
        </div>
        <div className="aq-masthead-meta">
          <span><strong>Gold</strong>&nbsp;·&nbsp;Inter-IIT 2023–24</span>
          <span><strong>4</strong> Indoor Pitches</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 06</span>
            <span className="sep">§</span>
            <span>Cricket&nbsp;·&nbsp;Main Ground &amp; Indoor Nets</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Cricket</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Cricket is as much a religion at IIT Bombay as it is across the country. From Day
                &amp; Night matches on our main field to late-night sessions in the Indoor Nets,
                the passion runs deep. Last year, the institute made history by winning Gold in
                Inter-IIT Cricket after 16 years — a proud moment for the entire campus.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Indoor Pitches</span>
                <span className="v"><em>{pitchCount}</em></span>
                <span className="c">Opp. Hostel 3</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Last Inter-IIT</span>
                <span className="v" style={{ fontSize: '1.4rem' }}>
                  <em>Gold</em>
                </span>
                <span className="c">After 16 years</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Fixtures</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Annual events</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">NSO Days</span>
                <span className="v"><em>2</em></span>
                <span className="c">Mon &amp; Tue each week</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img 
              src={cricket1} 
              alt="IIT Bombay Cricket Ground" 
              style={imageAlignments[cricket1] ? { objectPosition: imageAlignments[cricket1] } : {}}
            />
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
            <p className="aq-section-sub">Main ground · Indoor nets · Full equipment.</p>
          </div>

          <div className="aq-facility-grid">
            {facilities.map((f, i) => (
              <Reveal as="div" key={f.title} className="aq-facility-card" delay={i * 90}>
                <div className="aq-facility-photo">
                  <img 
                    src={f.image} 
                    alt={f.title} 
                    style={imageAlignments[f.image] ? { objectPosition: imageAlignments[f.image] } : {}}
                  />
                </div>
                <h3 className="aq-facility-title">{f.title}</h3>
                <ul className="aq-facility-bullets">
                  {f.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <PhotoBreak image={cric2} tag="Fig. A" caption="Day & Night — the main ground under the new floodlights." />

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
                    <img 
                      src={galleryImages[index % galleryImages.length]} 
                      alt={card.title} 
                      style={imageAlignments[galleryImages[index % galleryImages.length]] ? { objectPosition: imageAlignments[galleryImages[index % galleryImages.length]] } : {}}
                    />
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

        <PhotoBreak image={cric4} tag="Fig. B" caption="Cricmania — the flagship open tournament, Spring Semester." />

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
              <img alt="Param Shilu" src={param} className="aq-contact-img" />
              <p className="aq-contact-name">Param Shilu</p>
              <p className="aq-contact-role">Institute Cricket Secretary</p>
              <p className="aq-contact-detail">+91 81412 29825</p>
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
              From the <span className="italic">ground</span>.
            </h2>
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Cricket gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
              style={imageAlignments[galleryImages[currentIndex]] ? { objectPosition: imageAlignments[galleryImages[currentIndex]] } : {}}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Cricket&nbsp;·&nbsp;Main Ground</span>
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
            <p className="aq-section-sub">Cricket Ground&nbsp;·&nbsp;IIT Bombay Gymkhana&nbsp;·&nbsp;Powai</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3869185665076!2d72.90968797511066!3d19.134533450132537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820fd0657%3A0xe732ba0e0eb134b1!2sCricket%20Ground!5e0!3m2!1sen!2sin!4v1720263060691!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Cricket Ground Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Cricket&nbsp;·&nbsp;Main Ground &amp; Indoor Nets</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Cricket;