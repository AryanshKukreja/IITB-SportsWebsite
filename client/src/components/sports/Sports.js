import React from 'react';
import { Link } from 'react-router-dom';
import './Sports.css'; // Import the CSS file

function Sports() {
  const sportsList = [
    { name: 'Aquatics', image: '/images/aquatics.png', link: '/aquatics'},
    { name: 'Athletics', image: '/images/athletics.jpg', link: '/athletics'},
    { name: 'Badminton', image: '/images/badminton.png', link: '/badminton'},
    { name: 'Basketball', image: '/images/basketball.png', link: '/basketball'},
    { name: 'Board Games', image: '/images/boardgames.png', link: '/boardgames'},
    { name: 'Cricket', image: '/images/cricket.png', link: '/cricket' },
    { name: 'Football', image: '/images/football.png', link: '/football' },
    { name: 'Hockey', image: '/images/hockey.png', link: '/hockey'},
    { name: 'Indian Games', image: '/images/khokho.png', link: '/indiangames'},
    { name: 'Lawn Tennis', image: '/images/tennis.png', link: '/tennis' },
    { name: 'Squash', image: '/images/squash.png', link: '/squash'},
    { name: 'Table Tennis', image: '/images/tabletennis.png', link: '/tabletennis'},
    { name: 'Volleyball', image: '/images/volleyball.png', link: '/volleyball'},
    { name: 'Weightlifting', image: '/images/weightlifting.png', link: '/weightlifting'},
    // Add more sports as needed
    { name: 'Adventure Club', image: '/images/adventure.png', link: '/adventureclub'},
    { name: 'Dark Knight Chess Club',image: '/images/chess.png', link: '/chess'},
    { name: "Rubik's club",image: '/images/Rubiks.png',link: '/rubik'},
    { name: "Ultimate Frisbee Club", image: '/images/Frisbee.png', link:'/frisbee'},
    { name: "Yogastha", image: '/images/yoga.png',link:'/yoga'},
  ];

  return (
    <div className="sports-container">
      <h1 className='sports-heading'>Sports</h1>
      <p>Welcome to the Sports page! Here are some popular sports and clubs at IIT Bombay:</p>

      <div className="sports-list">
        {sportsList.map((sport, index) => (
          <React.Fragment key={index}>
            <Link to={sport.link} className="sport-item">
              <img src={process.env.PUBLIC_URL + sport.image} alt={sport.name} />
              <span>{sport.name}</span>
            </Link>
            {index === 13 && <p key="clubs-info" className="clubs-intro">Explore the sports clubs at IIT Bombay:</p>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sports;