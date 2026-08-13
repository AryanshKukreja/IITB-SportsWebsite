import React, { useState, useEffect, useRef } from 'react';
import './council.css';
import Disha from './pictures/Logos_for_Photos/disha.jpeg';
import chirag from './pictures/Logos_for_Photos/chirag.png';
import shivam from './pictures/Logos_for_Photos/shivam.jpeg';
import placeholder from './pictures/Logos_for_Photos/image.png';
import { FaInstagram } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';

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
      className={`cc-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   COUNT-UP — animated stat numbers
============================================================ */
function useCountUp(target, durationMs = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    let start;
    let cancelled = false;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    const tick = (t) => {
      if (cancelled) return;
      if (start === undefined) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);
  return value;
}

/* ============================================================
   ROSTER CARD — shared photo+contact card
============================================================ */
function RosterCard({ img, role, name, phone, instagram, mail, delay = 0 }) {
  return (
    <Reveal as="div" className="cc-card" delay={delay}>
      <div className="cc-card-photo">
        <img src={img} alt={name} />
      </div>
      <h3 className="cc-card-role">{role}</h3>
      <p className="cc-card-name">{name}</p>
      {phone && <p className="cc-card-phone">{phone}</p>}
      <div className="cc-card-links">
        {instagram && (
          <a href={instagram} aria-label={`${name} on Instagram`} target="_blank" rel="noreferrer">
            <FaInstagram size={17} />
          </a>
        )}
        {mail && (
          <a href={mail} aria-label={`Email ${name}`}>
            <CiMail size={19} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

/* ============================================================
   DATA — every name and link preserved as-is
============================================================ */
const lead = {
  role: 'Technical Head',
  name: 'Disha Jain',
  phone: 'Call: 91118 91978',
  img: Disha,
  instagram: 'https://www.instagram.com/iitbombaysports/',
  mail: 'mailto:disha.techhead@gmail.com',
};

const conveners = [
  {
    role: 'Web Convener',
    name: 'Shivam Vishwekar',
    img: shivam,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:disha.techhead@gmail.com',
  },
  {
    role: 'Web Convener',
    name: 'Chirag Borkar',
    img: chirag,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:disha.techhead@gmail.com',
  },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */
const Webteam = () => {
  const convenerCount = useCountUp(conveners.length, 700);
  const teamCount = useCountUp(1 + conveners.length, 700);

  return (
    <div className="cc-root">
      {/* MASTHEAD */}
      <Reveal as="header" className="cc-masthead">
        <div className="cc-masthead-mark">
          <span className="cc-crest">W</span>
          <span>IIT Bombay Sports&nbsp;/&nbsp;The Web Team</span>
        </div>
        <div className="cc-masthead-meta">
          <span>
            Headed by <strong>Disha Jain</strong>
          </span>
          <span>
            Season <strong>2026–27</strong>
          </span>
          <span>
            <strong>{conveners.length}</strong> Conveners
          </span>
        </div>
      </Reveal>

      <div className="cc-app">
        {/* HERO */}
        <Reveal as="section" className="cc-hero">
          <div className="cc-hero-kicker">
            <span className="vol">Team Sheet</span>
            <span className="sep">§</span>
            <span>The People Behind the Screens</span>
          </div>

          <div className="cc-hero-grid">
            <div>
              <h1 className="cc-hero-title">
                ISC <span className="italic">Web</span>
                <br />
                Team.
              </h1>
              <p className="cc-hero-lede">
                One team, one website. Meet the developers keeping IIT Bombay Sports online
                for the 2026–27 season.
              </p>
            </div>

            <aside className="cc-hero-stats">
              <div className="cc-hero-stat">
                <span className="k">Head</span>
                <span className="v">1</span>
                <span className="c">Technical</span>
              </div>
              <div className="cc-hero-stat">
                <span className="k">Conveners</span>
                <span className="v">{convenerCount}</span>
                <span className="c">Web</span>
              </div>
              <div className="cc-hero-stat">
                <span className="k">Team</span>
                <span className="v">{teamCount}</span>
                <span className="c">Building together</span>
              </div>
              <div className="cc-hero-stat">
                <span className="k">Season</span>
                <span className="v">
                  26–27
                </span>
                <span className="c">Academic year</span>
              </div>
            </aside>
          </div>
        </Reveal>

        {/* LEADERSHIP */}
        <Reveal as="section" className="cc-section">
          <div className="cc-eyebrow">
            <span className="num">§ 01</span> &nbsp;·&nbsp; Leadership
            <span className="bar" />
          </div>

          <div className="cc-leader">
            <div className="cc-leader-photo">
              <img src={lead.img} alt={lead.name} />
            </div>
            <div className="cc-leader-info">
              <span className="cc-leader-tag">Technical Head</span>
              <h2 className="cc-leader-role">{lead.role}</h2>
              <p className="cc-leader-name">{lead.name}</p>
              <p className="cc-leader-phone">{lead.phone}</p>
              <div className="cc-leader-links">
                <a href={lead.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram size={19} />
                  <span>Instagram</span>
                </a>
                <a href={lead.mail} aria-label="Email">
                  <CiMail size={21} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CONVENERS */}
        <Reveal as="section" className="cc-section">
          <div className="cc-eyebrow">
            <span className="num">§ 02</span> &nbsp;·&nbsp; Conveners
            <span className="bar" />
          </div>
          <div className="cc-card-grid cc-card-grid-3">
            {conveners.map((c, i) => (
              <RosterCard key={c.name} {...c} delay={i * 90} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Webteam;
