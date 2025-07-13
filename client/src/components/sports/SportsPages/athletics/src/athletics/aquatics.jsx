import React from 'react';
import './aquatics.css';
import Timel from './timeline';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
//import { MdPlayArrow } from "react-icons/md";   //filled triangle
//import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import p1 from '../assets/1.jpg';
import p2 from '../assets/2.jpg';
import p3 from '../assets/3.jpg';
import p4 from '../assets/4.jpg';
import p5 from '../assets/5.jpg';
import user from '../assets/user.jpg';

const Athletics = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleContent = (cardIndex) => {
    if (expandedCard === cardIndex) {
      setExpandedCard(null); // Collapse the card if it's already expanded
    } else {
      setExpandedCard(cardIndex); // Expand the clicked card
    }
  };

  // const [isFlipped, setIsFlipped] = useState(false);
  // const flipcad = () => {
  //   setIsFlipped(!isFlipped);
  // }
  // const [isFlipped1, setIsFlipped1] = useState(false);
  // const flipcad1 = () => {
  //   setIsFlipped1(!isFlipped1);
  // }

  const images = [
    p1, p2, p3, p4, p5
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

  const cards = [
    {
      title: 'Summer Camp',
      content: 'Summer athletics training camp for beginners and advanced athletes.'
    },
    {
      title: 'NSO',
      content: 'National Sports Organization activities and competitions.'
    },
    {
      title: 'Campathon',
      content: 'Marathon and endurance running events on campus.'
    },
    {
      title: 'Crossy GC',
      content: 'Cross country running general championship.'
    },
    {
      title: 'Triathlon GC',
      content: 'Multi-sport endurance competition including swimming, cycling, and running.'
    },
    {
      title: 'Mixed Relay',
      content: 'Team relay events with mixed gender participation.'
    }
  ];

  // const achieve = [
  //   {
  //     title: 'Group Achivements',
  //     content: ' ',
  //   },
  //   {
  //     title: 'Individual Achivements',
  //     content: 'c2',
  //   }
  // ];

  // const imageSliderSettings = {
  //   dots: true,
  //   // infinite: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // }

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
       Athletics
      </div>

      <div className='aq-about'>
        Comprising track and field events, Athletics is one of the most spirited and inclusive sports at IIT Bombay. With a well-maintained grass track and year-round training under the guidance of Irfan Sir and Renu Ma'am — our dedicated male and female coaches — the team strives for all-round excellence.
        Known for its strong team culture, IITB Athletics is where beginners rise to greatness, supported and cheered by teammates at every step. The journey matters just as much as the finish line.
        Fueled by passion, hard work, and team spirit, Athletics at IIT Bombay has been building a strong legacy at the Inter-IIT Sports Meet.
      </div>

      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
           IIT Bombay offers a 400m grass track for endurance and sprint training. It serves as the main training ground for all track events including sprints, hurdles, middle- and long-distance running.
          Additionally, a 100m synthetic track located beside the football ground is used for short-distance sprints and technique drills.
          Field Event Zones:
          Designated areas are available for field events such as long jump, high jump, shot put, and javelin, equipped with standard pits and markings for regular practice.
          Training Equipment:
          A variety of athletic training tools — including starting blocks, hurdles, cones, resistance bands, agility ladders, sled and medicine balls — are available to support athletes across all disciplines.
          </p>
          <img alt="alt" src={p2} className='image' />
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
            <img alt="alt" src={user} className='contactImg' />
            <p className='aq-name'>Praveen Kumar</p>
            <p className='info'>Institute Athletics Secretary</p>
            <p className='info'>+91 89584 34190</p>
          </div>
        </div>

      </div>
      <div className='gallery'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Gallery</h3>
        </div>
        {/* <div className='imageSlider'>
          <Slider {...imageSliderSettings}>
            {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className='sliderImage' />
            </div>
            ))}
          </Slider>
        </div> */}

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
        <img src={time2} className='schimg' />
      </div> */}

      <div className='location'>
       <iframe 
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.6671652193382!2d72.91190082224743!3d19.134256741593973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e1!3m2!1sen!2sin!4v1752435717790!5m2!1sen!2sin" 
         width="600" 
         height="450" 
         style={{border:0}} 
         allowFullScreen="" 
         loading="lazy" 
         referrerPolicy="no-referrer-when-downgrade"
         title="IIT Bombay Location">
       </iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Athletics;