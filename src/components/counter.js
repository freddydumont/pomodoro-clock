import React, { Component } from 'react';

// counter component expects type (session or break) and length from app
class Counter extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        const type = this.props.type;
        const mod = e.target.innerHTML;
        switch (mod) {
            case "-":
                this.props.handleLengthChange(type, mod);
                break;
            case "+":
                this.props.handleLengthChange(type, mod);
                break;
            default: break;
        }
    }

    render() {
        return (
            <div>
                <h3>{this.props.type}</h3>
                <p onClick={this.handleClick}>-</p>
                <p>{this.props.length}</p>
                <p onClick={this.handleClick}>+</p>
            </div>
        );
    }
}

export default Counter;