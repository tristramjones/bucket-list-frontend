import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends Component {
  state = {
    loginUsername: '',
    loginPassword: '',
    signupUsername: '',
    signupPassword: '',
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.dataset.label]: event.target.value })
  }

  handleSignupChange = (event) => {
    this.setState({ [event.target.dataset.label]: event.target.value })
  }

  handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify({
        user: { username: this.state.loginUsername, password: this.state.loginPassword }
        })
    })
    .then(res=>res.json())
    .then(user=>localStorage.currentUser = JSON.stringify(user))

    this.setUser()
  }

  handleSignup = (event) => {
    event.preventDefault();
  }

  setUser = () => {
    setTimeout(()=>{
      this.props.setCurrentUser(JSON.parse(localStorage.currentUser))
    },100)
  }

  render() {
    return (
      <div className="forms-container">
        <div className="login-form-container">
          <form onSubmit={this.handleLogin}>
            <input
              data-label="loginUsername"
              className="popup-input"
              onChange={this.handleLoginChange}
              placeholder="Username">
            </input><br></br>
            <input
              data-label="loginPassword"
              className="popup-input"
              onChange={this.handleLoginChange}
              placeholder="Password">
            </input><br></br>
            <input
              className="popup-button"
              type="submit"
              value="Login">
            </input>
          </form>
        </div>
        <div className="signup-form-container">
          <form onSubmit={this.handleSignup}>
            <input
              data-label="signupUsername"
              className="popup-input"
              onChange={this.handleSignupChange}
              placeholder="Username">
            </input><br></br>
            <input
              data-label="signupPassword"
              className="popup-input"
              onChange={this.handleSignupChange}
              placeholder="Password">
            </input><br></br>
            <input
              className="popup-button"
              type="submit"
              value="Signup">
            </input>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null,actions)(Login);
