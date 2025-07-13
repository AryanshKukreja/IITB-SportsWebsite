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
import c1 from "./assets/c1.jpg";
import c2 from "./assets/c2.jpg";
import c3 from "./assets/c3.webp";
import c4 from "./assets/c4.jpg";
import c5 from "./assets/c5.jpg";


const Chess = () => {
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
   c1, c2, c3, c4, c5
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Dark Knight Chess Club
      </div>


      <div className='aq-about'>
       Chess is much more than a board game — it's a centuries-old battle of strategy, logic, and patience that has influenced such a strong culture across our campus. Dark Knight Chess Club of IIT Bombay, the oldest & most followed club of iitbombaysports, aims to foster a widespread chess community across our institute. We won Gold in the previous Inter-IIT Sports meet, owing to our coach IM Sharad tilak sir & our talented players. Some of our flagship events are Chess GC, Institute Chess open, Freshmen open & Institute Chess League. 
      </div>


      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            You can find the Board Games room on the 2nd floor of the New Sac Gymkhana bldg.
          </p>
          <img alt="alt" src={c5} className='image' />
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
            <img alt="alt" src={c1} className='contactImg' />
            <p className='aq-name'>Shreyas</p>
            <p className='info'>DKCC Manager</p>
            <p className='info'>+91 86574 14616</p>
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

    </div>
  )
}

export default Chess;