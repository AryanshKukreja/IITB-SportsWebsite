import React from 'react';
import Timel from './timeline';
import { useState} from 'react';
//import { TfiAngleDoubleRight } from "react-icons/tfi"; //thin arrow
import { MdDoubleArrow } from "react-icons/md"; //bold arrow
//import { MdPlayArrow } from "react-icons/md";   //filled triangle
//import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
import cricket1 from '../images/cricket_1.jpg';
import cric1 from '../images/cric1.jpg';
import cric2 from '../images/cric2.jpg';
import cric3 from '../images/cric3.jpg';
import cric4 from '../images/cric4.jpg';



const Cricket = () => {
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
      title: 'CricFiesta',
      content: 'An event which is a part of the Freshie Girls Week where in teams of around 7 girls play cricket on the main pitches of the gymkhana ground.Nearly 4 teams register every year and a knockout tournament is conducted among them with a tennis ball.'
    },
    {
      title: 'NSO',
      content: 'It’s a part of the academic curriculum for the undergraduate students. Through selections for students who opted for cricket nearly 30-40 are selected and trained throughout the academic year, 2 days a week (Monday and Tuesday).'
    },
    {
      title: 'Cricmania',
      content: 'It is the flagship open tournament for Cricket in IIT Bombay. This tournament is open to all students, alumni, professors and staff.It is held in the Spring Semester. It is highly competitive and is a must play for all Cricket enthusiasts as it presents a great opportunity to learn for intermediates as it provides them a platform to go up against experienced players who are a part of the Inter-IIT team.'

    },
    {
      title: 'Cricket GC',
      content: 'This is the inter hostel cricket tournament which takes place every year on the main ground in which the hostels bring their best players to win and grab some valuable points for the sports General Championship. It comprises of 15-over matches played with white balls and takes place in the month of January.'
                   
    },
    {
      title: 'Mixed Cricket League',
      content: 'It’s a fun event which takes place in the Open Air Theatre (OAT) where in 32 teams each comprising of 5 guys and 2 girls play against each other with rules similar to street cricket.It usually takes place in October.'
    },
    {
      title:'FreshMan Cricket League',
      content:  'A league initiated with the goal to give the freshmen an opportunity to showcase their talent gained through NSO, GC, Cricmania and several other camps and also for those who couldn’t take part in any of them.league comprising of 4 teams formed through bidding takes place in the month of March and has been an encouragement to the cricket enthusiasts to pursue the game in the institute and also has been a source of raw talent which on being nurtured produced few of the best players of IIT Bombay.'
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
    cricket1, cric1, cric2, cric3, cric4
  ];

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Cricket
      </div>


      <div className='aq-about'>
      Cricket is as much a religion at IIT Bombay as it is across the country. From Day & Night matches on our main field to late-night sessions in the Indoor Nets, the passion runs deep. Last year, the institute made history by winning Gold in Inter IIT Cricket after 16 years, a proud moment for the entire campus.
      </div>


      <div className='facilities'>
              <div className='aq-heading'>
                <MdDoubleArrow className='arrow' />
                <h3 className='aq-headingtext'>Facilities</h3>
              </div>
              <div className='content'>
                <p className='facilityText'>
                  The ground is situated in the heart of the gymkhana bordered by the athletic tracks. To facilitate night matches new lights have been installed on the gymkhana to provide best playing experience. There are also 4 indoor cricket pitches for practice during Monsoon, just opposite Hostel 3. 
                  We are also upcoming with customised pitches in indoor nets. The Institute Cricket team is well equipped team with all necessary equipments. We whole heartedly welcome new talents and give them space and opportunity to grow and develop game skills.
                  </p>
                <img alt="alt" src={cric2} className='image' />
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
            <p className='aq-name'>Pradyumna Gugulothu</p>
            <p className='info'>Institute Cricket Secretary</p>
              <p className='info'>+91 70139 54490</p>
            
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3869185665076!2d72.90968797511066!3d19.134533450132537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820fd0657%3A0xe732ba0e0eb134b1!2sCricket%20Ground!5e0!3m2!1sen!2sin!4v1720263060691!5m2!1sen!2sin"
          width="700"
          height="450"
          className='map'
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cricket Ground Location">
        </iframe>
  <p className='sideL'>Location</p>
  </div>
  </div>
  )
}

export default Cricket;