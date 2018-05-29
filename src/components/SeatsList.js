import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class SeatsList extends React.Component {

  handleClick(seat) {
    let seatBought = {seat: seat, session: this.props.activeSession};
    this.props.onBuySeat(seatBought);
  }

  closeSeatsList() {
    this.props.onCloseSeatsList();
  }

  render() {
    if (this.props.activeSession == null) {return (<div className='seats  seats--closed'> </div>)} else {
    return (
      <React.Fragment>
      <div className='seats  seats--opened'>
        <ul className={'seats__list'}>
          {this.props.sessions[this.props.activeSession].seats.map( (i,index) => {
            return (<li key={index} className={i ? 'seats__item  seats__item--taken' : 'seats__item'} onClick={() => this.handleClick(index)}> {index+1} </li>);
          })}
        </ul>
      <button className='seats__close-btn' onClick={() => this.closeSeatsList()}>Close</button>
      </div>
      <div className='modal-overlay  modal-overlay--show'></div>
      </React.Fragment>);
    }
  }
}

SeatsList.propTypes = {
  sessions: PropTypes.array,
  activeSession: PropTypes.number
}

export default connect(
  state => ({
    sessions: state.sessions,
    activeSession: state.activeSession
  }),
  dispatch => ({
    onBuySeat: (seatBought) => {
      dispatch({ type: 'BUY_SEAT', payload: seatBought})
    },
    onCloseSeatsList: () => {
      dispatch({ type: 'CLOSE_SEATSLIST', payload: null})
    }
  })
)(SeatsList);
