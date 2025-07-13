import React from 'react';
import Timel from './timeline';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
// import { MdPlayArrow } from "react-icons/md";   //filled triangle
// import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
// import ReactCardFlip from 'react-card-flip';
// import { VscArchive } from 'react-icons/vsc';
import y1 from "./assets/y1.JPG";
import y2 from "./assets/y2.JPG";
import y3 from "./assets/y3.JPG";
import y4 from "./assets/y4.JPG";
import y5 from "./assets/y5.JPG";
import y6 from "./assets/y6.JPG";


const Yogastha = () => {
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
    y1, y2, y3, y4, y5, y6
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Yogastha
      </div>

      <div className='aq-about'>
        Yogastha (meaning "established in yoga") is a Yoga and Wellness Club under the Students' Gymkhana at IIT Bombay. Since its inception on the 1st International Day of Yoga (21st June 2015), the club has been working towards creating a stress-free, peaceful campus community by addressing all aspects of wellness, including physical, emotional, spiritual, and intellectual well-being. The club actively conducts weekly sessions and other events to promote these goals. Our tagline: समत्वं योग उच्यते| (Samatvam Yog Uchyate: ‘Equanimity is Yoga’).
      </div>

      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            Dedicated Yoga Hall
            Location: 3rd Floor, New SAC (Opposite Hostel 11)
            Use: Venue for regular yoga sessions, workshops, meditation, and special events, spacious, ventilated area suitable for group sessions

            - Yoga Mats and props 
            Mats are provided at the venue for participants during regular sessions and special events
            Props like yoga bricks, yoga straps, yoga chairs, bolsters used and provided for dedicated sessions

            - Certified Instructors
            Sessions led by Ministry of AYUSH Level 1 Certified Yoga Instructors
            Inclusion of special guest instructors from reputed organizations like Swasti Yoga Centre
            Expertise in various forms: Hatha Yoga, Pranayama, Meditation, and Iyengar Yoga

            - Regular Offline Sessions
            Throughout the year, except for weekends
            - Special Events & Campaigns
            Workshops, Yogathons, and IDY Celebrations
            Events like Chakra Meditation, Swasti Yoga Camps, Sahaja Yoga, and De-stress Sessions
            Competitions (e.g., meme contests, video challenges) during IDY to promote engagement and creativity

            - Media and Outreach
            Visual documentation of sessions and events (photos/videos)
            Presence on official social media channels for updates and promotions
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

       <div className='achievements'>
        <div className='aq-heading' id='head-achieve'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Achievements</h3>
        </div>

        <Timel />

      </div>

      <div className='contacts'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Contact</h3>
        </div>
        <div className='contactlist'>
          <div className='contactCard'>
            <img alt="alt" className='contactImg' />
            <p className='aq-name'>??</p>
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
          title="yoga"
        ></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  );
}

export default Yogastha;
