import React, { Component } from 'react';
import Counter from './counter';
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      breakLength: 5,
      sessionLength: 25,
    };
  }

  handleLengthChange(type, modifier) {
    console.log(type, modifier);
  }

  render() {
    return (
      <div className="App">
        <Counter
          type="Session"
          length={this.state.sessionLength}
          onLengthChange={this.handleLengthChange} />
        <Counter
          type="Break"
          length={this.state.breakLength}
          onLengthChange={this.handleLengthChange} />
      </div>
    );
  }
}

export default App;
