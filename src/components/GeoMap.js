import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import L from 'leaflet'
import { CustomPopup } from './CustomPopup'
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
      popupTitleChange: '',
      popupDescriptionChange: '',
    };
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });

    fetch(`${BASE_URL}/attractions`)
    .then(res=>res.json())
    .then(attractions=>this.props.dispatchAllAttractions(attractions))
    .then(res=>this.props.trips.map((t) => {
      return L.marker([JSON.parse(t.position).lat,JSON.parse(t.position).lng]).addTo(leafletMap)
    }))
  }

  handleZoomLevelChange = (newZoomLevel) => {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  handleMarkerCreation = (event) => {
    const leafletMap = this.leafletMap.leafletElement;
    const lat = event.latlng.lat
    const lng = event.latlng.lng
    const marker = L.marker([lat,lng]).addTo(leafletMap)
    this.persistAttractionToBackend(marker)
    return marker
  }

  persistAttractionToBackend = (marker) => {
    fetch(`${BASE_URL}/attractions`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title: '',
        description: '',
        trip_id: this.props.currentTrip.id,
        position: JSON.stringify(marker._latlng)
      })
    })
  }

  handlePopupDisplay = (event) => {
    this.setState({
      popupIsDisplayed: !this.state.popupIsDisplayed,
      currentAttraction: event.target,
    })
  }

  handlePopupTitleChange = (event) => {
    this.setState({
      popupTitleChange: event.target.value
    })
  }

  handlePopupDescriptionChange = (event) => {
    console.log(event.target.parentElement)
    this.setState({
      popupDescriptionChange: event.target.value
    })
  }

  render() {
    console.log(this.state.currentAttraction)
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
            <form onSubmit={this.persistAttractionChanges}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAllAttractions: (attractions) => {
      dispatch({
        type: 'SET_ALL_ATTRACTIONS',
        payload: attractions
      })
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GeoMap);
