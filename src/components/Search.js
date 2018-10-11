import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css';

const BASE_URL = 'http://localhost:3000/api/v1';

class Search extends Component {
  state = { input: '' };

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }

  handleSearch = (event) => {
    const query = this.state.input.split(' ').join('%20').toLowerCase();
    fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&city=' + query)
    .then(r=>r.json())
    .then(locations=>this.props.addLocation(locations[0]))
    .then(action=>this.persistLocationsToBackend(this.props.locations[this.props.locations.length-1]))
  }

  persistLocationsToBackend = (location_obj) => {
    fetch(`${BASE_URL}/locations`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: location_obj.display_name.split(', ')[0],
        location: location_obj
      })
    })
  }

  render() {
    console.log(this.props.locations)
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
    locations: state.locations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLocation: (location) => {
      dispatch({
        type: 'ADD_LOCATION',
        payload: location
      })
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)