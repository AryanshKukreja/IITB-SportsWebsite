import React, { useState, useEffect, useRef, useCallback } from 'react';
import blackcat from './assets/bcatlogo.png';
import transparentSportsLogo from './assets/sports-logo-transparent.png';
import gymkhana from './assets/gymkhana.jpg';
import sportsApp1 from './assets/App-animation/sports_app_1.png';
import sportsApp2 from './assets/App-animation/sports_app_2.png';
import sportsApp3 from './assets/App-animation/sports_app_3.png';
import sportsApp4 from './assets/App-animation/sports_app_4.png';
import sportsApp5 from './assets/App-animation/sports_app_5.png';
import LogoIntro from './LogoIntro';
import logoIntroVideo from './assets/logo-intro.mp4';
import '../sports/SportsPages/aquatics/src/aquatics/aquatics.css';   // reuse the shared design system
import './HomePage.css';   // homepage-only additions (phone carousel, overrides)

/* ============================================================
   REVEAL — scroll-triggered entrance, identical to Aquatics
============================================================ */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let done = false;
    const reveal = () => { if (!done) { done = true; setVisible(true); } };

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
    if (rect.top < window.innerHeight && rect.bottom > 0) reveal();

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);

    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`aq-reveal ${visible ? 'is-visible' : ''} ${className}`}
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
    let raf, start, cancelled = false;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setValue(target); return undefined; }
    const tick = (t) => {
      if (cancelled) return;
      if (start === undefined) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(raf); };
  }, [target, durationMs]);
  return value;
}

/* ============================================================
   WAVE DIVIDER — the recurring ripple motif
============================================================ */
function WaveDivider() {
  return (
    <div className="aq-wave" aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path
          className="aq-wave-path aq-wave-path-1"
          d="M0 20 Q 100 0 200 20 T 400 20 T 600 20 T 800 20 T 1000 20 T 1200 20 V40 H0 Z"
        />
        <path
          className="aq-wave-path aq-wave-path-2"
          d="M0 26 Q 100 6 200 26 T 400 26 T 600 26 T 800 26 T 1000 26 T 1200 26 V40 H0 Z"
        />
      </svg>
    </div>
  );
}

/* ============================================================
   PHOTO BREAK — full-bleed interlude between sections
============================================================ */
function PhotoBreak({ image, caption, tag }) {
  return (
    <Reveal as="div" className="aq-photobreak">
      <img src={image} alt={caption} className="aq-photobreak-img" />
      <div className="aq-photobreak-caption">
        <span>{tag}</span>
        <span>{caption}</span>
      </div>
    </Reveal>
  );
}

/* ============================================================
   APP FEATURE CARDS — sports app capabilities
============================================================ */
// const appFeatures = [
//   {
//     head: 'Event Registration',
//     body: 'Sign up for all sports competitions — GC events, open tournaments, and Inter-IIT trials — directly from the app.',
//   },
//   {
//     head: 'Court Booking',
//     body: 'Real-time slot booking for basketball, volleyball, badminton, squash, and more. No more queues at the counter.',
//   },
//   {
//     head: 'Live GC Scores',
//     body: 'Follow the General Championship leaderboard as it happens — live scores, brackets, and hostel standings updated in real time.',
//   },
//   {
//     head: 'E-Certificates',
//     body: 'Automated certificate generation for participants and winners. Download your achievement the moment an event closes.',
//   },
//   {
//     head: 'Player Profiles',
//     body: 'Track your own stats, achievements, and event history. Build your campus sporting identity over your time at IITB.',
//   },
//   {
//     head: 'Match Schedules',
//     body: 'Never miss a game. Full fixture lists, venue info, and calendar sync for every sport throughout the year.',
//   },
// ];

