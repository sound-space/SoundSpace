import Axios from 'axios'

const channelsObj = {
  channels: []
}

// Action Types
const GET_CHANNELS = 'GET_CHANNELS'
const MAKE_CHANNELS = 'MAKE_CHANNELS'

// action creator
export const getChannels = channels => ({
  type: GET_CHANNELS,
  payload: channels
})

export const makeChannels = channels => ({
  type: MAKE_CHANNELS,
  payload: channels
})

// Thunks
export const fetchChannels = () => async dispatch => {
  const { data } = await Axios.get('/api/channels')
  dispatch(getChannels(data))
}

export const postChannels = () => async dispatch => {
  const { data } = await Axios.post('/api/channels')
  dispatch(makeChannels(data))
}

export default function (state = channelsObj, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return { ...state, channels: action.payload }
    case MAKE_CHANNELS:
      return { ...state, channels: [...state.channels, action.payload] }
    default:
      return state
  }
}
