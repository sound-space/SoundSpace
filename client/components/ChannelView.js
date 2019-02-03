import React, { Component } from 'react'
import axios from 'axios'
import createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
import '../styles/ChannelViewStyles.css'
import ChannelSideBar from './ChannelSideBar'
import Player from './Player'
const IP = 'http://localhost:8080'

class ChannelView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      voted: false,
      currentSongId: '',
      device_id: '',
      showChannelsBar: false,
      playerState: {}
    }
    this.socket = createClientSocket(IP)
  }

  componentDidMount () {
    this.socket.emit('room', this.props.match.params.id)
  }

  componentWillUnmount () {
    // If navigating away from ChannelView, disconnect from socket
    this.socket.emit('leave', this.props.match.params.id)
  }

  showChannelsBar = () => {
    this.setState({ showChannelsBar: !this.state.showChannelsBar })
  }

  vote = async userVote => {
    if (this.state.voted) return
    try {
      await axios.put(`api/channels/${this.props.match.params.id}/votes`, {
        vote: userVote
      })
      this.setState({
        voted: true
      })
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const playerState = this.props.playerState
    const albumCoverUrl = playerState
      ? playerState.track_window.current_track.album.images[0].url
      : '/assets/album.jpg'
    const currentTrackName = playerState
      ? playerState.track_window.current_track.name
      : 'none'

    return (
      <div
        style={{ position: 'relative', top: '100px' }}
        className='uk-width-1-1 uk-container uk-container-expand uk-align-left'
      >
        {this.state.showChannelsBar && <ChannelSideBar />}
        <div
          className='uk-grid-medium uk-flex-middle uk-margin-top'
          uk-grid='true'
        >
          <button
            className='uk-button uk-button-link uk-margin-right'
            onClick={this.showChannelsBar}
          >
            Show Channels
          </button>
          <button
            className='uk-button uk-button-link uk-margin-right'
            onClick={() => this.props.history.push('/channels')}
          >
            Go back to Channels
          </button>
        </div>

        <article className='uk-comment uk-margin'>
          <header
            className='uk-comment-header uk-grid-medium uk-flex-middle uk-grid-divider'
            uk-grid='true'
          >
            <div className='uk-width-auto'>
              <img
                className='uk-comment-avatar'
                src={albumCoverUrl}
                width='80'
                height='80'
                alt=''
              />
            </div>
            <div className='uk-width-expand'>
              <h4 className='uk-comment-title uk-margin-remove'>
                Currently playing {currentTrackName}
              </h4>
              <ul className='uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top'>
                <li>123 users</li>
              </ul>
              <button
                className='uk-margin-right'
                uk-tooltip='Upvote!'
                onClick={() => this.vote(1)}
              >
                <i className='uk-icon-thumbs-up' />
              </button>
              <button
                className='uk-margin-right'
                uk-icon='icon: plus-circle; ratio: 1.2'
                uk-tooltip='Upvote!'
                onClick={() => this.vote(1)}
              />
              <button
                className='uk-margin-right'
                uk-icon='icon: minus-circle; ratio: 1.2'
                uk-tooltip='Downvote!'
                onClick={() => this.vote(-1)}
              />
            </div>
          </header>
          <div className='uk-comment-body uk-margin'>
            <p>You are listening to channel {this.props.match.params.id}</p>
          </div>
        </article>
        <Player channelId={this.props.match.params.id} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.userObj.user,
    player: state.playerObj,
    playerState: state.playerStateObj
  }
}

export default connect(
  mapState,
  null
)(ChannelView)
