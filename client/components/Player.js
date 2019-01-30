import React from 'react'
import axios from 'axios'
import createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
import { setDevice } from '../store'

const IP = 'http://localhost:8080'

class Player extends React.Component {
  constructor () {
    super()
    this.socket = createClientSocket(IP)
  }

  componentDidMount () {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
  }

  checkForPlayer = () => {
    const token = this.props.user.access_token
    if (window.Spotify) {
      clearInterval(this.playerCheckInterval)
      this.player = new window.Spotify.Player({
        name: 'SoundSpace Spotify Player',
        getOAuthToken: cb => {
          cb(token)
        }
      })
      this.createEventHandlers()
      this.player.connect()
      this.props.history.push('/channels')
    }
  }

  createEventHandlers = () => {
    this.player.on('initialization_error', e => {
      console.error('init error:', e)
    })
    this.player.on('authentication_error', e => {
      console.error('auth error:', e)
      // this.setState({ loggedIn: false });
    })
    this.player.on('account_error', e => {
      console.error('account error:', e)
    })
    this.player.on('playback_error', e => {
      console.error('playback error:', e)
    })

    // Playback status updates
    this.player.on('player_state_changed', state => {
      console.log('player state changes:', state)
    })

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data
      console.log('deviceId:', device_id)
      this.deviceId = device_id
      console.log('Let the music play on!')
      this.props.setDevice(deviceId)
    })
  }

  render () {
    return <div>Player Loading</div>
    // return (
    //   <div>
    //     <h1>SoundSpace</h1>
    //     <div>{JSON.stringify(this.state.body)}</div>
    //     {/* Only render channels when logged in */}
    //     <h2>Channels</h2>
    //     {this.state.loggedIn && (
    //       <div>
    //         {this.state.channels.map((channel, i) => {
    //           return (
    //             <div
    //               className='channel-in-list'
    //               onClick={async () => {
    //                 await this.socket.emit('room', channel.id)
    //               }}
    //               key={i}
    //             >
    //               {channel.name}
    //             </div>
    //           )
    //         })}
    //       </div>
    //     )}
    //   </div>
    // )
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
  loggedIn: state.loggedIn,
  body: state.body
})

const mapDispatchToProps = dispatch => ({
  setDevice: id => dispatch(setDevice())
})

export default connect(mapStateToProps)(Player)
