
const defaultState = {
  locations: [],
  currentTrip: null,
  trips: [],
  attractions: [],
}

const ADD_LOCATION = 'ADD_LOCATION'
const SET_CURRENT_TRIP = 'SET_CURRENT_TRIP'
const SET_ALL_TRIPS = 'SET_ALL_TRIPS'
const SET_ALL_ATTRACTIONS = 'SET_ALL_ATTRACTIONS'

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
    default:
      return state
  }
}

export default reducer
