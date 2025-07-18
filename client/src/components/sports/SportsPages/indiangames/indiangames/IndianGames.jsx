import React from 'react';
import Timel from './timeline2';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
//import { MdPlayArrow } from "react-icons/md";   //filled triangle
//import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
import img1 from "../images/p51.jpg";
import img2 from "../images/p52.jpg";
import img3 from "../images/p53.jpg";
import img4 from "../images/p54.jpg";
import img5 from "../images/p55.jpg";
import ing from "../images/ing.jpg";
import ing2 from "../images/ing2.jpg";
import ing3 from "../images/ing3.JPG";
import ing4 from "../images/ing4.JPG";
import ing5 from "../images/ing5.png";
import ing6 from "../images/ing6.png";


const IndianGames = () => {
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
      title: 'Inter Hostel Kho-Kho GC',
      content: 'This event is held once a year in the Spring Semester for All Boys and in the autumn Semester for the All Girls and is part of the Inter Hostel Sports General Championship.'
    },
    {
      title: 'NSO',
      content: 'The Government of India, through its National Sports Organization, provides a scheme in all IITs, where all incoming, i.e. first year students, must sign up for a particular sport, and undergo training. This scheme, popularly called NSO, is available to IIT students for training in various sports, such as swimming, hockey, basketball, squash, badminton, tennis, athletics, Kho-Kho, Handball, table tennis, football etc.'
    },
    {
      title: 'Institute Kho-Kho League (IKKL)',
      content: 'The Institute Kho-Kho League is the most awaited event of IIT Bombay Kho-Kho club and is held during the spring semester. This tournament is open to all students. It is a highly competitive league tournament which is organized using the IPL format.'

    },
    {
      title: 'Institute Kabaddi League',
      content: 'The Institute Kabaddi League is an event that will be held during the spring semester. This event will be open to all students. In this event, teams will be formed through an exhilarating auction.'
                   
    },
    {
      title: ' Battle of Batches',
      content: 'The Battle of Batches is an inter-year event in which students from different NSO and NCC batches showcase their skills and sportsmanship. This spirited competition brings together teams representing each batch, from freshmen to seniors, in a series of thrilling matches. It is held during the spring semester.'
    },
    {
      title:'Summer Camp',
      content:  'Kho-Kho is a new budding sport, especially in our institute. Being easy to learn, it attracts a lot of beginners. So for the enthusiasts out there, we organize various Beginners’ and Intermediate Camp over the year. And for the betterment of Institute Kho-Kho team, we organize the summer advanced training camp.'
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
    img1,img2,img3,img4,img5,ing,ing2,ing3,ing4,ing5,ing6
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
            Indian Games
      </div>


      <div className='aq-about'>
        Kho-Kho: Kho-Kho ranks as one of the most popular traditional sports in India, with a history dating back centuries. It is a dynamic and fast-paced sport that blends physical agility with strategic thinking, making it a beloved part of Indian sports culture and a growing interest internationally. It is characterized by its thrilling gameplay, where dodging, feinting, and bursts of controlled speed define its excitement. Playing Kho-Kho develops agility, teamwork, decision-making and enhances overall physical fitness and discipline.   
                  
        Kabaddi: Kabaddi, originating from ancient India, has evolved into a globally recognized sport celebrated for its fast-paced gameplay and cultural significance. Played in various forms worldwide, including professional leagues like the Pro Kabaddi League, it combines athleticism with strategic thinking. Kabaddi promotes physical fitness, teamwork, and mental agility, captivating audiences with its dynamic matches and growing international appeal.

        Tug of War: Tug of War is a traditional sport that emphasizes teamwork, strength, and coordination. Played by two teams pulling a rope in opposite directions, it requires unity, strategy, and endurance. Simple yet intense, it remains a popular and spirited game in festivals and sports events, symbolizing collective effort and resilience.
      </div>


      <div className='facilities'>
              <div className='aq-heading'>
                <MdDoubleArrow className='arrow' />
                <h3 className='aq-headingtext'>Facilities</h3>
              </div>
              <div className='content'>
                <p className='facilityText'>
                  Ground: Indoor Kho-Kho Court and Kabaddi mat

                  Facilities: IIT Bombay has one fully lighted Indoor court with a mat that is open all days. 
                              Timings (Indoor Court) : 6:00 AM-10:00 PM
                </p>
                <img alt="alt" src={ing4} className='image' />
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
            <p className='aq-name'>Kanak Tembhare</p>
            <p className='info'>Institute Indian Games Secretary</p>
              <p className='info'>+91 9322311654</p>
            
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
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3571278636005!2d72.90875297511069!3d19.135838550091524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b996756af44d%3A0x92ba3886f6c7bad!2sIndoor%20Kho-Kho%20Court!5e0!3m2!1sen!2sin!4v1720265475433!5m2!1sen!2sin" 
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

export default IndianGames;