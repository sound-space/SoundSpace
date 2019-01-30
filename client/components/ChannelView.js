import React, { Component } from 'react'
import axios from 'axios'
import createClientSocket from 'socket.io-client'
import { transferPlaybackHere, checkForPlayer, createEventHandlers, setTrack } from '../EmbedPlayer'
import '../styles/ChannelViewStyles.css'
const IP = 'http://localhost:8080'


export default class ChannelView extends Component {
  constructor() {
    super()
    this.state = {
      voted: false,
      currentSongId: ''
    }
    this.socket = createClientSocket(IP)
    this.setTrack = setTrack.bind(this)
    this.transferPlaybackHere = transferPlaybackHere.bind(this)
    this.checkForPlayer = checkForPlayer.bind(this)
    this.createEventHandlers = createEventHandlers.bind(this)
  }
  
  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
    this.socket.on('song-info', songInfo =>
      // console.log('Got info from server', songInfo)
      this.setTrack(songInfo.songId, songInfo.timestamp)
      this.setState({
        currentSongId: songInfo.songId
      })
    )
  }
  
  vote = async (userVote) => {
    if(this.state.voted) return
    try {
      await axios.put(`api/channels/${this.props.match.params.channelId}/votes`, {vote: userVote})
      this.setState({
        voted: true
      })
    }
    catch(err) {
      console.log(err)
    }
  }
  
  render() {
    return (
      <div className='channel-view-container'>
        
        <h1>This is the Channel View</h1>
        <h2>Current Song: {this.state.currentSongId || 'None'}</h2>
        
        <div className='vote-button-container'>
          <button onClick={() => this.vote(1)}>
            Upvote!
          </button>
          <button onClick={() => this.vote(-1)}>
            Downvote!
          </button>
        </div>
        
      </div>
    )
  }
}
