import React, { useState } from 'react';
import { MdDoubleArrow } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import Timel from './timeline3';
import './InterIIT.css';

const InterIIT = () => {
  const performances = [
    "3rd place overall in Women",
    "Gold in Basketball Men",
    "Silver in Football Men",
    "Silver in Hockey Men",
    "Silver in volleyball Women",
    "Silver in Squash Women",
    "Silver in Basketball Women",
    "Silver in Badminton Women",
    "Bronze in Table tennis Men",
  ];

  const images = [
    './images/image1.jpg',
    './images/image2.jpg',
    './images/image3.jpg',
    './images/image4.jpg',
    './images/image5.jpg',
    './images/image6.jpg',
    './images/image7.jpg',
    './images/image8.jpg',
    './images/image9.jpg',
    './images/image10.jpg',
    './images/image11.jpg',
    './images/image12.jpg',
    './images/image13.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="interiit-container">
      <div className="logo-container">
        <img src={"./images/logo.jpg"} alt="Logo" className="logo1" />
        <h1 className="gradient-heading">Inter IIT Sports</h1>
      </div>

      <div className="description">
        Inter IIT Sports Meet is the annual sports tournament of the Indian Institutes of Technology. 
        It is organised in December, with the Aquatics events held separately in October. 
        It is the longest-running Inter-collegiate meet where all IITs participate, having been held since 1961. 
        This year (2023), the event was held at IIT Bombay and IIT Gandhinagar jointly.
      </div>

      <div className="achievements-container">
        <h2 className="achievements-heading">
          <MdDoubleArrow className='arrow' />
          IIT Bombay Achievements:
        </h2>
        <ul className="achievements-list">
          <li>12 times champion (second most by any IIT)</li>
          <li>Last champion 2017 52nd edition</li>
          <li>Hosted the first ever Inter IIT Sports Meet in 1961</li>
          <li>First win in Inter-IIT 1966 4th edition</li>
        </ul>
        <img src={"./images/first_inter_iit.jpg"} alt="Icon" className="list-image" />
      </div>

      <div className="InterIITMeet-container">
        <h2 className="meet-heading">
          <MdDoubleArrow className='arrow' />
          56th Inter IIT Sports Meet
        </h2>
        <p className="Event-Description">
          IIT Bombay (in collaboration with co-host IIT Gandhinagar) hosted the 56th Inter-IIT Sports Meet on campus.
          The meet kicked off with a spectacular opening ceremony. Cricket legend Venkatesh Prasad graced the occasion as the Chief Guest.
          The event began with the lighting of the torch and was followed by a majestic march-past by representatives from all 23 IITs, symbolizing unity, sportsmanship, and the spirit of healthy competition.
          It was a thrilling moment for IIT Bombay as the hosts emerged victorious in the march-past. Against a backdrop of vibrant cultural performances, blending traditional and contemporary elements, the ceremony showcased India's rich diversity.
          Mr. Prasad addressed the spirited crowd and commended the dedication and passion of the IIT community.
          He underscored the pivotal role of sports in shaping character and fostering teamwork, motivating the participating athletes to strive for excellence.
          As the regular sporting events kicked off, IIT Bombay determinedly etched out a memorable chapter for itself throughout the competition.
          The meet also saw participants and spectators enjoy a thrilling week of competition, exciting moments of triumph, sportsmanship, and camaraderie.
        </p>

        <h2 className="Performance">
          <MdDoubleArrow className='arrow' />
          IIT Bombay Performance in Inter IIT 2023:
        </h2>
        <ul className="performance1">
          {performances.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="gallery-container">
        <h2 className="gallery-heading">Inter IIT 2023 Gallery</h2>
        <div className="gallery-image-container">
          <img src={images[currentIndex]} alt="Gallery" className="gallery-image" />
        </div>
        <div className="gallery-buttons">
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>

      <div className="pyq_heading">
        <MdDoubleArrow className='arrow' />
        IIT Bombay's Previous Wins in Inter IIT
      </div>

      <div className="pyq">
        <Timel />
      </div>

      <div className="extra">
        <p>Note: In 1983, the 20th edition was held at Madras but the last 2 days rained out so No one was declared as winner (but Bombay was ahead).</p>
      </div>

      <div className="history">
        <h2>
          <MdDoubleArrow className='arrow' />
          The First Inter IIT
        </h2>
        <p>The proposition for an Inter IIT Sports Meet was brought up in 1961, and IIT Bombay hosted the first ever Inter IIT Sports Meet. Only five IITs were in existence then, namely IIT Bombay, IIT Madras, IIT Kharagpur, IIT Kanpur and IIT Delhi; who competed in five sports only.</p>
      </div>

      <div className="glimpses-container">
        <h2>Some Glimpses From The Past</h2>
        <div className="photos">
          <img src="./images/icon.jpg" alt="Icon" />
          <img src="./images/first_inter_iit.jpg" alt="Memory" />
          <img src="./images/first_inter_iit2.jpg" alt="Memories" />
        </div>
      </div>

      <div className="last_heading">
        <h2>To Know More About Inter IIT Sports</h2>
      </div>

      <div className="links">
        <a href="https://www.instagram.com/interiitsports2023?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          <p>Instagram</p>
        </a>
        <a href="https://en.wikipedia.org/wiki/Inter_IIT_Sports_Meet" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWikipediaW} size="2x" />
          <p>Wikipedia</p>
        </a>
      </div>
    </div>
  );
};

export default InterIIT;