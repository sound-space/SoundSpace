const { User, Channel, Song } = require('./db/models');
const axios = require('axios');
const { client_id, client_secret } = require('../credentials');

module.exports = io =>
  io.on('connection', function(socket) {
    console.log('Connecting to socket', socket.id);

    socket.on('room', async function(channelId) {
      console.log('Client joining room', channelId);

      //Get a token
      const token = await authenticate();

      playNewSong(channelId);

      // getRecommendation(token, channelId);

      //Find details on Jonny B Goode
      // const songInfo = await getSongDetails(token, '5oD2Z1OOx1Tmcu2mc9sLY2');
      // //Wait the length of the song, then tell client that song is done
      // setTimeout(() => {
      //   socket.emit('done');
      // }, songInfo.duration_ms);

      socket.join(channelId);
    });

    // socket.on('')

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left`);
    });
  });

//Call this when a song finishes playing
async function playNewSong(channelId) {
  console.log(`Playing new song for channel ${channelId}`);
  //Find any unplayed song to play
  const songToPlay = await Song.findOne({
    where: {
      channelId,
      played: false,
    },
  });
  //Find the currently playing song
  const songToUpdate = await Song.findOne({
    where: {
      channelId,
      isPlaying: true,
    },
  });
  //Change the currently playing song to not currently playing
  await songToUpdate.update({
    isPlaying: false,
  });
  //Change the new song to playing
  await songToPlay.update({
    played: true,
    isPlaying: true,
  });
  const token = await authenticate();
  //If the song is the last in the Song table for the channel, get new songs
  if (songToPlay.isLast === true) {
    console.log(`Last song for channel ${channelId}, generating new songs`);
    getRecommendation(token, channelId);
    songToPlay.update({
      isLast: false,
    });
  }
  const songInfo = await getSongDetails(token, songToPlay.songId);
  // //Wait the length of the song, then tell client that song is done
  setTimeout(() => {
    playNewSong(channelId);
  }, songInfo.duration_ms);
  return songToPlay;
}

//Get most popular tracks for a channel in Songs, generate a seed, get recommendations, add them into Songs
async function getRecommendation(token, channelId) {
  let tracks = await Song.findAll({
    where: {
      channelId,
      played: true,
      isPlaying: false,
    },
    limit: 2,
    order: [['votes', 'DESC']],
  });
  tracks = tracks
    .map(track => {
      return track.songId;
    })
    .join('%2C');
  const { data } = await axios({
    url: `https://api.spotify.com/v1/recommendations?limit=5&market=US&seed_tracks=${tracks}`,
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  });
  //Destroy old rows, except currently playing track
  await Song.destroy({
    where: {
      channelId,
      played: true,
      isPlaying: false,
    },
  });
  data.tracks.map(async (track, i) => {
    await Song.create({
      songId: track.id,
      channelId,
      isLast: i === data.tracks.length - 1,
    });
  });
}

//Get song details, used for getting duration and setTimeout, updating socket rooms
async function getSongDetails(token, songId) {
  const { data } = await axios({
    url: `https://api.spotify.com/v1/tracks/${songId}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
}
async function authenticate() {
  //Get a token from Spotify API
  const { data } = await axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials',
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: client_id,
      password: client_secret,
    },
  });
  return data.access_token;
}
