import React, { useState } from 'react';
import './cricket.css';
import Timel from './timeline4';

import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import user from '../../../../Contact/pictures/Logos_for_Photos/Khushal.jpg';

const Hockey = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Hockey GC',
      content: 'Being scheduled towards the end of the season every year, it many times turns out to be the Overall Championship decider. The event sees great participation and hostel spirit.'
    },
    {
      title: 'NSO',
      content: "Part of the academic curriculum for undergraduate students. Selected students undergo structured training 2 days a week throughout the academic year under the coach's guidance."
    },
    {
      title: 'Institute Hockey League',
      content: 'Top enthusiastic hockey players from the institute and alumni in the city participate in this league. A great opportunity to play alongside seasoned Inter-IIT players.'
    },
    {
      title: "Girls' Camp",
      content: "The Girls' Camp is open to all women in the institute interested in hockey. As a beginner-friendly camp, no prior experience is required."
    },
    {
      title: 'Beginners Camp',
      content: 'A week-long camp held on the hockey field to train students enthusiastic about joining Inter-IIT practice or learning hockey from scratch.'
    }
  ];

  const images = [p1, p2, p3, p4, p5].filter(Boolean);

  const captions = [
    "Hockey Match Action",
    "Field Practice Drill",
    "Penalty Corner Prep",
    "Team Training Session",
    "Inter-IIT Squad"
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
          <span className="aq-crest">H</span>
          IITB Hockey
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
            Hockey
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Hoc<span className="italic">key</span>
              </h1>
              <p className="aq-hero-lede">
                Hockey is one of the competitive and well-loved sports at IIT Bombay. Under the guidance of coach Dr. Harish, IIT Bombay Hockey has shown steady growth over the years, winning podium finishes at the Inter-IIT Sports Meet for three consecutive years — including Silver in recent editions!
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Ground</span>
                <span className="v">1<em></em></span>
                <span className="c">Standard regulation hockey field</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coach</span>
                <span className="v">Dr.H<em></em></span>
                <span className="c">Dr. Harish (Head Coach)</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">5<em>+</em></span>
                <span className="c">IHL, Hockey GC &amp; Camps</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Streak</span>
                <span className="v">3<em>yr</em></span>
                <span className="c">Inter-IIT Podium Medals</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={p1 || p2} alt="IITB Hockey Field" />
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
              Standard <span className="italic">Hockey Field</span>
            </h2>
            <p className="aq-section-sub">Full gear kit, safety equipment, and medical support</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={p2 || p1} alt="Hockey Field & Equipment" />
              </div>
              <h3 className="aq-facility-title">Regulation Ground &amp; Equipment</h3>
              <p className="aq-facility-body">
                IIT Bombay has a standard regulation hockey ground available for all players. We provide well-maintained gear including <strong>shin pads, stockings, composite hockey sticks, grips, balls, and full Goalie Kits</strong>. Medical kits and sprays ensure complete player safety.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={p3 || p1} alt="Hockey Action" />
          <div className="aq-photobreak-caption">
            <span>Speed &amp; Precision</span>
            <span>IITB Hockey · 3-Year Inter-IIT Medal Legacy</span>
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
            <p className="aq-section-sub">Silver &amp; Bronze medals at Inter-IIT Sports Meets</p>
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
            <p className="aq-section-sub">Reach out to our institute hockey secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Khushal" className="aq-contact-img" />
              <p className="aq-contact-name">Khushal</p>
              <p className="aq-contact-role">Institute Hockey Secretary</p>
              <p className="aq-contact-detail">+91 90014 01665</p>
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
            Moments from the <span className="italic">Turf</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Hockey Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Hockey'}</span>
            <span>IITB Hockey · {safeIndex + 1} / {safeImages.length}</span>
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
            <p className="aq-section-sub">Hockey Ground, Gymkhana Grounds, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3881728360093!2d72.90822443404429!3d19.134478500000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9b74d4b5f75%3A0xfbea904fa3f2af3!2sGymkhana%20Grounds!5e0!3m2!1sen!2sin!4v1720442540019!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Hockey Ground Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Hockey · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Hockey;