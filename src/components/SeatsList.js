import React from 'react';

export default class SeatsList extends React.Component {

  render() {
    return (
      <ul className={this.props.shouldShow? 'seats-list' : 'seats-list__hidden'}>
        {this.props.seats.map( (i,index) => {
            return (<li key={index} className={i ? 'seats-list__seat  seats-list__seat--taken' : 'seats-list__seat'} onClick={() => this.props.onClick(index)}> {index+1} </li>);
        })}
      </ul>);
  }
}
