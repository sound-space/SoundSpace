import React from 'react'

export default class App extends React.Component {
  
  constructor() {
    super()
    this.state= {
      body: this.getHashParams()
    }
  }
  
  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
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
  }
  
  checkForPlayer = () => {
    const token = this.state.body.access_token
    if (window.Spotify) {
      clearInterval(this.playerCheckInterval)
      console.log('Player available');
      // clearInterval(this.playerCheckInterval);
      console.log('token before initializing Player:', token)
      this.player = new window.Spotify.Player({
        name: 'SoundSpace Spotify Player',
        getOAuthToken: cb => {
          cb(token);
        },
      });
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
  }
  
  createEventHandlers = () => {
    this.player.on('initialization_error', e => {
      console.error(e);
    });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => {
      console.error(e);
    });
    this.player.on('playback_error', e => {
      console.error(e);
    });

    // Playback status updates
    this.player.on('player_state_changed', state => {
      console.log(state);
    });

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log('deviceId:', device_id);
      this.deviceId = device_id;
      console.log('Let the music play on!');
      this.setState({ deviceId: device_id });

      this.transferPlaybackHere();
    })
  }
  
  transferPlaybackHere = async () => {
    console.log('transferring', this.deviceId);
    console.log('token on playback transfer:', this.state.body.access_token)
    // await fetch('https://api.spotify.com/v1/me/player', {
    //   method: 'PUT',
    //   headers: {
    //     authorization: `Bearer ${this.state.token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     device_ids: [this.deviceId],
    //     play: true,
    //   }),
    // });

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
          uris: ['spotify:track:2YZZ8qsDdvC008LgtpMoI6'],
        }),
      }
    );
  }
  
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>{JSON.stringify(this.state.body)}</p>
      </div>
    )
  }
}
