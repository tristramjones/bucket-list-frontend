import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from './components/Menu'
import './App.css';

const BASE_URL = 'http://localhost:3000/api/v1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuDisplayed: false,
      markers: []
    };
  }

  persistMarkerToBackend = (name,lat,lng) => {
    fetch(`${BASE_URL}/locations`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: name
      })
    })
  }

  handleMarkerCreation = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
    .then(r=>r.json())
    .then(data=> {
      this.setState(previousState => {
        return {
          markers: [
            ...previousState.markers,
            {
              title: "",
              name: data.address.city,
              position: { lat, lng }
            }
          ]
        }
      },()=>this.persistMarkerToBackend(data.address.city,lat,lng))
    });
  }

  handleMenuDisplay = () => {
    this.setState({
      isMenuDisplayed: !this.state.isMenuDisplayed
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="app-container">
        { this.state.isMenuDisplayed ? <Menu locations={ this.state.markers }/> : null }
        <Map className="map" google={this.props.google} onClick={this.handleMarkerCreation} zoom={14}>
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
              onClick={this.handleMenuDisplay}
            />
          ))}
        </Map>
      </div>
    );
  }

} // end of App component

const mapStateToProps = (state) => {
  return {
    markers: state.markers
  }
}

const appWrappedByMap = GoogleApiWrapper({
  apiKey:''
})(App)

export default connect(mapStateToProps)(appWrappedByMap)



// onInfoWindowClose = () => {
//   console.log("window was closed")
// }
//
// <InfoWindow onClose={this.onInfoWindowClose}>
// </InfoWindow>
