import React from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';

const CustomPopup = () => {
  return (
    <Popup position={this.state.currentAttraction._latlng}>
      <div className="popup-container">
        <form onSubmit={this.persistAttractionChanges}>
          <input
            className="search-input"
            onChange={this.handlePopupTitleChange}
            placeholder="Title">
          </input>
          <input
            className="search-input"
            onChange={this.handlePopupDescriptionChange}
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
