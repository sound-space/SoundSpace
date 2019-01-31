import React from 'react';
import axios from 'axios';
import createClientSocket from 'socket.io-client';

const IP = 'http://localhost:8080';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      channels: [{ name: 'Dummy' }],
      loggedIn: false,
      body: this.getHashParams(),
    };
    this.socket = createClientSocket(IP);
  }

  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    this.getChannelsFromServer();
  }

  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  checkForPlayer = () => {
    const token = this.state.body.access_token;
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
    }
  };

  createEventHandlers = () => {
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
    });

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      this.deviceId = device_id;
      console.log('SoundSpace Player ready');
      this.setState({ loggedIn: true, deviceId: device_id });
      this.transferPlaybackHere();
    });
  };

  transferPlaybackHere = async () => {
    //Play a track on the SoundSpace player
    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${this.state.body.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: ['spotify:track:3HMrMZ56giBGJYcCMSRijs'],
        }),
      }
    );
  };

  getChannelsFromServer = async () => {
    const { data } = await axios.get('/api/channels');
    this.setState({
      channels: data,
    });
  };

  render() {
    return (
      <div>
        <h1>SoundSpace</h1>
        <div>{JSON.stringify(this.state.body)}</div>
        {/* Only render channels when logged in */}
        <h2>Channels</h2>
        {this.state.loggedIn && (
          <div>
            {this.state.channels.map((channel, i) => {
              return (
                <div
                  className="channel-in-list"
                  onClick={async () => {
                    await this.socket.emit('room', channel.id);
                  }}
                  key={i}
                >
                  {channel.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
