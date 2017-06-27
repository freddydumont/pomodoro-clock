import { Button } from 'react-bootstrap';
import "../style/buttons.css"
import React from 'react';

const ResetButton = ({ onReset }) => {

    const handleClick = (e) => {
        onReset();
    }

    return (
        <Button onClick={handleClick} className="button">
            Reset
        </Button>
    );
}

export default ResetButton;