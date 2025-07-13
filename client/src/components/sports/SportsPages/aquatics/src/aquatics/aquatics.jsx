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
import p1 from '../assets/p1.jpeg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.JPG';
import p6 from '../assets/p6.JPG';
// import ReactCardFlip from 'react-card-flip';
// import time from '../assets/time.png';
// import time2 from '../assets/time2.png';
// import pool from '../assets/pool.jpg';
// import pool2 from '../assets/pool2.jpg';
import pool3 from '../assets/pool3.jpeg';
import pool4 from '../assets/pool4.jpeg';
import asec from '../assets/asec.png';
import user from '../assets/user.jpg';

const Aquatics = () => {
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


  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };



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
      title: 'Swimmathon',
      content: 'Swimathon is the largest Event organised by IIT Bombay Swimming Club and is held annually during the end of Spring season. Swimathon started in 1989 and has a duration of 6 hours. Its open to everyone on campus, and one can see hoards of IIT students participating quite happily along with kids, professors and middle-aged ladies. Over the years, Swimathon has grown exponentially and now attracts 100+ participants every year.'
    },
    {
      title: 'Swimming GC',
      content: 'Every year we have an Inter hostel swimming competition - The Swimming General Championship, with assorted supporters crying themselves hoarse in support of their hostel mates, irrespective of the level of swimming. It\'s an ideal platform to flaunt your swimming skills and make your hostel proud! With no restrictions on participation, the swimming pool is the place to be during the days of the swimming GC.'
    },
    {
      title: 'Triathlon GC',
      content: 'The IIT Swimming club holds triathlon competition every year. This tri sport of event includes swimming, cycling, and running. The event is organized in two categories: Team Triathlon- Team of 3 (at least one female member) & Individual Triathlon.'
    },
    {
      title: 'Waterpolo GC',
      content: 'Every year we have an inter hostel water polo general championship where all the hostels battle to prove their supremacy in the sport. The GC is organized according to the rules of FINA. '
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

  const images = [
    p1, p2, p3, p4, p5, pool4, p6
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Aquatics
      </div>


      <div className='aq-about'>
        Comprising of Swimming and Water Polo, Aquatics is one of the most widely practiced sports at IIT Bombay.
        The magnificent Olympic-sized pool, newly built and impeccably maintained, welcomes anyone seeking recreation
        or competitive glory. Owing to the coaches Reddy Sir (Retd.) and Ritesh Sir,  IIT Bombay Aquatics has witnessed
        a tremendous growth over the years.  With several exciting events spread throughout the year to cater to all levels of players,
        IITB Aquatics functions with the sole aim of promoting Swimming and Water Polo. Fueled by exceptional coaching and unwavering commitment,
        IIT Bombay's Swimming and Water Polo teams have built a legacy of excellence at the Inter-IIT Aquatics Meet.
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            <b>Swimming Pool</b> : Our club has a 50m X 25m swimming pool with all the modern facilities. Various equipment for swimming like kickboards, flippers, pull buoys, pedals are also available for the members. The Swimming pool has a fully functional Ozone treatment plant for treatment of water.
            <br /><br /><b>Baby pool</b> : We also have a baby pool for beginners and leisure activities.
            <br /><br /><b>Water Polo</b> : We have all the necessary equipment for water polo training of students.
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
            <p className='aq-name'>Ritesh Guchhait</p>
            <p className='info'>Coach, Sports Officer</p>
            <p className='info'></p>

          </div>
          <div className='contactCard' >
            <img alt="alt" src={asec} className='contactImg' />
            <p className='aq-name'>Achirangshu Dakua</p>
            <p className='info'>Institute Aquatics Secretary</p>
            <p className='info'>+91 94745 91609</p>
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1884.6801509832069!2d72.91331199999999!3d19.135699499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b808367d7489%3A0x5936f3009b0ecd48!2sBaby%20Swimming%20Pool.%20IIT%20Bombay!5e0!3m2!1sen!2sin!4v1719689561544!5m2!1sen!2sin"
          width="700" height="450" className='map' allowFullScreen="" loading="lazy" title="pool location" referrerPolicy="no-referrer-when-downgrade">
        
          </iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Aquatics;