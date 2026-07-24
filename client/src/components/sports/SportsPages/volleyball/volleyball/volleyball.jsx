import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './volleyball.css';
import Timel from './timeline';
import user from '../assets/user.jpg';
import v1 from '../assets/v1.JPG';
import v2 from '../assets/v2.JPG';
import v3 from '../assets/v3.JPG';
import v4 from '../assets/v4.JPG';

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
    title: 'Five Courts, Two Venues',
    image: v1,
    bullets: [
      '3 indoor courts at the Gymkhana Grounds and 2 outdoor courts at Old SAC.',
      'Indoor courts give an all-weather training environment, ideal for competitive preparation; outdoor courts host regular practice and recreational matches. All courts are floodlit for evening training.',
    ],
  },
  {
    title: 'Equipment',
    image: v2,
    bullets: [
      'Professional-grade volleyballs, nets, cones, and agility ladders.',
      'Essential training equipment to support skill development and match preparation.',
    ],
  },
  {
    title: 'Coaching',
    image: v3,
    bullets: [
      'Training conducted under the guidance of Coach Pritesh Yadav.',
      'Focus on technical improvement, game strategy, and physical conditioning for both men\u2019s and women\u2019s teams.',
    ],
  },
  {
    title: 'Fitness & Support',
    image: v4,
    bullets: [
      'Access to the institute\u2019s gym and physiotherapy facilities.',
      'Support for strength training, injury prevention, and rehabilitation.',
    ],
  },
];

const cards = [
  {
    title: 'Camps',
    content:
      'Regular training camps run for beginners and intermediate players under Coach Pritesh Yadav, covering technique, game strategy, and conditioning for both men\u2019s and women\u2019s teams.',
  },
  {
    title: 'NSO',
    content:
      'Part of the Government of India\u2019s National Sports Organization scheme, under which all incoming first-year IIT students sign up for a sport and undergo structured training. Volleyball sessions run through the semester across the Gymkhana and Old SAC courts.',
  },
  {
    title: 'Valentine Volleyball',
    content:
      'A mixed-team tournament held around February, pairing players across hostels for a lighter, festive spin on competitive volleyball. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'Institute Volleyball League',
    content:
      'A season-long, team-based league bringing together the institute\u2019s strongest players for a competitive circuit. Details for this year\u2019s edition will be announced soon.',
  },
  {
    title: 'SPREE',
    content:
      'An open tournament welcoming players of all skill levels to compete outside the hostel structure. Details for this year\u2019s edition will be announced soon.',
  },
];

const galleryImages = [v4, v2, v3, v1];

/* ============================================================
   VOLLEYBALL
============================================================ */
const Volleyball = () => {
  const [expandedCard, setExpandedCard]       = useState(null);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [slideDir, setSlideDir]               = useState('next');
  const timelineWrapRef                       = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const eventsCount = useCountUp(cards.length, 800);
  const courtsCount = useCountUp(5, 800);

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
    <div className="aq-root vb-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">VB</span>
          <span>IIT Bombay Volleyball&nbsp;/&nbsp;Gymkhana &amp; Old SAC</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Coach&nbsp;<strong>Pritesh Yadav</strong></span>
          <span><strong>5</strong> Courts, Indoor &amp; Outdoor</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 13</span>
            <span className="sep">§</span>
            <span>Volleyball&nbsp;·&nbsp;Gymkhana &amp; Old SAC</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Volleyball</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                The Volleyball Club has access to a total of 5 courts — 3 indoor courts at the
                Gymkhana Grounds and 2 outdoor courts at Old SAC. Indoor courts provide an
                all-weather training environment ideal for competitive preparation, while the
                outdoor courts host regular practice and recreational matches, all floodlit for
                evening training. Under Coach Pritesh Yadav, training covers technical improvement,
                game strategy, and physical conditioning for both men's and women's teams, backed by
                the institute's gym and physiotherapy facilities.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v"><em>{courtsCount}</em></span>
                <span className="c">3 indoor · 2 outdoor</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Annual Events</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Camps, leagues &amp; opens</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
                  <em>Pritesh Yadav</em>
                </span>
                <span className="c">Men's &amp; women's teams</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Secretary</span>
                <span className="v" style={{ fontSize: '1rem', lineHeight: 1.4 }}>
                  <em>Ghanshyam</em>
                </span>
                <span className="c">Institute Volleyball Secretary</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={v1} alt="IIT Bombay Volleyball" />
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
            <p className="aq-section-sub">Indoor &amp; outdoor courts · Full kit · Coached year-round.</p>
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

        <PhotoBreak image={v2} tag="Fig. A" caption="Evening training under the Gymkhana floodlights." />

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

        <PhotoBreak image={v3} tag="Fig. B" caption="Valentine Volleyball — the season's festive fixture." />

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
              <img alt="Ghanshyam Choudhary" src={user} className="aq-contact-img" />
              <p className="aq-contact-name">Mitesh</p>
              <p className="aq-contact-role">Institute Volleyball Secretary</p>
              <p className="aq-contact-detail">+91 82099 45491</p>
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
              alt={`Volleyball gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Volleyball&nbsp;·&nbsp;Gymkhana &amp; Old SAC</span>
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
            <p className="aq-section-sub">Gymkhana Grounds&nbsp;·&nbsp;IIT Bombay&nbsp;·&nbsp;Powai</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4020806480025!2d72.9093683747526!3d19.133869182082652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1721551340933!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Volleyball Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Volleyball&nbsp;·&nbsp;Gymkhana &amp; Old SAC</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Volleyball;