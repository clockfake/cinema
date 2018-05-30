import React from 'react';
import {connect} from 'react-redux';

class DateSelector extends React.Component {

  dateSelect(date) {
    this.props.onDateSelect(date);
  }

  render() {
    let options = {day: 'numeric', month: 'long'}
    let daysList = [];
    if (this.props.daysList.length<=4) {daysList = [...this.props.daysList]} else {
      if (this.props.activeDate == 0) {daysList = this.props.daysList.slice(0,4)} else {
        if (this.props.activeDate+2 >= this.props.daysList.length) {daysList = this.props.daysList.slice(-4)} else {
          daysList = this.props.daysList.slice(this.props.activeDate-1,this.props.activeDate+3);
        }
      }
    }
    return (
      <ul className="days__list">
        {daysList.map( (i) => {
          let index = this.props.daysList.indexOf(i);
          let date = i.toLocaleString('ru',options);
          let highlightDate = (index == this.props.activeDate);
          return (<li className={highlightDate? "days__item  days__item--highlighted": "days__item"} key={index} onClick={() => this.dateSelect(index)}>{date}</li>)
        })}
      </ul>
    );
  }
}


export default connect(
  state => ({
    daysList: state.daysList,
    activeDate: state.activeDate
  }),
  dispatch => ({
    onDateSelect: (date) => {
      dispatch({type: 'SELECT_DATE', payload: date})
    }
  })
)(DateSelector);
