import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Sports.css';

/* ============================================================
   REVEAL — scroll-triggered entrance, with a hard fallback so
   nothing can ever get stuck invisible.
============================================================ */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setVisible(true);
      }
    };

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fallback = setTimeout(reveal, 1200);

    if (reduce || typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => clearTimeout(fallback);
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`sp-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   SPORT CARD — shared photo tile used for both sports and clubs
============================================================ */
function SportCard({ sport, delay = 0 }) {
  return (
    <Reveal as={Link} to={sport.link} className="sp-card" delay={delay}>
      <div className="sp-card-photo">
        <img src={process.env.PUBLIC_URL + sport.image} alt={sport.name} />
      </div>
      <span className="sp-card-name">{sport.name}</span>
    </Reveal>
  );
}

/* ============================================================
   DATA — content and order preserved exactly as before
============================================================ */
const sportsList = [
  { name: 'Aquatics', image: '/images/aquatics.png', link: '/aquatics' },
  { name: 'Athletics', image: '/images/athletics.jpg', link: '/athletics' },
  { name: 'Badminton', image: '/images/badminton.png', link: '/badminton' },
  { name: 'Basketball', image: '/images/basketball.png', link: '/basketball' },
  { name: 'Board Games', image: '/images/boardgames.png', link: '/boardgames' },
  { name: 'Cricket', image: '/images/cricket.png', link: '/cricket' },
  { name: 'Football', image: '/images/football.png', link: '/football' },
  { name: 'Hockey', image: '/images/hockey.png', link: '/hockey' },
  { name: 'Indian Games', image: '/images/khokho.png', link: '/indiangames' },
  { name: 'Lawn Tennis', image: '/images/tennis.png', link: '/tennis' },
  { name: 'Squash', image: '/images/squash.png', link: '/squash' },
  { name: 'Table Tennis', image: '/images/tabletennis.png', link: '/tabletennis' },
  { name: 'Volleyball', image: '/images/volleyball.png', link: '/volleyball' },
  { name: 'Weightlifting', image: '/images/weightlifting.png', link: '/weightlifting' },
  // Add more sports as needed
  { name: 'Adventure Club', image: '/images/adventure.png', link: '/adventureclub' },
  { name: 'Dark Knight Chess Club', image: '/images/chess.png', link: '/chess' },
  { name: "Rubik's club", image: '/images/Rubiks.png', link: '/rubik' },
  { name: 'Ultimate Frisbee Club', image: '/images/Frisbee.png', link: '/frisbee' },
  { name: 'Yogastha', image: '/images/yoga.png', link: '/yoga' },
];

const CLUBS_START_INDEX = 14; // first 14 entries are sports, rest are clubs
const sports = sportsList.slice(0, CLUBS_START_INDEX);
const clubs = sportsList.slice(CLUBS_START_INDEX);

function Sports() {
  return (
    <div className="sp-root">
      <div className="sp-app">
        {/* HERO */}
        <Reveal as="section" className="sp-hero">
          <div className="sp-hero-kicker">
            <span className="vol">Every Discipline</span>
            <span className="sep">§</span>
            <span>One Institute</span>
          </div>
          <h1 className="sp-hero-title">
            Sports <span className="italic">&amp; Clubs</span>.
          </h1>
          <p className="sp-hero-lede">
            Welcome to the Sports page! Here are some popular sports and clubs at
            IIT Bombay:
          </p>
        </Reveal>

        {/* SPORTS */}
        <Reveal as="section" className="sp-section">
          <div className="sp-eyebrow">
            <span className="num">§ 01</span> &nbsp;·&nbsp; Sports
            <span className="bar" />
          </div>
          <div className="sp-card-grid">
            {sports.map((sport, i) => (
              <SportCard key={sport.name} sport={sport} delay={(i % 4) * 60} />
            ))}
          </div>
        </Reveal>

        {/* CLUBS */}
        <Reveal as="section" className="sp-section">
          <div className="sp-eyebrow">
            <span className="num">§ 02</span> &nbsp;·&nbsp; Clubs
            <span className="bar" />
          </div>
          <div className="sp-section-head">
            <h2 className="sp-section-title">
              Explore the <span className="italic">clubs</span>.
            </h2>
            <p className="sp-section-sub">Explore the sports clubs at IIT Bombay.</p>
          </div>
          <div className="sp-card-grid">
            {clubs.map((sport, i) => (
              <SportCard key={sport.name} sport={sport} delay={(i % 4) * 60} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default Sports;
