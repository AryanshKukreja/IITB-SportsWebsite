import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './page.css';
import { MdEmail, MdCall } from 'react-icons/md';

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
      className={`pg-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   CONTACT CARD — shared spotlight card for each team
============================================================ */
function ContactCard({ num, name, subtitle, email, phone, linkTo, linkLabel, delay = 0 }) {
  return (
    <Reveal as="section" className="pg-section" delay={delay}>
      <div className="pg-eyebrow">
        <span className="num">§ {num}</span> &nbsp;·&nbsp; {name}
        <span className="bar" />
      </div>

      <div className="pg-contact-card">
        <h2 className="pg-contact-name">{name}</h2>
        {subtitle && <p className="pg-contact-subtitle">{subtitle}</p>}

        <div className="pg-contact-row">
          <MdEmail size={22} />
          <span>{email}</span>
        </div>
        <div className="pg-contact-row">
          <MdCall size={19} />
          <span>{phone}</span>
        </div>

        <Link to={linkTo} className="pg-contact-btn">
          {linkLabel}
        </Link>
      </div>
    </Reveal>
  );
}

const ContactUs = () => {
  return (
    <div className="pg-root">
      {/* MASTHEAD */}
      <Reveal as="header" className="pg-masthead">
        <div className="pg-masthead-mark">
          <span className="pg-crest">@</span>
          <span>IIT Bombay Sports&nbsp;/&nbsp;Get in Touch</span>
        </div>
        <div className="pg-masthead-meta">
          <span>One Council, One Goal</span>
        </div>
      </Reveal>

      <div className="pg-app">
        {/* HERO */}
        <Reveal as="section" className="pg-hero">
          <div className="pg-hero-kicker">
            <span className="vol">Reach Out</span>
            <span className="sep">§</span>
            <span>One Council, Every Sport</span>
          </div>
          <h1 className="pg-hero-title">
            Contact <span className="italic">Us</span>
          </h1>
          <p className="pg-hero-lede">
            Questions about a sport, an event, or the site itself? Both go through the
            Institute Sports Council — reach the Council directly, or its Web Team,
            who build and run this site.
          </p>
        </Reveal>

        {/* Institute Sports Council */}
        <ContactCard
          num="01"
          name="Institute Sports Council"
          email="gsecsport@iitb.ac.in"
          phone="+91 97615 43343"
          linkTo="/Council"
          linkLabel="Discover the Council"
        />

        {/* Web Team — part of the Institute Sports Council */}
        <ContactCard
          num="02"
          name="Web Team"
          subtitle="Institute Sports Council"
          email="disha.techhead@gmail.com"
          phone="+91 91118 91978"
          linkTo="/Webteam"
          linkLabel="Discover the Web Team"
          delay={90}
        />

        {/*
        <h2 className="insti">Student Affairs Council(SAC)</h2>
        <p>
            <span className="mail"><img src=".svg" width='30px' alt='img'/>sac email id</span>  
        </p>
        <p>
            <span className="tele"><img src='./pictures/phone.svg' width='25px'alt='img' />9048979758</span> 
            <button><Link to="/SAC">Click to know more..</Link></button>
        </p>
        */}
      </div>
    </div>
  );
};

export default ContactUs;
