import React, { useState } from 'react';
import './aquatics.css';
import Timel from './timeline';

import bm1 from '../assets/bm1.jpeg';
import bm2 from '../assets/bm2.jpeg';
import bm3 from '../assets/bm3.jpeg';
import bm4 from '../assets/bm4.jpeg';
import bm5 from '../assets/bm5.jpeg';
import bm6 from '../assets/bm6.jpeg';
import bm7 from '../assets/bm7.jpeg';
import bm8 from '../assets/bm8.jpeg';
import user from '../assets/user.jpg';

const Badminton = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Institute Badminton Open (IBO)',
      content: 'The flagship individual tournament bringing together badminton players across all batches to compete for the Institute singles and doubles titles.'
    },
    {
      title: 'Institute Badminton League (IBL)',
      content: 'Franchise-style league where top campus players are drafted into competitive teams, featuring intense round-robin fixtures and playoffs.'
    },
    {
      title: 'General Championship',
      content: 'Inter-hostel general championship where hostel squads clash for supreme bragging rights and valuable GC points.'
    },
    {
      title: 'Institute Freshman Open',
      content: 'Dedicated tournament designed for incoming first-year students to showcase their racquet skills and join the institute team pipeline.'
    },
    {
      title: 'PGGC',
      content: 'Postgraduate General Championship celebrating the badminton talent among M.Tech, M.Des, M.Sc, and Ph.D. scholars.'
    },
    {
      title: 'Battle of Batches',
      content: 'Competitive intra-campus tournament pitting senior and junior year batches against each other in team matches.'
    }
  ];

  const images = [bm1, bm2, bm3, bm4, bm6, bm7, bm8].filter(Boolean);

  const captions = [
    "Smash Practice",
    "Court Action",
    "Doubles Match",
    "Training Drill",
    "Team Photo",
    "Tournament Play",
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

  const safeImages = images?.length > 0 ? images : [bm1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">B</span>
          IITB Badminton
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
            Badminton
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Badmin<span className="italic">ton</span>
              </h1>
              <p className="aq-hero-lede">
                Badminton is one of the most popular sports on our campus, catering to all residents including students, professors, and staff members. Located right in front of Hostel 2 and beside the Swimming Pool in the Old Gymkhana, the courts are a constant hub of energy, high-velocity rallies, and dedicated training throughout the year.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v">7<em></em></span>
                <span className="c">Synthetic flooring indoor hall</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Climate</span>
                <span className="v">AC<em></em></span>
                <span className="c">Centralised air conditioning</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">Leagues, IBO &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Location</span>
                <span className="v">H2<em></em></span>
                <span className="c">Opposite Hostel 2</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={bm1 || bm5} alt="IITB Badminton Hall" />
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
              Indoor <span className="italic">Badminton Hall</span>
            </h2>
            <p className="aq-section-sub">State-of-the-art synthetic courts with professional coaching support</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={bm5 || bm2} alt="7 Synthetic Courts with AC" />
              </div>
              <h3 className="aq-facility-title">7 Synthetic AC Courts</h3>
              <p className="aq-facility-body">
                Our institute features a separate, dedicated indoor badminton hall equipped with <strong>7 synthetic flooring courts</strong> built with a centralised air conditioning system for optimal playing conditions in all seasons.
              </p>
            </div>

            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={bm3 || bm4} alt="Coaching & Guidance" />
              </div>
              <h3 className="aq-facility-title">Coaching &amp; Mentorship</h3>
              <p className="aq-facility-body">
                We have a dedicated coach and sports officer providing professional training, tactical guidance, and fitness drills for the institute team as well as developing campus players.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={bm7 || bm1} alt="Badminton Action" />
          <div className="aq-photobreak-caption">
            <span>High Voltage Rallies</span>
            <span>IITB Badminton · Precision &amp; Agility</span>
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
            <p className="aq-section-sub">Podium finishes at the Inter-IIT Sports Meet</p>
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
            <p className="aq-section-sub">Reach out to our coach and institute secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Shelendra Rasaniya" className="aq-contact-img" />
              <p className="aq-contact-name">Shelendra Rasaniya</p>
              <p className="aq-contact-role">Coach &amp; Sports Officer</p>
              <p className="aq-contact-detail">+91 97939 90585</p>
            </div>
            <div className="aq-contact-card">
              <img src={user} alt="J Sai Charan" className="aq-contact-img" />
              <p className="aq-contact-name">J Sai Charan</p>
              <p className="aq-contact-role">Institute Badminton Secretary</p>
              <p className="aq-contact-detail">+91 73581 79779</p>
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
            alt={captions[safeIndex] || 'Badminton Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Badminton'}</span>
            <span>IITB Badminton · {safeIndex + 1} / {safeImages.length}</span>
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
            <p className="aq-section-sub">Badminton Court, Old Gymkhana, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.3410964230648!2d72.91128878064984!3d19.1355206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80707f747dd%3A0x2836a7e40ba1c6e5!2sBadminton%20Court!5e0!3m2!1sen!2sin!4v1720102713953!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Badminton Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Badminton · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Badminton;