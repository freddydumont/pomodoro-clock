import { Button } from 'react-bootstrap';
import React from 'react';

const StartButton = ({ countdownStarted, onStartPause }) => {

    let btnLabel = countdownStarted ? "Pause" : "Start";

    const handleClick = (e) => {
        onStartPause();
    }

    return (
        <Button onClick={handleClick}>
            {btnLabel}
        </Button>
    );
}

export default StartButton;