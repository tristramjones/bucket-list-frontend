
const defaultState = {
  trips: [],
  locations: [],
  attractions: [],
  currentTrip: null,
  currentMarker: null,
  currentAttraction: null,
  isNewPopupDisplayed: false,
  isBasicPopupDisplayed: false,
}

const reducer = (state=defaultState, action) => {
  console.log(action.type)
  switch(action.type) {
    case 'SET_CURRENT_TRIP':
      return { ...state, currentTrip: action.payload }
    case 'SET_ALL_TRIPS':
      return { ...state, trips: action.payload }
    case 'SET_ALL_ATTRACTIONS':
      return { ...state, attractions: action.payload }
    case 'SET_CURRENT_ATTRACTION':
      return { ...state, currentAttraction: action.payload }
    case 'SET_CURRENT_MARKER':
      return { ...state, currentMarker: action.payload }
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
