import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { GiTrophyCup, GiMedal} from "react-icons/gi";

// background='#2F2B77'
// #DDFF00

const Timel = () => {
    return(
        <div className="experience">
            <VerticalTimeline lineColor="#ccc" >
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2025' contentStyle={{ background: '#2F2B77', color: '#fff' }}
                style={{ boxShadow: '0' }}>
                    <h3>National & International Recognition</h3>
                    <p style={{color: '#E4E2FA'}}>
                        Selected for the final round of the Yoga for Life: Lifestyle for Environment Conference 2025 in Tbilisi, Georgia—representing IIT Bombay on a global platform

                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2018' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{ fontSize:'25px'}}> Successful conductance of Regular Practice sessions (Since 2018)</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                    </table>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2025' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Yoga Protocol Instructors, by Ministry of AYUSH</h3>
                    <p style={{color: '#E4E2FA'}}>
                       Shubham Giri, Jitendra Sharma, Deepika Meena, Vamsi Triveni, Nainsi Gupta, Nidhi Verma
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;