/* ============================================================
   HOMEPAGE
============================================================ */
const HomePage = () => {
  const facilitiesCount  = useCountUp(15, 900);
  const sportsCount      = useCountUp(30, 900);
  const gcEventsCount    = useCountUp(20, 900);
  const athletesCount    = useCountUp(3500, 1200);

  /* phone carousel */
  const phoneImages = [sportsApp1, sportsApp2, sportsApp3, sportsApp4, sportsApp5];
  const [phoneIdx, setPhoneIdx] = useState(0);
  const [slideDir, setSlideDir] = useState('next');

  const handleNext = useCallback(() => {
    setSlideDir('next');
    setPhoneIdx((i) => (i === phoneImages.length - 1 ? 0 : i + 1));
  }, [phoneImages.length]);

  /* auto-advance */
  useEffect(() => {
    const id = setInterval(handleNext, 2200);
    return () => clearInterval(id);
  }, [handleNext]);

  return (
    /* ── LogoIntro: UNTOUCHED ── */
    <LogoIntro src={logoIntroVideo} maxDuration={4000}>
      <div className="aq-root hp-root-overrides">

        {/* ══════════════════════════════════════
            MASTHEAD
        ══════════════════════════════════════ */}
        <Reveal as="header" className="aq-masthead">
          <div className="aq-masthead-mark">
            <span className="aq-crest">S</span>
            <span>IIT Bombay&nbsp;·&nbsp;Institute Sports Council</span>
          </div>
          <div className="aq-masthead-meta">
            {/* <span><strong>Powai</strong>&nbsp;·&nbsp;Mumbai</span> */}
            {/* <span>Est.&nbsp;<strong>1958</strong></span> */}
            <span><strong>Until. Victory. Always.</strong></span>
          </div>
        </Reveal>

        <div className="aq-app">

          {/* ══════════════════════════════════════
              HERO
          ══════════════════════════════════════ */}
          <Reveal as="section" className="aq-hero">
            <div className="aq-hero-kicker">
              <span className="vol">Welcome to</span>
              {/* <span className="sep">§</span>
              <span>General Championships &amp; Inter-IIT</span> */}
            </div>

            <div className="aq-hero-grid">
              <div>
                <h1 className="aq-hero-title">
                  IIT Bombay
                  <br />
                  <span className="italic">Sports.</span>
                </h1>
                <p className="aq-hero-lede">
                  IIT Bombay boasts a vibrant sports scene that keeps students active throughout
                  the year. The institute's calendar is packed with exciting events, ranging from
                  the inter-hostel General Championships to the prestigious Inter-IIT competitions.
                  State-of-the-art facilities, expert coaching, and an unwavering culture of
                  sportsmanship — this is where dedication and teamwork become the cornerstones of
                  athletic achievement.
                </p>
              </div>

              <aside className="aq-hero-stats">
                <div className="aq-hero-stat">
                  <span className="k">Facilities</span>
                  <span className="v"><em>{facilitiesCount}</em>+</span>
                  <span className="c">Across campus</span>
                </div>
                <div className="aq-hero-stat">
                  <span className="k">Sports</span>
                  <span className="v"><em>{sportsCount}</em>+</span>
                  <span className="c">Offered year-round</span>
                </div>
                <div className="aq-hero-stat">
                  <span className="k">GC Events</span>
                  <span className="v">{gcEventsCount}+</span>
                  <span className="c">Inter-hostel annually</span>
                </div>
                <div className="aq-hero-stat">
                  <span className="k">Athletes</span>
                  <span className="v">{athletesCount}+</span>
                  <span className="c">Active on campus</span>
                </div>
              </aside>
            </div>

            {/* Hero photo — gymkhana */}
            <div className="aq-hero-photo">
              <img src={gymkhana} alt="IIT Bombay Gymkhana" />
            </div>
          </Reveal>

          <WaveDivider />

          {/* ══════════════════════════════════════
              § 01 — ABOUT US
          ══════════════════════════════════════ */}
          <Reveal as="section" className="aq-section">
            <div className="aq-eyebrow">
              <span className="num">§ 01</span>&nbsp;·&nbsp;About Us
              <span className="bar" />
            </div>
            <div className="aq-section-head">
              <h2 className="aq-section-title">
                Where campus meets <span className="italic">competition</span>.
              </h2>
              <p className="aq-section-sub">Fuelled by passion. Built on sportsmanship.</p>
            </div>

            {/* Two-column: logo card + copy card */}
            <div className="aq-facility-grid hp-two-col">
              <Reveal as="div" className="aq-facility-card hp-logo-card" delay={0}>
                <img src={transparentSportsLogo} alt="IIT Bombay Sports" className="hp-about-logo" />
              </Reveal>

              <Reveal as="div" className="aq-facility-card hp-copy-card" delay={90}>
                <p className="aq-hero-lede" style={{ maxWidth: '100%', margin: 0 }}>
                  IIT Bombay boasts a vibrant sports scene that keeps students active throughout
                  the year. The institute's calendar is packed with exciting events, ranging from
                  the inter-hostel General Championships to the prestigious Inter-IIT competitions.
                  To nurture this competitive spirit, IIT Bombay offers state-of-the-art sports
                  facilities — from basketball and volleyball courts to a swimming pool, football
                  ground, and cricket ground. This commitment extends beyond facilities, with
                  students and faculty alike demonstrating a dedication to honing their skills and
                  fostering strong bonds through sportsmanship.
                </p>
                <p className="hp-slogan">Until.&nbsp;&nbsp;&nbsp;Victory.&nbsp;&nbsp;&nbsp;Always.</p>
              </Reveal>
            </div>
          </Reveal>

          {/* Photo break */}
          <PhotoBreak
            image={gymkhana}
            tag="Fig. A"
            caption="The Gymkhana — IITB's home of sport."
          />

          {/* ══════════════════════════════════════
              § 02 — BOMBAY BLACKCATS
          ══════════════════════════════════════ */}
          <Reveal as="section" className="aq-section">
            <div className="aq-eyebrow">
              <span className="num">§ 02</span>&nbsp;·&nbsp;Inter-IIT Contingent
              <span className="bar" />
            </div>
            <div className="aq-section-head">
              <h2 className="aq-section-title">
                Bombay <span className="italic">BlackCats</span>.
              </h2>
              <p className="aq-section-sub">India's premier inter-collegiate battleground — since 1961.</p>
            </div>

            <div className="aq-facility-grid hp-two-col hp-reverse">
              <Reveal as="div" className="aq-facility-card hp-copy-card" delay={0}>
                <p className="aq-hero-lede" style={{ maxWidth: '100%', margin: 0 }}>
                  The BlackCats, IIT Bombay's Inter-IIT contingent, is a testament to the
                  institute's unwavering dedication to athletic excellence. Since 1961, the
                  Inter-IIT Sports Meet has served as India's premier inter-collegiate sporting
                  battleground, drawing over 3,500 athletes from all IITs. The BlackCats are a
                  force driven by an unparalleled passion for their sports. It burns brightly in
                  the countless hours spent honing their skills, and the unwavering commitment to
                  supporting their teammates. A living embodiment of IIT Bombay's vibrant sports
                  culture — where dedication, expert coaching, passion, and teamwork become the
                  cornerstones of athletic achievement.
                </p>
                <div className="hp-blackcats-tag">
                  <span className="hp-dot" />
                  Representing IITB since 1961
                </div>
              </Reveal>

              <Reveal as="div" className="aq-facility-card hp-logo-card hp-logo-gold" delay={90}>
                <img src={blackcat} alt="Bombay BlackCats" className="hp-about-logo" />
              </Reveal>
            </div>
          </Reveal>

          {/* ══════════════════════════════════════
              § 03 — SPORTS APP
          ══════════════════════════════════════ */}
          {/* <Reveal as="section" className="aq-section">
            <div className="aq-eyebrow">
              <span className="num">§ 03</span>&nbsp;·&nbsp;Digital Platform
              <span className="bar" />
            </div>
            <div className="aq-section-head">
              <h2 className="aq-section-title">
                The Sports <span className="italic">App</span>.
              </h2>
              <p className="aq-section-sub">Android + iOS · Launching Soon</p>
            </div>

            {/* Phone strip + feature cards */}
            {/* <div className="hp-app-layout">
              {/* Phone carousel */}
              {/* <Reveal as="div" className="hp-phone-strip" delay={0}>
                <div className="hp-phone-frame">
                  <img
                    key={phoneIdx}
                    src={phoneImages[phoneIdx]}
                    alt={`Sports App screen ${phoneIdx + 1}`}
                    className={`hp-phone-img hp-slide-${slideDir}`}
                  />
                </div> */}

                {/* <div className="hp-phone-thumbs">
                  {phoneImages.map((img, i) => (
                    <button
                      key={i}
                      className={`hp-phone-thumb ${i === phoneIdx ? 'is-active' : ''}`}
                      onClick={() => { setSlideDir(i > phoneIdx ? 'next' : 'prev'); setPhoneIdx(i); }}
                      aria-label={`Screen ${i + 1}`}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div> */}

                {/* <div className="hp-phone-nav">
                  <button className="aq-strip-btn" onClick={handlePrev} aria-label="Previous">←</button>
                  <span className="hp-phone-counter">
                    {String(phoneIdx + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(phoneImages.length).padStart(2, '0')}
                  </span>
                  <button className="aq-strip-btn" onClick={handleNext} aria-label="Next">→</button>
                </div>
              </Reveal>

              {/* Feature card grid */}
              {/* <div className="aq-cardgrid hp-feature-grid">
                {appFeatures.map((f, i) => (
                  <Reveal as="div" key={f.head} className="aq-rulecard" delay={i * 60}>
                    <h4 className="aq-rulecard-head">{f.head}</h4>
                    <p className="aq-rulecard-body">{f.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>  */}

            {/* Launch badge */}
            {/* <Reveal as="div" className="hp-launch-wrap" delay={300}>
              <div className="hp-launch-badge">
                <span className="hp-pulse-dot" />
                Launching Soon — Android &amp; iOS
              </div>
            </Reveal>
          </Reveal> */}

          {/* ══════════════════════════════════════
              FOOTER
          ══════════════════════════════════════ */}
          {/* <footer className="aq-footer">
            <span className="aq-footer-colophon">
              <em>Set in Fraunces &amp; JetBrains Mono.</em>
            </span>
            <span>IIT Bombay · Sports Council</span>
            <span>Until. Victory. Always.</span>
          </footer> */}

        </div>
      </div>
    </LogoIntro>
  );
};

export default HomePage;