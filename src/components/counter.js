import React from 'react';

// counter component expects label (session or break) and length from app
const Counter = ({ label, length, onLengthChange }) => {

    const handleClick = (e) => {
        const name = label.toLowerCase();
        const operator = e.target.innerHTML;
        switch (operator) {
            case "-":
                onLengthChange(name, operator);
                break;
            case "+":
                onLengthChange(name, operator);
                break;
            default: break;
        }
    }

    return (
        <div>
            <h3>{label}</h3>
            <p onClick={handleClick}>-</p>
            <p>{length}</p>
            <p onClick={handleClick}>+</p>
        </div>
    );
}

export default Counter;