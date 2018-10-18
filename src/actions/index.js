import {
  ADD_LOCATION,
  SET_CURRENT_TRIP,
  SET_ALL_TRIPS,
  SET_ALL_ATTRACTIONS,
  ADD_ATTRACTION,
  CURRENT_ATTRACTION,
  TOGGLE_NEW_POPUP,
  TOGGLE_BASIC_POPUP,
  CURRENT_MARKER
} from './types.js'

const BASE_URL = 'http://localhost:3000/api/v1';


export const currentAttraction = (event) => (dispatch) => {
  dispatch({ type: 'CURRENT_ATTRACTION', payload: { event } })
}

export const newPopupToggle = (toggle) => (dispatch) => {
  dispatch({ type: 'TOGGLE_NEW_POPUP', payload: toggle })
}

export const markerSelected = (marker) => (dispatch) => {
  dispatch({ type: 'CURRENT_MARKER', payload: marker })
}

export const basicPopupToggle = (toggle) => (dispatch) => {
  dispatch({ type: 'TOGGLE_BASIC_POPUP', payload: toggle })
}

export const addLocation = (location) => (dispatch) => {
  dispatch({ type: 'ADD_LOCATION', payload: location })
}

export const setCurrentTrip = (currentTrip) => (dispatch) => {
  dispatch({ type: 'SET_CURRENT_TRIP', payload: currentTrip })
}

export const getAllAttractions = () => (dispatch) => {
  fetch(`${BASE_URL}/attractions`)
  .then(res=>res.json())
  .then(attractions=>dispatch({ type: SET_ALL_ATTRACTIONS, payload: attractions }))
}

export const addAttraction = (title,desc,trip_id,position,toggle) => (dispatch) => {
  dispatch({
    type: ADD_ATTRACTION,
    payload: {
      title: title,
      description: desc,
      trip_id: trip_id,
      position: position
    }
  })
  dispatch({ type: 'TOGGLE_NEW_POPUP', payload: toggle })
}
