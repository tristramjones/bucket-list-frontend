import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import NewPopup from './NewPopup';
import BasicPopup from './BasicPopup';
import * as actions from '../actions';
import L from 'leaflet';
import '../App.css';

const openMapTiles = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png';
const zoomLevel = 12;
const foodIcon = L.icon({ iconUrl: require('./food.png'), iconSize: [28, 30], iconAnchor: [15, 30],})
const eventsIcon = L.icon({ iconUrl: require('./events.png'), iconSize: [28, 30], iconAnchor: [15, 30],})
const adventuresIcon = L.icon({ iconUrl: require('./adventures.png'), iconSize: [28, 30], iconAnchor: [15, 30],})

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

  handlePopupTogglesOnMapClicks = (event) => {
    if(this.props.isNewPopupDisplayed) {
      this.props.newPopupToggle(false)
    } else {
      this.props.setNewMarker(event)
      this.props.newPopupToggle(true)
    }

    if(this.props.isBasicPopupDisplayed) {
      this.props.basicPopupToggle(false)
      this.props.newPopupToggle(false)
    }
  }

  handlePopupTogglesOnMarkerClicks = (event) => {
    if(this.props.basicPopupToggle) {
      this.props.basicPopupToggle(false)
    }
    const attraction = this.props.attractions.find(a=>{
      return JSON.parse(a.position).lat === event.latlng.lat && JSON.parse(a.position).lng === event.latlng.lng
    })
    this.props.attractionSelected(attraction)
    this.props.basicPopupToggle(true)
  }

  render() {
    return (
      <Map
        className="map"
        ref={ m => this.leafletMap = m }
        center={
          [this.props.locations[this.props.locations.length-1].lat,
          this.props.locations[this.props.locations.length-1].lon]
        }
        zoom={zoomLevel}
        onClick={ this.handlePopupTogglesOnMapClicks }
      >
        <TileLayer
          url={openMapTiles}
        />
        {
          this.props.filteredAttractions.length > 0
          ?
          this.props.filteredAttractions.map(a =>
            <Marker
              key={a.id}
              position={ JSON.parse(a.position) }
              onClick={ this.handlePopupTogglesOnMarkerClicks }
              icon={ a.category === 'Food' ? foodIcon : a.category === 'Event' ? eventsIcon : adventuresIcon}>
            </Marker>
          )
          :
          this.props.attractions.map(a =>
            <Marker
              key={ a.id }
              position={ JSON.parse(a.position) }
              onClick={ this.handlePopupTogglesOnMarkerClicks }
              icon={ a.category === 'Food' ? foodIcon : a.category === 'Event' ? eventsIcon : adventuresIcon}>
            </Marker>
          )
        }
        { this.props.isNewPopupDisplayed ? <NewPopup /> : null }
        { this.props.isBasicPopupDisplayed ? <BasicPopup /> : null }
      </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    attractions: state.attractions,
    isNewPopupDisplayed: state.isNewPopupDisplayed,
    isBasicPopupDisplayed: state.isBasicPopupDisplayed,
    filteredAttractions: state.filteredAttractions
  }
}

export default connect(mapStateToProps,actions)(GeoMap);
