import React from "react";
import "./council.css"
import councilLogo from "./pictures/Logos_for_Photos/IITB Sports Logo BW.png";
import Deepraj from "./pictures/Logos_for_Photos/Deepraj.jpg";
import Disha from "./pictures/Logos_for_Photos/Disha.jpg";
// import Viral from "./pictures/Logos_for_Photos/viral.jpg";
import adventure from './pictures/Logos_for_Photos/adventure.jpg';
// import athletics from './pictures/Logos_for_Photos/athletics.jpg'; 
import badminton from './pictures/Logos_for_Photos/badminton.png';
// import basketball from './pictures/Logos_for_Photos/basketball.jpg';
// import cricket from './pictures/Logos_for_Photos/cricket.jpg';
import chess from './pictures/Logos_for_Photos/chess.png';
// import football from './pictures/Logos_for_Photos/football.jpg';
// import hockey from './pictures/Logos_for_Photos/hockey.jpg';
// import indianGames from './pictures/Logos_for_Photos/indianGames.jpg';
import squash from './pictures/Logos_for_Photos/squash.png';
// import tabletennis from './pictures/Logos_for_Photos/tabletennis.png';
// import tennis from './pictures/Logos_for_Photos/tennis.jpg';
import volleyball from './pictures/Logos_for_Photos/volleyball.png';
// import weightlifting from './pictures/Logos_for_Photos/weightlifting.jpg';
import fitness from './pictures/Logos_for_Photos/fitness.png';
import frisbee from './pictures/Logos_for_Photos/frisbee.png';
// import aquatics from './pictures/Logos_for_Photos/aquatics.jpg';


