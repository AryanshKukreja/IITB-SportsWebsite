import React from "react";
import './council.css'

const Webteam = () =>{
    return(
        <>
        <div className="all_content">
        <h1>Web Team</h1>
        <h1>2025-2026</h1>
        <div className="leader">
        <h2>Technical Head</h2>
        <img className="gen"alt="" src="./pictures/kalpesh.jpg" />
        <p className="name">Aryansh Kukreja<br/>
        <a href="/#"><img className="seclogos"alt="" src="./instagram.png"></img></a>
        <a href="/#"><img className="sec_mail_logos"alt="" src="./mail.png"></img></a>
        </p>
        </div>
        <div class="container">
        <div class="info-block">
            <h2>Web Convener</h2>
            <img className="circular" src="./photo.png" alt="" />
            <p className="name">
                Disha Jain<br/>
                <a href="/#"><img className="logos" src="./instagram.png" alt="Instagram" /></a>
                <a href="/#"><img className="mail_logos" src="./mail.png" alt="Mail" /></a>
            </p>
        </div>
        <div class="info-block">
            <h2>Web Convener</h2>
            <img className="circular" src="./photo.png" alt="" />
            <p className="name">
                Shubh Sareen<br />
                <a href="/#"><img className="logos" src="./instagram.png" alt="Instagram" /></a>
                <a href="/#"><img className="mail_logos" src="./mail.png" alt="Mail" /></a>
            </p>
        </div>
        </div>
        </div>
        </>
    );
};

export default  Webteam;