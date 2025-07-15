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
                    <h3>Inter IIT Aquatics Meet</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            <tr><td>Mens Swimming</td><td>2nd place</td></tr>
                            <tr><td>Mens Water Polo</td><td>4th place</td></tr>
                            <tr><td>Best Swimmer Award</td><td>Kaushal Khutneta</td></tr>
                        </tbody>
                    </table>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2022-23' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{ fontSize:'25px'}}>Inter IIT Aquatics Meet</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            <tr><td>200m Breastroke(M)</td><td>Gold</td><td>Kushal Khunteta</td></tr>
                            <tr><td>100m Breastroke(M)</td><td>Gold</td><td>Kushal Khunteta</td></tr>
                            <tr><td>50m Breastroke(M)</td><td>Silver</td><td>Kushal Khunteta</td></tr>
                            <tr><td>100m Butterfly(M)</td><td>Gold</td><td>Vaishnav Rao</td></tr>
                            <tr><td>50m Butterfly(M)</td><td>Silver</td><td>Vaishnav Rao</td></tr>
                            <tr><td>200m Medley (M)</td><td>Silver</td><td>Vaishnav Rao</td></tr>
                            <tr><td>100m Freestyle(W)</td><td>Gold</td><td>Mansi Khedekar</td></tr>
                        </tbody>
                    </table>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2023' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Inter IIT  Aquatics Meet</h3>
                    <p style={{color: '#E4E2FA'}}>
                        Mens Water Polo : 2nd place
                        <br/>Top Scorer (Mens Water Polo) : Suyash Bhandare
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2023' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{ fontSize:'25px'}}>Inter IIT  Aquatics Meet</h3>
                    {/* <h5 style={{color: '#000', wordSpacing: '40px', fontSize:'20px'}}>Events Position Players</h5> */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            <tr><td>100m Freestyle(M)</td><td>Bronze</td><td>Suyash Bhandare</td></tr>
                            <tr><td>200m Breastroke(M)</td><td>Silver</td><td>Kartik Akappa</td></tr>
                            <tr><td>200m Freestyle(M)</td><td>4th place</td><td>Suyash Bhandare</td></tr>
                        </tbody>
                    </table>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;