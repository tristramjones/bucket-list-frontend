
const defaultState = {
  locations: [],
  selectedMarker: {},
}

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [...state.locations, action.payload]
      }
    default:
      return state
  }
}

export default reducer
