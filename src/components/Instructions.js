import React from 'react';
import '../App.css';

export const Instructions = () => {
  return (
    <div className="instructions-container">
      <h2>Start exploring by...</h2>
      <ul>
        <li>Search anywhere in the world by city name</li>
        <li>Click on the map to create bucket list items</li>
        <li>Click on the markers you created to edit them</li>
        <li>Use the filters to see only certain categories of bucket list items</li>
      </ul>
    </div>
  )
}
