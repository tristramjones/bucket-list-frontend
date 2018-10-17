import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:3000/api/v1';

class NewPopup extends Component {
  state = {
    popupTitle: '',
    popupDescription: '',
  };

  persistAttractionToBackend = (event) => {
    event.preventDefault();

    const title = this.state.popupTitle
    const desc = this.state.popupDescription
    const trip_id = this.props.currentTrip.id
    const position = this.props.currentAttraction.event.latlng

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
      <Popup position={this.props.currentAttraction.event.latlng}>
        <div className="popup-container">
          <form onSubmit={this.persistAttractionToBackend}>
            <input
              data-label="popupTitle"
              className="search-input"
              onChange={this.handleFormFieldChange}
              placeholder="Title">
            </input>
            <input
              data-label="popupDescription"
              className="search-input"
              onChange={this.handleFormFieldChange}
              placeholder="Description">
            </input>
            <input
              className="search-button"
              type="Submit">
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

const mapDispatchToProps = (dispatch) => {
  return {
    addAttraction: (title,desc,trip_id,position,toggle) => {
      dispatch({
        type: 'ADD_ATTRACTION',
        payload: {
          title: title,
          description: desc,
          trip_id: trip_id,
          position: position
        }
      })
      // dispatch({
      //   type: 'TOGGLE_NEW_POPUP',
      //   payload: toggle
      // })
    },
    // popupToggle: (toggle) => {
    //   dispatch({
    //     type: 'TOGGLE_POPUP',
    //     payload: toggle
    //   })
    // },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewPopup);
