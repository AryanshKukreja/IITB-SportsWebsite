import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './hockey.css';
import Timel from './timeline4';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import user from '../../../../Contact/pictures/Logos_for_Photos/Khushal.jpg';

// Updated to use the scale trick to allow X-axis panning
const imageAlignments = {
  [p1]: { objectPosition: '10% 70%', transform: 'scale(1.15)', transformOrigin: '80% 70%' },
  [p2]: { objectPosition: '50% 65%', transform: 'scale(1.15)', transformOrigin: '50% 65%' },
  [p3]: { objectPosition: '50% 45%', transform: 'scale(1.15)', transformOrigin: '50% 45%' },
  [p4]: { objectPosition: '50% 40%', transform: 'scale(1.15)', transformOrigin: '50% 40%' },
  [p5]: { objectPosition: '50% 33%', transform: 'scale(1.15)', transformOrigin: '95% 33%' },
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
      <img 
        src={image} 
        alt={caption} 
        className="aq-photobreak-img" 
        style={imageAlignments[image] || {}}
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
    title: 'Hockey Ground',
    image: p1,
    bullets: [
      'Standard, well-maintained hockey ground available for practice and competitive matches.',
      'Located within the Gymkhana Grounds — central and accessible year-round.',
    ],
  },
  {
    title: 'Sticks & Balls',
    image: p2,
    bullets: [
      'Hockey sticks, grips, and balls maintained and available for all squad members.',
      'Equipment suitable for both beginners and experienced players.',
    ],
  },
  {
    title: 'Protective Gear',
    image: p3,
    bullets: [
      'Shin pads, stockings, and a full goalie kit available for use.',
      'Medical kits, sprays, and medical tape on hand for player safety at all times.',
    ],
  },
  {
    title: 'Open to All Levels',
    image: p4,
    bullets: [
      'Whether you\'re a beginner or an experienced player, all equipment is available on campus.',
      'Beginners\' camps and girls\' camps run regularly to onboard new players.',
    ],
  },
];

const cards = [
  {
    title: 'Hockey GC',
    content:
      'Scheduled towards the end of the season each year, the Hockey General Championship frequently turns out to be the Overall Championship decider. The event draws great participation, with students showing tremendous spirit as they learn and compete for hostel glory.',
  },
  {
    title: 'NSO',
    content:
      'Part of the academic curriculum for undergraduate students. Through selections, 30–40 students who opt for hockey are trained throughout the academic year, two days a week. NSO is the structured gateway for serious development in the sport at IITB.',
  },
  {
    title: 'Institute Hockey League',
    content:
      'Top hockey enthusiasts from the institute, as well as alumni based in the city, participate in the IHL. It\'s a great opportunity to play alongside excellent players across the institute in an open format — a different experience from the hostel-restricted GC.',
  },
  {
    title: 'Girls Camp',
    content:
      'Open to all girls in the institute who have an interest in hockey. Designed as a beginner\'s camp — no prior experience or prerequisite is required. An inclusive, welcoming entry point into the sport for women across campus.',
  },
  {
    title: 'Beginners Camp',
    content:
      'Designed for students enthusiastic about joining the Inter-IIT practice or those who simply want to learn hockey from scratch. A week-long camp held on the hockey field or in the SAC outdoor facilities, depending on conditions during the monsoon season.',
  },
];

const galleryImages = [p1, p2, p3, p4, p5];

/* ============================================================
   HOCKEY
============================================================ */
const Hockey = () => {
  const [expandedCard, setExpandedCard]       = useState(null);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [slideDir, setSlideDir]               = useState('next');
  const timelineWrapRef                       = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const eventsCount  = useCountUp(cards.length, 800);
  const medalsCount  = useCountUp(3, 800);

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
    <div className="aq-root hk-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">H</span>
          <span>IIT Bombay Hockey&nbsp;/&nbsp;Gymkhana Grounds</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Coach&nbsp;<strong>Dr. Harish</strong></span>
          <span><strong>3</strong> Inter-IIT Medals in a Row</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 08</span>
            <span className="sep">§</span>
            <span>Hockey&nbsp;·&nbsp;Gymkhana Grounds</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Hockey</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Hockey is one of the most competitive and well-loved sports at IIT Bombay. With a
                dedicated ground and full equipment setup, it offers a great space for both casual
                play and serious competition. Under the guidance of coach Dr. Harish, the team has
                shown steady growth — winning Inter-IIT medals for three consecutive years,
                including silver in the last two editions and a bronze before that.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Inter-IIT Medals</span>
                <span className="v"><em>{medalsCount}</em></span>
                <span className="c">Consecutive years</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Last two editions</span>
                <span className="v" style={{ fontSize: '1.4rem' }}>
                  <em>Silver</em>
                </span>
                <span className="c">+ Bronze before that</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Fixtures</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Annual events</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
                  Dr.<em> Harish</em>
                </span>
                <span className="c">Year-round training</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img 
              src={p2} 
              alt="IIT Bombay Hockey" 
              style={imageAlignments[p2] || {}}
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
            <p className="aq-section-sub">Ground · Full kit · Open to all levels.</p>
          </div>

          <div className="aq-facility-grid">
            {facilities.map((f, i) => (
              <Reveal as="div" key={f.title} className="aq-facility-card" delay={i * 90}>
                <div className="aq-facility-photo">
                  <img 
                    src={f.image} 
                    alt={f.title} 
                    style={imageAlignments[f.image] || {}}
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

        <PhotoBreak image={p3} tag="Fig. A" caption="Match day — the Gymkhana Grounds in full flow." />

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
                      style={imageAlignments[galleryImages[index % galleryImages.length]] || {}}
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

        <PhotoBreak image={p5} tag="Fig. B" caption="Hockey GC — the season's most anticipated contest." />

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
              <img alt="Khushal" src={user} className="aq-contact-img" />
              <p className="aq-contact-name">Arnav Ashish Deshmukh</p>
              <p className="aq-contact-role">Institute Hockey Secretary</p>
              <p className="aq-contact-detail">+91 75079 77922</p>
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
              alt={`Hockey gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
              style={imageAlignments[galleryImages[currentIndex]] || {}}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Hockey&nbsp;·&nbsp;Gymkhana Grounds</span>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3881728360093!2d72.90822443404429!3d19.134478500000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9b74d4b5f75%3A0xfbea904fa3f2af3!2sGymkhana%20Grounds!5e0!3m2!1sen!2sin!4v1720442540019!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Hockey Ground Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Hockey&nbsp;·&nbsp;Gymkhana Grounds</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Hockey;