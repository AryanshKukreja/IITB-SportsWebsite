import React, { useState } from 'react';
import './BlogsPage.css';

const BlogsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const monthlyEvents = [
    {
      id: 2,
      month: "September 2024",
      title: "Lakshya Sen Event",
      image: "https://drive.google.com/file/d/1gv23uTsDBd-QS8EaOUfsW43gJhvRJkU6/view?usp=sharing",
      description: "Lakshya Sen Electrifies IIT Bombay. The campus was buzzing this past August as we had the incredible opportunity to host one of India's finest badminton players, Lakshya Sen, for an electrifying session! The event delivered on its promise of speed, precision, and power. Students, faculty, and badminton enthusiasts packed the Indoor Badminton Court to watch a master in action. Attendees were treated to a live demonstration of world-class skill, offering an up-close look at the dedication and technique required to compete at the elite level. The session was hugely inspiring, providing a tangible example of athletic excellence for the entire community. Special thanks to Red Bull for being on hand to fuel the energy of the day. Experiences like this reinforce the connection between our campus athletes and the very best in the sporting world. It was truly a privilege to witness greatness on our own court!",
      highlights: ["World-Class Demo", "500+ Attendees", "Red Bull Sponsored"],
    },
    {
      id: 3,
      month: "August 2024",
      title: "UG Sports Orientation",
      image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80",
      description: "UG Sports Orientation - The wait is finally over, and the new undergraduate batch has officially been welcomed to the vibrant world of sports at IIT Bombay! The UG Sports Orientation was a massive success, fully introducing the incoming students to the exciting athletic culture that defines the institute. The event successfully instilled the spirit of the Bombay BlackCats, inspiring the fresh faces to aim high and prepare to represent the institute. The energy was high, complete with fun activities and surprises that helped break the ice and foster early connections. We extend a huge welcome to all new students and look forward to seeing them contribute to the legacy of IIT Bombay Sports!",
      highlights: ["New UG Batch", "BlackCats Spirit", "Fun Activities"],
    },
    {
      id: 4,
      month: "July 2024",
      title: "PG Mania 2025",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
      description: "PG Mania 2025: A Fierce Showdown of Skill and Spirit. The competitive spirit of IIT Bombay's postgraduate community was on full display as PG Mania 2025 wrapped up its successful run! IIT Bombay Sports delivered a truly power-packed series of weekend showdowns exclusively for PG students. The tournament was a massive success, achieving its goal to help students compete, connect, and conquer across a wide range of exciting sports events. The matches were characterized by fierce competition, with participants bringing their absolute best game to the courts and fields. Whether registering as a dynamic duo, a full team, or an individual, every participant contributed to the high-energy atmosphere. PG Mania 2025 proved to be the ultimate test of skill and teamwork for our postgraduates, reminding everyone that while academic excellence is central, the competitive fire of sports burns brightly within the PG community. Congratulations to all the champions and participants for making this tournament unforgettable!",
      highlights: ["PG Exclusive Tournament", "Weekend Showdowns", "Skill & Teamwork"],
    },
    {
      id: 5,
      month: "June 2024",
      title: "Council Farewell",
      image: "https://drive.google.com/file/d/1twotfmVllNxWtcDYXjA16BonTkSyOvX7/view?usp=sharing",
      description: "Bidding Farewell to Our Outgoing Sports Council. Some chapters come to an end, not with fanfare, but with quiet pride and deep gratitude. It is with this sentiment that the Institute Sports Council offers a heartfelt appreciation to our outgoing council. This dedicated group's perseverance, quiet commitment, and unwavering dedication have been the true backbone of sporting excellence at IIT Bombay over the past year. Their impact extended far beyond the visible action on the field. They stood behind every victory, every grueling effort, and every successful initiative by operating meticulously behind the scenes. They were responsible for the smooth flow of events, providing essential support to our athletes, and diligently upholding the strong legacy of IIT Bombay sports. As their tenure comes to a close, we don't just say goodbye, we say a profound thank you for the values you upheld, the heavy responsibilities you carried, and the exceptional standard of commitment you've set for your successors. We wish you all the very best in every future endeavor. May the team spirit and resilience you showed here serve you well in all that lies ahead. With warmth and respect, Institute Sports Council, IIT Bombay",
      highlights: ["Gratitude", "Legacy", "New Beginnings"],
    },
    {
      id: 6,
      month: "May 2024",
      title: "Inter-IIT 2024 Felicitation",
      image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&q=80",
      description: "Inter-IIT 2024 Felicitation Ceremony. From the fields of Kanpur and Indore to the stage back home, every cheer, every medal, and every effort was passionately celebrated! The Inter-IIT 2024 Felicitation Ceremony was a powerful and moving tribute to the spirit, struggle, and monumental success of the IIT Bombay contingent. After years of relentless hard work, our student-athletes officially brought home the coveted overall trophy, ending a seven-year wait and cementing their place in Institute history. The evening was filled with applause, pride, and unforgettable memories. As our victorious contingent and their coaches were honored, the atmosphere crackled with the energy of collective achievement. Here's a glimpse into the moment we celebrated the true heart of IIT Bombay Sports. To every athlete, coach, and support staff who contributed to this historic win, thank you for making history and setting a new benchmark for the Bombay BlackCats!",
      highlights: ["Overall Trophy Win", "7-Year Wait Ended", "Historic Achievement"],
    }
  ];

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <div className="blogs-hero">
        <div className="blogs-hero-overlay"></div>
        <div className="blogs-hero-content">
          <h1 className="blogs-hero-title">
            <span className="hero-text-animate">EVENT</span>
            <span className="hero-text-animate delay-1">HIGHLIGHTS</span>
          </h1>
          <p className="blogs-hero-subtitle">Celebrating Sports Excellence Month by Month</p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="blogs-container">
        <div className="blogs-intro">
          <h2>Our Journey Through Sports</h2>
          <p>Explore the remarkable events organized by the Sports Council throughout the year</p>
        </div>

        <div className="events-timeline">
          {monthlyEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`event-card ${selectedMonth === event.id ? 'expanded' : ''}`}
              onClick={() => setSelectedMonth(selectedMonth === event.id ? null : event.id)}
            >
              <div className="event-card-inner">
                <div className="event-image-container">
                  <img src={event.image} alt={event.title} className="event-image" />
                  <div className="event-overlay">
                    <span className="event-date">{event.date}</span>
                  </div>
                </div>
                
                <div className="event-content">
                  <div className="event-header">
                    <span className="event-month">{event.month}</span>
                    <h3 className="event-title">{event.title}</h3>
                  </div>
                  
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-highlights">
                    {event.highlights.map((highlight, idx) => (
                      <span key={idx} className="highlight-badge">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  <button className="read-more-btn">
                    {selectedMonth === event.id ? 'Show Less' : 'Read More'}
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="blogs-cta">
        <div className="cta-content">
          <h2>Stay Updated</h2>
          <p>Follow us for more exciting sports events and updates</p>
          <div className="cta-slogan">WHERE CHAMPIONS ARE MADE</div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;