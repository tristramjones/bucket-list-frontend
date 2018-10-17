import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:3000/api/v1';

class BasicPopup extends Component {
  state = {
    popupTitle: '',
    popupDescription: '',
  };

  render() {
    console.log(this.props.currentMarker)
    console.log(this.props.isBasicPopupDisplayed)
    return (
      <Popup position={JSON.parse(this.props.currentMarker.position)}>
        <div className="popup-container">
          <form>
            <input
              data-label="popupTitle"
              className="search-input"
              placeholder={this.props.currentMarker.title}>
            </input>
            <input
              data-label="popupDescription"
              className="search-input"
              placeholder={this.props.currentMarker.description}>
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
    isBasicPopupDisplayed: state.isBasicPopupDisplayed,
    currentMarker: state.currentMarker,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BasicPopup);
