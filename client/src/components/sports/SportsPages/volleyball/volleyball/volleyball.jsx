import React, { useState } from 'react';
import './volleyball.css';
import Timel from './timeline';

import user from '../assets/user.jpg';
import v1 from '../assets/v1.JPG';
import v2 from '../assets/v2.JPG';
import v3 from '../assets/v3.JPG';
import v4 from '../assets/v4.JPG';

const Volleyball = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Summer & Semester Camps',
      content: 'Skill development camps focused on serving accuracy, setting drills, blocking posture, and spikes under head coach guidance.'
    },
    {
      title: 'NSO Scheme',
      content: 'Bi-weekly academic athletic training program for undergraduate freshmen interested in joining the volleyball squad pipeline.'
    },
    {
      title: 'Valentine Volleyball',
      content: 'High-spirit open tournament celebrating volleyball enthusiasm across campus hostels and batches.'
    },
    {
      title: 'Institute Volleyball League',
      content: 'Franchise-style league drafting top volleyball players across all years for competitive round-robin and playoff matches.'
    },
    {
      title: 'SPREE & Inter-IIT Prep',
      content: 'Inter-collegiate sports fest tournaments and intensive training camps for Inter-IIT selection.'
    }
  ];

  const images = [v4, v2, v3, v1].filter(Boolean);

  const captions = [
    "Volleyball Match Rally",
    "Spike & Block Action",
    "Gymkhana Indoor Arena",
    "Outdoor Practice Court"
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

  const safeImages = images?.length > 0 ? images : [v1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">V</span>
          IITB Volleyball
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
            Volleyball
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Volley<span className="italic">ball</span>
              </h1>
              <p className="aq-hero-lede">
                The Volleyball Club has access to 5 courts — 3 indoor courts at Gymkhana Grounds and 2 outdoor courts at Old SAC. Led by Head Coach Pritesh Yadav, the team focuses on technical mastery, explosive spikes, and strategic defense, backed by complete gym and physiotherapy support.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v">5<em></em></span>
                <span className="c">3 Indoor · 2 Outdoor Floodlit</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v">PY<em></em></span>
                <span className="c">Coach Pritesh Yadav</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">5<em>+</em></span>
                <span className="c">IVL League, Valentine &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Support</span>
                <span className="v">Physio<em></em></span>
                <span className="c">Gym &amp; Rehabilitation support</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={v1 || v4} alt="IITB Volleyball Court" />
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
              Indoor Arena &amp; <span className="italic">Outdoor Courts</span>
            </h2>
            <p className="aq-section-sub">5 floodlit courts, professional nets, and conditioning equipment</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={v1 || v2} alt="5 Indoor & Outdoor Volleyball Courts" />
              </div>
              <h3 className="aq-facility-title">Indoor &amp; Outdoor Court Facilities</h3>
              <p className="aq-facility-body">
                The club utilizes <strong>3 indoor courts at Gymkhana Grounds</strong> for all-weather practice and <strong>2 outdoor courts at Old SAC</strong>. All courts feature floodlights, professional-grade Mikasa balls, agility ladders, blocking nets, and fitness equipment.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={v4 || v1} alt="Volleyball Action" />
          <div className="aq-photobreak-caption">
            <span>Power &amp; Precision</span>
            <span>IITB Volleyball · Spikes, Blocks &amp; Court Energy</span>
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
            <p className="aq-section-sub">Inter-IIT Sports Meet medal performances</p>
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
            <p className="aq-section-sub">Reach out to our institute volleyball secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Ghanshyam Choudhary" className="aq-contact-img" />
              <p className="aq-contact-name">Ghanshyam Choudhary</p>
              <p className="aq-contact-role">Institute Volleyball Secretary</p>
              <p className="aq-contact-detail">+91 89494 01659</p>
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
            alt={captions[safeIndex] || 'Volleyball Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Volleyball'}</span>
            <span>IITB Volleyball · {safeIndex + 1} / {safeImages.length}</span>
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
            <p className="aq-section-sub">Gymkhana Volleyball Courts, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4020806480025!2d72.9093683747526!3d19.133869182082652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1721551340933!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Volleyball Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Volleyball · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Volleyball;
