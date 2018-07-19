import React from 'react';
import {connect} from 'react-redux';
import Session from './Session.js';

export default function Movie(props) {
    return (
      <div className='movie'>
      <h3 className='movie__name'>{props.name}</h3>
      <span>Сеансы:</span>
      {props.sessions.map(i => (<Session key={i.id} session={i} onSelect={() => props.handleSelect(i.id)}/>))}
      </div>
    );
}
