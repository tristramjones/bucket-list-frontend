import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
// import CustomPopup from './CustomPopup'
import L from 'leaflet'

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

  handleZoomLevelChange = (newZoomLevel) => {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  // componentWillMount = () => {
  //   const leafletMap = this.leafletMap.leafletElement;
  //
  //   fetch(`${BASE_URL}/attractions`)
  //   .then(res=>res.json())
  //   .then(attractions=>this.props.dispatchAllAttractions(attractions))
  //   .then(res=>this.props.trips.map((t) => {
  //     // const position = [JSON.parse(t.position).lat,JSON.parse(t.position).lng]
  //     const position = L.marker([JSON.parse(t.position).lat,JSON.parse(t.position).lng]).addTo(leafletMap)
  //     return <Marker position={ position }></Marker>
  //   }))
  // }

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
      const position = L.marker([JSON.parse(t.position).lat,JSON.parse(t.position).lng]).addTo(leafletMap)
      return <Marker position={ position }></Marker>
    }))
  }

  handleMarkerCreation = (event) => {
    const leafletMap = this.leafletMap.leafletElement;
    const lat = event.latlng.lat
    const lng = event.latlng.lng
    const position = L.marker([lat,lng]).addTo(leafletMap)
    this.persistAttractionToBackend(position)
    return <Marker position={ position }></Marker>
  }

  persistAttractionToBackend = (position) => {
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
        position: JSON.stringify(position._latlng)
      })
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
      </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    currentTrip: state.currentTrip,
    trips: state.trips,
    attractions: state.attractions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAllAttractions: (attractions) => {
      dispatch({
        type: 'SET_ALL_ATTRACTIONS',
        payload: attractions
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GeoMap);

// <Popup>
// <ArtworkPopup />
// </Popup>
//
// { this.props.attractions.map(a => {
//     return (
//       <Marker
//         key={a.id}
//         position={[JSON.parse(a.position).lat,JSON.parse(a.position).lng]}
//         >
//       </Marker>
//     )
//   })
// }
