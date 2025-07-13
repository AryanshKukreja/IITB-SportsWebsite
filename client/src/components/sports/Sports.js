import React from 'react';
import { Link } from 'react-router-dom';
import './Sports.css'; // Import the CSS file


function Sports() {
  const sportsList = [
    { name: 'Aquatics', image: '/images/aquatics.png', link: '/sports/aquatics'},
    { name: 'Athletics', image: '/images/athletics.jpg', link: '/sports/athletics'},
    { name: 'Badminton', image: '/images/badminton.png', link: '/sports/badminton'},
    { name: 'Basketball', image: '/images/basketball.png', link: '/sports/basketball'},
    { name: 'Board Games', image: '/images/boardgames.png', link: '/sports/boardgames'},
    { name: 'Cricket', image: '/images/cricket.png', link: '/sports/cricket' },
    { name: 'Football', image: '/images/football.png', link: '/sports/football' },
    { name: 'Hockey', image: '/images/hockey.png', link: '/sports/hockey'},
    { name: 'Indian Games', image: '/images/khokho.png', link: '/sports/indiangames'},
    { name: 'Lawn Tennis', image: '/images/tennis.png', link: '/sports/tennis' },
    { name: 'Squash', image: '/images/squash.png', link: '/sports/squash'},
    { name: 'Table Tennis', image: '/images/tabletennis.png', link: '/sports/tabletennis'},
    { name: 'Volleyball', image: '/images/volleyball.png', link: '/sports/volleyball'},
    { name: 'Weightlifting', image: '/images/weightlifting.png', link: '/sports/weightlifting'},
    // Add more sports as needed
    { name: 'Adventure Club', image: '/images/adventure.png', link: '/sports/adventureclub'},
    { name: 'Dark Knight Chess Club',image: '/images/chess.png', link: '/sports/chess'},
    { name: "Rubik's club",image: '/images/Rubiks.png',link: '/sports/rubik'},
    { name: "Ultimate Frisbee Club", image: '/images/Frisbee.png', link:'/sports/frisbee'},
    { name: "Yogastha", image: '/images/yoga.png',link:'/sports/yoga'},
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
