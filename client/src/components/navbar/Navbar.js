import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from './assets/sports-logo-transparent.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Sports' },
  { to: '/CourtStatus', label: 'Court Status' },
  { to: '/GC', label: 'Live GC Scorecard' },
  { to: '/yearbook', label: 'Yearbook' },
  // { to: '/blogs', label: 'Blogs' },
  { to: '/events-timeline', label: 'Events Timeline' },
  // { to: '/certificates', label: 'Certificates' },
  // { to: '/match-prediction', label: 'Match Prediction' },
  { to: '/turfbooking', label: 'Turf Booking' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/player-database', label: 'Player Database' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname === path) return true;
    return false;
  };

  return (
    <header className="nb-root">
      <div className="nb-bar">
        <Link to="/" className="nb-brand" onClick={() => setIsOpen(false)}>
          <img src={logo} className="nb-logo" alt="IITB Sports Logo" />
        </Link>

        <nav className="nb-nav" aria-label="Primary">
          <ul className="nb-links">
            {links.map((link) => (
              <li key={link.to} className="nb-item">
                <Link to={link.to} className={isActive(link.to) ? 'is-active' : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Admin Panel Link */}
            <li className="nb-item nb-item-admin">
              <Link to="/feedback" className={isActive('/feedback') ? 'is-active' : ''}>
                Feedback
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="nb-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <FaBars />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      <div className={`nb-overlay ${isOpen ? 'is-open' : ''}`}>
        <div className="nb-overlay-top">
          <img src={logo} className="nb-logo nb-logo-mobile" alt="IITB Sports Logo" />
          <button className="nb-toggle nb-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>
        <ul className="nb-overlay-links">
          {links.map((link, i) => (
            <li key={link.to} style={{ '--i': i }}>
              <Link to={link.to} className={isActive(link.to) ? 'is-active' : ''} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li style={{ '--i': links.length }} className="nb-item-admin">
            <Link
              to="/feedback"
              className={isActive('/feedback') ? 'is-active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Feedback
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;