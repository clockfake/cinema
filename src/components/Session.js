import React from 'react';
import SeatsList from './SeatsList.js';

export default class Session extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
            <h3 className="session__heading" onClick={() => this.props.onSelect()}>{this.props.session.name}</h3>
            <SeatsList shouldShow={this.props.shouldShow} seats={this.props.session.seats} onClick={(index) => this.props.onClick(index)} />
           </div>);
  }
}
