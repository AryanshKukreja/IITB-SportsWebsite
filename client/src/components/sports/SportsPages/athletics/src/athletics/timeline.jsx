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
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}
                style={{ boxShadow: '0' }}>
                    <h3>National Meet 2024</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            <tr><td>Silver Medal</td><td>T.S.S. Maneesha</td></tr>
                        </tbody>
                    </table>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3>State Meet</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            <tr><td>Silver Medal</td><td>T.S.S. Maneesha</td></tr>
                        </tbody>
                    </table>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiMedal />}
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{ fontSize:'25px'}}>Inter-IIT 2024 Medals</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                        <tbody>
                            <tr><td>100m (W)</td><td>Gold</td></tr>
                            <tr><td>200m (W)</td><td>Gold</td></tr>
                            <tr><td>400m (W)</td><td>Bronze</td></tr>
                            <tr><td>800m (M)</td><td>Silver</td></tr>
                            <tr><td>1500m (M)</td><td>Silver</td></tr>
                            <tr><td>Shotput Throw (M)</td><td>Gold</td></tr>
                            <tr><td>Shotput Throw (W)</td><td>Gold</td></tr>
                            <tr><td>Discus Throw (W)</td><td>Silver</td></tr>
                        </tbody>
                    </table>
                </VerticalTimelineElement>
                <VerticalTimelineElement className="vertical-timeline-element--education"
                iconStyle={{background:'#000', color:'#fff'}}
                icon={<GiTrophyCup />}
                date='2024' contentStyle={{ background: '#2F2B77', color: '#fff' }}>
                    <h3 style={{color: '#E4E2FA'}}>Gymkhana Awards 2024</h3>
                    <p style={{color: '#E4E2FA'}}>
                        Roll of Honour: Samiksha Yadav
                        <br/>Sports person of the year: T.S.S. Maneesha
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
            
        </div>
    )
}

export default Timel;