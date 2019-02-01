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
  try {
    const { data } = await Axios.get('/api/channels')
    dispatch(getChannels(data))
  } catch (error) {
    console.error(error)
  }
}

export const postChannels = body => async dispatch => {
  if (body.imageURL === '') {
    body.imageURL =
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  }
  try {
    const { data } = await Axios.post('/api/channels', body)
    if (data.error) {
      alert('Channel already exist, Channel name required')
    } else {
      dispatch(makeChannels(data))
    }
  } catch (error) {
    console.error(error)
  }
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
