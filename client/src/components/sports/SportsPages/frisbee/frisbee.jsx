import React from 'react';
import Timel from './timeline';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
//import { MdPlayArrow } from "react-icons/md";   //filled triangle
//import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
//import ReactCardFlip from 'react-card-flip';
import pic_1 from './assets/pic_1.jpg';
import pic_2 from './assets/pic_2.jpg';
import pic_3 from './assets/pic_3.jpg';
import pic_4 from './assets/pic_4.jpg';
import pic_5 from './assets/pic_5.jpg';
import pic_6 from './assets/pic_6.jpg';

const Frisbee = () => {
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
    pic_1,
    pic_2,
    pic_3,
    pic_4,
    pic_5,
    pic_6
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Ultimate Frisbee Club 
      </div>


      <div className='aq-about'>
        Ultimate frisbee is a mixed gender, self refereed sport rapidly growing around the world, and in India. Played earlier by a group of dedicated students and later formally inaugurated in 2022, the Ultimate Frisbee Club pioneers the sport on IIT Bombay campus. The club regularly organizes exciting events, sessions, camps, and tournaments to involve its vibrant community of undergraduate students, postgraduates, staff, and alumni. These include General Championships, Beginners Camp, Women’s Camp, and the Ultimate Frisbee Open (UFO).

        The IIT Bombay Ultimate Frisbee Club competes in the National College Ultimate Championship (NCUC), West Sectionals, and IIT Bombay's Aavhan Sports Festival. It is also a part of the Mumbai Ultimate Community. 

        The club's new coach, Maksood Chaudhary has 10+ years of experience in Ultimate Frisbee. He has both represented and coached Team India. He is gearing the club towards competitive success in the future.
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            Equpiment:
            The IIT Bombay Ultimate Frisbee Club has all the necessary equipment to organize matches and sessions including ultimate frisbee discs, cones, markers, and bibs.
            Grounds:
            The club plays on the Football ground, Hockey ground, Outdoor Turf, Indoor Turf, and Kho-Kho area as per convenience.
          </p>
          <img alt="alt" src={pic_5} className='image' />
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
            <img alt="alt" src={pic_1} className='contactImg' />
            <p className='aq-name'>Shaashvat Sekhar</p>
            <p className='info'>Institute Frisbee Secretary</p>
            <p className='info'>+91 78878 64446</p>
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
        <img src={time2} className='schimg' />
      </div> */}

      <div className='location'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1884.6801509832069!2d72.91331199999999!3d19.135699499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b808367d7489%3A0x5936f3009b0ecd48!2sBaby%20Swimming%20Pool.%20IIT%20Bombay!5e0!3m2!1sen!2sin!4v1719689561544!5m2!1sen!2sin"
          width="700" height="450" className='map' allowFullScreen="" loading="lazy" title="frisbee" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <p className='sideL'>Location</p>
      </div>
    </div>
  )
}

export default Frisbee;