import { createStore, applyMiddleware } from 'redux'
import Axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  channels: [],
  isLoggedIn: false,
  body: {},
  user: {},
  deviceId: ''
}

// Action Types
const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'
const SET_DEVICE = 'SET_DEVICE'

// action creator
export const getUser = () => ({
  type: GET_USER
})

export const setUser = userInfo => ({
  type: SET_USER,
  payload: userInfo
})

export const setDevice = deviceId => ({
  type: SET_DEVICE,
  payload: deviceId
})

// Thunk
export const fetchUser = () => async dispatch => {
  await Axios.get('/login')
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, isLoggedIn: true }
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_DEVICE:
      return { ...state, deviceId: action.payload }
    default:
      return state
  }
}

const middleware = applyMiddleware(thunkMiddleware, createLogger)
const store = createStore(reducer, middleware)

export default store
