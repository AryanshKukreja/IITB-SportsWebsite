import React from "react";
import './council.css'
import Disha from "./pictures/Logos_for_Photos/Disha.jpg";
import { FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Webteam = () => {
    return (
        <>
        <div className="all_content">
        <h1 className="title">Web Team</h1>
    <h1 className="title">2025-2026</h1>
    <div className="leader">
        <h2>Technical Head</h2>
    <img className="gen" alt="" src={Disha}/>
        <p className="name"><center>Disha Jain</center>
    <center><b>Call: </b>9111891978</center>
    <div className="social_links">
    <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
<a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
    </div>
    </p>
    </div>
<div className="container">
    </div>
{/* Conveners BELOW */}
<h1 className="con-heads"><b>Conveners</b></h1>
    <div className="container">
    <div className="info-block">
    <h2>Web Convener</h2>
<p className="name">
    Shivam Vishwekar<br />
    <div className="social_links">
    <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
<a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
    </div>
    </p>
    </div>
<div className="info-block">
    <h2>Web Convener</h2>
<p className="name">
    Chirag Borkar<br />
    <div className="social_links">
    <a href="https://www.instagram.com/iitbombaysports/"><FaInstagram size={24} color="#7ee7ff"/></a>
<a href="mailto:gsecsports@iitb.ac.in"><CiMail size={24} color="#7ee7ff"/></a>
    </div>
    </p>
    </div>
    </div>
    </div>
    </>
);
};

export default Webteam;
