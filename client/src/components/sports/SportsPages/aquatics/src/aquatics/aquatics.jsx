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
            <b>Swimming Pool</b> : Our club has a 50m x 25m swimming pool with all the modern facilities. Various equipment for swimming like kickboards, flippers, pull buoys, pedals are also available for the members. IITB Aquatics conducts regular camps for beginers and intermediate throughout the year.
            <br /><br /><b>Baby pool</b> : We also have a baby pool for the members who come to the swimming pool for leisure activities and for those who are learning swimming. The dimensions are 15m x 10m and we are planning to increase the size to 25m x 10m to accommodate the ever-increasing enthusiasm to learn swimming.
            <br /><br /><b>Water Polo</b> : We have all the necessary equipment for water polo training of students.
            <br /><br /><b>Gym</b> : We have a Mutistation  Gym facility, Dumbles and  Free rods. If any pool members wish to warm up and strengthen their body before entering to water, they make use of it.
          </p>
          <img alt="alt" src={pool3} className='image' />
        </div>
      </div>
      <div className='aq-pool-timing'>
        {/* <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Info</h3>
        </div> */}
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Pool Timing</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            <table className='pool-timing-table'>
              <thead>
                <tr>
                  <th className='pool-timing-table-td' colSpan={2}>SWIMMING POOL TIMING</th>
                </tr>
                <tr>
                  <th>GENERAL SLOT MORNING</th>
                  <th>GENERAL SLOT EVENING</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7:15 AM TO 8:00 AM</td>
                  <td>6:15 PM TO 7:00 PM</td>
                </tr>
                <tr>
                  <td>8:00 AM TO 8:45 AM</td>
                  <td>7:05 PM TO 7:50 PM</td>
                </tr>
                <tr>
                  <td>8:50 AM TO 9:30 AM</td>
                  <td>7:55 PM TO 8:30 PM</td>
                </tr>
                <tr>
                  <td>9:30 AM TO 10:15 AM</td>
                  <td>8:30 PM TO 9:00 PM</td>
                </tr>

                <tr>
                  <td className='section-header' rowSpan={2}>LADIES SLOTS</td>
                  <td>6:30 AM TO 7:15 AM</td>
                </tr>
                <td>5:20 PM TO 6:15 PM</td>
                <tr>
                  <td className='section-header'>CAMPUS KIDS TRAINING</td>
                  <td>4:00 PM TO 5:15 PM</td>
                </tr>

                <tr>
                  <td className='section-header'>NSO ( MON & WED)</td>
                  <td>5:45 PM TO 7:00 PM</td>
                </tr>

                <tr>
                  <td className='section-header'>INTER IIT PRACTICE</td>
                  <td>7:30 PM TO 9:00 PM</td>
                </tr>
              </tbody>
            </table>
          </p>

        </div>
      </div>
      <div className='aq-info'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Info</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            <li>Students Gymkhana/ Coach have the right to use any of the slot for the students camp, inter hostel, Inter IIT Camp of any other program that has been approved by Chairman (Sports)/ Dean (SA)</li>
            <li>The pool slots are strictly implemented during the summer months, other period if the number of swimmers in the big pool is less than 30 they may be permitted to swim without encroaching ladies slots</li>
            <br/>
            <b>Reaching the Swimming Pool</b>: The swimming pool is located just opposite to Hostel 2, besides the Indoor SAC.
            <br/>
            <br/>
            <b>Making the membership card</b>: A membership card is a must for swimming at the pool. We will very soon implement a biometric entry-exit systems in the pool.
            <br/>
            <br/>
            <b>Procedure to get a Swimming Pool Card for students</b>:<br/>
            <li>You can take a green form from swimming pool counter or office in the evening from 5:00 PM to 8:00 PM.</li>
            <li>You would need a passport size photograph to stick on the form and one more to stick on your swimming card.</li>
            <li>After filling up the form you should get the General Physician’s signature and stamp from IIT Hospital. You would be checked for sensitivity to chlorine, skin problems, infection in ears etc.</li>
            <li>You should submit the form to Swimming Pool office, along with 2 passport size photograph</li>
            <li>Please wait for a day or two for processing of your form. You can collect you card from swimming pool office after two days from submitting the form.</li>
            <li>Extra info: Swimming Pool office is to your right after you enter the swimming pool.</li>
          </p>
        </div>
      </div>

      <div className='aq-info'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>General Rules</h3>
        </div>
        <div className='content'>
          <ul className='facilityText'>
            <li>Swimming is prohibited without membership card.</li>
            <li>The membership card is not transferable. If this rule is violated, membership will stand cancelled.</li>
            <li>The member should make entry in the register and must keep cards in the glass board.</li>
            <li>During ladies slot no male member is permitted to swim, however female members are allowed to use the pool during general slots.</li>
            <li>Members are advised not to move around the pool deck and distract the life guards during pool hours.</li>
            <li>All the viewers should remain in gallery only.</li>
            <li>No member is permitted to use separate lane during the general slots.</li>
            <li>Student gymkhana/coach has right to use the any of the slot for students camp, inter hostel meet or any other activity that has been approved by sport committees.</li>
          </ul>
        </div>
      </div>

      <div className='aq-info'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Safety Rules</h3>
        </div>
        <div className='content'>
          <ul className='facilityText'>
            <li>Swimming is strictly prohibited in the absence of a life guard.</li>
            <li>Swimming or diving cannot be done alone.</li>
            <li>Beginners should remain at the shallow end of the pool and always wear a red cap. Beginners below 12 years should be accompanied by their parents.</li>
            <li>Diving can be done only in presence of coach or life guard and also while practicing diving make sure that the diving area is clear of swimmers.</li>
            <li>Drinking, smoking and eating in the pool or in the paved area around the pool is prohibited.</li>
            <li>Never push anyone into the pool as horse play is not permitted in the pool and never swim beyond your capacity.</li>
            <li>Photography in the pool premises is not allowed unless prior permission is obtained.</li>
            <li>Never swim with metallic object like ring, watch, neck chain etc.</li>
            <li>Don’t bring any valuables to the pool. Swimming club/gymkhana will not be responsible for loss of any belongings.</li>
            <li>Life guards are strictly prohibited to teach or train the members during general slots. Members are requested not to approach life guards to teach or train during pool hours as that may lead to accidents in the pool.</li>
            <li>If any member violates any of the above mentioned rules his/her membership will be cancelled.</li>
          </ul>
        </div>
      </div>

      <div className='aq-info'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Guest Rules</h3>
        </div>
        <div className='content'>
          <ul className='facilityText'>
            <li>Guest charges are Rs 20/- per dip. Only for Institute Staff.</li>
            <li>No guest will be permitted during the peak hours of the pool if there are 30 or more members in the pool.</li>
            <li>Guest cannot be a regular visitor to the pool.</li>
            <li>Only the primary member of the swimming pool is allowed to bring the guest. No dependent/school children are eligible to bring the guest.</li>
            <li>Guest will be allowed only once/twice in a week.</li>
            <li>Primary member has to fill the guest form each time available at the pool office and entry should be made in guest entry book as well as main entry book at the counter.</li>
            <li>It is compulsory that the guest should be accompanied by the primary member.</li>
          </ul>
        </div>
      </div>
      <div className='aq-info'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Hygiene Rules</h3>
        </div>
        <div className='content'>
          <ul className='facilityText'>
            <li>Swimming costume is mandatory for all users. Costumes must be non‑transparent and not white in colour.</li>
            <li>Anyone with long hair must wear a swimming cap; long hair should be tied securely before entering the pool.</li>
            <li>Persons with open cuts, wounds, eye infections or any communicable disease are not permitted to enter the pool.</li>
            <li>Anyone under the influence of alcohol, drugs or other intoxicants is prohibited from entering the pool premises.</li>
            <li>Please leave possessions and footwear in the cloak room; the club/gymkhana is not responsible for loss of personal belongings.</li>
            <li>All members must shower and rinse thoroughly before entering the pool. Use soap where necessary to remove oils from hair or skin.</li>
            <li>Use the scum gutter for spitting or blowing while inside the pool; maintain cleanliness and respect other users.</li>
          </ul>
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
            <p className='aq-name'>Ritesh Guchhait</p>
            <p className='info'>Coach, Sports Officer</p>
            <p className='info'></p>

          </div>
          <div className='contactCard' >
            <img alt="alt" src={user} className='contactImg' />
            <p className='aq-name'>Meet Vanja</p>
            <p className='info'>Institute Aquatics Secretary</p>
            <p className='info'>+91 93235 87701</p>
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