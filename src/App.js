import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './components/Search';
import GeoMap from './components/GeoMap';
import MapNav from './components/MapNav';
import * as actions from './actions';
import './App.css';

class App extends Component {

  componentWillMount = () => {
    this.props.getAllAttractions()
  }

  render() {
    return (
      <div className="app-container">
        <Search />
        { this.props.locations.length > 0
          ?
          <div className="map-container">
            <MapNav />
            <GeoMap />
          </div>
          :
          null
        }
      </div>
    );
  }

} // end of App component

const mapStateToProps = (state) => {
  return {
    locations: state.locations
  }
}

export default connect(mapStateToProps,actions)(App)
