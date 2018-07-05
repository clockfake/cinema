import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
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
  pendingSeats: [],
  pendingStatus: null
}

function appManager(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_SESSIONS_SUCCESS': {
      const sessions = action.payload;
      let daysList = [];
      sessions.forEach( (i) => {
        let date = new Date(i.datetime);
        if (!dateIncludes(daysList, date)) daysList.push(date);
      })
      return {
        ...state,
        sessions: sessions,
        daysList: daysList
      }
    }

    case 'SELECT_SESSION': {
      return {
         ...state,
         activeSession: action.payload
       }
    }

    case 'SELECT_SEAT': {
      let pendingSeats = state.pendingSeats.slice();
       pendingSeats.push(action.payload);
       return {
         ...state,
         pendingSeats: pendingSeats
       }
    }

    case 'CLOSE_SEATSLIST': {
      return {
         ...state,
         activeSession: null,
         pendingSeats: [],
         pendingStatus: null
       }
    }

    case 'CANCEL_SEATS_SELECT': {
        return {
          ...state,
          pendingSeats: []
        }
    }

    case 'SELECT_DATE': {
        return {
          ...state,
          activeDate: action.payload
        }
    }

    case 'PENDING_PURCHASE': {
      return {
        ...state,
        pendingStatus:'pending'
      }
    }

    case 'CONFIRM_PURCHASE_SUCCESS': {
        let pendingSeats = state.pendingSeats.slice();
        let sessions = state.sessions.slice();
        pendingSeats.forEach( (i) => {
          sessions[action.payload].seats[i] = true;
        })
        return {
          ...state,
          sessions: sessions,
          pendingStatus:'success'
        }
    }
    default: return state;
  }

}

const store = createStore(appManager, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
