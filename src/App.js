import React from 'react';
import SeatsList from './components/SeatsList.js';
import DateSelector from './components/DateSelector.js';
import MovieList from './components/MovieList.js';
import {connect} from 'react-redux';
import generateSessions from '../sessionsgenerator.js';

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
        let inputDate = new Date();
        let sessionPromise = generateSessions.generate(inputDate);
        sessionPromise.then(
          function(result) {
            dispatch({ type:'FETCH_SESSIONS_SUCCESS', payload: result})
          },
          function(error) {
            dispatch({type:'FETCH_SESSIONS_FAIL'}, payload: error)
          }
        )
      }
      dispatch(getSessions());
    }
  })
)(App);
