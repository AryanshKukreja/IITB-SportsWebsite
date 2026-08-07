import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './tennis.css';
import lt1 from './assets/lt1.jpg';
import lt2 from './assets/lt2.jpg';
import lt3 from './assets/lt3.jpg';
import lt4 from './assets/lt4.jpg';
import lt5 from './assets/lt5.jpg';
import tennisLogo from '../../../Contact/pictures/Logos_for_Photos/tennis.png';

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
    title: 'Upper Courts',
    image: lt1,
    bullets: [
      'Three courts located close to the Convocation Hall.',
      'Well-maintained, open to players of all levels year-round.',
    ],
  },
  {
    title: 'Lower Courts',
    image: lt2,
    bullets: [
      'Three courts located close to the Staff Hostel.',
      'Six courts across both locations, for a total of 6 tennis courts on campus.',
    ],
  },
];

const cards = [
  {
    title: 'Lawn Tennis GC',
    content:
      'Held once a year in the Spring Semester under three categories — Boys, Girls, and PGs. The best tennis players from each hostel go head to head to determine which hostel boasts the best talent in Lawn Tennis.',
  },
  {
    title: 'NSO',
    content:
      'Part of the academic curriculum for undergraduate students. Through selections, nearly 30\u201340 students who opt for tennis are trained throughout the academic year, two days a week (Monday and Tuesday).',
  },
  {
    title: 'Institute Tennis League',
    content:
      'Usually follows the Institute Tennis Open — IIT-B\u2019s version of the IPTL. A team-based event in which 8 managers run 8 teams, assembled through a player auction. Teams are split into two pools of four and play round-robin, with each tie made up of Men\u2019s Singles, Men\u2019s Doubles, Women\u2019s Singles, and Mixed Doubles.',
  },
  {
    title: 'Institute Tennis Open',
    content:
      'The flagship open tournament for tennis at IIT Bombay, open to students, alumni, professors, and staff alike. A grand-slam-styled open singles tournament held in the Autumn Semester.',
  },
  {
    title: 'Freshiesta',
    content:
      'Gives freshers a chance to showcase their talent — NSO students see their improvement over the months, and non-NSO students get to battle it out with the regulars. Follows a compass draw format, so everyone plays an equal number of matches while the knockout spirit stays alive.',
  },
  {
    title: 'Summer Slam',
    content:
      'Conducted late in the month of March, open to all (boys and girls). The format is a little different and more exciting than standard tennis sets — think best of 21 points or best of 3 mini sets.',
  },
];

const galleryImages = [lt1, lt2, lt3, lt4, lt5];

/* ============================================================
   TENNIS
============================================================ */
const Tennis = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir]         = useState('next');

  const eventsCount = useCountUp(cards.length, 800);
  const courtsCount = useCountUp(6, 800);

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
    <div className="aq-root lt-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">LT</span>
          <span>IIT Bombay Lawn Tennis&nbsp;/&nbsp;Upper &amp; Lower Courts</span>
        </div>
        <div className="aq-masthead-meta">
          <span><strong>6</strong> Courts Across Campus</span>
          <span>Open to&nbsp;<strong>All Levels</strong></span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 12</span>
            <span className="sep">§</span>
            <span>Lawn Tennis&nbsp;·&nbsp;Upper &amp; Lower Courts</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Lawn Tennis</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Well-maintained courts, set amidst serene surroundings, are open to players of all
                levels — whether you're picking up a racquet for the first time or chasing
                championship points. Thanks to the guidance of our coach and the relentless
                dedication of its players, IIT Bombay Lawn Tennis has seen remarkable growth in
                participation and performance. With a calendar full of events, leagues, and
                workshops, the club works tirelessly to foster a strong tennis culture on campus.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v"><em>{courtsCount}</em></span>
                <span className="c">Upper &amp; lower, campus-wide</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Annual Events</span>
                <span className="v">{eventsCount}</span>
                <span className="c">GC, leagues &amp; opens</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Open to</span>
                <span className="v" style={{ fontSize: '1.1rem' }}>
                  <em>All</em>
                </span>
                <span className="c">Students, alumni &amp; staff</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Secretary</span>
                <span className="v" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
                  <em>Nehal</em>
                </span>
                <span className="c">Institute Lawn Tennis Secretary</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={lt3} alt="IIT Bombay Lawn Tennis" />
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
            <p className="aq-section-sub">Six courts · Upper &amp; lower · Open to all.</p>
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

        <PhotoBreak image={lt4} tag="Fig. A" caption="On court — serene surroundings, serious play." />

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

        <PhotoBreak image={lt5} tag="Fig. B" caption="Institute Tennis Open — the flagship autumn draw." />

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
              <img alt="Nehal Gupta" src={tennisLogo} className="aq-contact-img" />
              <p className="aq-contact-name">Manan Agarwal</p>
              <p className="aq-contact-role">Institute Lawn Tennis Secretary</p>
              <p className="aq-contact-detail">+91 98283 78888</p>
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
              From the <span className="italic">courts</span>.
            </h2>
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Lawn Tennis gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Lawn Tennis&nbsp;·&nbsp;Upper &amp; Lower Courts</span>
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
            <p className="aq-section-sub">Tennis Courts&nbsp;·&nbsp;IIT Bombay&nbsp;·&nbsp;Powai</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.38794229164!2d72.90822443382704!3d19.134488600267908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c74281daf5e3%3A0xe0c050e0ec9a18cf!2sTennis%20court!5e0!3m2!1sen!2sin!4v1720443451101!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Lawn Tennis Ground Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Lawn Tennis&nbsp;·&nbsp;Upper &amp; Lower Courts</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer>

      </div>
    </div>
  );
};

export default Tennis;