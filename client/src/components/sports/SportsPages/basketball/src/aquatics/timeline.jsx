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
                date='2022' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    {/* <h3 style={{color: '#E4E2FA'}}>Inter IIT Sports Meet</h3> */}
                    <h4 style={{color: '#fff'}}>
                    Inter-IIT 2022 Champions - Boys
                    </h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2023' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    {/* <h3 style={{color: '#E4E2FA'}}>Inter IIT Sports Meet</h3> */}
                    <h4 style={{color: '#E4E2FA'}}>
                    Inter-IIT 2023 Champions - Boys
                    <br/>Inter-IIT 2023 SIlver Medallists - Girls
                    </h4>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;