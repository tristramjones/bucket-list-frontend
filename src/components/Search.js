import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import '../App.css';

const BASE_URL = 'http://localhost:3000/api/v1';

class Search extends Component {
  state = {
    input: '',
    errorMessage: false,
  };

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }

  handleSearch = (event) => {
    event.preventDefault();
    const query = this.state.input.split(' ').join('%20').toLowerCase();
    fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&city=' + query)
    .then(res=>res.json())
    .then(locations=> {
      if(locations.length > 0) {
        this.props.addLocation(locations[0])
        this.persistLocationToBackend(locations[0])
        this.setState({ errorMessage: false })
      } else {
        this.setState({ errorMessage: true })
      }
    })
  }

  persistLocationToBackend = (location_obj) => {
    fetch(`${BASE_URL}/locations`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: location_obj.display_name.split(', ')[0],
        location_json: JSON.stringify(location_obj)
      })
    })
    .then(res=>res.json())
    .then(location_obj=>this.persistTripToBackend(location_obj))
  }

  persistTripToBackend = (currentLocation) => {
    fetch(`${BASE_URL}/trips`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: JSON.parse(localStorage.currentUser).user.id,
        location_id: currentLocation.id
      })
    })
    .then(res=>res.json())
    .then(trip=>this.props.setCurrentTrip(trip))
  }

  render() {
    return (
      <div className="search-container">
        <h3>Plan Your Next Adventure</h3>
        { this.state.errorMessage ? <h5 className="invalid-city">Please enter a valid city name</h5> : null }
        <div>
          <form>
            <input
              className="search-input"
              value={this.state.input}
              placeholder="Enter a city name"
              onChange={this.handleInput}>
            </input>
            <input
              className="search-button"
              onClick={this.handleSearch}
              type="submit"
              value=" ">
            </input>
          </form>
        </div>
      </div>
    )
  };

} // end of Search component

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    currentTrip: state.currentTrip,
  }
}

export default connect(mapStateToProps,actions)(Search)
