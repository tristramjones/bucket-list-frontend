import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapNav extends Component {
  state = {
  };

  render() {
    return (
      <div className="map-nav-container" role="group" style={{ maxHeight: {this.props.mapNavHeight} }}>
        <button onClick={this.props.removeFilters} className="map-nav-button" name="all">Show All</button>
        <button onClick={()=>this.props.applyFoodFilter(this.props.attractions)} className="map-nav-button" name="food">Food</button>
        <button onClick={()=>this.props.applyEventFilter(this.props.attractions)} className="map-nav-button" name="events">Events</button>
        <button onClick={()=>this.props.applyAdventureFilter(this.props.attractions)} className="map-nav-button" name="adventures">Adventures</button>
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
