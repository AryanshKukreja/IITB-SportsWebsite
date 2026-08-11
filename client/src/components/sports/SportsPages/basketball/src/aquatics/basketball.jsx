import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import './basketball.css';
import Timel from './timeline';
import bb1 from '../assets/bb1.jpeg';
import bb2 from '../assets/bb2.png';
import bb3 from '../assets/bb3.jpg';
import bb4 from '../assets/bb4.png';
import bb5 from '../assets/bb5.png';
import bb8 from '../assets/bb8.png';
import bb9 from '../assets/bb9.jpg';
import bb10 from '../assets/bb10.jpg';
import bb11 from '../assets/bb11.jpg';
import bb12 from '../assets/bb12.jpg';
import basky_team from '../assets/basky_team.png';
import deep from '../assets/deepraj.jpg';
import nso from '../assets/nso.jpg';
import basky_boys from '../assets/basky_boys.png';
import basky_girls from '../assets/basky_girls.png';
import councilLogo from '../../../../../Contact/pictures/Logos_for_Photos/IITB Sports Logo BW.png';
import basketballLogo from '../../../../../Contact/pictures/Logos_for_Photos/basketball.png';
import manikarnika from '../../../../../Contact/pictures/Logos_for_Photos/mani.JPG';

const Basketball = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const handlePrev = () => {
    setSlideDir('prev');
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const handleNext = () => {
    setSlideDir('next');
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };
  const handleThumb = (i) => {
    setSlideDir(i > currentIndex ? 'next' : 'prev');
    setCurrentIndex(i);
  };
  const toggleStory = (i) => setOpenStory(openStory === i ? null : i);

  const cards = [
    {
      title: 'PG Mania',
      content: 'PG Mania is one of the most anticipated basketball events of the year, open exclusively to postgraduate students of IIT Bombay. Held on the indoor courts, the event brings together PG students from various departments to compete, bond, and showcase their talent on the hardwood in an electrifying single-elimination format.',
    },
    {
      title: 'Basketball Farewell',
      content: "The Basketball Farewell is a heartfelt annual tradition where the outgoing final-year players are honoured by their teammates and the broader basketball family. The event features fun scrimmage matches between seniors and juniors, awards for standout players, and a celebration of the bonds forged through years of shared training, tournaments, and triumphs.",
    },
    {
      title: 'NSO Trials',
      content: "Under the National Sports Organisation (NSO) scheme, all incoming first-year students must sign up for and train in a sport of their choice. Basketball is one of the most popular NSO options at IITB. Trials are held at the start of each academic year to select students for the NSO basketball cohort, where they receive structured coaching from the institute's dedicated coach throughout the semester.",
    },
    {
      title: 'Inter-IIT Pre-Camp',
      content: 'Every year, ahead of the prestigious Inter-IIT Sports Meet, the basketball team hosts an intensive Pre-Camp to sharpen skills, strengthen team chemistry, and finalise squads. Conducted under the guidance of coach Nilesh Sawant, the camp involves rigorous drills, tactical sessions, and intra-squad matches to prepare players for the highest level of inter-collegiate competition.',
    },
    {
      title: 'Alumni Day',
      content: "Alumni Day is a special occasion when former IITB basketball players return to campus to relive their glory days. Alumni and current players face off in friendly matches, share stories from their time on the team, and inspire the next generation. It is a celebration of the sport's enduring legacy at IIT Bombay and the lifelong connections it creates.",
    },
    {
      title: "She's Got Game",
      content: "She's Got Game is IITB Basketball's flagship women's event — a celebration of women's basketball that brings together female players from across the campus and beyond. The event features competitive matches, skills challenges, and activities designed to encourage more women to take up the sport. It reflects the team's deep commitment to inclusivity and gender equity in sports.",
    },
  ];

  const images = [
    basky_team, basky_girls, basky_boys, bb2, bb3, bb4, bb5, nso, bb8, bb9, bb10, bb11, bb12,
  ];

  const captions = [
    "Team 2024", "Women's Squad", "Men's Squad", "Practice Session",
    "Court Action", "Training Camp", "Skills Drill", "NSO Session",
    "Inter-IIT Prep", "Game Day", "Tournament", "Match Highlights", "Campus Cup",
  ];

  const timings = [
    { slot: 'Morning Session', time: '6:00 AM – 9:00 AM', note: 'Open to all members' },
    { slot: 'Evening Session', time: '5:00 PM – 10:00 PM', note: 'Open to all members' },
    { slot: 'NSO Training',    time: 'As scheduled',       note: 'First-year NSO batch' },
    { slot: 'Inter-IIT Camp',  time: 'Pre-Meet weeks',     note: 'Selected squad only' },
  ];

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">B</span>
          IITB Basketball
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
            Basketball
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Basket<span className="italic">ball</span>
              </h1>
              <p className="aq-hero-lede">
                The IITB Basketball family is an integral part of the dynamic sports
                culture of the Institute. The team boasts a history of captivating
                performances in various tournaments, leading to championships in many.
                This is made possible with access to state-of-the-art facilities, a
                dedicated coach and rigorous training. The sport has left us with a
                plethora of teachings: Camaraderie, perseverance and integrity.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v">4<em></em></span>
                <span className="c">2 indoor · 2 outdoor</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Morning Slot</span>
                <span className="v">6<em>am</em></span>
                <span className="c">Opens at 6:00 AM</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Evening Slot</span>
                <span className="v">10<em>pm</em></span>
                <span className="c">Until 10:00 PM</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">Annual events</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={basky_team} alt="IITB Basketball Team" />
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
            §1  FACILITIES & COURTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">01</span>
            <span className="bar" />
            Facilities
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              World-class <span className="italic">Courts</span>
            </h2>
            <p className="aq-section-sub">State-of-the-art infrastructure for year-round play</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={bb1} alt="Indoor Basketball Courts" />
              </div>
              <h3 className="aq-facility-title">Indoor Courts</h3>
              <p className="aq-facility-body">
                The Students' Gymkhana boasts <strong>two indoor courts</strong> perfect
                for year-round competition or casual shooting practice. The H-12 store
                sells shoes with gum soles specifically designed for optimal grip on the
                smooth indoor surface. Courts are fully lit for evening sessions.
              </p>
            </div>

            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={basky_boys} alt="Outdoor Basketball Courts" />
              </div>
              <h3 className="aq-facility-title">Outdoor Courts &amp; Equipment</h3>
              <p className="aq-facility-body">
                Two outdoor courts supplement the indoor facilities. Some hostels also
                have their own courts, expanding your options for a quick pick-up game.
                The institute provides <strong>two basketball storage trolleys</strong>{' '}
                stocked with size-6 and size-7 balls, air pumps, and medical kits.
                Basketballs are available directly at the courts.
              </p>
            </div>
          </div>

          {/* Practice Timings Table */}
          <div style={{ marginTop: '2px' }}>
            <div className="aq-table-wrap">
              <table className="aq-table">
                <thead>
                  <tr>
                    <th colSpan={3} style={{ textAlign: 'center', letterSpacing: '0.3em' }}>
                      COURT PRACTICE TIMINGS
                    </th>
                  </tr>
                  <tr>
                    <th>Session</th>
                    <th>Timing</th>
                    <th>Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {timings.map((row, i) => (
                    <tr key={i}>
                      <td className="aq-section-header">{row.slot}</td>
                      <td>
                        <span className={i < 2 ? 'aq-pill aq-pill-morning' : 'aq-pill aq-pill-evening'}>
                          {row.time}
                        </span>
                      </td>
                      <td style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={basky_girls} alt="IITB Women's Basketball" />
          <div className="aq-photobreak-caption">
            <span>She's Got Game</span>
            <span>IITB Women's Basketball · Champions 2024</span>
          </div>
        </div>

        {/* ══════════════════════════════════
            §2  EVENTS & TOURNAMENTS
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
            <p className="aq-section-sub">Click any event card to read the full story</p>
          </div>

          <div className="aq-story-columns">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`aq-story${openStory === i ? ' is-open' : ''}`}
                onClick={() => toggleStory(i)}
              >
                <div className="aq-story-photo">
                  <img src={images[i % images.length]} alt={card.title} />
                </div>
                <span className="aq-story-no">Event {String(i + 1).padStart(2, '0')}</span>
                <h3 className="aq-story-title">{card.title}</h3>
                <p className={`aq-story-content${openStory === i ? ' is-full' : ' is-clamped'}`}>
                  {card.content}
                </p>
                <span className="aq-story-toggle">
                  {openStory === i ? '↑ Collapse' : '↓ Read more'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            §3  ACHIEVEMENTS & RECORDS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">03</span>
            <span className="bar" />
            Achievements &amp; Records
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              A Legacy of <span className="italic">Excellence</span>
            </h2>
            <p className="aq-section-sub">Honours earned on the hardwood</p>
          </div>

          {/* Achievement stat strip */}
          <div className="aq-hero-stats" style={{ marginBottom: '2px' }}>
            <div className="aq-hero-stat">
              <span className="k">Inter-IIT Titles</span>
              <span className="v">3<em>+</em></span>
              <span className="c">Boys team championships</span>
            </div>
            <div className="aq-hero-stat">
              <span className="k">Girls 2024</span>
              <span className="v">1<em>st</em></span>
              <span className="c">Inter-IIT Champions</span>
            </div>
            <div className="aq-hero-stat">
              <span className="k">Silver</span>
              <span className="v">2<em>×</em></span>
              <span className="c">Boys &amp; Girls runner-up</span>
            </div>
            <div className="aq-hero-stat">
              <span className="k">Podium Streak</span>
              <span className="v">3<em>yr</em></span>
              <span className="c">Consecutive 2022–2024</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="aq-timeline-wrap">
            <Timel />
          </div>
        </section>

        {/* ══════════════════════════════════
            §4  PEOPLE / COUNCIL / CONTACT
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">04</span>
            <span className="bar" />
            People &amp; Council
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Get in <span className="italic">Touch</span>
            </h2>
            <p className="aq-section-sub">Reach out to the team leadership</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={deep} alt="Deepraj Kasherwal" className="aq-contact-img" />
              <p className="aq-contact-name">Deepraj Kasherwal</p>
              <p className="aq-contact-role">Institute Basketball Secretary</p>
              <p className="aq-contact-detail">+91 97615 43343</p>
            </div>
            <div className="aq-contact-card">
              <img src={user} alt="Nilesh Sawant" className="aq-contact-img" />
              <p className="aq-contact-name">Nilesh Sawant</p>
              <p className="aq-contact-role">Head Coach</p>
              <p className="aq-contact-detail">+91 94220 95558</p>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════
          §5  GALLERY (full-bleed)
      ══════════════════════════════════ */}
      <section className="aq-gallery-section">
        <div className="aq-eyebrow" style={{ marginTop: '56px', paddingLeft: 'clamp(20px,4vw,56px)' }}>
          <span className="num">05</span>
          <span className="bar" />
          Gallery
        </div>
        <div
          className="aq-section-head"
          style={{ paddingLeft: 'clamp(20px,4vw,56px)', paddingRight: 'clamp(20px,4vw,56px)' }}
        >
          <h2 className="aq-section-title">
            Moments from the <span className="italic">Court</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={captions[currentIndex]}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[currentIndex]}</span>
            <span>IITB Basketball · {currentIndex + 1} / {images.length}</span>
          </div>
          <button className="aq-strip-btn aq-strip-prev" onClick={handlePrev} aria-label="Previous">
            &#8249;
          </button>
          <button className="aq-strip-btn aq-strip-next" onClick={handleNext} aria-label="Next">
            &#8250;
          </button>
        </div>

        <div className="aq-strip-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`aq-strip-thumb${i === currentIndex ? ' is-active' : ''}`}
              onClick={() => handleThumb(i)}
              aria-label={captions[i]}
            >
              <img src={img} alt={captions[i]} />
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
            <p className="aq-section-sub">Indoor Basketball Courts, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.408680151891!2d72.90801220550003!3d19.133580043371115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80812c1f80f%3A0x6e9d47badec03bac!2sIndoor%20Basketball%20Courts!5e0!3m2!1sen!2sin!4v1719931678373!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="basketball court location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Basketball · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};
=======
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
    title: 'Indoor Courts',
    image: bb1,
    bullets: [
      'Two indoor courts inside the Students\' Gymkhana — available year-round for competition and casual play.',
      'Smooth hardwood floor surface; gum-sole shoes available from the H-12 store for optimal grip.',
    ],
  },
  {
    title: 'Outdoor Courts',
    image: bb3,
    bullets: [
      'Two outdoor courts for open-air shooting sessions and informal games.',
      'Some hostels also have their own courts, expanding options across campus.',
    ],
  },
  {
    title: 'Equipment',
    image: bb9,
    bullets: [
      'Two basketball storage trolleys stocked with size-6 and size-7 balls.',
      'Air pumps and on-court medical kits provided for minor mishaps.',
      'Basketballs available directly at the courts — no pre-booking needed.',
    ],
  },
  {
    title: 'Court Timings',
    image: nso,
    bullets: [
      'Morning: 6:00 AM – 9:00 AM',
      'Evening: 5:00 PM – 10:00 PM',
      'Dedicated coach Nilesh Sawant provides structured training sessions throughout the week.',
    ],
  },
];

const cards = [
  {
    title: 'PG Mania',
    content:
      'A post-graduate basketball tournament that brings together PG students from across hostels in a high-energy, competitive format. PG Mania is one of the most eagerly anticipated fixtures on the basketball calendar, running alongside the main GC season.',
  },
  {
    title: 'Basketball Farewell',
    content:
      'An annual send-off tournament for final-year students, celebrating their contributions to IITB Basketball. The event mixes competitive play with camaraderie, giving graduating players one last run on the court alongside their teammates.',
  },
  {
    title: 'NSO Trials',
    content:
      'Selection trials for the National Sports Organization scheme, open to all first-year students. NSO Basketball runs training sessions throughout the semester and is the entry point for many of the institute\'s most committed players.',
  },
  {
    title: 'Inter-IIT Pre-Camp',
    content:
      'An intensive pre-season camp run in the lead-up to the Inter-IIT Sports Meet. The pre-camp brings together the institute\'s best players for focused skill development, tactical sessions, and fitness conditioning under the coaching staff.',
  },
  {
    title: 'Alumni Day',
    content:
      'A special fixture where current institute players take on returning alumni. Alumni Day is a beloved tradition that reconnects past members with the programme and gives current players a chance to test themselves against experienced competition.',
  },
  {
    title: "She's Got Game",
    content:
      'A dedicated women\'s basketball event designed to celebrate and grow women\'s participation in the sport on campus. She\'s Got Game features workshops, competitive play, and open sessions aimed at creating a stronger, more visible women\'s basketball community at IITB.',
  },
];

const galleryImages = [basky_team, basky_girls, basky_boys, bb2, bb3, bb4, bb5, nso, bb8, bb9, bb10, bb11, bb12];

/* ============================================================
   BASKETBALL
============================================================ */
const Basketball = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentIndex, setCurrentIndex]  = useState(0);
  const [slideDir, setSlideDir]          = useState('next');
  const timelineWrapRef                  = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const courtsCount = useCountUp(4, 800);
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
    <div className="aq-root bb-root-overrides">

      {/* ── MASTHEAD ── */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">B</span>
          <span>IIT Bombay Basketball&nbsp;/&nbsp;Students' Gymkhana</span>
        </div>
        <div className="aq-masthead-meta">
          <span>Coach&nbsp;<strong>Nilesh Sawant</strong></span>
          <span><strong>4</strong> Courts on Campus</span>
          <span><strong>Powai</strong>&nbsp;·&nbsp;IIT Bombay</span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* ── HERO ── */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 04</span>
            <span className="sep">§</span>
            <span>Basketball&nbsp;·&nbsp;Students' Gymkhana</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Basketball</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                The IITB Basketball family is an integral part of the dynamic sports culture of the
                institute. The team boasts a history of captivating performances in various
                tournaments, leading to championships in many. This is made possible with access to
                state-of-the-art facilities, a dedicated coach, and rigorous training. The sport has
                left us with a plethora of teachings: camaraderie, perseverance, and integrity.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Total Courts</span>
                <span className="v"><em>{courtsCount}</em></span>
                <span className="c">2 Indoor · 2 Outdoor</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
                  Nilesh<em> S.</em>
                </span>
                <span className="c">+91 94220 95558</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Fixtures</span>
                <span className="v">{eventsCount}</span>
                <span className="c">Annual events</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Court Hours</span>
                <span className="v" style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                  6<em>am</em>–9<em>am</em>
                </span>
                <span className="c">Also 5pm–10pm</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={basky_team} alt="IITB Basketball team" />
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
            <p className="aq-section-sub">Four courts. Two sessions daily. All year round.</p>
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

        <PhotoBreak image={basky_boys} tag="Fig. A" caption="Men's squad — pre-season training block." />

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

        <PhotoBreak image={basky_girls} tag="Fig. B" caption="Women's squad — She's Got Game." />

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
              <img alt="Manikarnika Sharma" src={manikarnika} className="aq-contact-img" />
              <p className="aq-contact-name">Manikarnika Sharma</p>
              <p className="aq-contact-role">Institute Basketball Secretary</p>
              <p className="aq-contact-detail">+91 78781 12350</p>
            </div>
            <div className="aq-contact-card">
              <img alt="Nilesh Sawant" src={basketballLogo} className="aq-contact-img" />
              <p className="aq-contact-name">Nilesh Sawant</p>
              <p className="aq-contact-role">Coach</p>
              <p className="aq-contact-detail">+91 94220 95558</p>
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
              alt={`Basketball gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig.&nbsp;{String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Basketball&nbsp;·&nbsp;Students' Gymkhana</span>
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
            <p className="aq-section-sub">Indoor Basketball Courts&nbsp;·&nbsp;Students' Gymkhana&nbsp;·&nbsp;IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.408680151891!2d72.90801220550003!3d19.133580043371115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80812c1f80f%3A0x6e9d47badec03bac!2sIndoor%20Basketball%20Courts!5e0!3m2!1sen!2sin!4v1719931678373!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Basketball Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* ── FOOTER ── */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay&nbsp;·&nbsp;Basketball&nbsp;·&nbsp;Students' Gymkhana</span>
          <span>Print / Digital&nbsp;·&nbsp;Final Edition</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Basketball;