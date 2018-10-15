import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:3000/api/v1';

class CustomPopup extends Component {

  render() {
    return (
      <Popup>A pretty CSS3 popup.
        <br />Easily customizable.
      </Popup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    currentTrip: state.currentTrip,
    trips: state.trips
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomPopup);

// <Popup>
// <ArtworkPopup />
// </Popup>
