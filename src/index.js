import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import generateSessions from '../sessionslist.js';
import App from './App.js';

function dateIncludes(array, element) {
    let returnvalue = false;
    array.forEach( (i) => {
      if (i.getDate() == element.getDate() && i.getMonth() == element.getMonth()) returnvalue = true;
    });
    return returnvalue;
};

const initialState = {
  sessions: [],
  activeSession: null,
  daysList: [],
  activeDate: 0,
  pendingSeats: []
}

function appManager(state = initialState, action) {
  if (action.type == 'FETCH_SESSIONS_SUCCESS') {
    const sessions = action.payload;
    let daysList = [];
    sessions.forEach( (i) => {
      let date = new Date(i.datetime);
      date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0));
      if (!dateIncludes(daysList, date)) daysList.push(date);
    });
    return {
      ...state,
      sessions: sessions,
      daysList: daysList
    }
  };
  if (action.type == 'SELECT_SESSION') {
    return {
      ...state,
      activeSession: action.payload
    }
  };

  if (action.type == 'SELECT_SEAT') {
    let pendingSeats = state.pendingSeats.slice();
    pendingSeats.push(action.payload);
    return {
      ...state,
      pendingSeats: pendingSeats
    }
  };

  if (action.type == 'CLOSE_SEATSLIST') {
    return {
      ...state,
      activeSession: null,
      pendingSeats: []
    }
  };

  if (action.type == 'SELECT_DATE') {
    return {
      ...state,
      activeDate: action.payload
    }
  };

  if (action.type == 'CONFIRM_PURCHASE') {
    let pendingSeats = state.pendingSeats.slice();
    let sessions = state.sessions.slice();
    pendingSeats.forEach( (i) => {
      sessions[action.payload].seats[i] = true;
    })
    return {
      ...state,
      activeSession: null,
      sessions: sessions,
      pendingSeats: []
    }
  };

  return state;
}

const store = createStore(appManager, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
