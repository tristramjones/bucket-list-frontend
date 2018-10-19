import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import * as actions from '../actions'

const BASE_URL = 'http://localhost:3000/api/v1';

class BasicPopup extends Component {
  state = {
    popupTitle: this.props.currentAttraction.title,
    popupDescription: this.props.currentAttraction.description,
    editPopup: false,
  };

  handleEditPopup = (event) => {
    this.setState({ editPopup: !this.state.editPopup })
  }

  handleFormFieldChange = (event) => {
    this.setState({
      [event.target.dataset.label]: event.target.value
    })
  }

  persistChanges = (event) => {
    event.preventDefault();

    fetch(`${BASE_URL}/attractions/${this.props.currentAttraction.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        title: this.state.popupTitle,
        description: this.state.popupDescription,
        trip_id: this.props.currentAttraction.trip_id,
        position: this.props.currentAttraction.position
      })
    })
    .then(res=>this.setState({ editPopup: false }))
    .then(res=>this.props.getAllAttractions())
  }

  handleDeleteAttraction = (event) => {
    fetch(`${BASE_URL}/attractions/${this.props.currentAttraction.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    const currentAttraction = this.props.attractions.find(a=>a.id===this.props.currentAttraction.id)
    const index = this.props.attractions.indexOf(currentAttraction)
    const newAttractions = this.props.attractions
    newAttractions.splice(index,1)
    this.props.deleteAttraction(newAttractions)
    this.props.basicPopupToggle(false)
  }

  render() {
    return (
      this.state.editPopup
      ?
      <Popup position={JSON.parse(this.props.currentAttraction.position)}>
        <div className="popup-container">
          <form onSubmit={this.persistChanges}>
            <input
              data-label="popupTitle"
              className="popup-input"
              onChange={this.handleFormFieldChange}
              value={this.state.popupTitle}>
            </input>
            <input
              data-label="popupDescription"
              className="popup-input"
              onChange={this.handleFormFieldChange}
              value={this.state.popupDescription}>
            </input>
            <input
              className="popup-button"
              type="submit"
              value="Save">
            </input>
          </form>
        </div>
      </Popup>
      :
      <Popup position={JSON.parse(this.props.currentAttraction.position)}>
        <div className="popup-container">
          <h2 className="popup-title">{this.state.popupTitle}</h2>
          <div className="popup-description">
            <p>{this.state.popupDescription}</p>
          </div>
          <img
            className="edit-icon"
            src="https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png"
            onClick={this.handleEditPopup}
            alt="edit-icon"
            />
          <img
            className="delete-icon"
            src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/52-512.png"
            onClick={this.handleDeleteAttraction}
            alt="delete-icon"
            />
        </div>
      </Popup>
    );
  }

} // end of NewPopup component

const mapStateToProps = (state) => {
  return {
    attractions: state.attractions,
    currentAttraction: state.currentAttraction,
  }
}

export default connect(mapStateToProps,actions)(BasicPopup);
