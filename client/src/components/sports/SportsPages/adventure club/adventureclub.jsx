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
    </div>
  );
}

export default AdventureClub;
