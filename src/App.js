import React from 'react';
import SeatsList from './components/SeatsList.js';
import DateSelector from './components/DateSelector.js';
import MovieList from './components/MovieList.js';

export default class App extends React.Component {

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
