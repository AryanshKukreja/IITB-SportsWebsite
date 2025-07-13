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
            <p className='aq-name'>Nidhi Verma</p>
            <p className='info'>Institute Yoga Manager</p>
            <p className='info'>+91 86024 09282</p>
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

export default Yogastha;
