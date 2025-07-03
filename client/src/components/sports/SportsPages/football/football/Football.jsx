import React from 'react';
import './cricket.css';
import Timel from './timeline';
import { useState,useRef, useEffect} from 'react';
import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
import { MdPlayArrow } from "react-icons/md";   //filled triangle
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Football  = () => {
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
      title: 'Institute Turf League',
      content: 'Gaming enthusiasts do cherish this one!! It is an open tournament, one of its kind in the insti!'
    },
    {
      title: 'NSO',
      content: 'The Government of India, through its National Sports Organization, provides a scheme in all IITs, where all incoming, i.e. first year students, must sign up for a particular sport, and undergo training'
    },
    {
      title: 'Freshie Tournament',
      content: 'Freshie tournament is the first competitive event of the even semester.A platform for all the freshmen to show their skills.It is an 11-on-11 tournament.'

    },
    {
      title: 'Football GC',
      content: 'The football inter hostel general championship, the most celebrated football event in the Institute. Its a professional 11-a side inter hostel football tournament wherein the various hostels battle it out for GC glory!'
                   
    },
    {
      title: 'Institute Football League',
      content: 'With football being the most followed sport in the Institute, the Institute Football League includes everyone from students to research scholars and even the professors participating as team managers and players!'
    },
    {
      title:'Fantasy League',
      content:  'The first of its kind and the most recent addition to the pack of events, the Fantasy League conducted on the FPL Platform has a huge participation in the institute!'
    },
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
  ];

  return (
    <div className='pageContainer'>
      <div className='titleText'>
            Football
      </div>


      <div className='about'>
        <p>
          Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. 
          Unqualified, the word football generally means the form of football that is the most popular where the word is used.
          IITB Students would be able to book turfs from the Sports Application.A  a slot updated page like a timetable where they can see the slots booked, 
          one for the turf and one for the ground.
        </p>
      </div>


      <div className='facilities'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            <b>11-aside ground along with a newly constructed 6-aside turf.</b>
            <br /><br />Apart from that we have  all the latest training equipment to supplement the team's practices. 
                We also house a refrigerator for ice packs so that players need it as soon as possible and a water cooler in our shed.
          </p>
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
            <img  className='contactImg' />
            <p className='name'>Rajwardhan Toraskar </p>
            <p className='info'>Institute Football Secretary</p>
              <p className='info'>+91 96190 00065</p>
            
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
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className='sliderImage' />
            </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className='location'>
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3869185665076!2d72.90968797511066!3d19.134533450132537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820fd0657%3A0xe732ba0e0eb134b1!2sCricket%20Ground!5e0!3m2!1sen!2sin!4v1720263060691!5m2!1sen!2sin"
          width="700"
          height="450"
          className='map'
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Football Ground Location">
        </iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Football;