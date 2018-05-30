import React from 'react';
import {connect} from 'react-redux';
import Movie from './Movie.js';

class MovieList extends React.Component {

  render() {
    let movieList = [];
    let filmExists;
    this.props.sessions.forEach( (i) => {
      filmExists = false;
      for (let j = 0; j<movieList.length; j++) {
        if (i.name == movieList[j].name) {
          filmExists = true;
          movieList[j].sessions.push(i);
        }
      }
      if (!filmExists) {
        movieList.push({
          name: i.name,
          sessions: [i]
        })
      }
    });

    return (
      <div className='films-container'>
      {movieList.map( (i,index) => {
        return(<Movie key={index} name={i.name} sessions={i.sessions} />)
      })
      }
      </div>
    );
  }
}

export default connect(
  state => ({
    sessions: state.sessions.filter((i) => {
      let date = new Date(i.datetime);
      return date.getDate() == state.daysList[state.activeDate].getDate() && date.getMonth() == state.daysList[state.activeDate].getMonth();
    })
  }),
  dispatch => ({}))(MovieList);
