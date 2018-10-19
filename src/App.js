import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './components/Search';
import GeoMap from './components/GeoMap';
import * as actions from './actions';
import './App.css';

const BASE_URL = 'http://localhost:3000/api/v1';

class App extends Component {

  componentWillMount = () => {
    fetch(`${BASE_URL}/attractions`)
    .then(res=>res.json())
    .then(attractions=>this.props.getAllAttractions(attractions))
  }

  render() {
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

export default connect(mapStateToProps,actions)(App)
