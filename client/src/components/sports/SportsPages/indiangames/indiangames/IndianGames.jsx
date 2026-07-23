import React, { useState } from 'react';
import './cricket.css';
import Timel from './timeline2';

import img1 from "../images/p51.jpg";
import img2 from "../images/p52.jpg";
import img3 from "../images/p53.jpg";
import img4 from "../images/p54.jpg";
import img5 from "../images/p55.jpg";
import ing from "../images/ing.jpg";
import ing2 from "../images/ing2.jpg";
import ing3 from "../images/ing3.JPG";
import ing4 from "../images/ing4.JPG";
import ing5 from "../images/ing5.png";
import ing6 from "../images/ing6.png";
import user from '../../../../Contact/pictures/Logos_for_Photos/Kanak.jpg';

const IndianGames = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('');

  const cards = [
    {
      title: 'Inter Hostel Kho-Kho GC',
      content: 'Held annually in the Spring Semester for Boys and Autumn Semester for Girls as part of the Inter Hostel Sports General Championship.'
    },
    {
      title: 'NSO',
      content: 'Under the NSO scheme by the Government of India, incoming first-year students sign up for training in traditional Indian sports like Kho-Kho and Kabaddi.'
    },
    {
      title: 'Institute Kho-Kho League (IKKL)',
      content: 'The flagship open league tournament of IIT Bombay Kho-Kho club held in the spring semester, structured around an exciting IPL-style format.'
    },
    {
      title: 'Institute Kabaddi League',
      content: 'Spring semester tournament open to all students where teams are formed through a thrilling player bidding auction.'
    },
    {
      title: 'Battle of Batches',
      content: 'Inter-year competition where student teams from freshmen to seniors showcase sportsmanship across high-octane matches.'
    },
    {
      title: 'Summer Camp',
      content: 'Beginners and intermediate training camps held over the year, alongside an advanced summer training camp for the institute squad.'
    }
  ];

  const images = [
    img1, img2, img3, img4, img5, ing, ing2, ing3, ing4, ing5, ing6
  ].filter(Boolean);

  const captions = [
    "Kho-Kho Match Action",
    "Kabaddi Raid",
    "Indoor Mat Practice",
    "Tug of War Event",
    "IKKL League Final",
    "Team Training Session",
    "Inter-Hostel Championship",
    "Beginners Camp",
    "Freshman Raid",
    "Institute Squad",
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

  const safeImages = images?.length > 0 ? images : [ing4];
  const safeIndex = (currentIndex >= 0 && currentIndex < safeImages.length) ? currentIndex : 0;

  return (
    <div className="aq-root">

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">I</span>
          IITB Indian Games
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
            Indian Games
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Indian <span className="italic">Games</span>
              </h1>
              <p className="aq-hero-lede">
                Indian Games at IIT Bombay celebrates traditional sports including Kho-Kho, Kabaddi, and Tug of War. Blending ancient heritage, agility, tactical raids, and supreme teamwork, these sports cultivate intense campus enthusiasm, fitness, and discipline.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Court</span>
                <span className="v">Mat<em></em></span>
                <span className="c">Fully-lit indoor mat court</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Timings</span>
                <span className="v">6<em>am</em></span>
                <span className="c">Open 6:00 AM – 10:00 PM</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Disciplines</span>
                <span className="v">3<em>+</em></span>
                <span className="c">Kho-Kho, Kabaddi, Tug of War</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Leagues</span>
                <span className="v">IKKL<em></em></span>
                <span className="c">IPL-style Kho-Kho &amp; Kabaddi</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={ing4 || img1} alt="IITB Indian Games Court" />
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
            §1  DISCIPLINES & FACILITIES
        ══════════════════════════════════ */}
        <section className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">01</span>
            <span className="bar" />
            Disciplines &amp; Facilities
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Indoor Mat &amp; <span className="italic">Traditional Arenas</span>
            </h2>
            <p className="aq-section-sub">Kho-Kho, Kabaddi and Tug of War training facilities</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={ing4 || img2} alt="Indoor Kho-Kho Court & Kabaddi Mat" />
              </div>
              <h3 className="aq-facility-title">Indoor Kho-Kho Court &amp; Kabaddi Mat</h3>
              <p className="aq-facility-body">
                IIT Bombay features one fully-lighted <strong>Indoor Kho-Kho &amp; Kabaddi Mat Court</strong> open daily from 6:00 AM to 10:00 PM. High-grip mats reduce impact and support professional raids and dodging techniques.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PHOTO BREAK
        ══════════════════════════════════ */}
        <div className="aq-photobreak">
          <img className="aq-photobreak-img" src={img3 || ing} alt="Kho-Kho Action" />
          <div className="aq-photobreak-caption">
            <span>Agility &amp; Teamwork</span>
            <span>IITB Indian Games · Speed, Strategy &amp; Heritage</span>
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
            <p className="aq-section-sub">Milestones and Inter-IIT performances</p>
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
            <p className="aq-section-sub">Reach out to our institute secretary</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={user} alt="Kanak Tembhare" className="aq-contact-img" />
              <p className="aq-contact-name">Kanak Tembhare</p>
              <p className="aq-contact-role">Institute Indian Games Secretary</p>
              <p className="aq-contact-detail">+91 93223 11654</p>
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
            Moments from the <span className="italic">Mat</span>
          </h2>
        </div>

        <div className="aq-strip">
          <img
            key={safeIndex}
            src={safeImages[safeIndex]}
            alt={captions[safeIndex] || 'Indian Games Gallery'}
            className={`aq-strip-image${
              slideDir === 'next' ? ' aq-slide-next' :
              slideDir === 'prev' ? ' aq-slide-prev' : ''
            }`}
          />
          <div className="aq-strip-caption">
            <span>{captions[safeIndex] || 'Indian Games'}</span>
            <span>IITB Indian Games · {safeIndex + 1} / {safeImages.length}</span>
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
              Find the <span className="italic">Court</span>
            </h2>
            <p className="aq-section-sub">Indoor Kho-Kho Court, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3571278636005!2d72.90875297511069!3d19.135838550091524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b996756af44d%3A0x92ba3886f6c7bad!2sIndoor%20Kho-Kho%20Court!5e0!3m2!1sen!2sin!4v1720265475433!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="Indoor Kho-Kho Court Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Indian Games · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default IndianGames;