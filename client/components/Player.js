import React from 'react';
import { connect } from 'react-redux';
import { setDevice, setPlayer, setPlayerState } from '../store';
import AudioViz from './AudioViz';

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      vizData: [],
      timeOffset: 0,
      currentSegment: 0,
    };
  }
  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  componentWillUnmount() {
    this.player.disconnect();
    clearInterval(this.updateInterval);
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

  getVizData(vizData, timeOffset) {
    if (vizData) {
      let counter = 0;
      while (vizData[counter] && timeOffset > vizData[counter].end) {
        counter++;
      }

      this.updateInterval = setInterval(() => {
        if (
          vizData[counter].start < timeOffset &&
          timeOffset > vizData[counter].end
        ) {
          counter++;
          this.setState({ currentSegment: counter });
        }
        timeOffset += 100;
        if (vizData.length <= counter) {
          clearInterval(this.updateInterval);
        }
      }, 100);
      this.setState({
        vizData: vizData,
        timeOffset: timeOffset,
        currentSegment: counter,
      });
    }
  }

  async setTrack(songId, timestamp, deviceId) {
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

    let trackAnalysis = await fetch(
      `https://api.spotify.com/v1/audio-analysis/${songId}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${this.props.user.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    let analysis = await trackAnalysis.json();
    let timeOffset = Date.now() - new Date(timestamp);
    // find the starting bar
    let vizData = analysis.segments.map(elem => {
      return {
        start: elem.start * 1000,
        end: (elem.start + elem.duration) * 1000,
        pitches: elem.pitches,
        timbre: elem.timbre,
      };
    });
    clearInterval(this.updateInterval);
    this.getVizData(vizData, timeOffset);
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
    this.player.on('player_state_changed', async state => {
      console.log('player state changes:', state);
      this.props.setPlayerState(state);
    });

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      this.props.socket.on('song-info', songInfo => {
        this.setTrack(songInfo.songId, songInfo.timestamp, device_id);
        this.props.clearVotes()
      });
      this.props.socket.emit('room', this.props.channelId);
      console.log('SoundSpace Player ready');
      this.props.setDevice(device_id);
    });
  }

  render() {
    if (this.state.vizData.length < 1) {
      return null;
    }
    return (
      <div>
        <div
          style={{
            zIndex: '50',
            top: '120px',
            left: '0px',
            position: 'fixed',
            width: '100px',
            height: '100px',
          }}
        >
          <AudioViz
            vizData={this.state.vizData}
            currentSegment={this.state.currentSegment}
          />
        </div>
        <div
          style={{
            zIndex: '50',
            top: '120px',
            right: '-100px',
            position: 'fixed',
            width: '100px',
            height: '100px',
          }}
        >
          <AudioViz
            vizData={this.state.vizData}
            currentSegment={this.state.currentSegment}
          />
        </div>
      </div>
    );
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
