import React from 'react';
import {connect} from 'react-redux';
import PendingSeat from './PendingSeat.js';
import PendingWindow from './PendingWindow.jsx';
import generateSessions from '../../sessionsgenerator.js';

class SeatsList extends React.Component {
  constructor(props) {
    super(props);
    this.options = {day: 'numeric', month: 'long',hour:'2-digit',minute:'2-digit'};
  }

  handleClick(seat) {
    if (!this.props.session.seats[seat] && !this.props.pendingSeats.includes(seat)) {
      if (this.props.pendingSeats.length<5) {this.props.onSelectSeat(seat)} else {
        alert('Лимит заказа билетов на сеанс: 5 билетов');
      }
    }
  }

  confirmPurchase() {
    this.props.onConfirmPurchase({id: this.props.session.id,seats: this.props.pendingSeats});
  }

  closeSeatsList() {
    this.props.onCloseSeatsList();
  }

  cancelSelect() {
    this.props.onCancelSelect();
  }

  render() {
    if (this.props.activeSession == null) return <div className='seats  seats--closed'> </div>;
    return (
      <React.Fragment>
      <div className='seats  seats--opened'>
        <div className='seats__heading'>
          <p>Заказ билетов на фильм: {this.props.session.name}</p>
          <p>Время сеанса: {new Date(this.props.session.datetime).toLocaleString('ru',this.options)}</p>
        </div>
        <ul className='seats__list'>
          {this.props.session.seats.map( (i,index) => {
            let seatState = 'seats__item';
            if (i) seatState += '  seats__item--taken';
            if (this.props.pendingSeats.includes(index)) seatState += '  seats__item--pending';
            return (<li key={index} className={seatState} onClick={() => this.handleClick(index)}> {index+1} </li>);
          })}
        </ul>
      <button className='seats__close-btn' onClick={() => this.closeSeatsList()}>Close</button>
      <button className='seats__confirm-btn' onClick={() => this.confirmPurchase()}>Подтвердить покупку!</button>
      <button className='seats__disselect-btn' onClick={() => this.cancelSelect()}>Отменить выбор мест</button>
      <ul className="seats__pending-list">
        {this.props.pendingSeats.map( (i,index) => <PendingSeat key={index} seat={i} price={this.props.session.cost} />)}
        <span className={this.props.pendingSeats.length<2 ? "seats__pending-overall  seats__pending-overall--hidden" : "seats__pending-overall"}>Итого: {this.props.pendingSeats.length*this.props.session.cost}</span>
      </ul>
      </div>
      <div className='modal-overlay  modal-overlay--show'/>
      <PendingWindow status={this.props.pendingStatus} onClick={() => this.closeSeatsList()}/>
      </React.Fragment>);
  }
}

export default connect(
  state => ({
    activeSession: state.activeSession,
    session: state.sessions[state.activeSession],
    pendingSeats: state.pendingSeats,
    pendingStatus: state.pendingStatus
  }),
  dispatch => ({
    onSelectSeat: (seatBought) => {
      dispatch({ type: 'SELECT_SEAT', payload: seatBought})
    },
    onCloseSeatsList: () => {
      dispatch({ type: 'CLOSE_SEATSLIST', payload: null})
    },
    onCancelSelect: () => {
      dispatch({ type: 'CANCEL_SEATS_SELECT', payload: null})
    },
    onConfirmPurchase: (seats) => {
      const confirmPurchase = () => dispatch => {
        dispatch({type:'PENDING_PURCHASE'});
        let sessionPromise = generateSessions.storeChanges(seats);
        sessionPromise.then(
          function(result) {
            dispatch({type:'CONFIRM_PURCHASE_SUCCESS'})
          },
          function(error) {
            dispatch({type:'CONFIRM_PURCHASE_FAIL'}, payload: error)
          }
        )
      }
      dispatch(confirmPurchase());
    }

  })
)(SeatsList);