/* import { MdCall } from 'react-icons/md'; */
import { FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";


const Council = () => {
    return (
        <>
            <div className="all_content">
                <h1 className="title">Institute Sports Council</h1>
                <h1 className="title">2026-2027</h1>
                <div className="leader">
                    <h2>General Secretary Sports Affairs</h2>
                    <img className="gen" alt="" src={Deepraj} />
                    <p className="name">Deepraj Kasherwal<br />
                    <center>  <b>Call: </b>9761543343</center>
                    <div className="social_links">
                        {/* <a href="tel:+919619000065"><MdCall size={24} color="#7ee7ff"/></a> */}
                        <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
                        <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                    </div>
                </p>
                </div>
                <div className="container">
                    </div>
                    {/* Heads BELOW */}
                    <h1 className="con-heads"><b>Heads</b></h1>
                    <div className="container">
                    <div className="info-block">
                        <h2>Institute Sports Technical Head</h2>
                        <img className="circular" src={Disha} alt="" />
                        <p className="name">
                            Disha Jain<br />
                            <b>Call: </b>9111891978
                            <div className="social_links">
                {/* <a href="tel:+919111891978"><MdCall size={24} color="#7ee7ff"/></a> */}
                <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
                <a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                            </div>
                        </p>
                    </div>
                    <div className="info-block">
                        <h2>Institute Sports Creatives Head</h2>
                        <img className="circular" src={councilLogo} alt="" />
                        <p className="name">
                            Viral Chhaperwal<br />
                            <b>Call: </b>9009051525
                            <div className="social_links">
                            {/* <a href="tel:+919009051525"><MdCall size={24} color="#7ee7ff"/></a> */}
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
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Prashil Vasoya<br />
                      <b>Call: </b>8866133501
                      <div className="social_links">
                  {/* <a href="tel:+918866133501"><MdCall size={24} color="#7ee7ff"/></a> */}
                  <a href="https://www.instagram.com/iitbombayathletics/"><FaInstagram size={24} color="#7ee7ff"/></a>
                  <a href="mailto:athletics@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                      </div>
                  </p>
              </div>
              <div className="info-block">
                  <div className="sport-number">2</div>
                  <h2>Institute Aquatics Secretary</h2>
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Ishanei Kumar<br />
                      <b>Call: </b>6266624331
                      <div className="social_links">
                  {/* <a href="tel:+916266624331"><MdCall size={24} color="#7ee7ff"/></a> */}
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
                      Radhika Bansal<br />
                          <b>Call: </b>9649570774
                      <div className="social_links">
                  {/* <a href="tel:+919649570774"><MdCall size={24} color="#7ee7ff"/></a> */}
                  <a href="https://www.instagram.com/badmintonclub_iitbombay/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
                  <a href="mailto:badminton@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                      </div>
                  </p>
              </div>
              <div className="info-block">
                  <div className="sport-number">4</div>
                  <h2>Institute Basketball Secretary</h2>
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Manikarnika Sharma<br />
                      <b>Call: </b>7878112350
                      <div className="social_links">
                  {/* <a href="tel:+917878112350"><MdCall size={24} color="#7ee7ff"/></a> */}
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
                      Varad<br />
                      <b>Call: </b>7722097837
                      <div className="social_links">
                      {/* <a href="tel:+917722097837"><MdCall size={24} color="#7ee7ff"/></a> */}
                      <a href="/\#"><FaInstagram size={24} color="#7ee7ff"/></a>
                      <a href="mailto:boardgames@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                      </div>
                  </p>
              </div>

              <div className="info-block">
                  <div className="sport-number">6</div>
                  <h2>Institute Cricket Secretary</h2>
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Param Shilu<br />
                      <b>Call: </b>8141229825
                      <div className="social_links">
                      {/* <a href="tel:+918141229825"><MdCall size={24} color="#7ee7ff"/></a> */}
                      <a href="https://www.instagram.com/cricket_club_iitb/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
                      <a href="mailto:cricket@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                  </div>
              </p>
          </div>

              <div className="info-block">
                  <div className="sport-number">7</div>
                  <h2>Institute Football Secretary</h2>
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Aditya Patil<br />
                      <b>Call: </b>7507990444
                      <div className="social_links">
                      {/* <a href="tel:+917507990444"><MdCall size={24} color="#7ee7ff"/></a> */}
                      <a href="https://www.instagram.com/iitb_football/"><FaInstagram size={24} color="#7ee7ff"/></a>
                      <a href="mailto:football@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                  </div>
              </p>
          </div>

              <div className="info-block">
                  <div className="sport-number">8</div>
                  <h2>Institute Hockey Secretary</h2>
                  <img className="circular" src={councilLogo} alt="" />
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
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Darshan Jain<br />
                      <b>Call: </b>9406213933
                      <div className="social_links">
                          {/* <a href="tel:+919406213933"><MdCall size={24} color="#7ee7ff"/></a> */}
                      <a href="https://www.instagram.com/indiangames_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                      <a href="mailto:indiangames@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                  </div>
              </p>
          </div>

              <div className="info-block">
                  <div className="sport-number">10</div>
                  <h2>Institute Lawn Tennis Secretary</h2>
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Manan Agrawal<br />
                      <b>Call: </b>9828378888
                      <div className="social_links">
                      {/* <a href="tel:+919828378888"><MdCall size={24} color="#7ee7ff"/></a> */}
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
                      Jay Motwani<br />
                      <b>Call: </b>7777903995
                      <div className="social_links">
                      {/* <a href="tel:+917777903995"><MdCall size={24} color="#7ee7ff"/></a> */}
                      <a href="https://www.instagram.com/tennis_club_iitb/"><FaInstagram size={24} color="#7ee7ff"/></a>
                      <a href="mailto:squash@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                  </div>
              </p>
          </div>

              <div className="info-block">
                  <div className="sport-number">12</div>
                  <h2>Institute Table Tennis Secretary</h2>
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Supan Shah<br />
                      <b>Call: </b>9653396151
                      <div className="social_links">
                      {/* <a href="tel:+919653396151"><MdCall size={24} color="#7ee7ff"/></a> */}
                      <a href="https://www.instagram.com/table.tennis_iitb/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
                      <a href="mailto:tabletennis@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                  </div>
              </p>
          </div>

              <div className="info-block">
                  <div className="sport-number">13</div>
                  <h2>Institute Volleyball Secretary</h2>
                  <img className="circular" src={volleyball} alt="" />
                  <p className="name">
                      Mitesh<br />
                      <b>Call: </b>8209945491
                      <div className="social_links">
                          {/* <a href="tel:+918209945491"><MdCall size={24} color="#7ee7ff"/></a> */}
                      <a href="https://www.instagram.com/volleyballclub_iitbombay/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
                      <a href="mailto:volleyball@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
                  </div>
              </p>
          </div>

              <div className="info-block">
                  <div className="sport-number">14</div>
                  <h2>Institute Weightlifting Secretary</h2>
                  <img className="circular" src={councilLogo} alt="" />
                  <p className="name">
                      Sayam<br />
                      <b>Call: </b>7742426328
                      <div className="social_links">
                          {/* <a href="tel:+917742426328"><MdCall size={24} color="#7ee7ff"/></a> */}
                      <a href="https://www.instagram.com/iitb_weightlifting/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
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
                              <a href="https://www.instagram.com/adventureclub_iitb/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
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
                              <a href="https://www.instagram.com/dkcc_iitb/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
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
                              <a href="https://www.instagram.com/fitness_club_iitb/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
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
                                  <a href="https://www.instagram.com/iitb_ultimate_frisbee/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
                                  <a href="/\#"><CiMail size={24} color="#7ee7ff"/></a>
                                <a href="/\#"><CiMail size={24} color="#7ee7ff"/></a>
                          </div>
                      </p>
                  </div>
                  <div className="info-block">
                          <h2>Yogastha Manager</h2>
                          <img className="circular" src={councilLogo} alt="" />
                          <p className="name">
                              <br />
                              <b>Call: </b>
                              <div className="social_links">
                                  {/* <a href="tel:+917887864446"><MdCall size={24} color="#7ee7ff"/></a> */}
                                  <a href="https://www.instagram.com/iitb_ultimate_frisbee/"><FaInstagram size={24}
  color="#7ee7ff"/></a>
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
