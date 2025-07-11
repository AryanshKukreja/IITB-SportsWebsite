import React from 'react';
import Timel from './timeline';
import { useState,useRef, useEffect} from 'react';
import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
import { MdPlayArrow } from "react-icons/md";   //filled triangle
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bb1 from '../assets/bb1.jpeg';
import bb2 from '../assets/bb2.png';
import bb3 from '../assets/bb3.jpg';
import bb4 from '../assets/bb4.png';
import bb5 from '../assets/bb5.png';
import bb6 from '../assets/bb6.png';
import bb7 from '../assets/bb7.png';
import bb8 from '../assets/bb8.png';
import bb9 from '../assets/bb9.jpg';
import bb10 from '../assets/bb10.jpg';
import bb11 from '../assets/bb11.jpg';
import bb12 from '../assets/bb12.jpg';
import bb13 from '../assets/bb13.jpg';
import basky_team from '../assets/basky_team.png';
import sec from '../assets/bbsec.jpg';
import prash from '../assets/prasham.jpg';
import deep from '../assets/deepraj.jpg';
import user from '../assets/user.jpg';
import nso from '../assets/nso.jpg';
import basky_boys from '../assets/basky_boys.png';
import meet_the_team from '../assets/meet_the_team.png';
import basky_girls from '../assets/basky_girls.png';

const Basketball = () => {
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
      title: 'PG Mania',
      content: ''
    },
    {
      title: 'Basketball Farewell',
      content: ''
    },
    {
      title: 'NSO Trials',
      content: ''
    },
    {
      title: 'Inter-IIT Pre-Camp',
      content: ''
    },
    {
      title: 'Alumni Day',
      content: ''
    },
    {
      title: 'She’s Got Game',
      content: ''
    },
    {
      title: 'Freshiesta',
      content: ''
    },
    {
      title: 'Inter-IIT Camp',
      content: ''
    },
    {
      title: 'Inter-IIT',
      content: ''
    },
    {
      title: 'Open Workshop',
      content: ''
    },
    {
      title: 'All Star Arena',
      content: ''
    },
    {
      title: 'Aavhan',
      content: ''
    },
    {
      title: 'Institute Basketball Playoffs',
      content: ''
    },
    {
      title: 'UG & PG Freshman Orientation',
      content: ''
    },
    {
      title: 'Hostel General Championships',
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
    },
  ];

  const imageSliderSettings = {
    dots: true,
    // infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const images = [
    basky_team,basky_girls,basky_boys,bb2,bb3,bb4,bb5,nso,bb8,bb9,bb10,bb11,bb12,
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Basketball
      </div>


      <div className='aq-about'>
        The IITB Basketball family is an integral part of the dynamic sports culture of the Institute. The team boasts a history of captivating performances in various tournaments, leading to championships in many. This is made possible with access to state-of-the art facilities, a dedicated coach and rigorous training. The sport has left us with a plethora of teachings: Camaraderie, perseverance and integrity. 
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            The Students' Gymkhana boasts two indoor courts and two outdoor courts, perfect for year-round competition or casual shooting practice. Some hostels might even have their own courts, expanding your options for a quick game. To ensure you're well-equipped, the institute provides two basketball storage trolleys stocked with size-6 and 7 balls, air pumps to keep them inflated, and even medical kits for minor on-court mishaps. The H-12 store sells shoes with gum soles specifically designed for optimal grip on those smooth indoor courts.
            The court timings are: 6:00 am-9:00 am in the mornings and from 5:00 pm-10:00 pm in the evenings. Basketballs are provided at the courts.
          </p>
          <img src={bb1} className='image' />
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
          <div className='contactCard' >
            <img src={deep} className='contactImg' />
            <p className='aq-name'>Deepraj Kasherwal</p>
            <p className='info'>Institute Basketball Secretary</p>
              <p className='info'>+91 97615 43343</p>
          </div>
          <div className='contactCard' >
            <img src={user} className='contactImg' />
            <p className='aq-name'>Nilesh Sawant</p>
            <p className='info'>Coach</p>
              <p className='info'>+91 94220 95558</p>
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
        <img src={time2} className='schimg'/>
      </div> */}

      <div className='location'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.408680151891!2d72.90801220550003!3d19.133580043371115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80812c1f80f%3A0x6e9d47badec03bac!2sIndoor%20Basketball%20Courts!5e0!3m2!1sen!2sin!4v1719931678373!5m2!1sen!2sin" 
        width="700" height="450" className='map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Basketball;