
const defaultState = {
  cities: [],
  selectedMarker: {},
}

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'ADD_CITY':
      return {
        ...state,
        cities: [...state.cities, action.payload]
      }
    default:
      return state
  }
}

export default reducer
