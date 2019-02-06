import React, { Component } from 'react'
import axios from 'axios'
import createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../styles/ChannelViewStyles.css'
import ChannelSideBar from './ChannelSideBar'
import { search } from '../SpotifySearch'
import Player from './Player'
const IP = process.env.SPOTIFY_CLIENT_ID
  ? 'http://soundspace-fsa.herokuapp.com'
  : 'http://localhost:8080'

class ChannelView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      numUsers: 0,
      vote: '',
      currentSongId: '',
      device_id: '',
      playerState: {},
      messages: [],
      message: '',
      channelDetails: {},
      searchResults: []
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.search = search.bind(this)
    this.socket = createClientSocket(IP)
  }

  async componentDidMount () {
    let { data } = await axios.get(
      `/api/channels/${this.props.match.params.id}`
    )
    this.setState({ channelDetails: data })
    this.socket.on('num-users', numUsers => {
      this.setState({
        numUsers
      })
    })
    this.socket.on('new-message', message => {
      const messages = [message, ...this.state.messages]
      this.setState({
        messages
      })
      document.getElementsByClassName('chat-messages-container').scrollTop = 0
    })
  }

  componentWillUnmount () {
    // If navigating away from ChannelView, disconnect from socket
    this.socket.emit('leave', this.props.match.params.id)
  }

  async handleSearch (evt) {
    if (evt.target.value === '') {
      this.setState({
        searchResults: []
      })
      return
    }
    const { tracks } = await this.search(evt.target.value)
    this.setState({
      searchResults: tracks.items
    })
  }

  vote = async (userVote, voteState) => {
    let changeInDB, newVoteState
    if (userVote === 'up') {
      switch (voteState) {
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
    } else if (userVote === 'down') {
      switch (voteState) {
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
    const playerState = this.props.playerState
    const albumCoverUrl = playerState
      ? playerState.track_window.current_track.album.images[0].url
      : null
    const currentTrackName = playerState
      ? playerState.track_window.current_track.name
      : null
    const currentTrackAlbum = playerState
      ? playerState.track_window.current_track.album.name
      : null

    const currentTrackArtist = playerState
      ? playerState.track_window.current_track.artists[0].name
      : null
    return (
      <div className='uk-width-1-1 uk-container uk-container-expand uk-align-left'>
        <div>
          <div uk-grid='true'>
            <img
              style={{
                minWidth: '300px',
                minHeight: '300px',
                objectFit: 'cover'
              }}
              className='uk-align-center album-img'
              src={albumCoverUrl}
            />
          </div>
          <div className='uk-text-center'>
            <div uk-grid='true' className='uk-align-center'>
              <i
                className={`fas fa-thumbs-up uk-margin-right ${
                  this.state.vote === 'up' ? 'active-up' : ''
                }`}
                uk-tooltip='Upvote!'
                onClick={() => this.vote('up', this.state.vote)}
              />
              <i
                className={`fas fa-thumbs-down uk-margin-right ${
                  this.state.vote === 'down' ? 'active-down' : ''
                }`}
                uk-tooltip='Downvote!'
                onClick={() => this.vote('down', this.state.vote)}
              />
            </div>
            <div className='uk-text-large'>{currentTrackName}</div>
            <div>By {currentTrackArtist}</div>
            <div>{currentTrackAlbum}</div>
            <br />

            {this.state.channelDetails.isSuggestable ? (
              <div>
                <div className='uk-margin'>
                  Add a suggestion
                  <input
                    onChange={this.handleSearch}
                    className='uk-input'
                    type='text'
                    placeholder='Search Songs...'
                  />
                </div>
                <div>
                  {this.state.searchResults.map((track, i) => {
                    return (
                      <div
                        className='add'
                        key={i}
                        onClick={async () => {
                          this.setState({
                            searchResults: []
                          })
                          await axios.post('/api/songs', {
                            songIds: [track.id],
                            channelId: this.props.match.params.id,
                            isSuggestion: true
                          })
                          window.UIkit.notification(
                            `<span uk-icon='icon: check'></span> Queued ${
                              track.name
                            }!`
                          )
                        }}
                      >
                        <span
                          className='uk-margin-small-right'
                          uk-icon='plus-circle'
                        />
                        {track.name} by{' '}
                        {track.artists.map((artist, j) => {
                          return j === track.artists.length - 1
                            ? artist.name
                            : artist.name + ', '
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              undefined
            )}
            <br />
            <hr />

            <p>Listeners: {this.state.numUsers}</p>
            <hr />
            <div className='chat-container'>
              <div className='chat-input-container'>
                <form
                  onSubmit={evt => {
                    evt.preventDefault()
                    if (this.state.message.length > 0) {
                      this.socket.emit('message', this.props.match.params.id, {
                        text: this.state.message,
                        user: this.props.user.displayName
                      })
                      this.setState({
                        message: ''
                      })
                    }
                  }}
                >
                  <input
                    className='uk-input uk-form-width-medium chat-input'
                    value={this.state.message}
                    onChange={evt => {
                      this.setState({
                        message: evt.target.value
                      })
                    }}
                    placeholder='Enter message...'
                  />
                  <button
                    className='uk-button uk-button-default chat-submit'
                    type='submit'
                  >
                    Send
                  </button>
                </form>
              </div>

              <div className='chat-messages-container'>
                {this.state.messages.map((message, i) => {
                  return (
                    <div className='message'>
                      <em>{message.user}</em>: {message.text}
                    </div>
                  )
                })}
              </div>
            </div>
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
