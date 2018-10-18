import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import '../App.css';

const BASE_URL = 'http://localhost:3000/api/v1';

class Search extends Component {
  state = {
    input: ''
  };

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }

  handleSearch = (event) => {
    event.preventDefault();
    const query = this.state.input.split(' ').join('%20').toLowerCase();
    fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&city=' + query)
    .then(r=>r.json())
    .then(locations=>this.props.addLocation(locations[0]))
    .then(action=>this.persistLocationToBackend(this.props.locations[this.props.locations.length-1]))
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
    .then(r=>this.fetchIdOfLocation(location_obj))
  }

  fetchIdOfLocation = (location_obj) => {
    let currentLocation;
    fetch(`${BASE_URL}/locations`)
    .then(res=>res.json())
    .then(locations=> {
      currentLocation = locations.find(l=>JSON.parse(l.location_json).place_id === location_obj.place_id)
    })
    .then(r=>this.persistTripToBackend(currentLocation))
  }

  persistTripToBackend = (currentLocation) => {
    fetch(`${BASE_URL}/trips`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: 1,
        location_id: currentLocation.id
      })
    })
    .then(r=>this.dispatchCurrentTrip(currentLocation))
  }

  dispatchCurrentTrip = (currentLocation) => {
    let currentTrip;
    fetch(`${BASE_URL}/trips`)
    .then(res=>res.json())
    .then(trips=> {
      currentTrip = trips.find(t=>t.location_id === currentLocation.id)
    })
    .then(r=>(this.props.setCurrentTrip(currentTrip)))
  }

  render() {
    return (
      <div className="search-container">
        <h3>Plan Your Next Adventure</h3>
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
              value="Search">
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
