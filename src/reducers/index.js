
const defaultState = {
  locations: [],
  currentTrip: null,
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
    default:
      return state
  }
}

export default reducer
