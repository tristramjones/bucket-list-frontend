import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

class MapNav extends Component {
  state = {
  };

  render() {
    return (
      <div className="map-nav-container" role="group">
        <button className="map-nav-button" onClick={this.props.removeFilters}>Show All</button>
        <button className="map-nav-button" onClick={()=>this.props.applyFoodFilter(this.props.attractions)}>Food</button>
        <button className="map-nav-button" onClick={()=>this.props.applyEventFilter(this.props.attractions)}>Events</button>
        <button className="map-nav-button" onClick={()=>this.props.applyAdventureFilter(this.props.attractions)}>Adventures</button>
      </div>
    );
  }

} // end of MapNav component

const mapStateToProps = (state) => {
  return {
    currentTrip: state.currentTrip,
    attractions: state.attractions,
    newMarker: state.newMarker,
  }
}

export default connect(mapStateToProps,actions)(MapNav);
