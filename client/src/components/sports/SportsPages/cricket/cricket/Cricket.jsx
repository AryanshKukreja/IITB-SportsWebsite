import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './cricket.css';
import Timel from './timeline';
import cricket1 from '../images/cricket_1.jpg';
import cric1 from '../images/cric1.jpg';
import cric2 from '../images/cric2.jpg';
import cric3 from '../images/cric3.jpg';
import cric4 from '../images/cric4.jpg';
import user from '../../../../Contact/pictures/Logos_for_Photos/Pradyumna.jpg';

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
            <img src={cricket1} alt="IIT Bombay Cricket Ground" />
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
              <img alt="Pradyumna Gugulothu" src={user} className="aq-contact-img" />
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