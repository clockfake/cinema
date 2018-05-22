import React from 'react';

export default class SeatsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className='seats-list'>
        {this.props.seats.map( (i,index) => {
            let seatTaken = i ? 'seats-list__seat seats-list__seat--taken' : 'seats-list__seat';
            return (<li key={index} className={seatTaken} onClick={() => this.props.onClick(index)}> {index+1} </li>);
        })}
      </ul>);
  }
}
