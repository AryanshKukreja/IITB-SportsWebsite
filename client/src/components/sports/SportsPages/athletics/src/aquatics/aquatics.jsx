import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
//import './athletics.css';
import Timel from './timeline';
import p1 from '../assets/1.jpg';
import p2 from '../assets/2.jpg';
import p3 from '../assets/3.jpg';
import p4 from '../assets/4.jpg';
import p5 from '../assets/5.jpg';
import user from '../assets/user.jpg';
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.6671652193382!2d72.91190082224743!3d19.134256741593973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e1!3m2!1sen!2sin!4v1752435717790!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="IIT Bombay Athletics Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Athletics · <em>Sports Gymkhana, IIT Bombay</em>
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
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fallback = setTimeout(reveal, 1200);
    if (reduce || typeof IntersectionObserver === 'undefined') {
      reveal(); return () => clearTimeout(fallback);
    }
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
    <Tag
      ref={ref}
      className={`aq-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
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
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
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
    title: '400m Grass Track',
    image: p1,
    bullets: [
      'Main training ground for all track events — sprints, hurdles, middle- and long-distance running.',
      'Well-maintained grass surface suitable for year-round endurance and technique work.',
    ],
  },
  {
    title: '100m Synthetic Track',
    image: p2,
    bullets: [
      'Located beside the football ground, used for short-distance sprints and technique drills.',
      'Synthetic surface provides consistent performance in all weather conditions.',
    ],
  },
  {
    title: 'Field Event Zones',
    image: p3,
    bullets: [
      'Designated areas for long jump, high jump, shot put, and javelin.',
      'Standard pits and markings available for regular competitive-standard practice.',
    ],
  },
  {
    title: 'Training Equipment',
    image: p4,
    bullets: [
      'Starting blocks, hurdles, cones, resistance bands, agility ladders, sleds, and medicine balls.',
      'Tools span all disciplines — from sprint mechanics to field event conditioning.',
    ],
  },
];

const cards = [
  {
    title: 'Summer Camp',
    content:
      'Summer athletics training camp for beginners and advanced athletes. Held annually under the coaching of Irfan Sir and Renu Ma\'am, the camp covers all track and field disciplines over an intensive training block, culminating in a demonstration event for the campus community.',
  },
  {
    title: 'NSO',
    content:
      'The National Sports Organization scheme, available to all first-year students, allows incoming students to train formally in athletics throughout the year. NSO training sessions run multiple evenings a week and are a gateway for students to develop a lifelong connection to the sport.',
  },
  {
    title: 'Campathon',
    content:
      'A campus-wide marathon and endurance running event open to all members of the IIT Bombay community. Campathon draws students, faculty, and staff alike and has grown into one of the most popular participatory sporting events on the calendar.',
  },
  {
    title: 'Crossy GC',
    content:
      'The Cross Country Running General Championship — an inter-hostel competition held annually on campus. Hostels field runners across multiple distance categories in a head-to-head format, with points contributing to the overall GC standings.',
  },
  {
    title: 'Triathlon GC',
    content:
      'A multi-sport endurance general championship combining swimming, cycling, and running. Held in two categories: Team Triathlon (team of 3, at least one female member) and Individual Triathlon, the event is one of the most demanding fixtures on the sports calendar.',
  },
  {
    title: 'Mixed Relay',
    content:
      'Team relay events featuring mixed-gender participation. The mixed relay is a celebration of teamwork and speed, with every hostel fielding squads that train together in the lead-up to the event.',
  },
];

const galleryImages = [p1, p2, p3, p4, p5];

/* ============================================================
   ATHLETICS
============================================================ */
const Athletics = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('next');
  const timelineWrapRef = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const trackCount  = useCountUp(2, 800);
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
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">A</span>
          <span>IIT Bombay Sports&nbsp;/&nbsp;Athletics</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Coached by <strong>Irfan Sir</strong> &amp; <strong>Renu Ma'am</strong></span>
          <span><strong>400m</strong> Grass Track</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Welcome To</span>
            <span className="sep">§</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Athletics</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Comprising track and field events, Athletics is one of the most spirited and
                inclusive sports at IIT Bombay. With a well-maintained grass track and year-round
                training under the guidance of Irfan Sir and Renu Ma'am, the team strives for
                all-round excellence. Known for its strong team culture, IITB Athletics is where
                beginners rise to greatness — supported and cheered by teammates at every step.
                The journey matters just as much as the finish line.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Tracks</span>
                <span className="v"><em>{trackCount}</em></span>
                <span className="c">Grass + Synthetic</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coaches</span>
                <span className="v"><em>2</em></span>
                <span className="c">Irfan Sir · Renu Ma'am</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Fixtures</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Annual events</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Disciplines</span>
                <span className="v">20<em>+</em></span>
                <span className="c">Track &amp; field events</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={p5} alt="IIT Bombay Athletics track" />
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
            <p className="aq-section-sub">Four venues. One athletics programme.</p>
          </div>

          <div className="aq-facility-grid">
            {facilities.map((f, i) => (
              <Reveal as="div" key={f.title} className="aq-facility-card" delay={i * 90}>
                <div className="aq-facility-photo">
                  <img src={f.image} alt={f.title} />
                </div>
                <h3 className="aq-facility-title">{f.title}</h3>
                <ul className="aq-facility-bullets">
                  {f.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <PhotoBreak image={p2} tag="Fig. A" caption="The 100m synthetic track — speed work and technique drills." />

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

        <PhotoBreak image={p3} tag="Fig. B" caption="Field event zones — long jump pit in action." />

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
              <img alt="Praveen Kumar" src={user} className="aq-contact-img" />
              <p className="aq-contact-name">Prashil Vasoya</p>
              <p className="aq-contact-role">Institute Athletics Secretary</p>
              <p className="aq-contact-detail">+91 88661 33501</p>
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
              From the <span className="italic">track</span>.
            </h2>
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Athletics gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Athletics&nbsp;·&nbsp;Track &amp; Field</span>
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
            <p className="aq-section-sub">New Gymkhana · IIT Bombay · Powai</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.6671652193382!2d72.91190082224743!3d19.134256741593973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e1!3m2!1sen!2sin!4v1752435717790!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="IIT Bombay Athletics Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Athletics · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>

      </div>
    </div>
  );
};

export default Athletics;