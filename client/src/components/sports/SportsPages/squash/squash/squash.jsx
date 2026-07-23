import React, { useState } from 'react';
import './squash.css';
import Timel from './timeline';

import p1 from '../assets/squash1.jpg';
import p2 from '../assets/squash2.jpg';
import p3 from '../assets/squash3.jpg';
import p4 from '../assets/squash4.jpg';
import p5 from '../assets/squash5.jpg';
import user from '../assets/user.jpg';

const Squash = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Summer & Semester Camps',
      content: 'Camps held by professional coaches at beginner, intermediate, and advanced levels for students, staff, and families. Includes stroke refining in high-intensity court drills.'
    },
    {
      title: 'NSO Scheme',
      content: 'Undergraduate NSO training scheme where selected students undergo regular coaching twice a week, developing lifelong fitness and high-level squash technique.'
    },
    {
      title: 'Squash GC',
      content: 'The inter-hostel squash General Championship where hostel squads clash in high-velocity knockouts for institute glory.'
    },
    {
      title: 'Institute Squash League',
      content: 'Franchise-style league bringing together top players across all student batches and faculty in team competition.'
    },
    {
      title: 'Institute Squash Open',
      content: 'The flagship open individual tournament open to all campus residents, alumni, and faculty.'
    }
  ];

  const images = [p1, p2, p3, p4, p5].filter(Boolean);

  const captions = [
    "Squash Court Action",
    "High-Speed Rally",
    "New SAC Court",
    "Tournament Match",
    "Institute Squad"
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

  const safeImages = images?.length > 0 ? images : [p3];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">S</span>
          IITB Squash
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
            Squash
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Squ<span className="italic">ash</span>
              </h1>
              <p className="aq-hero-lede">
                Squash at IIT Bombay is a fast-paced and exhilarating sport that blends strategy, speed, and stamina. With top-standard court facilities in New SAC, passionate coaching, and a driven squad, IIT Bombay Squash proudly represents the institute at the Inter-IIT Sports Meet.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v">3<em>+1</em></span>
                <span className="c">3 Active + 1 Upcoming Court</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Location</span>
                <span className="v">SAC<em></em></span>
                <span className="c">New Student Activity Centre</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">5<em>+</em></span>
                <span className="c">ISL League, Open &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Access</span>
                <span className="v">All<em></em></span>
                <span className="c">Student &amp; Faculty access</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={p3 || p1} alt="IITB Squash Court" />
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
              New SAC <span className="italic">Squash Courts</span>
            </h2>
            <p className="aq-section-sub">Modern glass-backed courts and expanding infrastructure</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={p3 || p2} alt="3 Active Courts in New SAC" />
              </div>
              <h3 className="aq-facility-title">Indoor Glass-Back Courts</h3>
              <p className="aq-facility-body">
                There are currently <strong>3 squash courts</strong> located in the New SAC (Student Activity Centre), providing ample space for training and recreational play. One additional court is under construction to accommodate growing campus interest.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={p1 || p3} alt="Squash Match Action" />
          <div className="aq-photobreak-caption">
            <span>High Intensity Rallies</span>
            <span>IITB Squash · Speed, Strategy &amp; Stamina</span>
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
            <p className="aq-section-sub">Inter-IIT Sports Meet performances</p>
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
            <p className="aq-section-sub">Reach out to our institute squash secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Manthan Goyal" className="aq-contact-img" />
              <p className="aq-contact-name">Manthan Goyal</p>
              <p className="aq-contact-role">Institute Squash Secretary</p>
              <p className="aq-contact-detail">+91 98260 22623</p>
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
            Moments from the <span className="italic">Court</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Squash Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Squash'}</span>
            <span>IITB Squash · {safeIndex + 1} / {safeImages.length}</span>
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
              Find the <span className="italic">Courts</span>
            </h2>
            <p className="aq-section-sub">New SAC Squash Courts, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4020806480025!2d72.9093683747526!3d19.133869182082652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1721551340933!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Squash Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Squash · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Squash;
