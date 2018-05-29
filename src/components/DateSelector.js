import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class DateSelector extends React.Component {

  dateSelect(date) {
    this.props.onDateSelect(date);
  }

  render() {
    let options = {day: 'numeric', month: 'long'}
    return (
      <ul className="days__list">
        {this.props.daysList.map( (i,index) => {
          let date = i.toLocaleString('ru',options);
          return (<li className="days__item" key={index} onClick={() => this.dateSelect(i)}>{date}</li>)
        })}
      </ul>
    );
  }
}

DateSelector.propTypes = {
  daysList: PropTypes.array
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
