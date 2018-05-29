import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Movie from './Movie.js';

class MovieList extends React.Component {

  handleSelect(id) {
    this.props.onSelectSession(id);
  }

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

MovieList.propTypes = {
  daysList: PropTypes.array
}

export default connect(
  state => ({
    sessions: state.sessions.filter((i) => {
      let activeDay = state.activeDate.getDate();
      let activeMonth = state.activeDate.getMonth();
      let date = new Date(i.datetime);
      return (date.getDate() == activeDay && date.getMonth() == activeMonth)
    })
  }),
  dispatch => ({
    onSelectSession: (id) => {
      dispatch({type: 'SELECT_SESSION', payload: id});
    }
  })
)(MovieList);
