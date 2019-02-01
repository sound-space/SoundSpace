const playerStateObj = {}

// Action constant
const SET_PLAYER_STATE = 'SET_PLAYER_STATE'

// Action creator
export const setPlayerState = state => {
  console.log("IN ACTION CREATOR", state)
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
  console.log("HITTING REDUCE WITH NEW STATE", action.payload)
  switch(action.type) {
    case SET_PLAYER_STATE:
      return action.payload
    default: 
      return state
  }
}
