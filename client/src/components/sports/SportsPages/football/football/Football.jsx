import React, { useState} from 'react';
import Timel from './timeline';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
//import { MdPlayArrow } from "react-icons/md";   //filled triangle
//import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
import p1 from '../assets/p1.jpeg';
import football_ground from '../assets/football_ground.jpeg';
import football_team from '../assets/football_team.jpeg';
import logo from '../assets/logo.jpeg';
import turf from '../assets/turf.jpeg';
import user from '../../aquatics/src/assets/user.jpg';

const Football  = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

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

  // const achieve = [
  //   {
  //     title: 'Group Achivements',
  //     content:' ',
  //   },
  //   {
  //     title: 'Individual Achivements',
  //     content:'c2',
  //   }
  // ];

  // const imageSliderSettings = {
  //   dots: true,
  //   // infinite: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // }

  const images = [
    p1,
    football_ground,
    football_team,
    logo,
    turf
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
            Football
      </div>


      <div className='aq-about'>
        <p>
          Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. 
          Unqualified, the word football generally means the form of football that is the most popular where the word is used.
          IITB Students would be able to book turfs from the Sports Application.A  a slot updated page like a timetable where they can see the slots booked, 
          one for the turf and one for the ground.
        </p>
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            <b>11-aside ground along with a newly constructed 6-aside turf.</b>
            <br /><br />Apart from that we have all the latest training equipment to supplement the team's practices. 
            We also house a refrigerator for ice packs so that players need it as soon as possible and a water cooler in our shed.
          </p>
          <img src={football_ground} className='image' alt="Football Turf" />
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
            <img alt="alt" src={user} className='contactImg' />
            <p className='aq-name'>Yash Shah</p>
            <p className='info'>Institute Football Secretary</p>
            <p className='info'>+91 88494 68317</p>
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
  ); 
};
export default Football;
