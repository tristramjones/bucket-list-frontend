import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import NewPopup from './NewPopup'
import BasicPopup from './BasicPopup'
import '../App.css'

const stamenTerrainTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTerrainAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const zoomLevel = 12;

class GeoMap extends Component {
  state = {
    currentZoomLevel: zoomLevel,
  };

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

  handleNewPopup = (event) => {
    if(this.props.isPopupDisplayed) {
      this.props.popupToggle(false)
    } else {
      this.props.currentAttraction(event)
      this.props.popupToggle(true)
    }
  }

  handlePopupDisplay = (event) => {
    const marker = this.props.attractions.find(a=>{
      return JSON.parse(a.position).lat === event.latlng.lat && JSON.parse(a.position).lng === event.latlng.lng
    })
    this.props.markerSelected(marker)
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
        onClick={this.handleNewPopup}
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
      { this.props.isPopupDisplayed ? <NewPopup /> : null }
      { this.props.currentMarker ? <BasicPopup /> : null }
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
    currentAttraction: state.currentAttraction,
    isPopupDisplayed: state.isPopupDisplayed,
    isBasicPopupDisplayed: state.isBasicPopupDisplayed,
    currentMarker: state.currentMarker,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentAttraction: (event) => {
      dispatch({
        type: 'CURRENT_ATTRACTION',
        payload: { event }
      })
    },
    popupToggle: (toggle) => {
      dispatch({
        type: 'TOGGLE_POPUP',
        payload: toggle
      })
    },
    markerSelected: (marker) => {
      dispatch({
        type: 'TOGGLE_BASIC_POPUP',
        payload: true
      })
      dispatch({
        type: 'CURRENT_MARKER',
        payload: marker
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GeoMap);
