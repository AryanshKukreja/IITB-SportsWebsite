import React from 'react';
import { useRef } from "react";
import "./Navbar.css";
import logo from './assets/sports-logo-transparent.png';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navRef = useRef();
  const head = useRef();
  
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
    head.current.classList.toggle("res_head");
  };

  return (
    <header className='head'>
      <div className='logo2' ref={head}>
        <img src={logo} className='logoimg2' alt='logo'></img>
      </div>
      <nav className='mainNav' ref={navRef}>
        <div className="menu">
          <ul>
            <li className='menuItem'>
              <a href="/sports">Home</a>
            </li>
            <li className='menuItem'>
              <a href="/sports/explore">Sports</a>
            </li>
            <li className='menuItem'>
              <a href="/sports/CourtStatus">CourtStatus</a>
            </li>
            <li className='menuItem'>
              <a href="/sports/GC">GC</a>
            </li>
            <li className='menuItem'>
              <a href="/sports/events-timeline">EventsTimeLine</a>
            </li>
            <li className='menuItem'>
              <a href="/sports/turfbooking">TurfBooking</a>
            </li>
            <li className='menuItem'>
              <a href="/sports/contact">Contact Us</a>
            </li>
            {/* Admin Panel Link */}
            <li className='menuItem admin-link'>
              <a href="/sports/admin-court-management">Admin Panel</a>
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
