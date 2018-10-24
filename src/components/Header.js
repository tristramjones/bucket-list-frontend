import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../App.css';

class Header extends Component {
  handleLogoutClick = (event) => {
    localStorage.clear();
    this.props.setCurrentUser(null)
  }

  render() {
    return (
      <header className="header">
        <p className="logo">BucketList</p>
        {
          this.props.currentUser
          ?
          <button className="header-button" onClick={this.handleLogoutClick}>Logout</button>
          :
          null
        }
      </header>
    )
  }

} // end of Header component

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps,actions)(Header);
