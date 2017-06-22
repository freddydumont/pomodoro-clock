import { Col } from 'react-bootstrap'
import React from 'react';

const Timer = ({ label, countdown }) => {
    return (
        <Col xs={10} sm={8} md={6} className="align-center">
            <h3>{label}</h3>
            <h3>{countdown}</h3>
        </Col>
    );
}

export default Timer;