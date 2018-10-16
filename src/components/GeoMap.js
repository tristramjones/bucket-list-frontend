import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import L from 'leaflet'
// import { CustomPopup } from './CustomPopup'
import '../App.css'

const BASE_URL = 'http://localhost:3000/api/v1';
const stamenTerrainTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTerrainAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const zoomLevel = 12;

class GeoMap extends Component {
  constructor() {
    super();
    this.state = {
      currentZoomLevel: zoomLevel,
      popupIsDisplayed: false,
      currentAttraction: null,
      popupTitle: '',
      popupDescription: '',
    };
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
  }

  handleZoomLevelChange = (newZoomLevel) => {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  handleMarkerCreation = (event) => {
    const leafletMap = this.leafletMap.leafletElement;
    const lat = event.latlng.lat
    const lng = event.latlng.lng
    const marker = L.marker([lat,lng]).addTo(leafletMap)
    return marker
  }

  persistAttractionToBackend = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/attractions`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title: this.state.popupTitle,
        description: this.state.popupDescription,
        trip_id: this.props.currentTrip.id,
        position: JSON.stringify(this.state.currentAttraction._latlng)
      })
    })
    .then(this.setState({
      popupIsDisplayed: false
    }))
  }

  handlePopupDisplay = (event) => {
    this.setState({
      popupIsDisplayed: !this.state.popupIsDisplayed,
      currentAttraction: event.target,
    })
  }

  handlePopupTitleChange = (event) => {
    this.setState({
      popupTitle: event.target.value
    })
  }

  handlePopupDescriptionChange = (event) => {
    this.setState({
      popupDescription: event.target.value
    })
  }

  render() {
    return (
      <Map
        className="map"
        ref={m => { this.leafletMap = m; } }
        center={
          [this.props.locations[this.props.locations.length-1].lat,
          this.props.locations[this.props.locations.length-1].lon]
        }
        zoom={zoomLevel}
        onClick={this.handleMarkerCreation}
      >
        <TileLayer
          attribution={stamenTerrainAttr}
          url={stamenTerrainTiles}
        />
      {
        this.props.attractions.map(a =>
          <Marker
            key={a.id}
            position={ JSON.parse(a.position) }
            onClick={ this.handlePopupDisplay }>
          </Marker>
        )
      }
      {
        this.state.popupIsDisplayed ?
        <Popup position={this.state.currentAttraction._latlng}>
          <div className="popup-container">
            <form onSubmit={this.persistAttractionToBackend}>
              <input
                className="search-input"
                onChange={this.handlePopupTitleChange}
                placeholder="Title">
              </input>
              <input
                className="search-input"
                onChange={this.handlePopupDescriptionChange}
                placeholder="Description">
              </input>
              <input
                className="search-button"
                type="Submit">
              </input>
            </form>
          </div>
        </Popup>
        : null
      }
      </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    currentTrip: state.currentTrip,
    trips: state.trips,
    attractions: state.attractions,
  }
}

export default connect(mapStateToProps)(GeoMap);
