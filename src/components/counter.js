import React from 'react';

// counter component expects type (session or break) and length from app
const Counter = (props) => {

    let type = props.type;

    const handleClick = (e) => {
        const name = type.toLowerCase();
        const mod = e.target.innerHTML;
        switch (mod) {
            case "-":
                props.onLengthChange(name, mod);
                break;
            case "+":
                props.onLengthChange(name, mod);
                break;
            default: break;
        }
    }

    return (
        <div>
            <h3>{type}</h3>
            <p onClick={handleClick}>-</p>
            <p>{props.length}</p>
            <p onClick={handleClick}>+</p>
        </div>
    );
}

export default Counter;