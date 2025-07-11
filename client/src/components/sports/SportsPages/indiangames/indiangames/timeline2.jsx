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
                date='2025' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Aavhan'25</h3>
                    <p style={{color: '#E4E2FA'}}>
                        Boys Kho-Kho:Gold
                        <br/>Girls Kho-Kho:Bronze
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{  color: '#E4E2FA'}}>Spardha'24</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <p style={{color: '#E4E2FA'}}>
                        Boys Kho-Kho: Silver 
                        <br/>Girls Kho-Kho: Silver 
                        <br/>Girls Kabaddi:Gold
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Aavhan'24</h3>
                    <p style={{color: '#E4E2FA'}}>
                        Boys Kho-Kho: Gold
                        <br/>Girls Kho-Kho: Gold
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;