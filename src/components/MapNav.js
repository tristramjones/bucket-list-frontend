import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

class MapNav extends Component {
  state = {
  };

  render() {
    return (
      <div className="map-nav-container" role="group">
        <button className="map-nav-button">Show All</button>
        <button className="map-nav-button">My Food</button>
        <button className="map-nav-button">My Hikes</button>
        <button className="map-nav-button">My Sites</button>
      </div>
    );
  }

} // end of MapNav component

const mapStateToProps = (state) => {
  return {
    currentTrip: state.currentTrip,
    newMarker: state.newMarker,
  }
}

export default connect(mapStateToProps,actions)(MapNav);
