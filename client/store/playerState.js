const playerStateObj = {}

// Action constant
const SET_PLAYER_STATE = 'SET_PLAYER_STATE'

// Action creator
export const setPlayerState = state => {
  return {
    type: SET_PLAYER_STATE,
    payload: state
  }
}

//thunk
export const fetchPlayerState = state => dispatch => {
  dispatch(setPlayerState(state))
}

// Reducer
export default function(state=playerStateObj, action) {
  switch(action.type) {
    case SET_PLAYER_STATE:
      return action.payload
    default: 
      return state
  }
}
