import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import L from 'leaflet'

const stamenTerrainTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png';
const stamenTerrainAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.9528, -75.1638];
const zoomLevel = 2;

class GeoMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoomLevel: zoomLevel,
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
    const position = L.marker([lat,lng]).addTo(leafletMap)
    return <Marker position={ position }></Marker>
  }

  render() {
    return (
      <Map
        className="map"
        ref={m => { this.leafletMap = m; }}
        center={mapCenter}
        zoom={zoomLevel}
        onClick={this.handleMarkerCreation}
      >
        <TileLayer
          attribution={stamenTerrainAttr}
          url={stamenTerrainTiles}
        />
      </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GeoMap);

// <Popup>
// <ArtworkPopup />
// </Popup>
