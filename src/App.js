import React from 'react';
import Session from './components/Session.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      sessions: [{
        name: 'Film 1',
        seats: Array(100).fill(false)
      }]
    }
  }

  handleClick(seat,session_index) {
    const sessions = this.state.sessions.slice();
    sessions[session_index].seats[seat] = true;
    this.setState({sessions: sessions})
  }

  render() {
    return (
      <ul>
      {this.state.sessions.map((i,index) => <Session key={index} onClick={(idx) => this.handleClick(idx,index)} session={i} />)}
      </ul>
    );
  }
}
