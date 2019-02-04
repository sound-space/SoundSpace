import Axios from 'axios'

const channels = []

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
      // After channel succesfully created, post seed songs
      const songRes = await Axios.post('/api/songs', {
        songIds: body.songSeeds.map(song => {
          return song.id
        }),
        channelId: data.id
      })
      dispatch(makeChannels(data))
      // Start the music!
      await Axios.put('/startChannel', {
        channelId: data.id
      })
      if (songRes.error) {
        alert('Channel seed error')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default function (state = channels, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return action.payload
    case MAKE_CHANNELS:
      return [...state, action.payload]
    default:
      return state
  }
}
