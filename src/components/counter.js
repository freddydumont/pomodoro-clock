import { Col } from 'react-bootstrap';
import '../style/counter.css'
import React from 'react';

// counter component expects label (session or break) and length from app
const Counter = ({ label, length, onLengthChange }) => {

    const handleClick = (e) => {
        const operator = e.target.innerHTML;
        // length can't be smaller than 1
        if (length > 1 || (length > 0 && operator === '+')) {
            const name = label.toLowerCase();
            switch (operator) {
                case '-':
                    onLengthChange(name, operator);
                    break;
                case '+':
                    onLengthChange(name, operator);
                    break;
                default: break;
            }
        }
    }

    return (
        <Col xs={6} className="counter">
            <h6>{label} Length</h6>
            <span onClick={handleClick} className="operator" >-</span>
            <span>{length}</span>
            <span onClick={handleClick} className="operator" >+</span>
        </Col>
    );
}

export default Counter;