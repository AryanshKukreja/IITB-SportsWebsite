import React from 'react';
import { Link } from 'react-router-dom';
import './Sports.css'; // Import the CSS file

function Sports() {
  const sportsList = [
    { name: 'Aquatics', image: '/images/aquatics.jpg', link: '/sports/aquatics'},
    { name: 'Athletics', image: '/images/athletics.jpg', link: '/sports/athletics'},
    { name: 'Badminton', image: '/images/badminton.jpg', link: '/sports/badminton'},
    { name: 'Basketball', image: '/images/basketball.jpg', link: '/sports/basketball'},
    { name: 'Board Games', image: '/images/boardgames.jpg', link: '/sports/boardgames'},
    { name: 'Cricket', image: '/images/cricket.jpg', link: '/sports/cricket' },
    { name: 'Football', image: '/images/football.jpg', link: '/sports/football' },
    { name: 'Hockey', image: '/images/hockey.jpg', link: '/sports/hockey'},
    { name: 'Indian Games', image: '/images/khokho.jpg', link: '/sports/hockey'},
    { name: 'Lawn Tennis', image: '/images/tennis.jpg', link: '/sports/tennis' },
    { name: 'Squash', image: '/images/squash.jpg', link: '/sports/squash'},
    { name: 'Table Tennis', image: '/images/tabletennis.jpg', link: '/sports/tabletennis'},
    { name: 'Volleyball', image: '/images/volleyball.jpg', link: '/sports/volleyball'},
    { name: 'Weightlifting', image: '/images/weightlifting.jpg', link: '/sports/weightlifting'},
    // Add more sports as needed
    { name: 'Adventure Club', image: '/images/adventure.jpg', link: '/sports/adventureclub'},
    { name: 'Dark Knight Chess Club',image: '/images/chess.jpg', link: '/sports/chess'},
    { name: "Rubik's club",image: '/images/Rubiks.jpg',link: '/sports/rubik'},
    { name: "Ultimate Frisbee Club", image: '/images/Frisbee.jpg', link:'/sports/frisbee'},
    { name: "Yogastha", image: '/images/yoga.jpg',link:'/sports/yoga'},
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
