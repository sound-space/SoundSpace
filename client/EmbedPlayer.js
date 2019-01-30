module.exports = {
  setTrack(songId, timestamp) {
    fetch(
      `https://api.spotify.com/v1/me/player/play`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${this.state.body.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [`spotify:track:${songId}`],
          position_ms: Date.now()-timestamp
        }),
      }
    )
  },
  
  checkForPlayer() {
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
  },
  
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
    });

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log('deviceId:', device_id);
      this.deviceId = device_id;
      console.log('Let the music play on!');
      this.setState({ loggedIn: true, deviceId: device_id });

      this.transferPlaybackHere();
    })
  },
  
  async transferPlaybackHere() {
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
          uris: ['spotify:track:5oD2Z1OOx1Tmcu2mc9sLY2'],
        }),
      }
    )
  }
}
