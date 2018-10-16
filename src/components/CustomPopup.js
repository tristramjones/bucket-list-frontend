import React from 'react';
import { Popup } from 'react-leaflet';

export const CustomPopup = () => {
  return (
    <Popup className="custom-popup">
      <form>
        <input placeholder="Title"></input>
        <input placeholder="Description"></input>
        <input className="search-button" type="Submit"></input>
      </form>
    </Popup>
  );
}
