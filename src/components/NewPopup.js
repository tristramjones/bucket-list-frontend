import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import * as actions from '../actions'

const BASE_URL = 'http://localhost:3000/api/v1';

class NewPopup extends Component {
  state = {
    popupTitle: '',
    popupDescription: '',
    popupCategory: '',
  };

  persistAttraction = (event) => {
    event.preventDefault();

    const title = this.state.popupTitle
    const category = this.state.popupCategory
    const desc = this.state.popupDescription
    const trip_id = this.props.currentTrip.id
    const position = this.props.newMarker.latlng

    fetch(`${BASE_URL}/attractions`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title: title,
        category: category,
        description: desc,
        trip_id: trip_id,
        position: JSON.stringify(position)
      })
    })
    .then(res=>res.json())
    .then(attractionObj=>this.props.addAttraction(attractionObj,false))
  }

  handleFormFieldChange = (event) => {
    this.setState({
      [event.target.dataset.label]: event.target.value
    })
  }

  render() {
    return (
      <Popup position={this.props.newMarker.latlng}>
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
            <div className="select-div">
              <label>
                <select>
                  <option value="food">Food</option>
                  <option value="event">Event</option>
                  <option value="adventure">Adventure</option>
                </select>
              </label>
            </div>
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
    currentTrip: state.currentTrip,
    newMarker: state.newMarker,
  }
}

export default connect(mapStateToProps,actions)(NewPopup);
