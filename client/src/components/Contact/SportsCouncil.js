import React from "react";
import "./council.css"
import councilLogo from "./pictures/Logos_for_Photos/sports-logo-transparent.png";
import adventure from './pictures/Logos_for_Photos/adventure.jpg';
import athletics from './pictures/Logos_for_Photos/Athletics.png';
import aquatics from './pictures/Logos_for_Photos/Aquatics logo.png';
import badminton from './pictures/Logos_for_Photos/badminton.png';
import basketball from './pictures/Logos_for_Photos/basketball.png';
import cricket from './pictures/Logos_for_Photos/cricket.png';
import chess from './pictures/Logos_for_Photos/chess.png';
import football from './pictures/Logos_for_Photos/football.png';
import hockey from './pictures/Logos_for_Photos/hockey.png';
import indianGames from './pictures/Logos_for_Photos/indiangames.png';
import squash from './pictures/Logos_for_Photos/squash.png';
import tabletennis from './pictures/Logos_for_Photos/tabletennis.png';
import tennis from './pictures/Logos_for_Photos/tennis.png';
import volleyball from './pictures/Logos_for_Photos/volleyball.png';
import weightlifting from './pictures/Logos_for_Photos/weightlifting.png';
import fitness from './pictures/Logos_for_Photos/fitness.png';
import frisbee from './pictures/Logos_for_Photos/frisbee.png';
/* import { MdCall } from 'react-icons/md'; */
import { FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";


const Council = () => {
    return (
        <>
            <div className="all_content">
                <h1 className="title">Institute Sports Council</h1>
                <h1 className="title">2025-2026</h1>
                <div className="leader">
                    <h2>General Secretary Sports Affairs</h2>
                    <img className="gen" alt="" src={councilLogo} />
                    <p className="name">Rajwardhan Toraskar<br />
                    <b>Call: </b>9619000065
                    <div className="social_links">
                        {/* <a href="tel:+919619000065"><MdCall size={24} color="#7ee7ff"/></a> */}
                        <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
                        <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                    </div>
                </p>
                </div>
                <div className="container">
                    {/* Nominees FIRST */}
                    <div className="info-block">
                        <h2 style={{fontSize: "1.3rem"}} className="enc">Institute Sports Nominee-Events & Clubs</h2>
                        <img className="circular" src={councilLogo} alt="" />
                        <p className="name">
                            Atharva Naik<br />
                            <b>Call: </b>9920072252
                            <div className="social_links">
            {/* <a href="tel:+919920072252"><MdCall size={24} color="#7ee7ff"/></a> */}
            <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
            <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                            </div>
                        </p>
                    </div>
                    <div className="info-block">
                        <h2>Institute Sports Girls Nominee</h2>
                        <img className="circular" src={councilLogo} alt="" />
                        <p className="name">
                            Akshara Naik<br />
                            <b>Call: </b>9323587701
                            <div className="social_links">
                {/* <a href="tel:+919949970383"><MdCall size={24} color="#7ee7ff"/></a> */}
                <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
                <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                            </div>
                        </p>
                    </div>
                    <div className="info-block">
                        <h2>Institute Sports Admin Nominee</h2>
                        <img className="circular" src={councilLogo} alt="" />
                        <p className="name">
                            Raghav Agrawal<br />
                            <b>Call: </b>7223056784
                            <div className="social_links">
                {/* <a href="tel:+917223056784"><MdCall size={24} color="#7ee7ff"/></a> */}
                <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
                <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                            </div>
                        </p>
                    </div>
                    </div>
                    {/* Heads BELOW */}
                    <h1 className="con-heads"><b>Heads</b></h1>
                    <div className="container">
                    <div className="info-block">
                        <h2>Institute Sports Technical Head</h2>
                        <img className="circular" src={councilLogo} alt="" />
                        <p className="name">
                            Aryansh Kukreja<br />
                            <b>Call: </b>9992888093
                            <div className="social_links">
                {/* <a href="tel:+919992888093"><MdCall size={24} color="#7ee7ff"/></a> */}
                <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
                <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                            </div>
                        </p>
                    </div>
                    <div className="info-block">
                        <h2>Institute Sports Creatives Head</h2>
                        <img className="circular" src={councilLogo} alt="" />
                        <p className="name">
                            Akanksha Patel<br />
                            <b>Call: </b>9323587701
                            <div className="social_links">
                            {/* <a href="tel:+919727215454"><MdCall size={24} color="#7ee7ff"/></a> */}
                            <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
                            <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                            </div>
                        </p>
                    </div>
                    <div className="info-block">
                        <h2>Institute Sports Media Head</h2>
                        <img className="circular" src={councilLogo} alt="" />
                        <p className="name">
                            Yaman Singh<br />
                            <b>Call: </b>9855221266
                            <div className="social_links">
                            {/* <a href="tel:+918955221266"><MdCall size={24} color="#7ee7ff"/></a> */}
                            <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
                            <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                            </div>
                        </p>
                    </div>
                </div>
                <h1 className="con-secys"><b>Secretaries</b></h1>
                <div className="container secy">
            <div className="info-block">
                <div className="sport-number">1</div>
                <h2>Institute Athletics Secretary</h2>
                <img className="circular" src={athletics} alt="" />
                <p className="name">
                    Praveen Kumar<br />
                    <b>Call: </b>9323587701
                    <div className="social_links">
                {/* <a href="tel:+918958434190"><MdCall size={24} color="#7ee7ff"/></a> */}
                <a href="https://www.instagram.com/iitbombayathletics/"><FaInstagram size={24} color="#7ee7ff"/></a>
                <a href="mailto:athletics@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                    </div>
                </p>
            </div>
            <div className="info-block">
                <div className="sport-number">2</div>
                <h2>Institute Aquatics Secretary</h2>
                <img className="circular" src={aquatics} alt="" />
                <p className="name">
                    Meet Vanja<br />
                    <b>Call: </b>9323587701
                    <div className="social_links">
                {/* <a href="tel:+919323587701"><MdCall size={24} color="#7ee7ff"/></a> */}
                <a href="https://www.instagram.com/aquatics_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                <a href="mailto:aquatics@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                    </div>
                </p>
            </div>
            
            <div className="info-block">
                <div className="sport-number">3</div>
                <h2>Institute Badminton Secretary</h2>
                <img className="circular" src={badminton} alt="" />
                <p className="name">
                    J Sai Charan<br />
                        <b>Call: </b>7358179779
                    <div className="social_links">
                {/* <a href="tel:+917358179779"><MdCall size={24} color="#7ee7ff"/></a> */}
                <a href="https://www.instagram.com/badmintonclub_iitbombay/"><FaInstagram size={24} color="#7ee7ff"/></a>
                <a href="mailto:badminton@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                    </div>
                </p>
            </div>
            <div className="info-block">
                <div className="sport-number">4</div>
                <h2>Institute Basketball Secretary</h2>
                <img className="circular" src={basketball} alt="" />
                <p className="name">
                    Deepraj<br />
                    <b>Call: </b>9761543343
                    <div className="social_links">
                {/* <a href="tel:+919761543343"><MdCall size={24} color="#7ee7ff"/></a> */}
                <a href="https://www.instagram.com/basketball_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                <a href="mailto:basketball@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                    </div>
                </p>
            </div>
            
            <div className="info-block">
                <div className="sport-number">5</div>
                <h2>Institute Board Games Secretary</h2>
                <img className="circular" src={chess} alt="" />
                <p className="name">
                    Akshat Karkar<br />
                    <b>Call: </b>9321609259
                    <div className="social_links">
                    {/* <a href="tel:+919321609259"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="/\#"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:boardgames@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                    </div>
                </p>
            </div>
            
            <div className="info-block">
                <div className="sport-number">6</div>
                <h2>Institute Cricket Secretary</h2>
                <img className="circular" src={cricket} alt="" />
                <p className="name">
                    Pradyumna Gugulothu<br />
                    <b>Call: </b>7013954490
                    <div className="social_links">
                    {/* <a href="tel:+917013954490"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="https://www.instagram.com/cricket_club_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:cricket@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>
            
            <div className="info-block">
                <div className="sport-number">7</div>
                <h2>Institute Football Secretary</h2>
                <img className="circular" src={football} alt="" />
                <p className="name">
                    Yash Shah<br />
                    <b>Call: </b>8854683170
                    <div className="social_links">
                    {/* <a href="tel:+918849468317"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="https://www.instagram.com/iitb_football/"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:football@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>
            
            <div className="info-block">
                <div className="sport-number">8</div>
                <h2>Institute Hockey Secretary</h2>
                <img className="circular" src={hockey} alt="" />
                <p className="name">
                    Khushal<br />
                    <b>Call: </b>9001401665
                    <div className="social_links">
                    {/* <a href="tel:+919001401665"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="https://www.instagram.com/iitbombay_hockey/"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:hockey@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>
            
            <div className="info-block">
                <div className="sport-number">9</div>
                <h2>Institute Indian Games Secretary</h2>
                <img className="circular" src={indianGames} alt="" />
                <p className="name">
                    Kanak Tembhare<br />
                    <b>Call: </b>9322311654
                    <div className="social_links">
                        {/* <a href="tel:+919322311654"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="https://www.instagram.com/indiangames_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:indiangames@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>

            <div className="info-block">
                <div className="sport-number">10</div>
                <h2>Institute Lawn Tennis Secretary</h2>
                <img className="circular" src={tennis} alt="" />
                <p className="name">
                    Nehal Gupta<br />
                    <b>Call: </b>8291025201
                    <div className="social_links">
                    {/* <a href="tel:+918291025201"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="/\#"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:lawntennis@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>
            
            <div className="info-block">
                <div className="sport-number">11</div>
                <h2>Institute Squash Secretary</h2>
                <img className="circular" src={squash} alt="" />
                <p className="name">
                    Manthan Goyal<br />
                    <b>Call: </b>9826022623
                    <div className="social_links">
                    {/* <a href="tel:+919826022623"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="https://www.instagram.com/tennis_club_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:squash@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>
            
            <div className="info-block">
                <div className="sport-number">12</div>
                <h2>Institute Table Tennis Secretary</h2>
                <img className="circular" src={tabletennis} alt="" />
                <p className="name">
                    Sameer Chopra<br />
                    <b>Call: </b>9717777763
                    <div className="social_links">
                    {/* <a href="tel:+919717777763"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="https://www.instagram.com/table.tennis_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:tabletennis@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>
            
            <div className="info-block">
                <div className="sport-number">13</div>
                <h2>Institute Volleyball Secretary</h2>
                <img className="circular" src={volleyball} alt="" />
                <p className="name">
                    Ghanshyam Choudhary<br />
                    <b>Call: </b>8949401659
                    <div className="social_links">
                        {/* <a href="tel:+918949401659"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="https://www.instagram.com/volleyballclub_iitbombay/"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:volleyball@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>

            <div className="info-block">
                <div className="sport-number">14</div>
                <h2>Institute Weightlifting Secretary</h2>
                <img className="circular" src={weightlifting} alt="" />
                <p className="name">
                    Prateek Behera<br />
                    <b>Call: </b>6297957507
                    <div className="social_links">
                        {/* <a href="tel:+916297957507"><MdCall size={24} color="#7ee7ff"/></a> */}
                    <a href="https://www.instagram.com/iitb_weightlifting/"><FaInstagram size={24} color="#7ee7ff"/></a>
                    <a href="mailto:weightlifting@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                </div>
            </p>
        </div>
    </div>
                {/* Managers Section */}
                <h1 className="con-managers"><b>Managers</b></h1>
                <div className="container">
                    <div className="info-block">
                        <h2>Adventure Club Manager</h2>
                        <img className="circular" src={adventure} alt="" />
                        <p className="name">
                            Mohit Yadav<br />
                            <b>Call: </b>8233470289
                            <div className="social_links">
                                {/* <a href="tel:+918233470289"><MdCall size={24} color="#7ee7ff"/></a> */}
                            <a href="https://www.instagram.com/adventureclub_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                            <a href="/\#"><CiMail size={24} color="#7ee7ff"/></a>
                        </div>
                    </p>
                </div>
                <div className="info-block">
                    <h2>DKCC Manager</h2>
                    <img className="circular" src={chess} alt="" />
                    <p className="name">
                        Shreyas Jogdande<br />
                        <b>Call: </b>8657414616
                        <div className="social_links">

                            {/* <a href="tel:+918657414616"><MdCall size={24} color="#7ee7ff"/></a> */}
                            <a href="https://www.instagram.com/dkcc_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                            <a href="/\#"><CiMail size={24} color="#7ee7ff"/></a>
                        </div>
                    </p>
                </div>
                <div className="info-block">
                    <h2>Fitness Club Manager</h2>
                    <img className="circular" src={fitness} alt="" />
                    <p className="name">
                        Piyush Tailor<br />
                        <b>Call: </b>9479591296
                        <div className="social_links">
                            {/* <a href="tel:+919479591296"><MdCall size={24} color="#7ee7ff"/></a> */}
                            <a href="https://www.instagram.com/fitness_club_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                            <a href="/\#"><CiMail size={24} color="#7ee7ff"/></a>
                        </div>
                    </p>
                </div>
                <div className="info-block">
                        <h2>Frisbee Manager</h2>
                        <img className="circular" src={frisbee} alt="" />
                        <p className="name">
                            Shaashvat Shekhar<br />
                            <b>Call: </b>7887864446
                            <div className="social_links">
                                {/* <a href="tel:+917887864446"><MdCall size={24} color="#7ee7ff"/></a> */}
                                <a href="https://www.instagram.com/iitb_ultimate_frisbee/"><FaInstagram size={24} color="#7ee7ff"/></a>
                                <a href="/\#"><CiMail size={24} color="#7ee7ff"/></a>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Council;