import React from 'react';
import SeatsList from './SeatsList.js';

export default class Session extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
            <h3>{this.props.session.name}</h3>
            <SeatsList seats={this.props.session.seats} onClick={(index) => this.props.onClick(index)} />
           </div>;
  }
}
