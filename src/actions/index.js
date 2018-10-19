import {
  ADD_LOCATION,
  SET_CURRENT_TRIP,
  SET_ALL_ATTRACTIONS,
  ADD_ATTRACTION,
  NEW_MARKER,
  TOGGLE_NEW_POPUP,
  TOGGLE_BASIC_POPUP,
  SET_CURRENT_ATTRACTION,
  DELETE_ATTRACTION,
} from './types.js'

const BASE_URL = 'http://localhost:3000/api/v1';

export const setNewMarker = (event) => (dispatch) => {
  dispatch({ type: NEW_MARKER, payload: event })
}

export const newPopupToggle = (toggle) => (dispatch) => {
  dispatch({ type: TOGGLE_NEW_POPUP, payload: toggle })
}

export const attractionSelected = (attraction) => (dispatch) => {
  dispatch({ type: SET_CURRENT_ATTRACTION, payload: attraction })
}

export const basicPopupToggle = (toggle) => (dispatch) => {
  dispatch({ type: TOGGLE_BASIC_POPUP, payload: toggle })
}

export const addLocation = (location) => (dispatch) => {
  dispatch({ type: ADD_LOCATION, payload: location })
}

export const setCurrentTrip = (currentTrip) => (dispatch) => {
  dispatch({ type: SET_CURRENT_TRIP, payload: currentTrip })
}

export const deleteAttraction = (attractions) => (dispatch) => {
  dispatch({ type: DELETE_ATTRACTION, payload: attractions })
}

export const getAllAttractions = () => (dispatch) => {
  fetch(`${BASE_URL}/attractions`)
  .then(res=>res.json())
  .then(attractions=>dispatch({ type: SET_ALL_ATTRACTIONS, payload: attractions }))
}

export const addAttraction = (attractionObj,toggle) => (dispatch) => {
  dispatch({
    type: ADD_ATTRACTION,
    payload: {
      id: attractionObj.id,
      title: attractionObj.title,
      description: attractionObj.description,
      trip_id: attractionObj.trip_id,
      position: attractionObj.position
    }
  })
  dispatch({ type: 'TOGGLE_NEW_POPUP', payload: toggle })
}
