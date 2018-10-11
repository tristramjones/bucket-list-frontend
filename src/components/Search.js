import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css';

class Search extends Component {
  state = { input: '' };

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }

  handleSearch = (event) => {
    const query = this.state.input.split(' ').join('%20').toLowerCase();
    fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&city=' + query)
    .then(r=>r.json())
    .then(data=>this.props.addCity(data[0]));
  }

  render() {
    console.log(this.props.cities)
    return (
      <div className="search-container">
        <h2>Where To Next?</h2>
        <input
          className="search-input"
          value={this.state.input}
          placeholder="Enter a city name"
          onChange={this.handleInput}>
        </input>
        <button className="search-button" onClick={this.handleSearch}>Search</button>
      </div>
    )
  };

} // end of Search component

const mapStateToProps = (state) => {
  return {
    cities: state.cities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCity: (data) => {
      dispatch({
        type: 'ADD_CITY',
        payload: data
      })
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)
