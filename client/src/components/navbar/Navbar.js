import React from 'react';
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from './assets/sports-logo-transparent.png';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navRef = useRef();
  const head = useRef();
  const location = useLocation();
  
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
    head.current.classList.toggle("res_head");
  };

  // Close navbar when clicking on a link (for mobile)
  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
    head.current.classList.remove("res_head");
  };

  // Check if current route is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname === path) return true;
    return false;
  };

  return (
    <header className='head'>
      <div className='logo2' ref={head}>
        <img src={logo} className='logoimg2' alt='IITB Sports Logo'></img>
      </div>
      <nav className='mainNav' ref={navRef}>
        <div className="menu">
          <ul>
            <li className='menuItem'>
              <Link 
                to="/" 
                onClick={closeNavbar}
                className={isActive("/") ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li className='menuItem'>
              <Link 
                to="/explore" 
                onClick={closeNavbar}
                className={isActive("/explore") ? "active" : ""}
              >
                Sports
              </Link>
            </li>
            <li className='menuItem'>
              <Link 
                to="/CourtStatus" 
                onClick={closeNavbar}
                className={isActive("/CourtStatus") ? "active" : ""}
              >
                Court Status
              </Link>
            </li>
            <li className='menuItem'>
              <Link 
                to="/GC" 
                onClick={closeNavbar}
                className={isActive("/GC") ? "active" : ""}
              >
                GC
              </Link>
            </li>
            <li className='menuItem'>
              <Link 
                to="/events-timeline" 
                onClick={closeNavbar}
                className={isActive("/events-timeline") ? "active" : ""}
              >
                Events Timeline
              </Link>
            </li>
            <li className='menuItem'>
              <Link 
                to="/turfbooking" 
                onClick={closeNavbar}
                className={isActive("/turfbooking") ? "active" : ""}
              >
                Turf Booking
              </Link>
            </li>
            <li className='menuItem'>
              <Link 
                to="/contact" 
                onClick={closeNavbar}
                className={isActive("/contact") ? "active" : ""}
              >
                Contact Us
              </Link>
            </li>
            {/* Admin Panel Link */}
            <li className='menuItem admin-link'>
              <Link 
                to="/admin-court-management" 
                onClick={closeNavbar}
                className={isActive("/admin-court-management") ? "active" : ""}
              >
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;