import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class SeatsList extends React.Component {

  handleClick(seat) {
    if (!this.props.sessions[this.props.activeSession].seats[seat] && this.props.pendingSeats.indexOf(seat) == -1) {
      if (this.props.pendingSeats.length<5) {this.props.onSelectSeat(seat)} else {
        alert('Лимит заказа билетов на сеанс: 5 билетов');
      }
    }
  }

  confirmPurchase() {
    let session = this.props.activeSession;
    this.props.onConfirmPurchase(session);
  }

  closeSeatsList() {
    this.props.onCloseSeatsList();
  }

  render() {
    let options = {day: 'numeric', month: 'long',hour:'2-digit',minute:'2-digit'}
    if (this.props.activeSession == null) {return (<div className='seats  seats--closed'> </div>)} else {
    return (
      <React.Fragment>
      <div className='seats  seats--opened'>
        <div className='seats__heading'>
          <p>Заказ билетов на фильм: {this.props.sessions[this.props.activeSession].name}</p>
          <p>Время сеанса: {new Date(this.props.sessions[this.props.activeSession].datetime).toLocaleString('ru',options)}</p>
        </div>
        <ul className={'seats__list'}>
          {this.props.sessions[this.props.activeSession].seats.map( (i,index) => {
            let seatState = 'seats__item';
            if (i) seatState += '  seats__item--taken';
            if (this.props.pendingSeats.includes(index)) seatState += '  seats__item--pending';
            return (<li key={index} className={seatState} onClick={() => this.handleClick(index)}> {index+1} </li>);
          })}
        </ul>
      <button className='seats__close-btn' onClick={() => this.closeSeatsList()}>Close</button>
      <button className='seats__confirm-btn' onClick={() => this.confirmPurchase()}>Подтвердить покупку!</button>
      <ul className="seats__pending-list">
        {this.props.pendingSeats.map( (i,index) => <PendingSeat key={index} seat={i} price={this.props.sessions[this.props.activeSession].cost} />)}
        <span className={this.props.pendingSeats.length<2 ? "seats__pending-overall  seats__pending-overall--hidden" : "seats__pending-overall"}>Итого: {this.props.pendingSeats.length*this.props.sessions[this.props.activeSession].cost}</span>
      </ul>
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
    activeSession: state.activeSession,
    pendingSeats: state.pendingSeats
  }),
  dispatch => ({
    onSelectSeat: (seatBought) => {
      dispatch({ type: 'SELECT_SEAT', payload: seatBought})
    },
    onCloseSeatsList: () => {
      dispatch({ type: 'CLOSE_SEATSLIST', payload: null})
    },
    onConfirmPurchase: (session) => {
      dispatch({ type: 'CONFIRM_PURCHASE', payload: session})
    }
  })
)(SeatsList);


function PendingSeat(props) {
  let row = Math.floor(props.seat/10)+1;
  let col = props.seat%10+1;
  return (
    <li className="seats__pending-item"> Ряд: {row}, Место: {col}, Цена: {props.price}</li>
  )
}
