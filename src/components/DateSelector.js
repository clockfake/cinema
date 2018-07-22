import React from 'react';
import {connect} from 'react-redux';

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.options = {day: 'numeric', month: 'long'};
  }

  //selects 4 days out of all days of film disribution
  parseDates(daysArr, activeDate) {
    let daysList;
    if (daysArr.length<=4) {daysList = [...daysArr]} else {
      if (activeDate == 0) {daysList = daysArr.slice(0,4)} else {
        if (activeDate+2 >= daysArr.length) {daysList = daysArr.slice(-4)} else {
          daysList = daysArr.slice(activeDate-1,activeDate+3);
        }
      }
    }
    return daysList;
  }

  render() {
    const daysList = this.parseDates(this.props.daysList, this.props.activeDate);

    return (
      <ul className="days__list">
        {daysList.map( (i) => {
          let index = this.props.daysList.indexOf(i);
          let date = i.toLocaleString('ru',this.options);
          return (<li className={index == this.props.activeDate? "days__item  days__item--highlighted": "days__item"} key={index} onClick={() => this.props.onDateSelect(index)}>{date}</li>)
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
