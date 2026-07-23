import React, { useState } from 'react';
import './aquatics.css';
import Timel from './timeline';

import p1 from '../assets/1.jpg';
import p2 from '../assets/2.jpg';
import p3 from '../assets/3.jpg';
import p4 from '../assets/4.jpg';
import p5 from '../assets/5.jpg';
import user from '../assets/user.jpg';

const Athletics = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Summer Camp',
      content: 'Summer athletics training camp for beginners and advanced athletes.'
    },
    {
      title: 'NSO',
      content: 'National Sports Organization activities and competitions.'
    },
    {
      title: 'Campathon',
      content: 'Marathon and endurance running events on campus.'
    },
    {
      title: 'Crossy GC',
      content: 'Cross country running general championship.'
    },
    {
      title: 'Triathlon GC',
      content: 'Multi-sport endurance competition including swimming, cycling, and running.'
    },
    {
      title: 'Mixed Relay',
      content: 'Team relay events with mixed gender participation.'
    }
  ];

  const images = [p1, p2, p3, p4, p5].filter(Boolean);

  const captions = [
    "Track Practice",
    "Field Training",
    "Sprint Session",
    "Endurance Run",
    "Team Event"
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
          <span className="aq-crest">A</span>
          IITB Athletics
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
            Athletics
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Athle<span className="italic">tics</span>
              </h1>
              <p className="aq-hero-lede">
                Comprising track and field events, Athletics is one of the most spirited and inclusive sports at IIT Bombay. With a well-maintained grass track and year-round training under the guidance of Irfan Sir and Renu Ma'am — our dedicated male and female coaches — the team strives for all-round excellence. Known for its strong team culture, IITB Athletics is where beginners rise to greatness, supported and cheered by teammates at every step. The journey matters just as much as the finish line. Fueled by passion, hard work, and team spirit, Athletics at IIT Bombay has been building a strong legacy at the Inter-IIT Sports Meet.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Tracks</span>
                <span className="v">2<em></em></span>
                <span className="c">400m Grass · 100m Synthetic</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coaches</span>
                <span className="v">2<em></em></span>
                <span className="c">Irfan Sir · Renu Ma'am</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">Annual events &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Legacy</span>
                <span className="v">Gold<em>s</em></span>
                <span className="c">Inter-IIT 2024 Winners</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={p3 || p1} alt="IITB Athletics Team" />
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
              Track &amp; Field <span className="italic">Facilities</span>
            </h2>
            <p className="aq-section-sub">Comprehensive training grounds for track, field, and endurance disciplines</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={p2 || p1} alt="400m Grass Track & 100m Synthetic Track" />
              </div>
              <h3 className="aq-facility-title">Tracks &amp; Sprint Belts</h3>
              <p className="aq-facility-body">
                IIT Bombay offers a <strong>400m grass track</strong> for endurance and sprint training. It serves as the main training ground for all track events including sprints, hurdles, middle- and long-distance running. Additionally, a <strong>100m synthetic track</strong> located beside the football ground is used for short-distance sprints and technique drills.
              </p>
            </div>

            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={p1 || p2} alt="Field Event Zones & Equipment" />
              </div>
              <h3 className="aq-facility-title">Field Event Zones &amp; Equipment</h3>
              <p className="aq-facility-body">
                Designated areas are available for field events such as <strong>long jump, high jump, shot put, and javelin</strong>, equipped with standard pits and markings for regular practice. A variety of athletic training tools — including starting blocks, hurdles, cones, resistance bands, agility ladders, sled and medicine balls — support athletes across all disciplines.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={p4 || p1} alt="IITB Athletics Training" />
          <div className="aq-photobreak-caption">
            <span>Track &amp; Field</span>
            <span>IITB Athletics · Passion &amp; Grit</span>
          </div>
        </div>

        {/* ══════════════════════════════════
            §2  EVENTS & TOURNAMENTS
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">02</span>
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
            <p className="aq-section-sub">Podium finishes &amp; accolades earned by IITB Athletes</p>
          </div>

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
            People &amp; Leadership
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Get in <span className="italic">Touch</span>
            </h2>
            <p className="aq-section-sub">Reach out to our institute secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user || p1} alt="Praveen Kumar" className="aq-contact-img" />
              <p className="aq-contact-name">Praveen Kumar</p>
              <p className="aq-contact-role">Institute Athletics Secretary</p>
              <p className="aq-contact-detail">+91 89584 34190</p>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════
          §5  GALLERY (full-bleed)
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
            Moments from the <span className="italic">Track</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Athletics Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Athletics'}</span>
            <span>IITB Athletics · {safeIndex + 1} / {safeImages.length}</span>
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
              Find the <span className="italic">Grounds</span>
            </h2>
            <p className="aq-section-sub">IITB New Gymkhana, IIT Bombay</p>
          </div>
          <div className="aq-location">
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

export default Athletics;