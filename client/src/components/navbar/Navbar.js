import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from './assets/sports-logo-transparent.png';
import { FaBars, FaChevronDown, FaTimes } from 'react-icons/fa';

const gcLinks = [
  { to: '/GC', label: 'Inter-Hostel GC' },
  { to: '/PGGC', label: 'PGGC' },
];

const bookingLinks = [
  { to: '/turfbooking', label: 'Football Turf Booking' },
  { to: '/badmintonbooking', label: 'Badminton Court Booking' },
];

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Sports' },
  //{ to: '/CourtStatus', label: 'Court Status' },
  { type: 'dropdown', label: 'GC', items: gcLinks },
  { to: '/yearbook', label: 'Yearbook' },
  // { to: '/blogs', label: 'Blogs' },
  { to: '/events-timeline', label: 'Events Timeline' },
  // { to: '/certificates', label: 'Certificates' },
  // { to: '/match-prediction', label: 'Match Prediction' },
  { type: 'dropdown', label: 'Gymkhana Bookings', items: bookingLinks },
  { to: '/contact', label: 'Contact Us' },
  { to: '/player-database', label: 'Player Database' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Label of the open desktop dropdown / expanded mobile accordion (null = none)
  const [openMenu, setOpenMenu] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  // Close the mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenMenu(null);
    setExpandedMenu(null);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname === path) return true;
    return false;
  };

  const isGroupActive = (items) => items.some((item) => isActive(item.to));

  return (
    <header className="nb-root">
      <div className="nb-bar">
        <Link to="/" className="nb-brand" onClick={() => setIsOpen(false)}>
          <img src={logo} className="nb-logo" alt="IITB Sports Logo" />
        </Link>

        <nav className="nb-nav" aria-label="Primary">
          <ul className="nb-links">
            {links.map((link) => (
              link.type === 'dropdown' ? (
                <li
                  key={link.label}
                  className="nb-item nb-item-dropdown"
                  onMouseEnter={() => setOpenMenu(link.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    className={`nb-dropdown-trigger ${isGroupActive(link.items) ? 'is-active' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={openMenu === link.label}
                    onClick={() => setOpenMenu((open) => (open === link.label ? null : link.label))}
                  >
                    {link.label}<FaChevronDown aria-hidden="true" />
                  </button>
                  <ul className="nb-dropdown-menu">
                    {link.items.map((item) => (
                      <li key={item.to}>
                        <Link to={item.to} className={isActive(item.to) ? 'is-active' : ''}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.to} className="nb-item">
                  <Link to={link.to} className={isActive(link.to) ? 'is-active' : ''}>
                    {link.label}
                  </Link>
                </li>
              )
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
            link.type === 'dropdown' ? (
              <li key={link.label} style={{ '--i': i }} className="nb-overlay-booking">
                <button
                  type="button"
                  className={`nb-overlay-accordion ${isGroupActive(link.items) ? 'is-active' : ''}`}
                  aria-expanded={expandedMenu === link.label}
                  onClick={() => setExpandedMenu((open) => (open === link.label ? null : link.label))}
                >
                  {link.label}<FaChevronDown aria-hidden="true" />
                </button>
                {expandedMenu === link.label && (
                  <ul className="nb-overlay-submenu">
                    {link.items.map((item) => (
                      <li key={item.to}>
                        <Link to={item.to} className={isActive(item.to) ? 'is-active' : ''} onClick={() => setIsOpen(false)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.to} style={{ '--i': i }}>
                <Link to={link.to} className={isActive(link.to) ? 'is-active' : ''} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </li>
            )
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
