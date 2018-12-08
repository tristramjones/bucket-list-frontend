import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../App.css';

class FilterButton extends Component {

  handleFiltersToggle = (event) => {
    parseInt(this.props.mapNavHeight) ? this.props.toggleFilters("0") : this.props.toggleFilters("40")
  }

  render() {
    return (
      <div className="filter-button-container">
        <button onClick={this.handleFiltersToggle}>
          { parseInt(this.props.mapNavHeight) ? 'Hide Filters' : 'Show Filters' }
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapNavHeight: state.mapNavHeight
  }
}

export default connect(mapStateToProps,actions)(FilterButton);
