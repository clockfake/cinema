import React from 'react';
import SeatsList from './components/SeatsList.js';
import DateSelector from './components/DateSelector.js';
import MovieList from './components/MovieList.js';
import {connect} from 'react-redux';
import generateSessions from '../sessionslist.js';

class App extends React.Component {

  componentDidMount() {
    this.props.onGetSessions();
  }

  render() {
    return (
      <div>
        <DateSelector/>
        <MovieList/>
        <SeatsList/>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    onGetSessions: () => {
      const getSessions = () => dispatch => {
        setTimeout( () => {
          let inputDate = new Date();
          let result = generateSessions(inputDate);
          if (result != undefined) {dispatch({ type: 'FETCH_SESSIONS_SUCCESS', payload: generateSessions(inputDate)})}
          else (dispatch({type: 'FETCH_SESSIONS_FAIL', payload: null}))
        }, 1500)
      }
      dispatch(getSessions());
    }
  })
)(App);
