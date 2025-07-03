import React from 'react'
import { useRef } from "react";
import { Link } from 'react-router-dom'; // Add this import
import "./Navbar.css"
import logo from './assets/sports-logo-transparent.png'
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  
  return (
    <header className='head'>
      <div className='logo2'>
          <img src={logo} className='logoimg2' alt='logo'></img>
      </div>
      <nav className='mainNav' ref={navRef}>
        <div className='logo'>
          <img src={logo} className='logoimg' alt='logo'></img>
        </div>
        <div className="menu">
          <ul >
            <li className='menuItem'>
              <Link to="/">Home</Link>
            </li>
            <li className='menuItem'>
              <Link to="/sports">Sports</Link>
            </li>
            <li className='menuItem'>
              <Link to="/courtstatus">CourtStatus</Link>
            </li>
            <li className='menuItem'>
              <Link to="/gc">GC</Link>
            </li>
            <li className='menuItem'>
              <Link to="/eventstimeline">EventsTimeLine</Link>
            </li>
            <li className='menuItem'>
              <Link to="/turfbooking">TurfBooking</Link>
            </li>
            <li className='menuItem'>
              <Link to="/contactus">Contact Us</Link>
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
  )
}

export default Navbar