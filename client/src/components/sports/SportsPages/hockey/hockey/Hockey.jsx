import React from 'react';
import './cricket.css';
import Timel from './timeline4';
import { useState,useRef, useEffect} from 'react';
import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
import { MdPlayArrow } from "react-icons/md";   //filled triangle
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Hockey = () => {
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
      title: 'Hockey GC',
      content: 'Being scheduled towards the end of the season every year, it many a times turns out to be the Overall Championship decider.The event sees a great amount of participation and students show Great Spirit and learn and enjoy the sport.'

    },
    {
      title: 'NSO',
      content: 'It’s a part of the academic curriculum for the undergraduate students. Through selections for students who opted for cricket nearly 30-40 are selected and trained throughout the academic year, 2 days a week (Monday and Tuesday).'
    },
    {
      title: 'Institute Hockey League',
      content: 'The top enthusiastic hockey players from the institute as well as the alumni available in the city participate in this league.It’s a great opportunity to play alongside great players across the institute which is restricted in the GC format.'


    },
    {
      title: 'Girls Camp',
      content: 'The Girl’s Camp is for all the girls in the institute who have enthu in Hockey.As it is a beginner’s camp no Prerequisite is required.'

                   
    },
    {
      title: 'Beginners Camp',
      content: 'This to train the people who are enthusiastic for joining the Inter IIT practice or who just learn Hockey in general.This will be a week long camp held on the hockey field or in the sac outdoor facilities depending upon the condition of the field during rains.'

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
        Hockey
      </div>


      <div className='about'>
      Live, study and play in the heart of elite hockey in IIT Bombay! Hockey here is all about fun. Hockey Club provides a unique atmosphere where a player becomes a part of the hockey family which strives to educate, 
      develop and encourage each and every one of its members on their quest to excellence.
      </div>


      <div className='facilities'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            <b>Hockey Ground</b> : 
            Timings : 7 am to 10 PM(lights will be switched off at 10 PM sharp). 
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
            <p className='name'>Rohit Meena</p>
            <p className='info'>Institute Hockey Secretary</p>
              <p className='info'>+91 83067 08378</p>
            
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
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3881728360093!2d72.90822443404429!3d19.134478500000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9b74d4b5f75%3A0xfbea904fa3f2af3!2sGymkhana%20Grounds!5e0!3m2!1sen!2sin!4v1720442540019!5m2!1sen!2sin" 
          width="700"
          height="450"
          className='map'
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hockey Ground Location">
        </iframe>
  <p className='sideL'>Location</p>
  </div>
  </div>
  )
}

export default Hockey;