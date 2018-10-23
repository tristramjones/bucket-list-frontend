import {
  SET_CURRENT_USER,
  ADD_LOCATION,
  SET_CURRENT_TRIP,
  SET_ALL_ATTRACTIONS,
  ADD_ATTRACTION,
  NEW_MARKER,
  TOGGLE_NEW_POPUP,
  TOGGLE_BASIC_POPUP,
  SET_CURRENT_ATTRACTION,
  DELETE_ATTRACTION,
  FILTER_FOOD,
  FILTER_EVENTS,
  FILTER_ADVENTURES,
  RESET_FILTER,
} from './types.js'

const BASE_URL = 'http://localhost:3000/api/v1';

export const setCurrentUser = (user) => (dispatch) => {
  dispatch({ type: SET_CURRENT_USER, payload: user })
}

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

export const applyEventFilter = (attractions) => (dispatch) => {
  dispatch({ type: FILTER_EVENTS, payload: attractions.filter(a=>a.category==='Event') })
}

export const applyFoodFilter = (attractions) => (dispatch) => {
  dispatch({ type: FILTER_FOOD, payload: attractions.filter(a=>a.category==='Food') })
}

export const applyAdventureFilter = (attractions) => (dispatch) => {
  dispatch({ type: FILTER_ADVENTURES, payload: attractions.filter(a=>a.category==='Adventure') })
}

export const removeFilters = () => (dispatch) => {
  dispatch({ type: RESET_FILTER, payload: [] })
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
      category: attractionObj.category,
      title: attractionObj.title,
      description: attractionObj.description,
      trip_id: attractionObj.trip_id,
      position: attractionObj.position
    }
  })
  dispatch({ type: 'TOGGLE_NEW_POPUP', payload: toggle })
}
