import React from 'react';
// import gymk from './assets/gymkhana.jpg';
// import './page.css';
// import court from './assets/court.jpg'
// import appvid from './assets/appvid.mp4'
// import bcat from '../assets/blackcats.png';
import blackcat from './assets/bcatlogo.png'
import transparentSportsLogo from './assets/sports-logo-transparent.png';
import sportsApp1 from './assets/App-animation/sports_app_1.png';
import sportsApp2 from './assets/App-animation/sports_app_2.png';
import sportsApp3 from './assets/App-animation/sports_app_3.png';
import sportsApp4 from './assets/App-animation/sports_app_4.png';
import sportsApp5 from './assets/App-animation/sports_app_5.png';
// import { BsApp } from 'react-icons/bs';
import './HomePage.css';

export const HomePage = () => {
    return (
        <div className='content-page'>
            {/* Blurred Background with Text */}
            <div className="bg-container">
                <div className="bg-image"></div>
                <div className="bg-text">
                    <h3 className="wl1">Welcome to</h3>
                    <h1 className="wl2">
                        <span className="iitb-text">IIT Bombay</span>
                        <span className="sports-text">Sports</span>
                    </h1>
                </div>
            </div>

            <div className='about'>
                <img src={transparentSportsLogo} className='aboutimg aboutusimg' alt='abim'/>
                <div>
                    <div className='aboutus'>
                        <center>
                        <h4>About Us</h4>
                        </center>   
                    </div>
                    <div className='aboutText'>
                        <br />
                        <p className='about-text-para'>IIT Bombay boasts a vibrant sports scene that keeps students active throughout the year. The institute's calendar is packed with exciting events, ranging from the inter-hostel General Championships to the prestigious Inter-IIT competitions. 
                           To nurture this competitive spirit and provide students with the opportunity to pursue their athletic passions, IIT Bombay offers state-of-the-art sports facilities. From basketball and volleyball courts to a swimming pool, football ground, and cricket ground, the
                           institute caters to a wide range of sporting interests. This commitment extends beyond facilities, with students and faculty alike demonstrating a dedication to honing their skills and fostering strong bonds through sportsmanship.</p>
                        <h4 className='slogan'>Until.&nbsp;&nbsp;&nbsp;&nbsp;Victory.&nbsp;&nbsp;&nbsp;&nbsp; Always.</h4>
                    </div>
                </div>
            </div>


            <div className='blackCats'>
                <div>
                    <div className='aboutus' id="blacat">
                        <center>
                        <h4> Bombay BlackCats</h4> 
                        </center>
                       
                    </div>
                    <div className='aboutText' >
                        <br />
                        The BlackCats, IIT Bombay's Inter-IIT contingent, is a testament to the institute's unwavering dedication to athletic excellence.
                        Since 1961, the Inter-IIT Sports Meet has served as India's premier inter-collegiate sporting battleground, drawing over 3500 athletes from all IITs. 
                        The BlackCats are a force driven by an unparalleled passion for their sports.  It burns brightly in the countless hours spent honing their skills, and the unwavering commitment to supporting their teammates. 
                        The BlackCats are a living embodiment of IIT Bombay's vibrant sports culture, where dedication, expert coaching, passion, and teamwork become the cornerstones of athletic achievement.
                    </div>
                </div>
                <img src={blackcat} className='aboutimg' id="catimg" alt='blackcats'/>
            </div>


            <div className='sportApp'>
                <div className='appImages' id='sportsAppUI'>
                    <img src={sportsApp1} className='sportsimage fade-img' alt='sports app 1' />
                    <img src={sportsApp2} className='sportsimage fade-img' alt='sports app 2' />
                    <img src={sportsApp3} className='sportsimage fade-img' alt='sports app 3' />
                    <img src={sportsApp4} className='sportsimage fade-img' alt='sports app 4' />
                    <img src={sportsApp5} className='sportsimage fade-img' alt='sports app 5' />
                </div>
                <div className='sportApp-content'>
                    <div
                        className="aboutus"
                        id="sportsapp"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0 auto',
                            width: 'fit-content',
                        }}
                        >
                        <h4>Sports App</h4>
                    </div>


                    <div className='apptext'>
                        <br />
                        (Android + iOS)<br /><br />
                        <p>Experience the future of sports management at IIT Bombay with our comprehensive mobile application. The app seamlessly integrates event registration for all sports competitions, automated e-certificate generation for participants and winners, and real-time court booking system for all facilities including basketball, volleyball, badminton, and many more. 
                            Stay updated with live GC scores, tournament brackets, and match schedules. Access detailed player profiles and achievements.
                        </p>
                        <div className='app-slogan'>
                        Launching Soon...
                        </div>
                    </div>
                </div>
            </div>
    </div>

    );
};

export default HomePage;