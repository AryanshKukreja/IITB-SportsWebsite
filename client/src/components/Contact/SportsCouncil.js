import React, { useState, useEffect, useRef } from 'react';
import './council.css';
import { FaInstagram } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';

import councilLogo from './pictures/Logos_for_Photos/IITB Sports Logo BW.png';
import Deepraj from './pictures/Logos_for_Photos/Deepraj.jpg';
import Aryansh from './pictures/Logos_for_Photos/Aryansh ISC.jpg';
import Akanksha from './pictures/Logos_for_Photos/Akanksha.jpg';
import Praveen from './pictures/Logos_for_Photos/Praveen.jpg';
import Disha from './pictures/Logos_for_Photos/Disha.jpg';
import adventure from './pictures/Logos_for_Photos/adventure.jpg';
import badminton from './pictures/Logos_for_Photos/badminton.png';
import chess from './pictures/Logos_for_Photos/chess.png';
import squash from './pictures/Logos_for_Photos/squash.png';
import volleyball from './pictures/Logos_for_Photos/volleyball.png';
import fitness from './pictures/Logos_for_Photos/fitness.png';
import frisbee from './pictures/Logos_for_Photos/frisbee.png';

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
   ROSTER CARD — shared photo+contact card used everywhere below
============================================================ */
function RosterCard({ img, role, name, phone, instagram, mail, index, delay = 0 }) {
  return (
    <Reveal as="div" className="cc-card" delay={delay}>
      {index != null && <span className="cc-card-no">N&deg; {String(index).padStart(2, '0')}</span>}
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
   DATA — every name, number, and link preserved as-is
============================================================ */
const leader = {
  role: 'General Secretary Sports Affairs',
  name: 'Deepraj Kasherwal',
  phone: 'Call: 9761543343',
  img: Deepraj,
  instagram: 'https://www.instagram.com/iitbombaysports/',
  mail: 'mailto:gsecsports@iitb.ac.in',
};

const nominees = [
  {
    role: 'Institute Sports Nominee - Events and Clubs',
    name: 'Aryansh Kukreja',
    phone: 'Call: 99928 88093',
    img: Aryansh,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:sportsugnoma@iitb.ac.in',
  },
  {
    role: "Institute Sports Girls' Nominee",
    name: 'Akanksha Patel',
    phone: 'Call: 97272 15454',
    img: Akanksha,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:sportsgirlsnom@iitb.ac.in',
  },
  {
    role: 'Institute Sports Admin Nominee',
    name: 'Praveen Kumar',
    phone: 'Call: 89584 34190',
    img: Praveen,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:gsecsports@iitb.ac.in',
  },
  {
    role: 'Institute Sports PG Nominee',
    name: 'Shashwata Swarupa Sahoo',
    phone: 'Call: 79786 11058',
    img: councilLogo,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:sportspgnom@iitb.ac.in',
  },
];

const heads = [
  {
    role: 'Institute Sports Technical Head',
    name: 'Disha Jain',
    phone: 'Call: 9111891978',
    img: Disha,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:disha.techhead@gmail.com',
  },
  {
    role: 'Institute Sports Creatives Head',
    name: 'Viral Chhaperwal',
    phone: 'Call: 9009051525',
    img: councilLogo,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:24b3028@iitb.ac.in',
  },
  {
    role: 'Institute Sports Media Head',
    name: 'Rishiraaj Khurma',
    phone: 'Call: 9818846623',
    img: councilLogo,
    instagram: 'https://www.instagram.com/iitbombaysports/',
    mail: 'mailto:gsecsports@iitb.ac.in',
  },
];

const secretaries = [
  {
    role: 'Institute Athletics Secretary',
    name: 'Prashil Vasoya',
    phone: 'Call: 8866133501',
    img: councilLogo,
    instagram: 'https://www.instagram.com/iitbombayathletics/',
    mail: 'mailto:athletics@iitb.ac.in',
  },
  {
    role: 'Institute Aquatics Secretary',
    name: 'Ishanei Kumar',
    phone: 'Call: 6266624331',
    img: councilLogo,
    instagram: 'https://www.instagram.com/aquatics_iitb/',
    mail: 'mailto:aquatics@iitb.ac.in',
  },
  {
    role: 'Institute Badminton Secretary',
    name: 'Radhika Bansal',
    phone: 'Call: 9649570774',
    img: badminton,
    instagram: 'https://www.instagram.com/badmintonclub_iitbombay/',
    mail: 'mailto:badminton@iitb.ac.in',
  },
  {
    role: 'Institute Basketball Secretary',
    name: 'Manikarnika Sharma',
    phone: 'Call: 7878112350',
    img: councilLogo,
    instagram: 'https://www.instagram.com/basketball_iitb/',
    mail: 'mailto:basketball@iitb.ac.in',
  },
  {
    role: 'Institute Board Games Secretary',
    name: 'Varad',
    phone: 'Call: 7722097837',
    img: chess,
    instagram: '/\\#',
    mail: 'mailto:boardgames@iitb.ac.in',
  },
  {
    role: 'Institute Cricket Secretary',
    name: 'Param Shilu',
    phone: 'Call: 8141229825',
    img: councilLogo,
    instagram: 'https://www.instagram.com/cricket_club_iitb/',
    mail: 'mailto:cricket@iitb.ac.in',
  },
  {
    role: 'Institute Football Secretary',
    name: 'Aditya Patil',
    phone: 'Call: 7507990444',
    img: councilLogo,
    instagram: 'https://www.instagram.com/iitb_football/',
    mail: 'mailto:football@iitb.ac.in',
  },
  {
    role: 'Institute Hockey Secretary',
    name: 'Arnav Ashish Deshmukh',
    phone: 'Call: 7507977922',
    img: councilLogo,
    instagram: 'https://www.instagram.com/iitbombay_hockey/',
    mail: 'mailto:hockey@iitb.ac.in',
  },
  {
    role: 'Institute Indian Games Secretary',
    name: 'Darshan Jain',
    phone: 'Call: 9406213933',
    img: councilLogo,
    instagram: 'https://www.instagram.com/indiangames_iitb/',
    mail: 'mailto:indiangames@iitb.ac.in',
  },
  {
    role: 'Institute Lawn Tennis Secretary',
    name: 'Manan Agrawal',
    phone: 'Call: 9828378888',
    img: councilLogo,
    instagram: '/\\#',
    mail: 'mailto:lawntennis@iitb.ac.in',
  },
  {
    role: 'Institute Squash Secretary',
    name: 'Jay Motwani',
    phone: 'Call: 7777903995',
    img: squash,
    instagram: 'https://www.instagram.com/tennis_club_iitb/',
    mail: 'mailto:squash@iitb.ac.in',
  },
  {
    role: 'Institute Table Tennis Secretary',
    name: 'Supan Shah',
    phone: 'Call: 9653396151',
    img: councilLogo,
    instagram: 'https://www.instagram.com/table.tennis_iitb/',
    mail: 'mailto:tabletennis@iitb.ac.in',
  },
  {
    role: 'Institute Volleyball Secretary',
    name: 'Mitesh',
    phone: 'Call: 8209945491',
    img: volleyball,
    instagram: 'https://www.instagram.com/volleyballclub_iitbombay/',
    mail: 'mailto:volleyball@iitb.ac.in',
  },
  {
    role: 'Institute Weightlifting Secretary',
    name: 'Sayam',
    phone: 'Call: 7742426328',
    img: councilLogo,
    instagram: 'https://www.instagram.com/iitb_weightlifting/',
    mail: 'mailto:weightlifting@iitb.ac.in',
  },
];

const managers = [
  {
    role: 'Adventure Club Manager',
    name: 'Pranjal',
    phone: 'Call: 8288052336',
    img: adventure,
    instagram: 'https://www.instagram.com/adventureclub_iitb/',
    mail: '/\\#',
  },
  {
    role: "DKCC and Rubik's Club Manager",
    name: 'Rahul Dutta',
    phone: 'Call: 9439292929',
    img: chess,
    instagram: 'https://www.instagram.com/dkcc_iitb/',
    mail: '/\\#',
  },
  {
    role: 'Fitness Club Manager',
    name: 'Om Salunke',
    phone: 'Call: 8793375675',
    img: fitness,
    instagram: 'https://www.instagram.com/fitness_club_iitb/',
    mail: '/\\#',
  },
  {
    role: 'Frisbee Manager',
    name: 'Shiv Patil',
    phone: 'Call: 9890438497',
    img: frisbee,
    instagram: 'https://www.instagram.com/iitb_ultimate_frisbee/',
    mail: '/\\#',
  },
  {
    role: 'Yogastha Manager',
    name: 'Vagvala Jitendra Kumar',
    phone: 'Call: 8686484484',
    img: councilLogo,
    instagram: 'https://www.instagram.com/iitb_ultimate_frisbee/',
    mail: 'mailto:yogastha@iitb.ac.in',
  },
];

const marqueeIcons = [councilLogo, adventure, badminton, chess, squash, volleyball, fitness, frisbee];

/* ============================================================
   MAIN COMPONENT
============================================================ */
const Council = () => {
  const nomineeCount = useCountUp(nominees.length, 700);
  const headCount = useCountUp(heads.length, 700);
  const secretaryCount = useCountUp(secretaries.length, 900);
  const managerCount = useCountUp(managers.length, 700);

  return (
    <div className="cc-root">
      {/* MASTHEAD */}
      <Reveal as="header" className="cc-masthead">
        <div className="cc-masthead-mark">
          <span className="cc-crest">C</span>
          <span>IIT Bombay Sports&nbsp;/&nbsp;The Roster</span>
        </div>
        <div className="cc-masthead-meta">
          <span>
            Headed by <strong>Deepraj Kasherwal</strong>
          </span>
          <span>
            Season <strong>2026–27</strong>
          </span>
          <span>
            <strong>{secretaries.length}</strong> Sports
          </span>
        </div>
      </Reveal>

      <div className="cc-app">
        {/* HERO */}
        <Reveal as="section" className="cc-hero">
          <div className="cc-hero-kicker">
            <span className="vol">Team Sheet</span>
            <span className="sep">§</span>
            <span>The People Behind the Play</span>
          </div>

          <div className="cc-hero-grid">
            <div>
              <h1 className="cc-hero-title">
                Institute <span className="italic">Sports</span>
                <br />
                Council.
              </h1>
              <p className="cc-hero-lede">
                One council. Every sport. 
                Meet the squad running leadership, nominations, and every sport secretary at 
                IIT Bombay for the 2026–27 season.
              </p>
            </div>

            <aside className="cc-hero-stats">
              <div className="cc-hero-stat">
                <span className="k">Nominees</span>
                <span className="v">{nomineeCount}</span>
                <span className="c">Institute-level</span>
              </div>
              <div className="cc-hero-stat">
                <span className="k">Heads</span>
                <span className="v">{headCount}</span>
                <span className="c">Technical · Creative · Media</span>
              </div>
              <div className="cc-hero-stat">
                <span className="k">Secretaries</span>
                <span className="v">{secretaryCount}</span>
                <span className="c">Every sport. Covered.</span>
              </div>
              <div className="cc-hero-stat">
                <span className="k">Managers</span>
                <span className="v">{managerCount}</span>
                <span className="c">Clubs</span>
              </div>
            </aside>
          </div>
        </Reveal>

        {/* MARQUEE — scrolling strip of every discipline */}
        <div className="cc-marquee" aria-hidden="true">
          <div className="cc-marquee-track">
            {[...marqueeIcons, ...marqueeIcons, ...marqueeIcons, ...marqueeIcons].map((icon, i) => (
              <span className="cc-marquee-item" key={i}>
                <img src={icon} alt="" />
              </span>
            ))}
          </div>
        </div>

        {/* LEADERSHIP */}
        <Reveal as="section" className="cc-section">
          <div className="cc-eyebrow">
            <span className="num">§ 01</span> &nbsp;·&nbsp; Leadership
            <span className="bar" />
          </div>

          <div className="cc-leader">
            <div className="cc-leader-photo">
              <img src={leader.img} alt={leader.name} />
            </div>
            <div className="cc-leader-info">
              <span className="cc-leader-tag">General Secretary</span>
              <h2 className="cc-leader-role">{leader.role}</h2>
              <p className="cc-leader-name">{leader.name}</p>
              <p className="cc-leader-phone">{leader.phone}</p>
              <div className="cc-leader-links">
                <a href={leader.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram size={19} />
                  <span>Instagram</span>
                </a>
                <a href={leader.mail} aria-label="Email">
                  <CiMail size={21} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* NOMINEES */}
        <Reveal as="section" className="cc-section">
          <div className="cc-eyebrow">
            <span className="num">§ 02</span> &nbsp;·&nbsp; Nominees
            <span className="bar" />
          </div>
          <div className="cc-card-grid cc-card-grid-3">
            {nominees.map((n, i) => (
              <RosterCard key={n.name} {...n} delay={i * 90} />
            ))}
          </div>
        </Reveal>

        {/* HEADS */}
        <Reveal as="section" className="cc-section">
          <div className="cc-eyebrow">
            <span className="num">§ 03</span> &nbsp;·&nbsp; Heads
            <span className="bar" />
          </div>
          <div className="cc-card-grid cc-card-grid-3">
            {heads.map((h, i) => (
              <RosterCard key={h.name} {...h} delay={i * 90} />
            ))}
          </div>
        </Reveal>

        {/* SECRETARIES */}
        <Reveal as="section" className="cc-section">
          <div className="cc-eyebrow">
            <span className="num">§ 04</span> &nbsp;·&nbsp; Secretaries
            <span className="bar" />
          </div>
          <div className="cc-section-head">
            <h2 className="cc-section-title">
              Every Sport.<span className="italic">Covered</span>.
            </h2>
            <p className="cc-section-sub">Fourteen sports. Fourteen point people.</p>
          </div>
          <div className="cc-card-grid cc-card-grid-4">
            {secretaries.map((s, i) => (
              <RosterCard key={s.name} {...s} index={i + 1} delay={(i % 4) * 70} />
            ))}
          </div>
        </Reveal>

        {/* MANAGERS */}
        <Reveal as="section" className="cc-section">
          <div className="cc-eyebrow">
            <span className="num">§ 05</span> &nbsp;·&nbsp; Managers
            <span className="bar" />
          </div>
          <div className="cc-card-grid cc-card-grid-3">
            {managers.map((m, i) => (
              <RosterCard key={m.name} {...m} delay={i * 90} />
            ))}
          </div>
        </Reveal>

        {/* FOOTER */}
        {/* <footer className="cc-footer">
          <span className="cc-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay · Sports Council · 2026&ndash;27</span>
          <span>Print / Digital · Final Edition</span>
        </footer> */}
      </div>
    </div>
  );
};

export default Council;