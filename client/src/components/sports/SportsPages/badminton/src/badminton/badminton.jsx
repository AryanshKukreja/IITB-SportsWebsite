import React from 'react';
import Timel from './timeline';
import { useState,useRef, useEffect} from 'react';
import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
import { MdPlayArrow } from "react-icons/md";   //filled triangle
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactCardFlip from 'react-card-flip';
import bm1 from '../assets/bm1.jpeg';
import bm2 from '../assets/bm2.jpeg';
import bm3 from '../assets/bm3.jpeg';
import bm4 from '../assets/bm4.jpeg';
import bm5 from '../assets/bm5.jpeg';
import bm6 from '../assets/bm6.jpeg';
import bm7 from '../assets/bm7.jpeg';
import bm8 from '../assets/bm8.jpeg';
import user from '../assets/user.jpg';
import { VscArchive } from 'react-icons/vsc';

const Badminton = () => {
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

  const[isFlipped, setIsFlipped]= useState(false);
  const flipcad = () => {
    setIsFlipped(!isFlipped);
  }
  const[isFlipped1, setIsFlipped1]= useState(false);
  const flipcad1 = () => {
    setIsFlipped1(!isFlipped1);
  }

  const cards = [
    {
      title: 'Institute Badminton Open(IBO)',
      content: ''
    },
    {
      title: 'Institute Badminton League(IBL)',
      content: ''
    },
    {
      title: 'General Championship',
      content: ''
    },
    {
      title: 'Institute Freshman Open',
      content: ''
    },
    {
      title: 'PGGC',
      content: ''
    },
    {
      title: 'Battle of Batches',
      content: ''
    },
    {
      title: 'Girls Workshop',
      content: ''
    },
    {
      title: 'Summer Camp',
      content: ''
    },
    {
      title: 'Racketlon',
      content: ''
    },
    {
      title: 'PG Mania',
      content: ''
    },
    {
      title: 'Freshiesta',
      content: ''
    },
    {
      title: 'Inter IIT Camp',
      content: ''
    },
    {
      title: 'Institute Doubles Open',
      content: ''
    }
  ];

  const achieve = [
    {
      title: 'Group Achivements',
      content:' ',
    },
    {
      title: 'Individual Achivements',
      content:'c2',
    }
  ];

  const imageSliderSettings = {
    dots: true,
    // infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const images = [
    bm1,bm2,bm3,bm4,bm6,bm7,bm8
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Badminton
      </div>


      <div className='aq-about'>
                Badminton is one of the most popular sport in our campus and we cater to all the residents of the campus be it students, professors or any staff member.
                We are located in front of Hostel 2 and beside the Swimming pool in the Old Gymkhana.
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            Our institute has a separate indoor badminton hall consisting of 7 courts with synthetic flooring, built with a centralised air conditioning system. We've got a dedicated coach to provide training and guidance for the institute players.           </p>
          <img src={bm5} className='image' />
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
        {/* cardlist */}
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
          <div className='contactCard' >
            <img src={user} className='contactImg' />
            <p className='aq-name'>Shelendra Rasaniya</p>
            <p className='info'>Coach, Sports Officer</p>
              <p className='info'>+91 97939 90585</p>
          </div>
          <div className='contactCard' >
            <img src={user} className='contactImg' />
            <p className='aq-name'>J Sai Charan</p>
            <p className='info'>Institute Badminton  Secretary</p>
              <p className='info'>+91 73581 79779</p>
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


      {/* <div className='timing'>
        <p className='side'>Pool Timings</p>
        <img  className='schimg'/>
      </div> */}

      <div className='location'>
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.3410964230648!2d72.91128878064984!3d19.1355206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80707f747dd%3A0x2836a7e40ba1c6e5!2sBadminton%20Court!5e0!3m2!1sen!2sin!4v1720102713953!5m2!1sen!2sin"
          width="700"
          height="450"
          className='map'
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Badminton Court Location">
        </iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Badminton;