import { createStore, applyMiddleware } from 'redux'

const initialState = {
  channels: [],
  isLoggedIn: false,
  body: {}
}

// Action Types
const GET_USER = 'GET_USER'

// action creator
export const getUser = () => ({
  type: GET_USER
})

const reducerName = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, isLoggedIn: true }
    default:
      return state
  }
}

const store = createStore(reducerName)

export default store
