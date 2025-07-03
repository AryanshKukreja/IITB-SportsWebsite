import React from 'react'
import './Footer.css'
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    // <div>
    //     <ul className='socialicon'>
    //       <li><a href='#' className='mediaicon'><FaLinkedin /></a></li>
    //       <li><a href='#'><FaInstagram /></a></li>
    //       <li><a href='#'><FaFacebook /></a></li>
    //       <li><a href='#'></a></li>
    //       <li><a href='#'></a></li>
    //     </ul>
    // </div>
    <div className='footer'>
      <div className='footerdiv'>
        <div class="footer-content">
          <h3 className='footer-heading'>Quick Links</h3>
          <ul class="list">
            <li><a href="/sports">Home</a></li>
            <li><a href="/sports/contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-content">
          <h3 className='footer-heading'>Follow Us</h3>
          <ul class="social-icons">
            <li><a href="https://www.linkedin.com/company/iit-bombay-sports?originalSubdomain=in" target='blank'><FaLinkedin /></a></li>
            <li><a href="https://www.instagram.com/iitbombaysports/?hl=en" target='blank'><FaInstagram /></a></li>
            <li><a href="https://www.facebook.com/iitbombaysports/" target='blank'><FaFacebook /></a></li>
          </ul>
        </div>
      </div>
      <div className='copyright'>
        <p>Copyright © 2025 IIT Bombay Sports</p>
      </div>
    </div>
  )
}

export default Footer