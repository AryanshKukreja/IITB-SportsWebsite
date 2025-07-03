import React from 'react';
import './cricket.css';
import { useState } from 'react';
import { MdDoubleArrow } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Tennis = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleContent = (cardIndex) => {
    if (expandedCard === cardIndex) {
      setExpandedCard(null); // Collapse the card if it's already expanded
    } else {
      setExpandedCard(cardIndex); // Expand the clicked card
    }
  };

  const cards = [
    {
      title: 'Lawn Tennis GC',
      content: 'This event is held once a year in the Spring Semester under three categories: Boys, Girls and PG’s. In this event the best tennis players from each hostel go head to head to determine which hostel boasts of the best talent in Lawn Tennis.'
    },
    {
      title: 'NSO',
      content: 'It’s a part of the academic curriculum for the undergraduate students. Through selections for students who opted for cricket nearly 30-40 are selected and trained throughout the academic year, 2 days a week (Monday and Tuesday).'
    },
    {
      title: 'Institute Tennis League',
      content: 'This usually follows the Institute Tennis Open, and is IIT-B’s version of the IPTL. It is a team based event in which 8 managers are in charge of 8 teams. There is an auction of the players. The teams are divided into two pools of four each and play round-robin amongst each other. The format of each tie consists of: Men’s Singles, Men’s Doubles, Women’s Singles, Mixed Doubles.'
    },
    {
      title: 'Institute Tennis Open',
      content: 'It is the flagship open tournament for Tennis at IIT Bombay. This tournament is open to all -students, alumni, professors and staff. It is a grand-slam styled open singles tournament and is held in the Autumn Semester.'         
    },
    {
      title: 'Freshiesta',
      content: 'This tournament gives the freshers a chance to showcase their talent. It gives an opportunity to the NSO students to see their improvement through the months and the non-NSO students a chance to battle it out with the regulars. It follows a compass draw format in which everyone gets to play an equal number of matches and it keeps the knockout spirit alive.'
    },
    {
      title: 'Summer Slam',
      content: '  It is conducted late in the month of March.Open for all(boys and girls) but the format is made a little different from Tennis Open( a little more exciting like best of 21 points or best of 3 mini sets) instead of the standard tennis set pattern.'
 
    }
  ];

  const imageSliderSettings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
  ];

  return (
    <div className='pageContainer'>
      <div className='titleText'>
        Lawn Tennis
      </div>

      <div className='about'>
        Scientists and doctors around the world have often pointed to tennis as one of the healthiest activities that one can indulge in, thanks to its numerous physical, mental and emotional gains.
        Since its inception, the Tennis Club of IIT-B has kept growing over the years and has now become a hub for tennis enthusiasts. The purpose of the club is to conduct various events such as training camps, workshops and tournaments along with fun and recreational events like screenings of matches etc.
        So are you someone who's looking for competition, social play, team camaraderie, a good workout, tournaments exposure and some quality time with friends? Well then look no further, the Tennis Club of IIT-B shall strive to provide you with all of these and more!
      </div>

      <div className='facilities'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            <b>Tennis Courts</b> : 
            There are 6 tennis courts overall, 
            3 close to the Convo hall are known as upper courts and 3 close to the Staff Hostel are lower courts. 
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
            <div className={`card ${expandedCard === index ? 'expanded' : ''}`} key={index} onClick={() => toggleContent(index)}>
              <h3 className="card-heading">{card.title}</h3>
              {expandedCard === index && (
                <p className="card-content">
                  {card.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='contacts'>
        <div className='heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='headingtext'>Contact</h3>
        </div>
        <div className='contactlist'>
          <div className='contactCard'>
            <img className='contactImg' />
            <p className='name'>Atharva Naik</p>
            <p className='info'>Institute Lawn Tennis Secretary</p>
            <p className='info'>+91 99200 722528</p>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.38794229164!2d72.90822443382704!3d19.134488600267908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c74281daf5e3%3A0xe0c050e0ec9a18cf!2sTennis%20court!5e0!3m2!1sen!2sin!4v1720443451101!5m2!1sen!2sin" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  );
}

export default Tennis;
