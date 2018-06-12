import React from 'react';
import {connect} from 'react-redux';
import Session from './Session.js';

class Movie extends React.Component {

  handleSelect(id) {
    this.props.onSelectSession(id);
  }

  render() {
    return (
      <div className='movie'>
      <h3 className='movie__name'>{this.props.name}</h3>
      <span>Сеансы:</span>
      {this.props.sessions.map(i => (<Session key={i.id} session={i} onSelect={() => this.handleSelect(i.id)}/>))}
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    onSelectSession: (id) => {
      dispatch({type: 'SELECT_SESSION', payload: id});
    }
  })
)(Movie);
