import React, { Component } from 'react';
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

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
