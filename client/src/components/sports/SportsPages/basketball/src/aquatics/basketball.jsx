import React, { useState } from 'react';
import './aquatics.css';
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
import user from '../assets/user.jpg';
import nso from '../assets/nso.jpg';
import basky_boys from '../assets/basky_boys.png';
import basky_girls from '../assets/basky_girls.png';

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

export default Basketball;