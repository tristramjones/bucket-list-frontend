import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './components/Search';
import GeoMap from './components/GeoMap';
import MapNav from './components/MapNav';
import { Instructions } from './components/Instructions';
import * as actions from './actions';
import './App.css';

class App extends Component {

  componentWillMount = () => {
    this.props.getAllAttractions()
    setTimeout(()=>{
      this.props.setCurrentUser(JSON.parse(localStorage.currentUser))
    },200)
  }

  render() {
    return (
      <div className="app-container">
        <Search />
        { this.props.currentTrip
          ?
          <div className="map-container">
            <MapNav />
            <GeoMap />
          </div>
          :
          <Instructions />
        }
      </div>
    );
  }

} // end of App component

const mapStateToProps = (state) => {
  return {
    currentTrip: state.currentTrip
  }
}

export default connect(mapStateToProps,actions)(App)
