import { Button } from 'react-bootstrap';
import React from 'react';

const ResetButton = ({ onReset }) => {

    const handleClick = (e) => {
        onReset();
    }

    return (
        <Button onClick={handleClick}>
            Reset
        </Button>
    );
}

export default ResetButton;