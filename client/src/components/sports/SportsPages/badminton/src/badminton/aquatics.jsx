import React from 'react';
import './aquatics.css';
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
    <div className='pageContainer'>
      <div className='titleText'>
        Badminton
      </div>


      <div className='about'>
        Badminton is one of the most popular sport in our campus and we cater to all the residents of the campus be it students, professors or any staff member. We are located in front of Hostel 2 and beside the Swimming pool in the Old Gymkhana.
      </div>


      <div className='facilities'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            We have a fully air-conditioned badminton hall which has 7 fully furnished synthetic courts. They are open from 6-10 in morning and 4-9:30 in the evening. For using the courts, one needs to be in proper badminton attire.
          </p>
          <img src={bm5} className='image' />
        </div>
      </div>


      <div className='events'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Events</h3>
        </div>

        <div className='cardslist'>
          {cards.map((card, index) => (
            <div className={`card ${expandedCard === index ? 'expanded' : ''}`}
            key={index} onClick={() => toggleContent(index)}>
              <h3 className="card-heading">{card.title}</h3>
              {expandedCard === index && (
                <p className="card-content">
                  {card.content}
                </p>
              )}
            </div>
          ))}
        </div>
        {/* cardlist */}
      </div>

      <div className='achievements'>
        <div className='heading' id='head-achieve'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Achievements</h3>
        </div>

        <Timel />

      </div>


      <div className='contacts'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Contact</h3>
        </div>

        <div className='contactlist'>
          <div className='contactCard' >
            <img src={user} className='contactImg' />
            <p className='name'>Shelendra Rasaniya</p>
            <p className='info'>Sports Officer</p>
              <p className='info'>+91 9793990585</p>
          </div>
          <div className='contactCard' >
            <img src={user} className='contactImg' />
            <p className='name'>Prayash Kumar Sahu</p>
            <p className='info'>Institute Badminton  Secretary</p>
              <p className='info'>+91 8658641080</p>
          </div>
          <div className='contactCard' >
            <img src={user} className='contactImg' />
            <p className='name'>Shlok Agrawal</p>
            <p className='info'>Events Convener</p>
              <p className='info'>+91 7261924600</p>
          </div>
          <div className='contactCard' >
            <img src={user} className='contactImg' />
            <p className='name'>Arjun Kabra</p>
            <p className='info'>Events Convener</p>
              <p className='info'>+91 9404466798</p>
          </div>
        </div>

      </div>
      <div className='gallery'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Gallery</h3>
        </div>
        <div className='imageSlider'>
          <Slider {...imageSliderSettings}>
            {images.map((image, index) => (
            <div key={index} className='sliderdiv'>
              <img src={image} alt={`Slide ${index + 1}`} className='sliderImage' />
            </div>
            ))}
          </Slider>
        </div>

      </div>


      {/* <div className='timing'>
        <p className='side'>Pool Timings</p>
        <img  className='schimg'/>
      </div> */}

      <div className='location'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.3410964230648!2d72.91128878064984!3d19.1355206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80707f747dd%3A0x2836a7e40ba1c6e5!2sBadminton%20Court!5e0!3m2!1sen!2sin!4v1720102713953!5m2!1sen!2sin" 
        width="700" height="450" className='map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Badminton;