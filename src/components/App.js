import { Jumbotron, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import Counter from './counter';
import Timer from './timer';
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      label: "Session",
      countdown: 0
    };

    this.handleLengthChange = this.handleLengthChange.bind(this);
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
        </Grid>
      </Jumbotron>
    );
  }
}

export default App;
