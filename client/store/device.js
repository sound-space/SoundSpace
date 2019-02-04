// Initial State
const deviceId = ''

// Action constant
const SET_DEVICE = 'SET_DEVICE'

// Action creator
export const setDevice = deviceId => ({
  type: SET_DEVICE,
  deviceId
})

export default function(state = deviceId, action) {
  switch (action.type) {
    case SET_DEVICE:
      return action.deviceId
    default:
      return state
  }
}
