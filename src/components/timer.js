import { Col } from 'react-bootstrap'
import React from 'react';
// for formatting countdown
import moment from 'moment';
require("moment-duration-format");

const Timer = ({ label, countdown }) => {
    return (
        <Col>
            <h3>{label}</h3>
            <h3>{moment.duration(countdown).format("hh:mm:ss")}</h3>
        </Col>
    );
}

export default Timer;