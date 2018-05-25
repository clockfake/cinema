import React from 'react';
import Session from './components/Session.js';
import filmsjson from '../films_name.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      sessions: [],
      activeSeatsList: null
    }
  }

  componentWillMount() {
    let filmsList = filmsjson.map( (i,index) => {
      return {
        name: i.name,
        seats: Array(100).fill(null)
      }
    }).filter((i,index) => index%2==0);
    this.setState({
      sessions: filmsList
    });
  }

  handleClick(seat,session_index) {
    const sessions = this.state.sessions.slice();
    sessions[session_index].seats[seat] = true;
    this.setState({sessions: sessions})
  }

  handleSelect(index) {
    if (this.state.activeSeatsList == index) {
      this.setState({activeSeatsList: null})} else {
      this.setState({activeSeatsList: index})
    }
  }

  render() {
    return (
      <div>
      {this.state.sessions.map((i,index) => {
        const shouldShow = (index==this.state.activeSeatsList);
        return (<Session key={index} onClick={(idx) => this.handleClick(idx,index)} onSelect={() => this.handleSelect(index)} shouldShow={shouldShow} session={i} />);
      })
      }
      </div>
    );
  }
}
