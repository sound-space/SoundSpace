import React from 'react';
import createClientSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { setDevice, setPlayer, setPlayerState } from '../store';

const IP = 'https://soundspace-fsa.herokuapp.com'

class Player extends React.Component {
  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  componentWillUnmount() {
    this.player.disconnect();
  }

  checkForPlayer() {
    const token = this.props.user.access_token;
    if (window.Spotify) {
      clearInterval(this.playerCheckInterval);
      this.player = new window.Spotify.Player({
        name: 'SoundSpace Spotify Player',
        getOAuthToken: cb => {
          cb(token);
        },
      });
      this.createEventHandlers();
      this.player.connect();
      this.props.setPlayer(this.player);
    }
  }

  setTrack(songId, timestamp, deviceId) {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${this.props.user.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [`spotify:track:${songId}`],
        position_ms: Date.now() - new Date(timestamp),
      }),
    });
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => {
      console.error('init error:', e);
    });
    this.player.on('authentication_error', e => {
      console.error('auth error:', e);
      // this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => {
      console.error('account error:', e);
    });
    this.player.on('playback_error', e => {
      console.error('playback error:', e);
    });

    // Playback status updates
    this.player.on('player_state_changed', state => {
      console.log('player state changes:', state);
      this.props.setPlayerState(state);
    });

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      this.props.socket.on('song-info', songInfo => {
        this.setTrack(songInfo.songId, songInfo.timestamp, device_id);
        this.setState({
          currentSongId: songInfo.songId,
        });
      });
      this.props.socket.emit('room', this.props.channelId);
      console.log('SoundSpace Player ready');
      this.props.setDevice(device_id);
      // this.transferPlaybackHere();
    });
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
  user: state.userObj,
  player: state.playerObj,
  deviceId: state.deviceId,
});

const mapDispatchToProps = dispatch => ({
  setDevice: id => dispatch(setDevice(id)),
  setPlayer: player => dispatch(setPlayer(player)),
  setPlayerState: state => dispatch(setPlayerState(state)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
