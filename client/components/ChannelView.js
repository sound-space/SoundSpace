import React, { Component } from 'react'
import axios from 'axios'
import createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../styles/ChannelViewStyles.css'
import ChannelSideBar from './ChannelSideBar'
import Player from './Player'
const IP = 'http://localhost:8080'

class ChannelView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      numUsers: 0,
      vote: '',
      currentSongId: '',
      device_id: '',

      playerState: {}
    }
    this.socket = createClientSocket(IP)
  }

  componentDidMount () {
    this.socket.emit('room', this.props.match.params.id)
    this.socket.on('num-users', numUsers => {
      this.setState({
        numUsers
      })
    })
  }

  componentWillUnmount () {
    // If navigating away from ChannelView, disconnect from socket
    this.socket.emit('leave', this.props.match.params.id)
  }


  vote = async (userVote, voteState) => {
    let changeInDB, newVoteState
    if(userVote === 'up') {
      switch(voteState) {
        case 'up':
          changeInDB = -1
          newVoteState = ''
          break
        case 'down':
          changeInDB = +2
          newVoteState = 'up'
          break
        default:
          changeInDB = +1
          newVoteState = 'up'
      }
    }
    else if(userVote === 'down') {
      switch(voteState) {
        case 'up':
          changeInDB = -2
          newVoteState = 'down'
          break
        case 'down':
          changeInDB = +1
          newVoteState = ''
          break
        default:
          changeInDB = -1
          newVoteState = 'down'
      }
    }
    
    try {
      await axios.put(`api/channels/${this.props.match.params.id}/votes`, {
        vote: changeInDB
      })
      this.setState({
        vote: newVoteState
      })
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    // if (!this.props.user.id) return <Redirect to='/' />
    const playerState = this.props.playerState
    const albumCoverUrl = playerState
      ? playerState.track_window.current_track.album.images[0].url

      : ''
    const currentTrackName = playerState
      ? playerState.track_window.current_track.name
      : ''
    const currentTrackAlbum = playerState
    ? playerState.track_window.current_track.album.name
    : ''


    const currentTrackArtist = playerState
    ? playerState.track_window.current_track.artists[0].name
    : ''
    return (
      <div

        // style={{ position: 'relative', top: '100px' }}

        className='uk-width-1-1 uk-container uk-container-expand uk-align-left'
      >
        <div >
          <div uk-grid="true">
            <img
                  className='uk-align-center'
                  src={albumCoverUrl}
                  width='400'
                  height='400'
                  alt=''
                />

          </div>
              <div className="uk-text-center">
                <div uk-grid="true" className='uk-align-center'>
                <i className={`fas fa-thumbs-up uk-margin-right ${this.state.vote === 'up' ? 'active-up' : ''}`} uk-tooltip='Upvote!'
                    onClick={() => this.vote('up', this.state.vote)}></i>
                <i className={`fas fa-thumbs-down uk-margin-right ${this.state.vote === 'down' ? 'active-down' : ''}`} uk-tooltip='Downvote!'
                    onClick={() => this.vote('down', this.state.vote)}></i>
                </div>
                <div className="uk-text-large">
                  {currentTrackName} by {currentTrackArtist}
                </div>
                <br></br>
                Album: {currentTrackAlbum}
              </div>

          </div>
        <Player socket={this.socket} channelId={this.props.match.params.id} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.userObj,
    player: state.playerObj,
    playerState: state.playerStateObj
  }
}

export default connect(
  mapState,
  null
)(ChannelView)
