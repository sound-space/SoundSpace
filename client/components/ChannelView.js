import React, { Component } from 'react'
import axios from 'axios'
import createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
import '../styles/ChannelViewStyles.css'
import { transferPlaybackHere, checkForPlayer, createEventHandlers, setTrack } from '../EmbedPlayer'
const IP = 'http://localhost:8080'

class ChannelView extends Component {
  constructor() {
    super()
    this.state = {
      voted: false,
      currentSongId: '',
      // body: this.getHashParams(),
      device_id: ''
    }
    this.socket = createClientSocket(IP)
    this.setTrack = setTrack.bind(this)
    this.transferPlaybackHere = transferPlaybackHere.bind(this)
    this.checkForPlayer = checkForPlayer.bind(this)
    this.createEventHandlers = createEventHandlers.bind(this)
  }
  
  // getHashParams = () => {
  //   var hashParams = {};
  //   var e,
  //     r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   while ((e = r.exec(q))) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //   }
  //   return hashParams;
  // }
  
  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
  }
  
  vote = async (userVote) => {
    if(this.state.voted) return
    try {
      await axios.put(`api/channels/${this.props.match.params.id}/votes`, {vote: userVote})
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

const mapState = state => {
  return {
    user: state.userObj.user
  }
}

export default connect(mapState, null)(ChannelView)
