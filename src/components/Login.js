import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends Component {
  state = {
    loginUsername: '',
    loginPassword: '',
    signupUsername: '',
    signupPassword: '',
    displayLogin: true,
  }

  componentWillMount = () => {
    this.props.setCurrentTrip(null)
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
    this.props.setCurrentTrip(null)
  }

  handleSignup = (event) => {
    event.preventDefault();
  }

  handleFormToggle = (event) => {
    this.setState({ displayLogin: !this.state.displayLogin })
  }

  setUser = () => {
    setTimeout(()=>{
      this.props.setCurrentUser(JSON.parse(localStorage.currentUser))
    },200)
  }

  render() {
    return (
      <div className="forms-container">
        {
          this.state.displayLogin
          ?
          <div className="login-form-container">
            <h3 className="form-heading">Welcome back to BucketList!</h3>
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
          <h5 className="hyperlink" onClick={this.handleFormToggle}>Click to create a new account</h5>
          </div>
          :
          <div className="signup-form-container">
            <h3 className="form-heading">Welcome to BucketList!</h3>
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
            <h5 className="hyperlink" onClick={this.handleFormToggle}>Back to login</h5>
          </div>
        }
      </div>
    )
  }

} // end of Login component

export default connect(null,actions)(Login);
