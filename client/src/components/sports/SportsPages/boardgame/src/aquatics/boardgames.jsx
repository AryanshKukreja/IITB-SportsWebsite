import React from 'react';
import Timel from './timeline';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
//import { MdPlayArrow } from "react-icons/md";   //filled triangle
//import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
import bg1 from '../assets/bg1.jpeg';
import bg2 from '../assets/bg2.jpeg';
import bg3 from '../assets/bg3.jpeg';
import bg4 from '../assets/bg4.jpeg';
import bg5 from '../assets/bg5.jpeg';
import bg6 from '../assets/bg6.jpeg';
import bg7 from '../assets/bg7.jpeg';
import bg8 from '../assets/bg8.jpeg';
import bg9 from '../assets/bg9.jpeg';
import bg10 from '../assets/bg10.jpeg';
import bg11 from '../assets/bg11.jpeg';
import bg12 from '../assets/bg12.jpeg';
import bg13 from '../assets/bg13.jpeg';
import bg14 from '../assets/bg14.jpeg';
import bg15 from '../assets/bg15.jpeg';
import bgsec from '../assets/bgsec.jpg';
//import ReactCardFlip from 'react-card-flip';

const BoardGames = () => {
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

  // const[isFlipped, setIsFlipped]= useState(false);
  // const flipcad = () => {
  //   setIsFlipped(!isFlipped);
  // }
  // const[isFlipped1, setIsFlipped1]= useState(false);
  // const flipcad1 = () => {
  //   setIsFlipped1(!isFlipped1);
  // }

  const cards = [
    {
      title: 'Institue Chess Open (Rapid)',
      content: ''
    },
    {
      title: 'Institute Chess Championship',
      content: ''
    },
    {
      title: 'Institue Chess League',
      content: ''
    },
    {
      title: 'Chess General Championship',
      content: ''
    },
    {
      title: 'Chess: PG Mania',
      content: ''
    },
    {
      title: 'Carrom General Championship',
      content: ''
    },
    /* {
      title: 'Carrom: PG Mania',
      content: ''
    },
    {
      title: 'Pool: PG Mania',
      content: ''
    },
    {
      title: 'Institute Pool Open',
      content: ''
    },
    {
      title: 'Cube Craze competition',
      content: ''
    },
    {
      title: 'Cube of the Month ',
      content: ''
    } */
  ];

  // const achieve = [
  //   {
  //     title: 'Group Achivements',
  //     content:' ',
  //   },
  //   {
  //     title: 'Individual Achivements',
  //     content:'c2',
  //   },
  // ];

  // const imageSliderSettings = {
  //   dots: true,
  //   // infinite: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // }

  const images = [
    bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8,bg9,bg11,bg12,bg13,bg14,bg15
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Board Games
      </div>


      <div className='aq-about'>
        Institute Board Games cater to all who want to learn any kind of Board Games. With the increasing culture of Chess, Carrom and Pool in the Institute, we also conduct events for Snooker, Rubik’s Cube among others. We even have facilities for Foosball. We envision to take our Board Games culture to a renowned and established level of sport. Being indoor we have an opportunity to serve the students all 365 days. Board Games is not for the lethargic but for the enthusiastic. The Dark Knight Club and Rubik’s Club are the subordinates of the IITB Board Games. Come be a part of the Institute Board Games!

        Our Clubs! :
        Dark Knight Chess Club (DKCC) – The Dark Knight Chess Club is IIT Bombay’s official student-run chess community. It brings together chess enthusiasts across all skill levels – from casual players to rated professionals. The club conducts friendly tournaments and All India College-level competitions like the All India Chess League (AICL). It also encourages participation in inter-college and national events, fostering a deep and competitive chess culture on campus.

        Instagram:
        https://www.instagram.com/dkcc_iitb/?hl=en

        Rubik's Club – The Rubik’s Cube Club of IIT Bombay is a vibrant space for cubing enthusiasts. It promotes speedcubing and puzzle-solving through competitions and workshops. The club nurtures problem-solving skills. From 2x2 to complex NxN and twisty puzzles, the club has something for every puzzle lover.

        Instagram:
        https://www.instagram.com/rubiksclub_iitb/

      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
          The Board Games Room in New SAC 2nd Floor has facilities of all sports
          <br/>
          <br/>1 pool table
          <br/>1 snooker table
          <br/>1 foosball table

          <br/>Multiple Carrom Boards
          <br/>Multiple Chess boards
          </p>
          <img alt="alt" src={bg10} className='image' />
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
            <img alt="alt" src={bgsec} className='contactImg' />
            <p className='aq-name'>Akshat Karkar</p>
            <p className='info'>Institute Board Games Secretary</p>
              <p className='info'>+91 93216 09259</p>
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7538.855698547374!2d72.90781494213336!3d19.132740178333854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1719953908712!5m2!1sen!2sin" 
        width="700" height="450" className='map' allowFullScreen="" loading="lazy" title="boardgames" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default BoardGames;