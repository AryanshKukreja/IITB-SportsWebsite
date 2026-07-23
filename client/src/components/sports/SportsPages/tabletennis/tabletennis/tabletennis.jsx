import React, { useState } from 'react';
import './tabletennis.css';
import Timel from './timeline';

import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import user from '../assets/user.jpg';

const Tabletennis = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Summer & Semester Camps',
      content: 'Structured training camps held across semester breaks and weekends for beginners, intermediate, and advanced players.'
    },
    {
      title: 'NSO Scheme',
      content: 'Undergraduate National Sports Organization scheme providing structured bi-weekly training sessions under Coach Dhaval Karnik.'
    },
    {
      title: 'Table Tennis GC',
      content: 'Inter-hostel General Championship featuring high-stakes singles and doubles rubbers for hostelite supremacy.'
    },
    {
      title: 'Institute Table Tennis League',
      content: 'Franchise team league drafting players across batches for competitive round-robin and playoff action.'
    },
    {
      title: 'Institute Table Tennis Open',
      content: 'Flagship individual open singles and doubles tournament open to students, faculty, and alumni.'
    }
  ];

  const images = [p3, p2, p1, p4, p5].filter(Boolean);

  const captions = [
    "Table Tennis Hall",
    "High-Speed Counter Play",
    "Air-Conditioned Arena",
    "Doubles Match",
    "Team Training Session"
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

  const safeImages = images?.length > 0 ? images : [p1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">T</span>
          IITB Table Tennis
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
            Table Tennis
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Table <span className="italic">Tennis</span>
              </h1>
              <p className="aq-hero-lede">
                Table Tennis at IIT Bombay is a thriving sport defined by passion, precision, and perseverance. Under Coach Dhaval Karnik, the TT community has celebrated notable podium victories at the Inter-IIT Sports Meet. Equipped with world-class tables, specialized flooring, and a training robot, the TT hall provides the ultimate arena.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Tables</span>
                <span className="v">8<em></em></span>
                <span className="c">Stag Americas &amp; 1000Dx</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v">DK<em></em></span>
                <span className="c">Coach Dhaval Karnik</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Climate</span>
                <span className="v">AC<em></em></span>
                <span className="c">Full AC with anti-glare diffusers</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Inter-IIT</span>
                <span className="v">Podium<em>s</em></span>
                <span className="c">2022 &amp; 2023 Medallists</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={p1 || p3} alt="IITB Table Tennis Hall" />
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
            §1  FACILITIES
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">01</span>
            <span className="bar" />
            Facilities
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Air-Conditioned <span className="italic">TT Hall</span>
            </h2>
            <p className="aq-section-sub">International standard tables, robot training, and mat flooring</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={p1 || p2} alt="8 World Class Tables" />
              </div>
              <h3 className="aq-facility-title">8 World-Class Tables &amp; Equipment</h3>
              <p className="aq-facility-body">
                The air-conditioned TT hall at Gymkhana contains <strong>8 widely used international tables</strong> (Stag Americas &amp; Stag 1000Dx) with TT-specific matting to prevent slipping. Features 3-star balls, custom rackets, equipment lockers for 30+ players, and a training robot for automated multi-ball drills.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={p2 || p1} alt="Table Tennis Action" />
          <div className="aq-photobreak-caption">
            <span>Precision &amp; Spin</span>
            <span>IITB Table Tennis · Fast Rallies &amp; Podiums</span>
          </div>
        </div>

        {/* ══════════════════════════════════
            §2  EVENTS
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
            §3  ACHIEVEMENTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">03</span>
            <span className="bar" />
            Achievements &amp; Honours
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              A Legacy of <span className="italic">Excellence</span>
            </h2>
            <p className="aq-section-sub">Podium finishes at Inter-IIT 2022 &amp; 2023</p>
          </div>

          <div className="aq-timeline-wrap">
            <Timel />
          </div>
        </section>

        {/* ══════════════════════════════════
            §4  CONTACT
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">04</span>
            <span className="bar" />
            People &amp; Leadership
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Get in <span className="italic">Touch</span>
            </h2>
            <p className="aq-section-sub">Reach out to our institute TT secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Sameer Chopra" className="aq-contact-img" />
              <p className="aq-contact-name">Sameer Chopra</p>
              <p className="aq-contact-role">Institute Table Tennis Secretary</p>
              <p className="aq-contact-detail">+91 97177 77763</p>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════
          §5  GALLERY
      ══════════════════════════════════ */}
      <section className="aq-gallery-section">
        <div className="aq-eyebrow" style={{ marginTop: '56px', paddingLeft: 'clamp(16px,3vw,48px)' }}>
          <span className="num">05</span>
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
            alt={captions[safeIndex] || 'Table Tennis Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Table Tennis'}</span>
            <span>IITB Table Tennis · {safeIndex + 1} / {safeImages.length}</span>
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
              Find the <span className="italic">Hall</span>
            </h2>
            <p className="aq-section-sub">Table Tennis Hall, IITB Gymkhana, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4020806480025!2d72.9093683747526!3d19.133869182082652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1721551340933!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Table Tennis Hall Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Table Tennis · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Tabletennis;
