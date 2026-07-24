import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './indiangames.css';
import Timel from './timeline2';
import img1 from "../images/p51.jpg";
import img2 from "../images/p52.jpg";
import img3 from "../images/p53.jpg";
import img4 from "../images/p54.jpg";
import img5 from "../images/p55.jpg";
import ing from "../images/ing.jpg";
import ing2 from "../images/ing2.jpg";
import ing3 from "../images/ing3.JPG";
import ing4 from "../images/ing4.JPG";
import ing5 from "../images/ing5.png";
import ing6 from "../images/ing6.png";
import user from '../../../../Contact/pictures/Logos_for_Photos/Kanak.jpg';

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
    title: 'Indoor Court',
    image: ing4,
    bullets: [
      'One fully lighted indoor court with a Kho-Kho pitch and Kabaddi mat, open all days.',
      'Timings: 6:00 AM – 10:00 PM.',
    ],
  },
  {
    title: 'Kho-Kho',
    image: ing,
    bullets: [
      'A dynamic, fast-paced sport blending physical agility with strategic thinking.',
      'Dodging, feinting, and bursts of controlled speed define its excitement, building agility, teamwork, and discipline.',
    ],
  },
  {
    title: 'Kabaddi',
    image: ing2,
    bullets: [
      'Originating in ancient India, now a globally recognised sport with professional leagues like the Pro Kabaddi League.',
      'Combines athleticism with strategy, promoting fitness, teamwork, and mental agility.',
    ],
  },
  {
    title: 'Tug of War',
    image: ing3,
    bullets: [
      'A traditional test of teamwork, strength, and coordination between two teams pulling a rope in opposite directions.',
      'Simple yet intense — a spirited fixture at festivals and sports events on campus.',
    ],
  },
];

const cards = [
  {
    title: 'Inter Hostel Kho-Kho GC',
    content:
      'This event is held once a year in the Spring Semester for All Boys and in the Autumn Semester for the All Girls, and is part of the Inter Hostel Sports General Championship.',
  },
  {
    title: 'NSO',
    content:
      'The Government of India, through its National Sports Organization, provides a scheme in all IITs where all incoming first-year students must sign up for a particular sport and undergo training. This scheme, popularly called NSO, is available to IIT students for training in various sports, such as swimming, hockey, basketball, squash, badminton, tennis, athletics, Kho-Kho, handball, table tennis, football, and more.',
  },
  {
    title: 'Institute Kho-Kho League (IKKL)',
    content:
      'The Institute Kho-Kho League is the most awaited event of the IIT Bombay Kho-Kho club and is held during the Spring Semester. This tournament is open to all students. It is a highly competitive league tournament organised using the IPL format.',
  },
  {
    title: 'Institute Kabaddi League',
    content:
      'The Institute Kabaddi League is an event held during the Spring Semester, open to all students. In this event, teams are formed through an exhilarating auction.',
  },
  {
    title: 'Battle of Batches',
    content:
      'The Battle of Batches is an inter-year event in which students from different NSO and NCC batches showcase their skills and sportsmanship. This spirited competition brings together teams representing each batch, from freshmen to seniors, in a series of thrilling matches. It is held during the Spring Semester.',
  },
  {
    title: 'Summer Camp',
    content:
      'Kho-Kho is a new, budding sport in our institute. Being easy to learn, it attracts a lot of beginners — so for enthusiasts, we organise various Beginners\u2019 and Intermediate Camps over the year, plus a summer advanced training camp for the betterment of the Institute Kho-Kho team.',
  },
];

const galleryImages = [img1, img2, img3, img4, img5, ing, ing2, ing3, ing4, ing5, ing6];

/* ============================================================
   INDIAN GAMES
============================================================ */
const IndianGames = () => {
  const [expandedCard, setExpandedCard]       = useState(null);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [slideDir, setSlideDir]               = useState('next');
  const timelineWrapRef                       = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const eventsCount = useCountUp(cards.length, 800);
  const sportsCount = useCountUp(3, 800);

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
    <div className="aq-root ig-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">IG</span>
          <span>IIT Bombay Indian Games&nbsp;/&nbsp;Indoor Court</span>
        </div>
        <div className="aq-masthead-meta">
          <span><strong>3</strong> Sports Under One Roof</span>
          <span>Open&nbsp;<strong>6 AM – 10 PM</strong>, Every Day</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 09</span>
            <span className="sep">§</span>
            <span>Indian Games&nbsp;·&nbsp;Indoor Court</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Indian Games</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Kho-Kho, Kabaddi, and Tug of War carry centuries of tradition into a fast-paced,
                strategic corner of campus sport. Kho-Kho blends dodging and controlled bursts of
                speed with sharp decision-making; Kabaddi pairs raw athleticism with tactics
                sharpened in leagues like the Pro Kabaddi League; and Tug of War distills teamwork
                and endurance into a single, spirited pull. Together they build agility, discipline,
                and a strong sense of collective effort.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Sports Played</span>
                <span className="v"><em>{sportsCount}</em></span>
                <span className="c">Kho-Kho · Kabaddi · Tug of War</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Annual Events</span>
                <span className="v">{eventsCount}</span>
                <span className="c">GC, leagues &amp; camps</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Court Timings</span>
                <span className="v" style={{ fontSize: '1.2rem' }}>
                  <em>6 AM–10 PM</em>
                </span>
                <span className="c">Fully lighted, open all days</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Secretary</span>
                <span className="v" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
                  <em>Kanak</em>
                </span>
                <span className="c">Institute Indian Games Secretary</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={ing4} alt="IIT Bombay Indian Games" />
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
            <p className="aq-section-sub">Indoor court · Three sports · Open all days.</p>
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

        <PhotoBreak image={ing5} tag="Fig. A" caption="The Indoor Court — home to Kho-Kho and Kabaddi." />

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

        <PhotoBreak image={ing6} tag="Fig. B" caption="Institute Kho-Kho League — the IPL-format showdown." />

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
              <img alt="Kanak Tembhare" src={user} className="aq-contact-img" />
              <p className="aq-contact-name">Darshan Jain</p>
              <p className="aq-contact-role">Institute Indian Games Secretary</p>
              <p className="aq-contact-detail">+91 94062 13933</p>
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
              alt={`Indian Games gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Indian Games&nbsp;·&nbsp;Indoor Court</span>
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
            <p className="aq-section-sub">Indoor Kho-Kho Court&nbsp;·&nbsp;IIT Bombay&nbsp;·&nbsp;Powai</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3571278636005!2d72.90875297511069!3d19.135838550091524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b996756af44d%3A0x92ba3886f6c7bad!2sIndoor%20Kho-Kho%20Court!5e0!3m2!1sen!2sin!4v1720265475433!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Indian Games Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Indian Games&nbsp;·&nbsp;Indoor Court</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default IndianGames;