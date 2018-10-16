import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from './components/Menu'
import Search from './components/Search'
import GeoMap from './components/GeoMap'
import './App.css';

const BASE_URL = 'http://localhost:3000/api/v1';

class App extends Component {

  componentWillMount = () => {
    fetch(`${BASE_URL}/attractions`)
    .then(res=>res.json())
    .then(attractions=>this.props.dispatchAllAttractions(attractions))
  }

  render() {
    console.log(this.props.locations)
    return (
      <div className="app-container">
        <Search />
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
