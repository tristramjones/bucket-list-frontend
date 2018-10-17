
const defaultState = {
  locations: [],
  currentTrip: null,
  trips: [],
  attractions: [],
  currentAttraction: null,
  isNewPopupDisplayed: false,
  isBasicPopupDisplayed: false,
  currentMarker: null,
}

const ADD_LOCATION = 'ADD_LOCATION'
const SET_CURRENT_TRIP = 'SET_CURRENT_TRIP'
const SET_ALL_TRIPS = 'SET_ALL_TRIPS'
const SET_ALL_ATTRACTIONS = 'SET_ALL_ATTRACTIONS'
const ADD_ATTRACTION = 'ADD_ATTRACTION'
const CURRENT_ATTRACTION = 'CURRENT_ATTRACTION'
const TOGGLE_NEW_POPUP = 'TOGGLE_NEW_POPUP'
const TOGGLE_BASIC_POPUP = 'TOGGLE_BASIC_POPUP'
const CURRENT_MARKER =  'CURRENT_MARKER'
// const EDIT_ATTRACTION = 'EDIT_ATTRACTION'

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] }
    case SET_CURRENT_TRIP:
      return { ...state, currentTrip: action.payload }
    case SET_ALL_TRIPS:
      return { ...state, trips: action.payload }
    case SET_ALL_ATTRACTIONS:
      return { ...state, attractions: action.payload }
    case ADD_ATTRACTION:
      return { ...state, attractions: [...state.attractions, action.payload] }
    case CURRENT_ATTRACTION:
      return { ...state, currentAttraction: action.payload }
    case TOGGLE_NEW_POPUP:
      return { ...state, isNewPopupDisplayed: action.payload }
    case TOGGLE_BASIC_POPUP:
      return { ...state, isBasicPopupDisplayed: action.payload }
    case CURRENT_MARKER:
      return { ...state, currentMarker: action.payload }
    // case EDIT_ATTRACTION:
    //   return { ...state, attractions: [...state.attractions, action.payload] }
    default:
      return state
  }
}

export default reducer
