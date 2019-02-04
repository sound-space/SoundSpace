import Axios from 'axios'

const userObj = {}

// Action Types
export const SET_USER = 'SET_USER'

// action creators

export const setUser = userInfo => ({
  type: SET_USER,
  payload: userInfo
})

// Thunks
export const fetchUser = () => async dispatch => {
  await Axios.get('/login')
}

export const getMe = () => async dispatch => {
  const userResponse = await Axios.get('/me')
  dispatch(setUser(userResponse.data))
}

export const logUserOut = () => async dispatch => {
  const clearedUser = await Axios.get('/logout')
  dispatch(setUser(clearedUser.data))
}

export default function(state = userObj, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}
