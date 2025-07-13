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
                    <h3>Aavhan</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            SILVER
                        </tbody>
                    </table>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{ fontSize:'25px'}}>National College Ultimate Championship</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            Winner of Spirit Trophy
                        </tbody>
                    </table>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Mumbai Intra-city League</h3>
                    <p style={{color: '#E4E2FA'}}>
                        Winner of Spirit Trophy
                        <br/>5th Place Overall
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2023' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{ fontSize:'25px'}}>Aavhan</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            GOLD
                        </tbody>
                    </table>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;