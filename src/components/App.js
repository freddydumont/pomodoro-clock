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
      isSession: true,
      isStarted: false,
      countdown: { minutes: 0, seconds: 2 },
    };

    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleStartPause = this.handleStartPause.bind(this);
    this.handleTimerEnd = this.handleTimerEnd.bind(this);

    // creating a clock object to manage start and pause
    // https://stackoverflow.com/questions/12487352/
    this.clock = {
      start: () => {
        this.timer = setInterval(() => {
          // substract 1 second from countdown
          this.setState(prevState => {
            return {
              countdown: {
                // using spread operator to destructure countdown to merge
                ...prevState.countdown,
                seconds: prevState.countdown.seconds - 1
              }
            };
          });
          // if countdown.seconds < 0, substract 1 minute and set second to 59
          if (this.state.countdown.seconds < 0) {
            this.setState(prevState => {
              return {
                countdown: {
                  minutes: prevState.countdown.minutes - 1,
                  seconds: 59
                }
              }
            });
          }
          // if countdown.minutes < 0, call handler
          if (this.state.countdown.minutes < 0) {
            this.handleTimerEnd();
          }
        }, 1000)
      },

      pause: () => {
        clearInterval(this.timer);
      }
    }
  };

  handleTimerEnd() {
    // stop the timer
    this.clock.pause();
    // play the sound
    // using audio from external source
    // local files output errors: DOMException: Failed to load because no
    // supported source was found or Uncaught (in promise) DOMException: 
    // Unable to decode audio data
    const gong = new Audio("https://soundbible.com/grab.php?id=1496&type=mp3");
    gong.play();
    // set isSession and countdown according to opposite of prevState
    this.setState(prevState => {
      return prevState.isSession ? {
        isSession: false,
        countdown: {
          minutes: prevState.breakLength,
          seconds: 0
        }
      } : {
          isSession: true,
          countdown: {
            minutes: prevState.sessionLength,
            seconds: 0
          }
        };
    });
    // start the timer
    this.clock.start();
  }

  handleStartPause() {
    // start or pause the clock according to isStarted
    if (!this.state.isStarted) {
      this.clock.start();
    } else {
      this.clock.pause();
    }

    // switch isStarted
    this.setState(prevState => {
      return { isStarted: !prevState.isStarted };
    });
  }

  handleLengthChange(label, op) {
    // create key from label
    const key = `${label}Length`;

    // if countdown is started, countdown can't be modified

    // if isSession is true, sessionLength can't be modified, but breakLength can

    // if isSession is false, sessionLength can be modified, but breakLength can't

    // if countdown is not started

    // countdown is updated only when session counter is modified
    const checkLabel = () => {
      if (label === "session") {
        return op === '+' ? this.state.countdown.minutes + 1 : this.state.countdown.minutes - 1;
      } else {
        return this.state.countdown.minutes;
      }
    }

    // https://stackoverflow.com/questions/5834318/
    // create operators functions from op strings
    const operators = {
      '+': key => {
        this.setState({
          [key]: this.state[key] + 1,
          countdown: {
            ...this.state.countdown,
            minutes: checkLabel()
          }
        })
      },
      '-': key => {
        this.setState({
          [key]: this.state[key] - 1,
          countdown: {
            ...this.state.countdown,
            minutes: checkLabel()
          }
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
              isSession={this.state.isSession}
              countdown={this.state.countdown} />
          </Row>
          <Row>
            <StartButton
              isStarted={this.state.isStarted}
              onStartPause={this.handleStartPause} />
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}

export default App;
