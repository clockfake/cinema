import React from 'react';
import { connect } from 'react-redux';
import SeatsList from './components/SeatsList.js';
import DateSelector from './components/DateSelector.js';
import MovieList from './components/MovieList.js';

class App extends React.Component {

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
  dispatch => ({})
)(App);
