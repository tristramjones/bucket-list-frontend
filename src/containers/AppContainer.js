import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Login from '../components/Login';
import App from '../App';

class AppContainer extends Component {
  render() {
    return (
      <Fragment>
        { !localStorage.currentUser || !!JSON.parse(localStorage.currentUser).message ?
          <Login />
          :
          <App />
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps,actions)(AppContainer)
