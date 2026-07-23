import React, { useState } from 'react';
import './cricket.css';
import Timel from './timeline';

import cricket1 from '../images/cricket_1.jpg';
import cric1 from '../images/cric1.jpg';
import cric2 from '../images/cric2.jpg';
import cric3 from '../images/cric3.jpg';
import cric4 from '../images/cric4.jpg';
import user from '../../../../Contact/pictures/Logos_for_Photos/Pradyumna.jpg';

const Cricket = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'NSO',
      content: "It's a part of the academic curriculum for the undergraduate students. Through selections for students who opted for cricket, nearly 30-40 are selected and trained throughout the academic year, 2 days a week (Monday and Tuesday)."
    },
    {
      title: 'Cricmania',
      content: 'It is the flagship open tournament for Cricket in IIT Bombay. This tournament is open to all students, alumni, professors and staff. It is held in the Spring Semester. Highly competitive and a must-play for all cricket enthusiasts as it presents a great opportunity for intermediates to test their skills against experienced Inter-IIT players.'
    },
    {
      title: 'Cricket GC',
      content: 'This is the inter-hostel cricket tournament which takes place every year on the main ground in which hostels bring their best players to win and grab valuable points for the sports General Championship. It comprises 15-over matches played with white balls in January.'
    },
    {
      title: 'Mixed Cricket League',
      content: "It's a fun event taking place in the Open Air Theatre (OAT) where 32 teams each comprising 5 guys and 2 girls play against each other with street cricket rules. It usually takes place in October."
    },
    {
      title: 'FreshMan League',
      content: 'Initiated to give freshmen an opportunity to showcase their talent gained through NSO, GC, Cricmania and camps. The league of 4 bidding-formed teams takes place in March, serving as a breeding ground for future Inter-IIT stars.'
    }
  ];

  const images = [cricket1, cric1, cric2, cric3, cric4].filter(Boolean);

  const captions = [
    "Inter-IIT Gold Champions",
    "Main Ground Match",
    "Day & Night Cricket",
    "Net Practice Session",
    "Team Huddle"
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

  const safeImages = images?.length > 0 ? images : [cricket1];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">C</span>
          IITB Cricket
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
            Cricket
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Cric<span className="italic">ket</span>
              </h1>
              <p className="aq-hero-lede">
                Cricket is as much a religion at IIT Bombay as it is across the country. From Day &amp; Night matches on our main field to late-night sessions in the Indoor Nets, the passion runs deep. Last year, the institute made history by winning Gold in Inter-IIT Cricket after 16 years — a proud moment for the entire campus!
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Ground</span>
                <span className="v">Main<em></em></span>
                <span className="c">Full-size main Oval ground</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Indoor Nets</span>
                <span className="v">4<em></em></span>
                <span className="c">Pitches opposite Hostel 3</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">5<em>+</em></span>
                <span className="c">Cricmania, GC &amp; Leagues</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Inter-IIT</span>
                <span className="v">GOLD<em></em></span>
                <span className="c">2024 Gold Medallists</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={cricket1 || cric1} alt="IITB Cricket Team" />
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
              Main Ground &amp; <span className="italic">Indoor Nets</span>
            </h2>
            <p className="aq-section-sub">State-of-the-art turf, floodlights, and year-round practice nets</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={cric2 || cricket1} alt="Main Ground & Floodlights" />
              </div>
              <h3 className="aq-facility-title">Main Ground &amp; Night Lights</h3>
              <p className="aq-facility-body">
                The main cricket ground is situated in the heart of the gymkhana bordered by the athletic track. High-intensity floodlights are installed on the gymkhana structure to enable top-tier Day &amp; Night matches for institute tournaments and General Championships.
              </p>
            </div>

            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={cric3 || cric4} alt="Indoor Nets & Monsoon Pitches" />
              </div>
              <h3 className="aq-facility-title">4 Indoor Nets &amp; monsoon pitches</h3>
              <p className="aq-facility-body">
                There are <strong>4 indoor cricket pitches</strong> located directly opposite Hostel 3 for uninterrupted monsoon practice and late-night net sessions. Customized net pitches and full gear bags ensure players develop skills year-round.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={cric1 || cricket1} alt="Cricket Match Action" />
          <div className="aq-photobreak-caption">
            <span>Inter-IIT Champions</span>
            <span>IITB Cricket · Passion, Skill &amp; Glory</span>
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
            <p className="aq-section-sub">Inter-IIT Gold Champions &amp; historic podium finishes</p>
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
            <p className="aq-section-sub">Reach out to our institute cricket secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Pradyumna Gugulothu" className="aq-contact-img" />
              <p className="aq-contact-name">Pradyumna Gugulothu</p>
              <p className="aq-contact-role">Institute Cricket Secretary</p>
              <p className="aq-contact-detail">+91 70139 54490</p>
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
            Moments from the <span className="italic">Field</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Cricket Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Cricket'}</span>
            <span>IITB Cricket · {safeIndex + 1} / {safeImages.length}</span>
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
            <p className="aq-section-sub">Cricket Ground, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3869185665076!2d72.90968797511066!3d19.134533450132537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820fd0657%3A0xe732ba0e0eb134b1!2sCricket%20Ground!5e0!3m2!1sen!2sin!4v1720263060691!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Cricket Ground Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Cricket · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Cricket;