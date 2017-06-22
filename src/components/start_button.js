import { Button } from 'react-bootstrap';
import React from 'react';

const StartButton = ({ countdownStarted }) => {

    let btnLabel = countdownStarted ? "Pause" : "Start";

    const handleClick = (e) => {

    }

    return (
        <Button>
            {btnLabel}
        </Button>
    );
}

export default StartButton;