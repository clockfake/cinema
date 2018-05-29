import React from 'react';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default class Session extends React.Component {

  render() {
    let options = {hour: '2-digit', minute: '2-digit'}
    const datetime = new Date(this.props.session.datetime).toLocaleString('ru',options);
    return (<div className="session" onClick={() => this.props.onSelect()}>
              <span className="session__time">{datetime}</span>
           </div>);
  }
}

Session.propTypes = {
  session: PropTypes.object
}
