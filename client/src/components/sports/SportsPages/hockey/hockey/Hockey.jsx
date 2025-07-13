import React from 'react';
import Timel from './timeline4';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
// import { MdPlayArrow } from "react-icons/md";   //filled triangle
// import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";



const Hockey = () => {
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
    p1, p2, p3, p4, p5
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Hockey
      </div>


      <div className='aq-about'>
      Hockey is one of the competitive and well-loved sports at IIT Bombay. With a dedicated hockey ground and proper facilities, it offers a great space for both casual play and serious competition.

      Under the guidance of our coach Dr. Harish, IIT Bombay Hockey has shown steady growth over the years. Various tournaments and events are conducted throughout the year to help players of all levels improve and enjoy the sport.

      With hard work, strong team spirit, and excellent coaching, the IIT Bombay Hockey team has built a proud record at the Inter-IIT Sports Meet — winning medals for three years in a row, including silver in the last two editions and a bronze before that.
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            IIT Bombay has a proper, standard hockey ground available for all players to practice and play matches. To support everyone, we have well-maintained equipment including shin pads, stockings, hockey sticks, grips, balls, goalie kits, and more.

            We also ensure player safety with essential items like medical kits, sprays, and medical tape. Whether you're a beginner or an experienced player, everything you need to enjoy and play hockey is available on campus. 
          </p>
          <img alt="alt" src={p1} className='image' />
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
            <img alt="alt" className='contactImg' />
            <p className='aq-name'>Khushal</p>
            <p className='info'>Institute Hockey Secretary</p>
              <p className='info'>+91 9001401665</p>
            
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