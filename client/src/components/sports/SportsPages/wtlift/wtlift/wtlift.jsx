import React from 'react';
import './wtlift.css';
import Timel from './timeline';
import { useState,useRef, useEffect} from 'react';
import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
import { MdPlayArrow } from "react-icons/md";   //filled triangle
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import p6 from '../assets/p6.jpg';
import ReactCardFlip from 'react-card-flip';
import time from '../assets/time.png';
import time2 from '../assets/time2.png';
import pool from '../assets/pool.jpg';
import pool2 from '../assets/pool2.jpg';
import pool3 from '../assets/pool3.jpeg';

import asec from '../assets/asec.png';
import user from '../assets/user.jpg';

const Wtlift = () => {
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
    p1,p2,p3,p4,p5,p6
  ];

  return (
    <div className='pageContainer'>
      <div className='titleText'>
        Weightlifting
      </div>


      <div className='about'>
      Weightlifting is not only the game of strength. It  needs proper technique with practice as you enter the room. The walls are full of targets set for each player that are to be achieved by December for their Olympics i.e Inter IIT sports meet .Vijay sir also ensures that the accolades are also well displayed and immediately after the targets you see the achievements of your seniors.Whether you're new to lifting or experienced, you'll find a supportive environment to achieve your fitness goals. Join us to improve your physical and mental strength while being part of a dedicated community!
      </div>


      <div className='facilities'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            <ul>
              <li> New sets of olympic rod and weight plates </li>
              <li> Weightlifting platform</li>
              <li> Weight traing bench</li>
              <li> Squats rack, back press and leg extension machines</li>
            </ul>
          </p>
          <img src={pool3} className='image' />
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
            <img src={asec} className='contactImg' />
            <p className='name'>Harish Chand</p>
            <p className='info'>Institute Weightlifting Secretary</p>
              <p className='info'>+91 83077 12021</p>
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


      <div className='timing'>
        <p className='side'>Pool Timings</p>
        <img src={time2} className='schimg'/>
      </div>

      <div className='location'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.379737570415!2d72.91305249999999!3d19.134848050000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b809cdbb26f9%3A0x1bc7aa048f060162!2sStudents%20Activity%20Center!5e0!3m2!1sen!2sin!4v1722158615027!5m2!1sen!2sin" 
        width="700" height="450" className='map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Wtlift;