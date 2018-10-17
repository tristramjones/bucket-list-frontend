import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:3000/api/v1';

class BasicPopup extends Component {
  state = {
    popupTitle: this.props.currentMarker.title,
    popupDescription: this.props.currentMarker.description,
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

    fetch(`${BASE_URL}/attractions/${this.props.currentMarker.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        title: this.state.popupTitle,
        description: this.state.popupDescription,
        trip_id: this.props.currentMarker.trip_id,
        position: this.props.currentMarker.position
      })
    })
    .then(res=>this.setState({ editPopup: false }))
    // .then(res=>this.props.editAttraction(this.state.popupTitle,this.state.popupDescription,this.props.currentMarker))
  }

  render() {
    return (
      this.state.editPopup
      ?
      <Popup position={JSON.parse(this.props.currentMarker.position)}>
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
      <Popup position={JSON.parse(this.props.currentMarker.position)}>
        <div className="popup-container">
          <h2 className="popup-title">{this.props.currentMarker.title}</h2>
          <p className="popup-description">{this.props.currentMarker.description}</p>
          <button className="search-button" onClick={this.handleEditPopup}>Edit</button>
        </div>
      </Popup>
    );
  }

} // end of NewPopup component

const mapStateToProps = (state) => {
  return {
    isBasicPopupDisplayed: state.isBasicPopupDisplayed,
    currentMarker: state.currentMarker,
  }
}

// const mapDispatchToProps = (state) => {
//   return {
//     editAttraction: (title,desc,marker) {
//       dispatch({
//         type: EDIT_ATTRACTION,
//         payload:
//       })
//     }
//   }
// }

export default connect(mapStateToProps,mapDispatchToProps)(BasicPopup);
