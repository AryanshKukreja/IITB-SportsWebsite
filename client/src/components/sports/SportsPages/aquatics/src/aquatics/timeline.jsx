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
                date='2022-23' contentStyle={{ background: '#2F2B77', color: '#fff' }}
                style={{ boxShadow: '0' }}>
                    <h3 style={{color: '#E4E2FA'}}>Inter IIt Aquatics Meet</h3>
                    <p style={{color: '#E4E2FA'}}>
                        Mens Swimming : 2nd place
                        <br/>Mens Water Polo : 4th place
                        <br/>Best Swimmer Award : Kaushal Khutneta
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2022-23' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{ fontSize:'25px', color: '#E4E2FA'}}>Inter IIt Aquatics Meet</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <p style={{color: '#E4E2FA'}}>
                        200m Breastroke(M) &nbsp;&nbsp;&nbsp; Gold &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kushal Khunteta<br/>
                        100m Breastroke(M) &nbsp;&nbsp;&nbsp; Gold &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kushal Khunteta<br/>
                        50m Breastroke(M) &nbsp;&nbsp;&nbsp; Silver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kushal Khunteta<br/>
                        100m Butterfly(M) &nbsp;&nbsp;&nbsp; Gold &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vaishnav Rao<br/>
                        50m Butterfly(M) &nbsp;&nbsp;&nbsp; Silver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vaishnav Rao<br/>
                        200m Medley (M) &nbsp;&nbsp;&nbsp; Silver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vaishnav Rao<br/>
                        100m Freestyle(W) &nbsp;&nbsp;&nbsp; Gold &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mansi Khedekar<br/>
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2023' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Inter IIt Aquatics Meet</h3>
                    <p style={{color: '#E4E2FA'}}>
                        Mens Water Polo : 2nd place
                        <br/>Top Scorer (Mens Water Polo) : Suyash Bhandare
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2023' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{ fontSize:'25px', color: '#E4E2FA'}}>Inter IIt Aquatics Meet</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <p style={{color: '#E4E2FA'}}>
                        100m Freestyle(M) &nbsp;&nbsp;&nbsp; Bronze &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suyash Bhandare<br/>
                        200m Breastroke(M) &nbsp;&nbsp;&nbsp; Silver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kartik Akappa<br/>
                        200m Freestyle(M) &nbsp;&nbsp;&nbsp; 4th place &nbsp;&nbsp;&nbsp;&nbsp;Suyash Bhandare<br/>
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;