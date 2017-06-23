import { Button } from 'react-bootstrap';
import React from 'react';

const StartButton = ({ isStarted, onStartPause }) => {

    let btnLabel = isStarted ? "Pause" : "Start";

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