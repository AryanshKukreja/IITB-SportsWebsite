import React from "react";
import { Link } from "react-router-dom";
import ContactMe from "./contactform";
import './page.css';
import { MdEmail, MdCall } from "react-icons/md";

const ContactUs = () => {
    return(
        <div className="block">
        {/* <h2 className="insti">Student Affairs Council(SAC)</h2>
        <p>
            <span className="mail"><img src=".svg" width='30px' alt='img'/>sac email id</span>  
        </p> */}
        {/* <p>
            <span className="tele"><img src='./pictures/phone.svg' width='25px'alt='img' />9048979758</span> 
            <button><Link to="/sports/SAC">Click to know more..</Link></button>
        </p> */}
        <h2 className="insti ISC">Institute Sports Council</h2>
        <p>
            <span className="mail"><MdEmail size={30} color="rgb(126, 255, 188)"/>gsecsports@iitb.ac.in</span>  
        </p>
        <p>
            <span className="tele"><MdCall size={25} color="rgb(126, 255, 188)"/>+91 96190 00065</span> 
            </p>
            <p>
            <button class="btn"><Link to="/sports/Council">Click to know more..</Link></button>
        </p>
        <h2 className="insti WEB">Web Team</h2>
        <p>
            <span className="mail"><MdEmail size={30} color="rgb(126, 255, 188)"/>aryansh.techhead@gmail.com</span>  
        </p>
        <p>
            <span className="tele"><MdCall size={25} color="rgb(126, 255, 188)"/>+91 99928 88093</span> 
            </p>
            <p>
            <button class="btn"><Link to="/sports/Webteam">Click to know more..</Link></button>
        </p>
        </div>
    );
};

export default ContactUs;