import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const BASE_URL = 'https://bucketlistbackend.herokuapp.com/api/v1';
// const BASE_URL = 'http://localhost:3000/api/v1'

class Login extends Component {
  state = {
    loginUsername: '',
    loginPassword: '',
    signupUsername: '',
    signupPassword: '',
    displayLogin: true,
    errorMessage: null,
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
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: { username: this.state.loginUsername, password: this.state.loginPassword }
      })
    })
    .then(res=>{
      if(!res.ok) { throw res }
      return res.json()
    })
    .then(user=>{
      this.setState({ errorMessage: null })
      localStorage.currentUser = JSON.stringify(user);
      this.setUser();
      this.props.setCurrentTrip(null);
    })
    // .catch(err=>err.json()
    // .then(obj=>this.setState({ errorMessage: '***'+obj.message+'***' })));
  }

  handleSignup = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: { username: this.state.loginUsername, password: this.state.loginPassword }
      })
    })
    .then(res=>{
      if(!res.ok) { throw res }
      return res.json()
    })
    .then(user=>{
      this.setState({ errorMessage: null })
      localStorage.currentUser = JSON.stringify(user);
      this.setUser();
      this.props.setCurrentTrip(null);
    })
    // .catch(err=>err.json()
    // .then(obj=>this.setState({ errorMessage: '***'+obj.message+'***' })));
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
            <h1 className="form-heading">Welcome back to BucketList!</h1>
            <h5 className="invalid">{ this.state.errorMessage }</h5>
            <form onSubmit={this.handleLogin}>
              <input
                data-label="loginUsername"
                className="login-input"
                onChange={this.handleLoginChange}
                placeholder="Username">
              </input><br></br>
              <input
                data-label="loginPassword"
                className="login-input"
                onChange={this.handleLoginChange}
                type="password"
                placeholder="Password">
              </input><br></br>
              <input
                className="login-button"
                type="submit"
                value="Login">
              </input>
            </form>
          <h5 className="hyperlink" onClick={this.handleFormToggle}>Click to create a new account</h5>
          </div>
          :
          <div className="signup-form-container">
            <h1 className="form-heading">Welcome to BucketList!</h1>
            <form onSubmit={this.handleSignup}>
              <input
                data-label="signupUsername"
                className="login-input"
                onChange={this.handleSignupChange}
                placeholder="Username">
              </input><br></br>
              <input
                data-label="signupPassword"
                className="login-input"
                onChange={this.handleSignupChange}
                type="password"
                placeholder="Password">
              </input><br></br>
              <input
                className="login-button"
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
