import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import generateSessions from '../sessionslist.js';
import App from './App.js';

Object.defineProperty(Array.prototype, 'dateIncludes', {
  value: function(element) {
    let returnvalue = false;
    this.forEach( (i) => {
      if (i.getDate() == element.getDate() && i.getMonth() == element.getMonth()) returnvalue = true;
    });
    return returnvalue;
  }
});

const initdate = new Date();
const sessions = generateSessions(initdate);
let daysList = [];
sessions.forEach( (i) => {
  let date = new Date(i.datetime);
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0));
  if (!daysList.dateIncludes(date)) daysList.push(date);
});

const initialState = {
  sessions: sessions,
  activeSession: null,
  daysList: daysList,
  activeDate: 0,
  pendingSeats: []
}

function appManager(state = initialState, action) {
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
      pendingseats: []
    }
  };

  return state;
}

const store = createStore(appManager, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
