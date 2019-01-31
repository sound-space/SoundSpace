import Axios from 'axios'

const channelsObj = {
  channels: []
}

// Action Types
const SET_CHANNELS = 'SET_CHANNELS'

// action creator
export const setChannels = channels => ({
  type: SET_CHANNELS,
  payload: channels
})

// Thunks
export const fetchChannels = () => async dispatch => {
  const { data } = await Axios.get('/api/channels')
  console.log(data)
  dispatch(setChannels(data))
}

export default function(state = channelsObj, action) {
  switch (action.type) {
    case SET_CHANNELS:
      return { ...state, channels: action.payload }
    default:
      return state
  }
}