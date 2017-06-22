import { Jumbotron, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import Counter from './counter';
import Timer from './timer';
import StartButton from './start_button.js'
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      label: "Session",
      countdownStarted: false,
      countdown: 25
    };

    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleStartPause = this.handleStartPause.bind(this);
  }

  handleStartPause() {
    // start or pause the countdown according to prevState
    this.setState(prevState => {
      return { countdownStarted: !prevState.countdownStarted };
    });

    // if initial start, start countdown according to length

    // if countdown is started, pause it

    // if countdown is paused, start it
  }

  handleLengthChange(label, op) {
    // create key from label
    const key = `${label}Length`;

    // countdown is updated only when session counter is modified
    const checkLabel = () => {
      if (label === "session") {
        return op === '+' ? this.state.countdown + 1 : this.state.countdown - 1;
      } else {
        return this.state.countdown;
      }
    }

    // https://stackoverflow.com/questions/5834318/
    // create operators functions from op strings
    const operators = {
      '+': key => {
        this.setState({
          [key]: this.state[key] + 1,
          countdown: checkLabel()
        })
      },
      '-': key => {
        this.setState({
          [key]: this.state[key] - 1,
          countdown: checkLabel()
        })
      }
    };

    operators[op](key);
  }

  render() {
    return (
      <Jumbotron className="App">
        <Grid className="align-center">
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
