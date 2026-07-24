import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './frisbee.css';
import Timel from './timeline';
import pic_1 from './assets/pic_1.jpg';
import pic_2 from './assets/pic_2.jpg';
import pic_3 from './assets/pic_3.jpg';
import pic_4 from './assets/pic_4.jpg';
import pic_5 from './assets/pic_5.jpg';
import pic_6 from './assets/pic_6.jpg';

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
    title: 'Equipment',
    image: pic_5,
    bullets: [
      'Ultimate frisbee discs, cones, markers, and bibs for matches and sessions.',
      'Full kit maintained to run camps and tournaments end to end.',
    ],
  },
  {
    title: 'Grounds',
    image: pic_2,
    bullets: [
      'Plays across the Football ground, Hockey ground, Outdoor Turf, Indoor Turf, and Kho-Kho area, as per convenience.',
      'Flexible venue use lets the club run sessions rain or shine.',
    ],
  },
];

const cards = [
  {
    title: 'General Championships',
    content:
      'The club\'s flagship inter-hostel competition, bringing together undergraduates, postgraduates, staff, and alumni to compete for hostel glory on the ultimate field.',
  },
  {
    title: 'Beginners Camp',
    content:
      'An entry point for newcomers to the sport, run by the club to teach the fundamentals of ultimate frisbee — throws, cuts, and the sport\'s self-refereed "Spirit of the Game" ethos.',
  },
  {
    title: 'Women\u2019s Camp',
    content:
      'A dedicated camp welcoming women across campus into the sport, building skills and confidence in a supportive, beginner-friendly environment.',
  },
  {
    title: 'Ultimate Frisbee Open (UFO)',
    content:
      'The club\'s open tournament, welcoming teams and players from across the institute and beyond to compete on IIT Bombay\'s grounds.',
  },
  {
    title: 'Competitive Circuit',
    content:
      'Beyond campus, the team competes in the National College Ultimate Championship (NCUC), West Sectionals, and IIT Bombay\'s own Aavhan Sports Festival, and is part of the wider Mumbai Ultimate Community.',
  },
];

const galleryImages = [pic_1, pic_2, pic_3, pic_4, pic_5, pic_6];

/* ============================================================
   FRISBEE
============================================================ */
const Frisbee = () => {
  const [expandedCard, setExpandedCard]       = useState(null);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [slideDir, setSlideDir]               = useState('next');
  const timelineWrapRef                       = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const eventsCount = useCountUp(cards.length, 800);
  const yearsCount  = useCountUp(10, 800);

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
    <div className="aq-root fr-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">UF</span>
          <span>IIT Bombay Ultimate Frisbee Club</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Coach&nbsp;<strong>Maksood Chaudhary</strong></span>
          <span>Founded&nbsp;<strong>2022</strong></span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 15</span>
            <span className="sep">§</span>
            <span>Ultimate Frisbee&nbsp;·&nbsp;Campus Grounds</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Ultimate Frisbee</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Ultimate frisbee is a mixed-gender, self-refereed sport rapidly growing around the
                world and in India. Played earlier by a group of dedicated students and formally
                inaugurated in 2022, the Ultimate Frisbee Club pioneers the sport on the IIT Bombay
                campus — organising Championships, camps, and the Ultimate Frisbee Open for a vibrant
                community of undergraduates, postgraduates, staff, and alumni. Under new coach
                Maksood Chaudhary, who has both played for and coached Team India, the club is
                gearing towards competitive success.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Founded</span>
                <span className="v"><em>2022</em></span>
                <span className="c">Formally inaugurated</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Annual Events</span>
                <span className="v">{eventsCount}</span>
                <span className="c">GCs, camps &amp; UFO</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach's Experience</span>
                <span className="v" style={{ fontSize: '1.2rem' }}>
                  <em>{yearsCount}+ yrs</em>
                </span>
                <span className="c">Played &amp; coached Team India</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Secretary</span>
                <span className="v" style={{ fontSize: '1rem', lineHeight: 1.4 }}>
                  <em>Shaashvat</em>
                </span>
                <span className="c">Institute Frisbee Secretary</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={pic_3} alt="IIT Bombay Ultimate Frisbee" />
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
            <p className="aq-section-sub">Full kit · Five grounds · Weather-flexible.</p>
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

        <PhotoBreak image={pic_4} tag="Fig. A" caption="Practice on the Outdoor Turf." />

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

        <PhotoBreak image={pic_6} tag="Fig. B" caption="Ultimate Frisbee Open — the club's flagship tournament." />

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
              <img alt="Shaashvat Sekhar" src={pic_1} className="aq-contact-img" />
              <p className="aq-contact-name">Shiv Patil</p>
              <p className="aq-contact-role">Frisbee Club Manager</p>
              <p className="aq-contact-detail">+91 98904 38497</p>
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
              From the <span className="italic">field</span>.
            </h2>
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Ultimate Frisbee gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Ultimate Frisbee&nbsp;·&nbsp;Campus Grounds</span>
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

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Ultimate Frisbee&nbsp;·&nbsp;Campus Grounds</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Frisbee;