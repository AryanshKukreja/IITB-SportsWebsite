import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { GiTrophyCup } from "react-icons/gi";
import './timeline.css'
const contentStyle = { background: '#2F2B77', color: '#fff' };
const iconStyle = { background: '#000', color: '#fff' };
const textColor = { color: '#E4E2FA' };

const Timel = () => {
    return (
        <div className="experience-grid">
            <div className="column">
                <VerticalTimeline lineColor="#ccc">
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='2017'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:52</h3>
                        <p style={textColor}>
                            Location-Madras
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='2012'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:48</h3>
                        <p style={textColor}>
                            Location-Roorkee
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='2008'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:44</h3>
                        <p style={textColor}>
                            Location-Madras
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='2007'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:43</h3>
                        <p style={textColor}>
                            Location:Bombay
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='1998'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:34</h3>
                        <p style={textColor}>
                            Location:Bombay
                        </p>
                    {/* Add more elements as needed */}
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='1995'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:31</h3>
                        <p style={textColor}>
                            Location:Kanpur
                        </p>
                    {/* Add more elements as needed */}
                </VerticalTimelineElement>
            
                    {/* Additional elements for the second column */}
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='1993'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:29</h3>
                        <p style={textColor}>
                           Location-Bombay
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='1987'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:24</h3>
                        <p style={textColor}>
                           Location-Bombay
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='1985'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:22</h3>
                        <p style={textColor}>
                           Location-Delhi
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='1984'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:21</h3>
                        <p style={textColor}>
                           Location-Kanpur
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='1981'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:18</h3>
                        <p style={textColor}>
                           Location-Khargpur
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        iconStyle={iconStyle}
                        icon={<GiTrophyCup />}
                        date='1966'
                        contentStyle={contentStyle}
                    >
                        <h3 style={textColor}>Edition:4</h3>
                        <p style={textColor}>
                           Location-Bombay
                        </p>
                    </VerticalTimelineElement>
                    {/* Add more elements as needed */}
                </VerticalTimeline>
            </div>
        </div>
    );
}

export default Timel;
