export function setTrack(songId, timestamp, deviceId) {
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

export function checkForPlayer() {
  const token = this.props.user.access_token;
  // console.log(token);
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
    this.props.exportPlayer(this.player)
  }
}

export function createEventHandlers() {
  this.player.on('initialization_error', e => {
    console.error('init error:', e);
  });
  this.player.on('authentication_error', e => {});
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
    this.socket.on('song-info', songInfo => {
      this.setTrack(songInfo.songId, songInfo.timestamp, device_id);
      this.setState({
        currentSongId: songInfo.songId,
      });
    });
    this.socket.emit('room', this.props.match.params.id);
    this.deviceId = device_id;
    console.log('SoundSpace Player ready');
  });
}

export async function stopPlayer() {
  console.log('Pausing playback');
  await fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${this.props.user.access_token}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function transferPlaybackHere() {
  await fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${this.props.user.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device_ids: [this.props.deviceId],
      play: true,
    }),
  });

  //Play a track on the SoundSpace player
  fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${
      this.props.deviceId
    }`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${this.props.user.access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );
}
