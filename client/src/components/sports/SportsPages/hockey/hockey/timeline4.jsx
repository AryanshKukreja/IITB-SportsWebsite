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
                icon={<GiMedal />}
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Inter IIT </h3>
                    <p style={{color: '#E4E2FA'}}>
                        Boys Team:Silver
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2023' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Inter IIT </h3>
                    <p style={{color: '#E4E2FA'}}>
                        Boys Team:Silver
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2022' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{  color: '#E4E2FA'}}>Inter IIT</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <p style={{color: '#E4E2FA'}}>
                        Boys Team:Bronze
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;