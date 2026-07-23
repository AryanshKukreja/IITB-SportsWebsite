import React, { useState } from 'react';
import './cricket.css';
import Timel from './timeline';

import p1 from '../assets/p1.jpeg';
import football_ground from '../assets/football_ground.jpeg';
import football_team from '../assets/football_team.jpeg';
import logo from '../assets/logo.jpeg';
import turf from '../assets/turf.jpeg';
import user from '../../../../Contact/pictures/Logos_for_Photos/Yash.jpg';

const Football = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Institute Turf League',
      content: 'Gaming enthusiasts do cherish this one! It is an open tournament, one of its kind in the institute.'
    },
    {
      title: 'NSO',
      content: 'The Government of India, through its National Sports Organization, provides a scheme in all IITs, where all incoming first year students sign up for a sport and undergo regular coaching.'
    },
    {
      title: 'Freshie Tournament',
      content: 'Freshie tournament is the first competitive event of the even semester. A platform for all the freshmen to show their skills in an 11-on-11 format.'
    },
    {
      title: 'Football GC',
      content: 'The football inter-hostel general championship is the most celebrated football event in the Institute. A professional 11-a-side tournament where hostels battle for GC glory!'
    },
    {
      title: 'Institute Football League',
      content: 'With football being the most followed sport in the Institute, the IFL includes everyone from students to research scholars and professors participating as team managers and players!'
    },
    {
      title: 'Fantasy League',
      content: 'The first of its kind and most recent addition, the Fantasy League conducted on the FPL Platform sees huge participation across the institute!'
    }
  ];

  const images = [p1, football_ground, football_team, logo, turf].filter(Boolean);

  const captions = [
    "11-a-side Match Action",
    "Main Football Ground",
    "Institute Squad",
    "Football Crest",
    "6-a-side Turf Pitch"
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
          <span className="aq-crest">F</span>
          IITB Football
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
            Football
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Foot<span className="italic">ball</span>
              </h1>
              <p className="aq-hero-lede">
                Football is a family of team sports that involves kicking a ball to score goals. Being the most followed sport at IIT Bombay, the beautiful game brings together students, research scholars, and faculty. Students can easily book turf and ground slots directly through the Sports Application timetable.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Ground</span>
                <span className="v">11<em>s</em></span>
                <span className="c">Full-size 11-a-side field</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Turf</span>
                <span className="v">6<em>s</em></span>
                <span className="c">Newly built 6-a-side turf</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">IFL, Turf League &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Booking</span>
                <span className="v">App<em></em></span>
                <span className="c">Live slot booking on App</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={football_team || football_ground} alt="IITB Football Team" />
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
              Main Ground &amp; <span className="italic">Artificial Turf</span>
            </h2>
            <p className="aq-section-sub">State-of-the-art pitches and training equipment</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={football_ground || p1} alt="11-a-side Main Field" />
              </div>
              <h3 className="aq-facility-title">11-a-side Main Field</h3>
              <p className="aq-facility-body">
                IIT Bombay houses a full-size 11-a-side natural grass football ground bordered by the athletic track. It hosts the Inter-IIT squad practices, IFL matches, and the annual Football General Championship.
              </p>
            </div>

            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={turf || p1} alt="6-a-side Artificial Turf" />
              </div>
              <h3 className="aq-facility-title">6-a-side Turf &amp; Equipment</h3>
              <p className="aq-facility-body">
                Features a newly constructed 6-a-side synthetic turf with lighting for evening matches. The facility is equipped with modern training gear, agility ladders, cones, a refrigerator for instant ice packs, and a dedicated water cooler in the shed.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={p1 || football_team} alt="Football Match Action" />
          <div className="aq-photobreak-caption">
            <span>The Beautiful Game</span>
            <span>IITB Football · Passion, Teamwork &amp; Grit</span>
          </div>
        </div>

        {/* ══════════════════════════════════
            §2  EVENTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">02</span>
            <span className="bar" />
            Events &amp; Leagues
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Annual <span className="italic">Tournaments</span>
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
            <p className="aq-section-sub">Reach out to our institute football secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Yash Shah" className="aq-contact-img" />
              <p className="aq-contact-name">Yash Shah</p>
              <p className="aq-contact-role">Institute Football Secretary</p>
              <p className="aq-contact-detail">+91 88494 68317</p>
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
            Moments from the <span className="italic">Pitch</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Football Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Football'}</span>
            <span>IITB Football · {safeIndex + 1} / {safeImages.length}</span>
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
              Find the <span className="italic">Ground</span>
            </h2>
            <p className="aq-section-sub">Football Ground &amp; Turf, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3869185665076!2d72.90968797511066!3d19.134533450132537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820fd0657%3A0xe732ba0e0eb134b1!2sCricket%20Ground!5e0!3m2!1sen!2sin!4v1720263060691!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Football Ground Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Football · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Football;
