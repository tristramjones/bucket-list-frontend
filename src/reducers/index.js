
const defaultState = {
  locations: [],
  attractions: [],
  currentTrip: null,
  newMarker: null,
  currentAttraction: null,
  isNewPopupDisplayed: false,
  isBasicPopupDisplayed: false,
}

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'SET_CURRENT_TRIP':
      return { ...state, currentTrip: action.payload }
    case 'SET_ALL_ATTRACTIONS':
      return { ...state, attractions: action.payload }
    case 'SET_CURRENT_ATTRACTION':
      return { ...state, currentAttraction: action.payload }
    case 'NEW_MARKER':
      return { ...state, newMarker: action.payload }
    case 'ADD_LOCATION':
      return { ...state, locations: [...state.locations, action.payload] }
    case 'ADD_ATTRACTION':
      return { ...state, attractions: [...state.attractions, action.payload] }
    case 'DELETE_ATTRACTION':
      return { ...state, attractions: action.payload }
    case 'TOGGLE_NEW_POPUP':
      return { ...state, isNewPopupDisplayed: action.payload }
    case 'TOGGLE_BASIC_POPUP':
      return { ...state, isBasicPopupDisplayed: action.payload }
    default:
      return state
  }
}

export default reducer
