
const defaultState = {
  currentTrip: null,
  locations: [],
  trips: [],
  attractions: []
}

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [...state.locations, action.payload]
      }
    case 'SET_CURRENT_TRIP':
      return {
        ...state,
        currentTrip: action.payload
      }
    case 'SET_ALL_TRIPS':
      return {
        ...state,
        trips: action.payload
      }
    case 'SET_ALL_ATTRACTIONS':
      return {
        ...state,
        attractions: action.payload
      }
    default:
      return state
  }
}

export default reducer
