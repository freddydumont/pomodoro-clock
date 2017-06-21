import React from 'react';

// counter component expects type (session or break) and length from app
const Counter = (props) => {
    // counter returns 
    return (
        console.log(props.type, props.length)
    );
}

export default Counter;