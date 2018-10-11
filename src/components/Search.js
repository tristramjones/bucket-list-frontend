import React, { Component } from 'react'
// import { connect } from 'react-redux'
import '../App.css';

class Search extends Component {
  state = {
    input: ''
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    console.log(this.state.input)
    return (
      <div className="search-container">
        <h2>Where To Next?</h2>
        <input className="search-input" value={this.state.input} onChange={this.handleInput}>
        </input>
        <button className="search-button">Search</button>
      </div>
    )
  }

} // end of Search component

export default Search
