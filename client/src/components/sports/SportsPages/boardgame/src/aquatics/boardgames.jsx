import React, { useState } from 'react';
import './aquatics.css';
import Timel from './timeline';

import bg1 from '../assets/bg1.jpeg';
import bg2 from '../assets/bg2.jpeg';
import bg3 from '../assets/bg3.jpeg';
import bg4 from '../assets/bg4.jpeg';
import bg5 from '../assets/bg5.jpeg';
import bg6 from '../assets/bg6.jpeg';
import bg7 from '../assets/bg7.jpeg';
import bg8 from '../assets/bg8.jpeg';
import bg9 from '../assets/bg9.jpeg';
import bg10 from '../assets/bg10.jpeg';
import bg11 from '../assets/bg11.jpeg';
import bg12 from '../assets/bg12.jpeg';
import bg13 from '../assets/bg13.jpeg';
import bg14 from '../assets/bg14.jpeg';
import bg15 from '../assets/bg15.jpeg';
import bgsec from '../assets/bgsec.jpg';
import user from '../assets/user.jpg';

const BoardGames = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Institute Chess Open (Rapid)',
      content: 'Rapid chess tournament bringing together tactical minds across all batches to compete for institute honors.'
    },
    {
      title: 'Institute Chess Championship',
      content: 'The premier annual classical chess event at IIT Bombay, deciding the institute chess champion.'
    },
    {
      title: 'Institute Chess League',
      content: 'Team-based competitive chess league fostering intense strategic battles across student & faculty squads.'
    },
    {
      title: 'Chess General Championship',
      content: 'Inter-hostel chess general championship where hostels compete for championship points on the board.'
    },
    {
      title: 'Chess: PG Mania',
      content: 'Exclusive tournament for postgraduate students to battle it out on the 64 squares.'
    },
    {
      title: 'Carrom General Championship',
      content: 'Inter-hostel carrom championship featuring singles and doubles strikes for the GC crown.'
    }
  ];

  const images = [
    bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg11, bg12, bg13, bg14, bg15
  ].filter(Boolean);

  const captions = [
    "Chess Championship",
    "Carrom Action",
    "Pool & Snooker Session",
    "Dark Knight Tournament",
    "Rubik's Speedcubing",
    "Foosball Match",
    "GC Final Round",
    "Board Games Room",
    "Club Session",
    "Inter-IIT Prep",
    "Freshman Workshop",
    "Blitz Event",
    "Tactical Play",
    "Campus Cup"
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

  const safeImages = images?.length > 0 ? images : [bg1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">B</span>
          IITB Board Games
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
            Board Games
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Board <span className="italic">Games</span>
              </h1>
              <p className="aq-hero-lede">
                Institute Board Games caters to all who want to learn any kind of Board Games. With the increasing culture of Chess, Carrom, and Pool in the Institute, we also conduct events for Snooker, Rubik's Cube, and Foosball. We envision taking our Board Games culture to an established level of competitive sport. Being indoors, we serve students all 365 days a year. Board Games is not for the lethargic, but for the enthusiastic!
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Facility</span>
                <span className="v">SAC<em>2nd</em></span>
                <span className="c">Board Games Room 2nd Floor</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Clubs</span>
                <span className="v">2<em></em></span>
                <span className="c">DKCC &amp; Rubik's Club</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">Open Tournaments &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Availability</span>
                <span className="v">365<em>d</em></span>
                <span className="c">Year-round indoor access</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={bgsec || bg10} alt="IITB Board Games Room" />
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
            §1  CLUBS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">01</span>
            <span className="bar" />
            Subordinate Clubs
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Our Student <span className="italic">Clubs</span>
            </h2>
            <p className="aq-section-sub">Active communities fostering mind sports and puzzle solving</p>
          </div>

          <div className="aq-club-grid">
            <div className="aq-club-card">
              <h3 className="aq-club-title">Dark Knight Chess Club (DKCC)</h3>
              <p className="aq-club-body">
                The Dark Knight Chess Club is IIT Bombay's official student-run chess community. It brings together chess enthusiasts across all skill levels – from casual players to rated professionals. The club conducts friendly tournaments and All India College-level competitions like the All India Chess League (AICL), as well as inter-college and national events.
              </p>
              <a
                href="https://www.instagram.com/dkcc_iitb/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="aq-club-link"
              >
                Follow DKCC on Instagram →
              </a>
            </div>

            <div className="aq-club-card">
              <h3 className="aq-club-title">Rubik's Club</h3>
              <p className="aq-club-body">
                The Rubik's Cube Club of IIT Bombay is a vibrant space for cubing enthusiasts. It promotes speedcubing and puzzle-solving through competitions and workshops. From 2x2 to complex NxN and twisty puzzles, the club nurtures problem-solving skills for every puzzle lover.
              </p>
              <a
                href="https://www.instagram.com/rubiksclub_iitb/"
                target="_blank"
                rel="noopener noreferrer"
                className="aq-club-link"
              >
                Follow Rubik's Club on Instagram →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            §2  FACILITIES
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">02</span>
            <span className="bar" />
            Facilities
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Board Games <span className="italic">Room</span>
            </h2>
            <p className="aq-section-sub">Located on the 2nd floor of New SAC</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={bg10 || bg1} alt="Board Games Room Equipment" />
              </div>
              <h3 className="aq-facility-title">Indoor Arena Equipment</h3>
              <p className="aq-facility-body">
                The Board Games Room on the 2nd Floor of New SAC is fully equipped for indoor sports with:
                <br />• <strong>1 Pool Table</strong>
                <br />• <strong>1 Snooker Table</strong>
                <br />• <strong>1 Foosball Table</strong>
                <br />• <strong>Multiple Carrom Boards</strong>
                <br />• <strong>Multiple Tournament Chess Boards</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={bg5 || bg1} alt="Chess Rallies" />
          <div className="aq-photobreak-caption">
            <span>Mind Sports &amp; Strategy</span>
            <span>IITB Board Games · Focus &amp; Intellect</span>
          </div>
        </div>

        {/* ══════════════════════════════════
            §3  EVENTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">03</span>
            <span className="bar" />
            Events &amp; Competitions
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Annual <span className="italic">Events</span>
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
            §4  ACHIEVEMENTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">04</span>
            <span className="bar" />
            Achievements &amp; Honours
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              A Legacy of <span className="italic">Excellence</span>
            </h2>
            <p className="aq-section-sub">Gold Medal victories at Inter-IIT Sports Meets</p>
          </div>

          <div className="aq-timeline-wrap">
            <Timel />
          </div>
        </section>

        {/* ══════════════════════════════════
            §5  CONTACT
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">05</span>
            <span className="bar" />
            People &amp; Leadership
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Get in <span className="italic">Touch</span>
            </h2>
            <p className="aq-section-sub">Reach out to our board games secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Akshat Karkar" className="aq-contact-img" />
              <p className="aq-contact-name">Akshat Karkar</p>
              <p className="aq-contact-role">Institute Board Games Secretary</p>
              <p className="aq-contact-detail">+91 93216 09259</p>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════
          §6  GALLERY
      ══════════════════════════════════ */}
      <section className="aq-gallery-section">
        <div className="aq-eyebrow" style={{ marginTop: '56px', paddingLeft: 'clamp(16px,3vw,48px)' }}>
          <span className="num">06</span>
          <span className="bar" />
          Gallery
        </div>
        <div
          className="aq-section-head"
          style={{ paddingLeft: 'clamp(16px,3vw,48px)', paddingRight: 'clamp(16px,3vw,48px)' }}
        >
          <h2 className="aq-section-title">
            Moments from the <span className="italic">Arena</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Board Games Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Board Games'}</span>
            <span>IITB Board Games · {safeIndex + 1} / {safeImages.length}</span>
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
          §7  LOCATION
      ══════════════════════════════════ */}
      <div className="aq-app" style={{ paddingTop: '56px' }}>
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">07</span>
            <span className="bar" />
            Location
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Find the <span className="italic">Room</span>
            </h2>
            <p className="aq-section-sub">New SAC 2nd Floor, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7538.855698547374!2d72.90781494213336!3d19.132740178333854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1719953908712!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Board Games Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Board Games · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default BoardGames;
