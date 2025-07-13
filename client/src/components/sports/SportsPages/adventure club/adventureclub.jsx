import React from 'react';
//import Timel from './timeline';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
//import { MdPlayArrow } from "react-icons/md";   //filled triangle
//import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
//import ReactCardFlip from 'react-card-flip';
//import { VscArchive } from 'react-icons/vsc';
import p1 from "./assets/p1.jpg";
import p2 from "./assets/p2.jpg";
import p3 from "./assets/p3.jpg";
import p4 from "./assets/p4.jpg";
import p5 from "./assets/p5.jpg";




const AdventureClub = () => {
  const [expandedCard, setExpandedCard] = useState(null);

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



  const toggleContent = (cardIndex) => {
    if (expandedCard === cardIndex) {
      setExpandedCard(null); // Collapse the card if it's already expanded
    } else {
      setExpandedCard(cardIndex); // Expand the clicked card
    }
  };

  const cards = [
    {
      title: 'Lawn Tennis GC',
      content: 'This event is held once a year in the Spring Semester under three categories: Boys, Girls and PG’s. In this event the best tennis players from each hostel go head to head to determine which hostel boasts of the best talent in Lawn Tennis.'
    },
    {
      title: 'NSO',
      content: 'It’s a part of the academic curriculum for the undergraduate students. Through selections for students who opted for cricket nearly 30-40 are selected and trained throughout the academic year, 2 days a week (Monday and Tuesday).'
    },
    {
      title: 'Institute Tennis League',
      content: 'This usually follows the Institute Tennis Open, and is IIT-B’s version of the IPTL. It is a team based event in which 8 managers are in charge of 8 teams. There is an auction of the players. The teams are divided into two pools of four each and play round-robin amongst each other. The format of each tie consists of: Men’s Singles, Men’s Doubles, Women’s Singles, Mixed Doubles.'
    },
    {
      title: 'Institute Tennis Open',
      content: 'It is the flagship open tournament for Tennis at IIT Bombay. This tournament is open to all -students, alumni, professors and staff. It is a grand-slam styled open singles tournament and is held in the Autumn Semester.'         
    },
    {
      title: 'Freshiesta',
      content: 'This tournament gives the freshers a chance to showcase their talent. It gives an opportunity to the NSO students to see their improvement through the months and the non-NSO students a chance to battle it out with the regulars. It follows a compass draw format in which everyone gets to play an equal number of matches and it keeps the knockout spirit alive.'
    },
    {
      title: 'Summer Slam',
      content: '  It is conducted late in the month of March.Open for all(boys and girls) but the format is made a little different from Tennis Open( a little more exciting like best of 21 points or best of 3 mini sets) instead of the standard tennis set pattern.'
 
    }
  ];

  // const imageSliderSettings = {
  //   dots: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  const images = [
    p1, p2, p3, p4, p5
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Adventure Club
      </div>

      <div className='aq-about'>
        Comprising Wall Climbing and Treks, the Adventure Club is one of the most exhilarating and sought-after communities at IIT Bombay. Whether it's scaling the campus's professional climbing wall or traversing rugged mountain trails, the club offers thrilling experiences for all levels of adventurers.
        Thanks to the mentorship of Coach Rutu Sir and the dedication of experienced student coordinators, the Adventure Club has grown into a vibrant hub for outdoor enthusiasts. With a calendar full of climbing sessions, Himalayan treks and training camps, the club inspires students to push their physical and mental limits in the lap of nature.
        Driven by passion and perseverance, IIT Bombay’s Adventure Club continues to foster a spirit of exploration, resilience, and camaraderie among its members.
      </div>

      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
           Wall Climbing:
            The Adventure Club features a dedicated bouldering wall located near the SAC building. Equipped with professional climbing shoes and thick crash mats for safety, the facility is ideal for both beginners and experienced climbers. The wall is accessible in all seasons and is well-lit to accommodate evening practice sessions.
            Treks:
            The Adventure Club organizes treks of all difficulty levels, ranging from beginner-friendly hikes to challenging expeditions. These treks are conducted across diverse terrains—from the Western Ghats to the high Himalayas .All necessary safety equipment and guidance are provided on every trek, ensuring a secure and well-supported adventure for all participants.
          </p>
        </div>
      </div>

      <div className='events'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Events</h3>
        </div>
        <div className='cardslist'>
          {cards.map((card, index) => {
            const isExpanded = expandedCard === index;
            const cardClass = ['aq-card', isExpanded ? 'expanded' : ''].filter(Boolean).join(' ');
            return (
              <div
                className={cardClass}
                key={index}
                style={isExpanded ? { zIndex: 10 } : {}}
                onClick={() => toggleContent(index)}
              >
                <h3 className="aq-card-heading">{card.title}</h3>
                {isExpanded && (
                  <p className="aq-card-content">{card.content}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className='contacts'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Contact</h3>
        </div>
        <div className='contactlist'>
          <div className='contactCard'>
            <img alt="alt" className='contactImg' />
            <p className='aq-name'>Mohit</p>
            <p className='info'>Institute Adventure Club Secretary</p>
            <p className='info'>+91  82334 70289</p>
          </div>
        </div>
      </div>

      <div className='gallery'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Gallery</h3>
        </div>
        <div className='new-gallery'>
          <img src={images[currentIndex]} alt="Gallery" className="gallery-image" />
          <div className="gallery-buttons">
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>

      <div className='location'>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.38794229164!2d72.90822443382704!3d19.134488600267908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c74281daf5e3%3A0xe0c050e0ec9a18cf!2sTennis%20court!5e0!3m2!1sen!2sin!4v1720443451101!5m2!1sen!2sin" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="adventure club location"
        ></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  );
}

export default AdventureClub;
