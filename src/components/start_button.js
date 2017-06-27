import { Button } from 'react-bootstrap';
import "../style/buttons.css"
import React from 'react';

const StartButton = ({ isStarted, onStartPause }) => {

    let btnLabel = isStarted ? "Pause" : "Start";

    const handleClick = (e) => {
        onStartPause();
    }

    return (
        <Button onClick={handleClick} className="button">
            {btnLabel}
        </Button>
    );
}

export default StartButton;