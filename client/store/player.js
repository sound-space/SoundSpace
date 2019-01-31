// Initial player
const initialPlayer = {}

// Action constants
const GOT_PLAYER = 'GOT_PLAYER'

// Action creator
export const setPlayer = (player) => ({
  type: GOT_PLAYER,
  player
})

export default function(state = initialPlayer, action) {
  switch(action.type) {
    case GOT_PLAYER:
      return action.player
    default: 
      return state
  }
}


