import React from 'react'
import './footer.css'
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
    <div >
      <div className='footerdiv'>
        <div class="footer-content">
          <h3>Quick Links</h3>
          <ul class="list">
            <li><a href="">Inter IIT</a></li>
            <li><a href="">Aavhan</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </div>
        <div className="footer-content">
          <h3>Follow Us</h3>
          <ul class="social-icons">
            <li><a href="https://www.instagram.com/aquatics_iitb/" target='blank' ><FaInstagram /></a></li>
            <li><a href="https://www.facebook.com/IITBAquatics/" target='blank'><FaFacebook /></a></li>
          </ul>
        </div>
        <div className='footer-content'>
          <p className='gmail'>aquaticsiitb01@gmail.com</p>
        </div>
      </div>
      <div className='copyright'>
        <p className='pa'>Copyright © 2024 IIT Bombay Sports</p>
      </div>
    </div>
  )
}

export default Footer