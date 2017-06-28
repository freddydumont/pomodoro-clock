import { Col } from 'react-bootstrap'
import React from 'react';
// for formatting countdown
import moment from 'moment';
import "moment-duration-format";

const Timer = ({ isSession, countdown }) => {
    return (
        <Col>
            <h3>{isSession ? "Session" : "Break"}</h3>
            <h3 className="num" >{moment.duration(countdown).format("hh:mm:ss")}</h3>
        </Col>
    );
}

export default Timer;