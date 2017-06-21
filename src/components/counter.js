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
        <div>
            <h3>{label}</h3>
            <p onClick={handleClick}>-</p>
            <p>{length}</p>
            <p onClick={handleClick}>+</p>
        </div>
    );
}

export default Counter;