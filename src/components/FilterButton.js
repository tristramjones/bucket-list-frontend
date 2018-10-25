import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../App.css';

class FilterButton extends Component {

  handleFiltersToggle = (event) => {
    this.props.toggleFilters(!this.props.areFiltersDisplayed)
  }

  render() {
    return (
      <div className="filter-button-container">
        <button onClick={this.handleFiltersToggle}>
          { this.props.areFiltersDisplayed ? 'Hide Filters' : 'Show Filters' }
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    areFiltersDisplayed: state.areFiltersDisplayed
  }
}

export default connect(mapStateToProps,actions)(FilterButton);
