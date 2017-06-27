import { Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import { Howl } from 'howler';
import Counter from './counter';
import Timer from './timer';
import StartButton from './start_button.js'
import ResetButton from './reset_button.js'
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
      countdown: { minutes: 25, seconds: 0 },
    };

    // copy of initial state for reset button
    this.initialState = this.state;

    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleStartPause = this.handleStartPause.bind(this);
    this.handleTimerEnd = this.handleTimerEnd.bind(this);
    this.handleReset = this.handleReset.bind(this);

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
    /* using audio from external source
     * https://freesound.org/people/loofa/sounds/23609/
     * local files output errors: DOMException: Failed to load because no
     * supported source was found or Uncaught (in promise) DOMException: 
     * Unable to decode audio data */
    const gong = new Howl({
      src: ["http://freesound.org/data/previews/23/23609_149377-lq.mp3"],
      html5: true
    });

    // using a simple recursive function with a bool parameter
    // to play the sound twice
    const playTwice = (isPlayed) => {
      gong.play();
      gong.once('end', () => {
        if (!isPlayed) { return playTwice(true); }
      });
    }

    playTwice(false);

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
    !this.state.isStarted ? this.clock.start() : this.clock.pause();

    // switch isStarted
    this.setState(prevState => {
      return { isStarted: !prevState.isStarted };
    });
  }

  handleLengthChange(label, op) {
    // create key from label
    const key = `${label}Length`;

    // countdown is updated only when the proper buttons are pressed at the proper time
    // if countdown is paused and sessionLength is updated, the session countdown will
    // reflect the changes so that the total sessionLength is respected
    const checkLabel = str => {
      return label === str ? (op === '+' ? this.state.countdown.minutes + 1 :
        this.state.countdown.minutes - 1) : this.state.countdown.minutes;
    }

    // if during session, session buttons must be pressed
    // if during break, break buttons must be pressed
    const adjustCountdown = () => {
      return this.state.isSession ? checkLabel("session") : checkLabel("break");
    }

    // https://stackoverflow.com/questions/5834318/
    // create operators functions from op strings
    const operators = {
      '+': key => {
        this.setState({
          [key]: this.state[key] + 1,
          countdown: {
            ...this.state.countdown,
            minutes: adjustCountdown()
          }
        })
      },
      '-': key => {
        this.setState({
          [key]: this.state[key] - 1,
          countdown: {
            ...this.state.countdown,
            minutes: adjustCountdown()
          }
        })
      }
    };

    // if countdown is started, nothing can be changed
    if (!this.state.isStarted) {
      operators[op](key);
    }
  }

  handleReset() {
    this.clock.pause();
    this.setState(this.initialState);
  }

  render() {
    return (
      <div className="image-container">
        <Grid bsClass="controls-container">
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
          <Row className="component-bg" >
            <Timer
              isSession={this.state.isSession}
              countdown={this.state.countdown} />
          </Row>
          <Row>
            <ResetButton onReset={this.handleReset} />
            <StartButton
              isStarted={this.state.isStarted}
              onStartPause={this.handleStartPause} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
