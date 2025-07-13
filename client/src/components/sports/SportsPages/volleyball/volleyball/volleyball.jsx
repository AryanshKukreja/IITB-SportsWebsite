import React from 'react';
import Timel from './timeline';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
//import { MdPlayArrow } from "react-icons/md";   //filled triangle
//import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
// import ReactCardFlip from 'react-card-flip';
// import time from '../assets/time.png';
// import time2 from '../assets/time2.png';
// import pool from '../assets/pool.jpg';
// import pool2 from '../assets/pool2.jpg';
// import pool3 from '../assets/pool3.jpeg';
// import asec from '../assets/asec.png';
import user from '../assets/user.jpg';
import v1 from '../assets/v1.JPG';
import v2 from '../assets/v2.JPG';
import v3 from '../assets/v3.JPG';  
import v4 from '../assets/v4.JPG';
const Volleyball = () => {
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
      title: 'Camps',
      content: 'Every summer, by popular demand, our coach, Ritesh Guchhait, holds camps in swimming at the beginners, intermediate and advanced levels. Camps are also held for IIT students during the semester.The beginners camps are held separately for children, ladies, students and staff. The duration is normally 15-20 days, and there is a demonstration for parents and families on the last day, when certificates are handed out. There are also intermediate camps for students looking to train in strokes such as breaststroke, butterfly and backstroke.'
    },
    {
      title: 'NSO',
      content: 'The Government of India, through its National Sports Organization, provides a scheme in all IITs, where all incoming, i.e. first year students, must sign up for a particular sport, and undergo training. This scheme, popularly called NSO, is available to IIT students for training in various sports, such as swimming, hockey, basketball, squash, badminton, tennis, athletics, table tennis, football etc. Swimming, is a much sought after option, and since the number of students that can be accommodated in a given sport is limited, it is not surprising to see students, at the beginning of every academic year, crowding around the coach at the poolside, to give their trials and try to get in. What is extremely encouraging, is that students often develop a new interest in swimming, and continue to attend advanced coaching throughout the year, all through their college life, and not just the first year. The NSO swim training functions two evenings a week.'
    },
    {
      title: 'Squash GC',
      content: ''
    },
    {
      title: 'Institute Squash League ',
      content: ''
    },
    {
      title: 'Institute Squash Open',
      content: ''
    }
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
    v4,
    v2,
    v3,
    v1
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Volleyball
      </div>


      <div className='aq-about'>
        The Volleyball Club has access to a total of 5 courts — 3 indoor courts at the Gymkhana Grounds and 2 outdoor courts at Old SAC. The indoor courts provide an all-weather training environment and are ideal for competitive preparation, while the outdoor courts are used for regular practice and recreational matches. All courts are well-maintained and equipped with floodlights for evening training.

        Equipment:
        The club offers professional-grade volleyballs, nets, cones, agility ladders, and other essential training equipment to support skill development and match preparation.

        Coaching:
        Training is conducted under the guidance of Coach Pritesh Yadav, who focuses on technical improvement, game strategy, and physical conditioning for both men’s and women’s teams.

        Fitness & Support:
        Players also benefit from access to the institute’s gym and physiotherapy facilities for strength training, injury prevention, and rehabilitation
        
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            Volleyball Courts:
            The Volleyball Club has access to a total of 5 courts — 3 indoor courts at the Gymkhana Grounds and 2 outdoor courts at Old SAC. The indoor courts provide an all-weather training environment and are ideal for competitive preparation, while the outdoor courts are used for regular practice and recreational matches. All courts are well-maintained and equipped with floodlights for evening training.

            Equipment:
            The club offers professional-grade volleyballs, nets, cones, agility ladders, and other essential training equipment to support skill development and match preparation.

            Coaching:
            Training is conducted under the guidance of Coach Pritesh Yadav, who focuses on technical improvement, game strategy, and physical conditioning for both men’s and women’s teams.

            Fitness & Support:
            Players also benefit from access to the institute’s gym and physiotherapy facilities for strength training, injury prevention, and rehabilitation
          </p>
          <img alt="alt" src={v1} className='image' />
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
            <p className='aq-name'>Ghanshyam Choudhary</p>
            <p className='info'>Institute Volleyball Secretary</p>
              <p className='info'>+91 89494 01659</p>
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
        <p className='side'>Court Timings</p>
        <img src={time2} className='schimg'/>
      </div> */}

      <div className='location'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4020806480025!2d72.9093683747526!3d19.133869182082652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1721551340933!5m2!1sen!2sin" 
        width="700" height="450" className='map' allowFullScreen="" loading="lazy" title="volleyball court location" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Volleyball;

