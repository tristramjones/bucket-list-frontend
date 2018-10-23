
const defaultState = {
  locations: [],
  attractions: [],
  filteredAttractions: [],
  currentUser: null,
  currentTrip: null,
  newMarker: null,
  currentAttraction: null,
  isNewPopupDisplayed: false,
  isBasicPopupDisplayed: false,
}

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER':
    debugger
      return { ...state, currentUser: action.payload }
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
    case 'DELETE_ATTRACTION':
      return { ...state, attractions: action.payload }
    case 'TOGGLE_NEW_POPUP':
      return { ...state, isNewPopupDisplayed: action.payload }
    case 'TOGGLE_BASIC_POPUP':
      return { ...state, isBasicPopupDisplayed: action.payload }
    case 'FILTER_FOOD':
      return { ...state, filteredAttractions: action.payload }
    case 'FILTER_EVENTS':
      return { ...state, filteredAttractions: action.payload }
    case 'FILTER_ADVENTURES':
      return { ...state, filteredAttractions: action.payload }
    case 'RESET_FILTER':
      return { ...state, filteredAttractions: [] }
    case 'ADD_ATTRACTION':
      if(state.filteredAttractions.length > 0) {
        return { ...state, attractions: [...state.attractions, action.payload], filteredAttractions: [...state.filteredAttractions, action.payload] }
      } else {
        return { ...state, attractions: [...state.attractions, action.payload] }
      }
    default:
      return state
  }
}

export default reducer
