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
                date='2019' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    {/* <h3 style={{color: '#E4E2FA'}}>Inter IIT Sports Meet</h3> */}
                    <h4 style={{color: '#fff'}}>
                    2019 Inter IIT - Bronze (Led by Dhruv Jain)
                    </h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2022' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    {/* <h3 style={{color: '#E4E2FA'}}>Inter IIT Sports Meet</h3> */}
                    <h4 style={{color: '#fff'}}>
                    2022 Inter IIT - Gold (Led by Atharva Tayade)
                    </h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2023' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    {/* <h3 style={{color: '#E4E2FA'}}>Inter IIT Sports Meet</h3> */}
                    <h4 style={{color: '#fff'}}>
                    2023 Inter IIT - 4th (Led by Nitish Bhat)
                    </h4>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;