const initialState = {}

// Action constant
const SET_PLAYER_STATE = 'SET_PLAYER_STATE'

// Action creator
export function setPlayerState(state) {
  return {
    type: SET_PLAYER_STATE,
    state
  }
}

// Reducer
export default function(state=initialState, action) {
  switch(action.type) {
    case SET_PLAYER_STATE:
      return action.state
    default: 
      return state
  }
}
