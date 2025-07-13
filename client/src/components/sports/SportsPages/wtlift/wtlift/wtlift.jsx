import React from 'react';
import Timel from './timeline';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
// import { MdPlayArrow } from "react-icons/md";   //filled triangle
// import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import p6 from '../assets/p6.jpg';
// import ReactCardFlip from 'react-card-flip';
// import time from '../assets/time.png';
// import time2 from '../assets/time2.png';
// import pool from '../assets/pool.jpg';
// import pool2 from '../assets/pool2.jpg';
import pool3 from '../assets/pool3.jpeg';

//import asec from '../assets/asec.png';
import user from '../assets/user.jpg';

const Wtlift = () => {
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
      title: 'NSO',
      content: 'The Government of India, through its National Sports Organization, provides a scheme in all IITs, where all incoming, i.e. first year students, must sign up for a particular sport, and undergo training. This scheme, popularly called NSO, is available to IIT students for training in various sports, such as swimming, hockey, basketball, squash, badminton, tennis, athletics, table tennis, football etc. Swimming, is a much sought after option, and since the number of students that can be accommodated in a given sport is limited, it is not surprising to see students, at the beginning of every academic year, crowding around the coach at the poolside, to give their trials and try to get in. What is extremely encouraging, is that students often develop a new interest in swimming, and continue to attend advanced coaching throughout the year, all through their college life, and not just the first year. The NSO swim training functions two evenings a week.'
    },
    {
      title: 'Powerlifting open',
      content: ''
    },
    {
      title: 'Weightlifting GC',
      content: ''
    },
    {
      title: 'Arm wrestling GC',
      content: ''
    },
    {
      title: 'Arm wrestling open',
      content: ''
    },
    {
      title: 'Bodybuilding open',
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
    p1,p2,p3,p4,p5,p6
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Weightlifting
      </div>


      <div className='aq-about'>
        Weightlifting is a strength sport in which athletes attempt to lift heavy weights mounted on barbells in a series of highly technical movements. It is an Olympic discipline that consists of two main lifts: the snatch and the clean and jerk. Each lift requires not just brute strength, but also explosive power, flexibility, balance, coordination, and mental focus.

        Weightlifting is divided into weight classes to ensure fair competition. It emphasizes technique as much as strength, and training typically includes mobility work, accessory exercises, and technique refinement alongside heavy lifting.

        It is the type of sport you take up when you want to not only build your physique, but also build world class strength, healthy joints, and highly mobile and functional muscles.

        Weightlifting Club is led by Vijay Sonigra sir, Retired Nationals player in Weightlifting, acted previously and Maharashtra Weightlifting Team coach, he has been coaching us here for 20+ years, he is light hearted but when it comes to training the attention to detail and strictness is unmatched. Weightlifting isn't just a sport, it's a community of likeminded individuals that are the most regular and hardworking athletes around, all with the common goal of getting stronger, pushing limits, and breaking records
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            Weightlifting Room has many Nelco weightlifting Rods that are upto state level standards, it also has powerlifting rods, platforms, for training. Fun Fact: Weightlifting room also contains more weight plates than the Old Sac gym and New Sac Gym combined.

            Our club has a coach, who comes from 6pm-9pm on weekdays.

            Machines are also present, like lat pulldown, leg extension/curl, leg press, forearm machine, hyper extension machine etc.
          </p>
          <img alt="alt" src={pool3} className='image' />
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
            <p className='aq-name'>Prateek Behera</p>
            <p className='info'>Institute Weightlifting Secretary</p>
              <p className='info'>+91 62979 57507</p>
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.379737570415!2d72.91305249999999!3d19.134848050000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b809cdbb26f9%3A0x1bc7aa048f060162!2sStudents%20Activity%20Center!5e0!3m2!1sen!2sin!4v1722158615027!5m2!1sen!2sin" 
        width="700" height="450" className='map' allowFullScreen="" loading="lazy" title="weightlifting" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Wtlift;