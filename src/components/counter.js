import React from 'react';

// counter component expects label (session or break) and length from app
const Counter = (props) => {

    let label = props.label;

    const handleClick = (e) => {
        const name = label.toLowerCase();
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
            <h3>{label}</h3>
            <p onClick={handleClick}>-</p>
            <p>{props.length}</p>
            <p onClick={handleClick}>+</p>
        </div>
    );
}

export default Counter;