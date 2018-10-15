import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from './components/Menu'
import Search from './components/Search'
import GeoMap from './components/GeoMap'
import './App.css';

const BASE_URL = 'http://localhost:3000/api/v1';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isMenuDisplayed: false,
    };
  }

  handleMenuDisplay = () => {
    this.setState({
      isMenuDisplayed: !this.state.isMenuDisplayed
    })
  }

  componentWillMount = () => {
    fetch(`${BASE_URL}/attractions`)
    .then(res=>res.json())
    .then(attractions=>this.props.dispatchAllAttractions(attractions))
    // .then(res=>this.props.trips.map((t) => {
    //   const position = [JSON.parse(t.position).lat,JSON.parse(t.position).lng]
    //   const position = L.marker([JSON.parse(t.position).lat,JSON.parse(t.position).lng]).addTo(leafletMap)
    //   return <Marker position={ position }></Marker>
    // }))
  }

  render() {
    return (
      <div className="app-container">
        <Search />
        { this.state.isMenuDisplayed ? <Menu locations={ this.props.markers }/> : null }
        { this.props.locations.length > 0 ? <GeoMap /> : null }
      </div>
    );
  }

} // end of App component

const mapStateToProps = (state) => {
  return {
    locations: state.locations
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

export default connect(mapStateToProps,mapDispatchToProps)(App)
