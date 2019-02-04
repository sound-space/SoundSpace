import Axios from 'axios'

const userObj = {
  user: {},
  deviceId: ''
}

// Action Types
export const SET_USER = 'SET_USER'
const SET_DEVICE = 'SET_DEVICE'

// action creators

export const setUser = userInfo => ({
  type: SET_USER,
  payload: userInfo
})

export const setDevice = deviceId => ({
  type: SET_DEVICE,
  payload: deviceId
})

// Thunks
export const fetchUser = () => async dispatch => {
  await Axios.get('/login')
}

export const getMe = () => async dispatch => {
  const userResponse = await Axios.get('/me')
  dispatch(setUser(userResponse.data))
}

export default function(state = userObj, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_DEVICE:
      return { ...state, deviceId: action.payload }
    default:
      return state
  }
}
