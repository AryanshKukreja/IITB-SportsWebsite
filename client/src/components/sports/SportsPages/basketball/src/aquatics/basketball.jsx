import React, { useState, useRef, useEffect } from 'react';
import './aquatics.css';
import Timel from './timeline';
import { MdDoubleArrow } from "react-icons/md";
import bb1 from '../assets/bb1.jpeg';
import bb2 from '../assets/bb2.png';
import bb3 from '../assets/bb3.jpg';
import bb4 from '../assets/bb4.png';
import bb5 from '../assets/bb5.png';
import bb8 from '../assets/bb8.png';
import bb9 from '../assets/bb9.jpg';
import bb10 from '../assets/bb10.jpg';
import bb11 from '../assets/bb11.jpg';
import bb12 from '../assets/bb12.jpg';
import basky_team from '../assets/basky_team.png';
import deep from '../assets/deepraj.jpg';
import user from '../assets/user.jpg';
import nso from '../assets/nso.jpg';
import basky_boys from '../assets/basky_boys.png';
import basky_girls from '../assets/basky_girls.png';

const Basketball = () => {
  const [openStory, setOpenStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const rootRef = useRef(null);
  const timelineRef = useRef(null);

  // Intersection observer for reveal animations
  useEffect(() => {
    const targets = document.querySelectorAll('.aq-reveal, .aq-timeline-wrap');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const handlePrev = () => {
    setSlideDir('prev');
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const handleNext = () => {
    setSlideDir('next');
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const handleThumb = (i) => {
    setSlideDir(i > currentIndex ? 'next' : 'prev');
    setCurrentIndex(i);
  };

  const toggleStory = (i) => {
    setOpenStory(openStory === i ? null : i);
  };

  const cards = [
    { title: 'PG Mania', content: '' },
    { title: 'Basketball Farewell', content: '' },
    { title: 'NSO Trials', content: '' },
    { title: 'Inter-IIT Pre-Camp', content: '' },
    { title: 'Alumni Day', content: '' },
    { title: "She's Got Game", content: '' },
  ];

  const images = [
    basky_team, basky_girls, basky_boys, bb2, bb3, bb4, bb5, nso, bb8, bb9, bb10, bb11, bb12,
  ];

  const captions = [
    'Team 2024', 'Women's Squad', 'Men's Squad', 'Practice', 'Court Action',
    'Training', 'Camp', 'NSO Session', 'Inter-IIT Prep', 'Game Day',
    'Tournament', 'Match', 'Campus Cup',
  ];

  return (
    <div className="aq-root" ref={rootRef}>

      {/* ── MASTHEAD ── */}
      <header className="aq-masthead">
        <span className="aq-masthead-mark">
          <span className="aq-crest">B</span>
          IITB Basketball
        </span>
        <div className="aq-masthead-meta">
          <span>Sports Gymkhana</span>
          <span><strong>IIT Bombay</strong></span>
        </div>
      </header>

      <main className="aq-app">

        {/* ── HERO ── */}
        <section className="aq-hero aq-reveal">
          <p className="aq-hero-kicker">
            <span className="vol">Vol. 1</span>
            <span className="sep">◆</span>
            Institute Sports
            <span className="sep">◆</span>
            Basketball
          </p>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Basket<span className="italic">ball</span>
              </h1>
              <p className="aq-hero-lede">
                The IITB Basketball family is an integral part of the dynamic sports culture of the
                Institute. The team boasts a history of captivating performances in various tournaments,
                leading to championships in many. This is made possible with access to state-of-the-art
                facilities, a dedicated coach and rigorous training. The sport has left us with a plethora
                of teachings: Camaraderie, perseverance and integrity.
              </p>
            </div>

            <div className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Courts</span>
                <span className="v">4<em></em></span>
                <span className="c">2 indoor · 2 outdoor</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Morning Slot</span>
                <span className="v">6<em>am</em></span>
                <span className="c">Opens at 6:00 AM</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Evening Slot</span>
                <span className="v">5<em>pm</em></span>
                <span className="c">Until 10:00 PM</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Events</span>
                <span className="v">6<em>+</em></span>
                <span className="c">Annual events</span>
              </div>
            </div>
          </div>

          <div className="aq-hero-photo">
            <img src={basky_team} alt="IITB Basketball Team" />
          </div>

          {/* wave divider */}
          <div className="aq-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 30" preserveAspectRatio="none">
              <path className="aq-wave-path aq-wave-path-1"
                d="M0,15 C150,0 300,30 450,15 C600,0 750,30 900,15 C1050,0 1200,30 1200,15" />
              <path className="aq-wave-path aq-wave-path-2"
                d="M0,15 C200,30 400,0 600,15 C800,30 1000,0 1200,15" />
            </svg>
          </div>
        </section>

        {/* ── FACILITIES ── */}
        <section className="aq-section aq-reveal" style={{ '--d': '0.1s' }}>
          <div className="aq-eyebrow">
            <span className="num">01</span>
            <span className="bar" />
            Facilities
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">World-class <span className="italic">Courts</span></h2>
            <p className="aq-section-sub">State-of-the-art infrastructure for year-round play</p>
          </div>

          <div className="aq-facility-grid">
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={bb1} alt="Indoor Basketball Courts" />
              </div>
              <h3 className="aq-facility-title">Indoor Courts</h3>
              <p className="aq-facility-body">
                The Students' Gymkhana boasts two indoor courts perfect for year-round competition
                or casual shooting practice. The H-12 store sells shoes with gum soles specifically
                designed for optimal grip on the smooth indoor surface.
              </p>
            </div>
            <div className="aq-facility-card">
              <div className="aq-facility-photo">
                <img src={basky_boys} alt="Outdoor Basketball Courts" />
              </div>
              <h3 className="aq-facility-title">Outdoor Courts & Equipment</h3>
              <p className="aq-facility-body">
                Two outdoor courts supplement the indoor facilities. The institute provides two
                basketball storage trolleys stocked with size-6 and 7 balls, air pumps and medical
                kits. Some hostels also have their own courts, expanding your options for a quick game.
                <br /><br />
                Court timings: <strong style={{ color: 'var(--cream)' }}>6:00 AM – 9:00 AM</strong> &amp; <strong style={{ color: 'var(--cream)' }}>5:00 PM – 10:00 PM</strong>. Basketballs are provided at the courts.
              </p>
            </div>
          </div>
        </section>

        {/* ── PHOTO BREAK ── */}
        <div className="aq-photobreak aq-reveal" style={{ '--d': '0.15s' }}>
          <img className="aq-photobreak-img" src={basky_girls} alt="Women's Basketball" />
          <div className="aq-photobreak-caption">
            <span>Women's Basketball</span>
            <span>IITB · She's Got Game</span>
          </div>
        </div>

        {/* ── EVENTS ── */}
        <section className="aq-section aq-reveal" style={{ '--d': '0.1s' }}>
          <div className="aq-eyebrow">
            <span className="num">02</span>
            <span className="bar" />
            Events
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">Annual <span className="italic">Events</span></h2>
            <p className="aq-section-sub">Click any event to read more</p>
          </div>

          <div className="aq-story-columns">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`aq-story${openStory === i ? ' is-open' : ''}`}
                onClick={() => toggleStory(i)}
                style={{ '--d': `${i * 0.05}s` }}
              >
                <div className="aq-story-photo">
                  <img src={images[i % images.length]} alt={card.title} />
                </div>
                <span className="aq-story-no">Event {String(i + 1).padStart(2, '0')}</span>
                <h3 className="aq-story-title">{card.title}</h3>
                <p className={`aq-story-content${openStory === i ? ' is-full' : ' is-clamped'}`}>
                  {card.content || 'More details coming soon. Click to toggle.'}
                </p>
                <span className="aq-story-toggle">
                  {openStory === i ? '↑ Collapse' : '↓ Read more'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── ACHIEVEMENTS ── */}
        <section className="aq-section aq-reveal" style={{ '--d': '0.1s' }}>
          <div className="aq-eyebrow">
            <span className="num">03</span>
            <span className="bar" />
            Achievements
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">A Legacy of <span className="italic">Excellence</span></h2>
            <p className="aq-section-sub">Honours earned on the court</p>
          </div>

          <div className="aq-timeline-wrap" ref={timelineRef}>
            <Timel />
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="aq-section aq-reveal" style={{ '--d': '0.1s' }}>
          <div className="aq-eyebrow">
            <span className="num">04</span>
            <span className="bar" />
            Contact
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">Get in <span className="italic">Touch</span></h2>
            <p className="aq-section-sub">Reach out to our team</p>
          </div>

          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img src={deep} alt="Deepraj Kasherwal" className="aq-contact-img" />
              <p className="aq-contact-name">Deepraj Kasherwal</p>
              <p className="aq-contact-role">Institute Basketball Secretary</p>
              <p className="aq-contact-detail">+91 97615 43343</p>
            </div>
            <div className="aq-contact-card">
              <img src={user} alt="Nilesh Sawant" className="aq-contact-img" />
              <p className="aq-contact-name">Nilesh Sawant</p>
              <p className="aq-contact-role">Coach</p>
              <p className="aq-contact-detail">+91 94220 95558</p>
            </div>
          </div>
        </section>

      </main>

      {/* ── GALLERY ── */}
      <section className="aq-gallery-section">
        <div className="aq-eyebrow" style={{ marginTop: '56px' }}>
          <span className="num">05</span>
          <span className="bar" />
          Gallery
        </div>
        <div className="aq-section-head">
          <h2 className="aq-section-title">Moments from the <span className="italic">Court</span></h2>
        </div>

        <div className="aq-strip">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={captions[currentIndex] || 'Basketball'}
            className={`aq-strip-image${slideDir === 'next' ? ' aq-slide-next' : slideDir === 'prev' ? ' aq-slide-prev' : ''}`}
          />
          <div className="aq-strip-caption">
            <span>{captions[currentIndex] || 'Basketball'}</span>
            <span>IITB Basketball · {currentIndex + 1} / {images.length}</span>
          </div>
          <button className="aq-strip-btn aq-strip-prev" onClick={handlePrev} aria-label="Previous">‹</button>
          <button className="aq-strip-btn aq-strip-next" onClick={handleNext} aria-label="Next">›</button>
        </div>

        <div className="aq-strip-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`aq-strip-thumb${i === currentIndex ? ' is-active' : ''}`}
              onClick={() => handleThumb(i)}
              aria-label={captions[i] || `Image ${i + 1}`}
            >
              <img src={img} alt={captions[i] || `Thumb ${i + 1}`} />
            </button>
          ))}
        </div>
      </section>

      {/* ── LOCATION ── */}
      <div className="aq-app" style={{ paddingTop: '56px' }}>
        <section className="aq-section aq-reveal" style={{ '--d': '0.1s' }}>
          <div className="aq-eyebrow">
            <span className="num">06</span>
            <span className="bar" />
            Location
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">Find the <span className="italic">Courts</span></h2>
            <p className="aq-section-sub">Indoor Basketball Courts, IIT Bombay</p>
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.408680151891!2d72.90801220550003!3d19.133580043371115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80812c1f80f%3A0x6e9d47badec03bac!2sIndoor%20Basketball%20Courts!5e0!3m2!1sen!2sin!4v1719931678373!5m2!1sen!2sin"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="basketball court location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            IITB Basketball · <em>Sports Gymkhana, IIT Bombay</em>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>

    </div>
  );
};

export default Basketball;