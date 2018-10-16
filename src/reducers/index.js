
const defaultState = {
  locations: [],
  currentTrip: null,
  trips: [],
  attractions: [],
  currentAttraction: null,
  isPopupDisplayed: false,
}

const ADD_LOCATION = 'ADD_LOCATION'
const SET_CURRENT_TRIP = 'SET_CURRENT_TRIP'
const SET_ALL_TRIPS = 'SET_ALL_TRIPS'
const SET_ALL_ATTRACTIONS = 'SET_ALL_ATTRACTIONS'
const ADD_ATTRACTION = 'ADD_ATTRACTION'
const CURRENT_ATTRACTION = 'CURRENT_ATTRACTION'
const TOGGLE_POPUP = 'TOGGLE_POPUP'

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
      return { ...state, attractions: [...state.attractions,action.payload] }
    case CURRENT_ATTRACTION:
      return { ...state, currentAttraction: action.payload }
    case TOGGLE_POPUP:
      return { ...state, isPopupDisplayed: action.payload }
    default:
      return state
  }
}

export default reducer
