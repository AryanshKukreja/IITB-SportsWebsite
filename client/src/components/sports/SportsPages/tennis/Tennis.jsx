import React, { useState } from 'react';
import './cricket.css';
import Timel from './timeline';

import lt1 from './assets/lt1.jpg';
import lt2 from './assets/lt2.jpg';
import lt3 from './assets/lt3.jpg';
import lt4 from './assets/lt4.jpg';
import lt5 from './assets/lt5.jpg';
import user from '../../../Contact/pictures/Logos_for_Photos/Nehal.jpg';

const Tennis = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Lawn Tennis GC',
      content: 'Held annually in the Spring Semester under three categories: Boys, Girls, and PGs. Best tennis players from each hostel go head-to-head for GC glory.'
    },
    {
      title: 'NSO',
      content: 'Part of the academic curriculum for undergraduate students. Selected first-year students undergo structured tennis coaching 2 days a week.'
    },
    {
      title: 'Institute Tennis League',
      content: 'IIT-B’s version of the IPTL. A team-based auction event where 8 team managers draft players into two pools, competing across Men’s/Women’s Singles and Doubles.'
    },
    {
      title: 'Institute Tennis Open',
      content: 'Flagship Grand-Slam styled open singles tournament held in Autumn Semester, open to all students, alumni, professors, and staff.'
    },
    {
      title: 'Freshiesta',
      content: 'Tournament giving freshers and NSO students a chance to battle it out in a compass draw format ensuring equal match exposure.'
    },
    {
      title: 'Summer Slam',
      content: 'Conducted late in March with fast-paced mini-set formats (e.g. best of 21 points) for high-energy competitive action.'
    }
  ];

  const images = [lt1, lt2, lt3, lt4, lt5].filter(Boolean);

  const captions = [
    "Court Action",
    "Forehand Rally",
    "Serving Drill",
    "Doubles Match",
    "Campus Championship"
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

  const safeImages = images?.length > 0 ? images : [lt1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">T</span>
          IITB Lawn Tennis
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
            Lawn Tennis
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Lawn <span className="italic">Tennis</span>
              </h1>
              <p className="aq-hero-lede">
                The well-maintained courts at IIT Bombay are open to players of all levels — whether picking up a racquet for the first time or chasing championship points. With a calendar full of exciting leagues, Open tournaments, and workshops, the Tennis Club is a vibrant hub for competition, physical fitness, and camaraderie.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v">6<em></em></span>
                <span className="c">3 Upper · 3 Lower Courts</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Location</span>
                <span className="v">SAC<em></em></span>
                <span className="c">Near Convo &amp; Staff Hostel</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">Open, ITL League &amp; GCs</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Format</span>
                <span className="v">IPTL<em></em></span>
                <span className="c">Grand-slam &amp; Auction League</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={lt1 || lt2} alt="IITB Lawn Tennis Court" />
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
              Outdoor <span className="italic">Tennis Courts</span>
            </h2>
            <p className="aq-section-sub">Upper and Lower court complexes on campus</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={lt2 || lt1} alt="Upper & Lower Tennis Courts" />
              </div>
              <h3 className="aq-facility-title">6 Regulation Hard Courts</h3>
              <p className="aq-facility-body">
                There are <strong>6 tennis courts overall</strong> on campus: 3 courts close to the Convocation Hall (Upper Courts) and 3 courts near the Staff Hostel (Lower Courts), equipped for day and floodlit night play.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={lt3 || lt1} alt="Lawn Tennis Match" />
          <div className="aq-photobreak-caption">
            <span>Precision &amp; Fitness</span>
            <span>IITB Lawn Tennis · Serves, Rallies &amp; Championship Passion</span>
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
            <p className="aq-section-sub">Reach out to our institute tennis secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Nehal Gupta" className="aq-contact-img" />
              <p className="aq-contact-name">Nehal Gupta</p>
              <p className="aq-contact-role">Institute Lawn Tennis Secretary</p>
              <p className="aq-contact-detail">+91 82910 25201</p>
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
            alt={captions[safeIndex] || 'Tennis Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Lawn Tennis'}</span>
            <span>IITB Tennis · {safeIndex + 1} / {safeImages.length}</span>
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
            <p className="aq-section-sub">Lawn Tennis Courts, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.38794229164!2d72.90822443382704!3d19.134488600267908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c74281daf5e3%3A0xe0c050e0ec9a18cf!2sTennis%20court!5e0!3m2!1sen!2sin!4v1720443451101!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Tennis court location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Lawn Tennis · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Tennis;
