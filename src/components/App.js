import { Jumbotron, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import moment from 'moment';
import Counter from './counter';
import Timer from './timer';
import StartButton from './start_button.js'
import '../style/App.css';
require("moment-duration-format");

class App extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      label: "Session",
      countdownStarted: false,
      countdown: moment.duration(25, 'minutes').format("mm:ss")
    };

    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleStartPause = this.handleStartPause.bind(this);
  }

  handleStartPause() {
    this.setState(prevState => {
      return { countdownStarted: !prevState.countdownStarted };
    });
  }

  handleLengthChange(label, op) {
    // create key from label
    const key = `${label}Length`;

    // https://stackoverflow.com/questions/5834318/
    // create operators functions from op strings
    const operators = {
      '+': key => { this.setState({ [key]: this.state[key] + 1 }) },
      '-': key => { this.setState({ [key]: this.state[key] - 1 }) }
    };

    operators[op](key);
  }

  render() {
    return (
      <Jumbotron className="App">
        <Grid>
          <Row>
            <Counter
              label="Session"
              length={this.state.sessionLength}
              onLengthChange={this.handleLengthChange} />
            <Counter
              label="Break"
              length={this.state.breakLength}
              onLengthChange={this.handleLengthChange} />
          </Row>
          <Row>
            <Timer
              label={this.state.label}
              countdown={this.state.countdown} />
          </Row>
          <Row>
            <StartButton
              countdownStarted={this.state.countdownStarted}
              onStartPause={this.handleStartPause} />
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}

export default App;
