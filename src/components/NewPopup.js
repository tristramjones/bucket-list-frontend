import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import * as actions from '../actions'

const BASE_URL = 'http://localhost:3000/api/v1';

class NewPopup extends Component {
  state = {
    popupTitle: '',
    popupDescription: '',
  };

  persistAttraction = (event) => {
    event.preventDefault();

    const title = this.state.popupTitle
    const desc = this.state.popupDescription
    const trip_id = this.props.currentTrip.id
    const position = this.props.currentAttraction.latlng

    fetch(`${BASE_URL}/attractions`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: desc,
        trip_id: trip_id,
        position: JSON.stringify(position)
      })
    })
    .then(res=>this.props.addAttraction(title,desc,trip_id,JSON.stringify(position),false))
  }

  handleFormFieldChange = (event) => {
    this.setState({
      [event.target.dataset.label]: event.target.value
    })
  }

  render() {
    return (
      <Popup position={this.props.currentAttraction.latlng}>
        <div className="popup-container">
          <form onSubmit={this.persistAttraction}>
            <input
              data-label="popupTitle"
              className="popup-input"
              onChange={this.handleFormFieldChange}
              placeholder="Title">
            </input>
            <input
              data-label="popupDescription"
              className="popup-input"
              onChange={this.handleFormFieldChange}
              placeholder="Description">
            </input>
            <input
              className="popup-button"
              type="submit"
              value="Save">
            </input>
          </form>
        </div>
      </Popup>
    );
  }

} // end of NewPopup component

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    currentTrip: state.currentTrip,
    trips: state.trips,
    attractions: state.attractions,
    currentAttraction: state.currentAttraction,
    isNewPopupDisplayed: state.isNewPopupDisplayed,
  }
}

export default connect(mapStateToProps,actions)(NewPopup);
