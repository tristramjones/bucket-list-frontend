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
      currentZoomLevel: zoomLevel
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

  handlePopup = (event) => {
    this.props.togglePopup(this.props.togglePopup)
    // event.target.bindPopup(`<CustomPopup />`).openPopup()
  }

  render() {
    console.log(this.props)
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
        this.props.attractions.map( (a) =>
          <Marker
            key={a.id}
            position={ JSON.parse(a.position) }
            onClick={ this.handlePopup }>
          </Marker>
        )
      }
      { this.props.openPopup ? <CustomPopup /> : null }
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
    togglePopup: state.togglePopup,
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
    togglePopup: (currentStatus) => {
      dispatch({
        type: 'TOGGLE_POPUP',
        payload: !currentStatus
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GeoMap);
