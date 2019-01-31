const { User, Channel, Song } = require('./db/models');
const axios = require('axios');
const { client_id, client_secret } = require('../credentials');

//Gets called when server starts
const singularity = async io => {
  const songsChannels = await Song.findAll({
    where: {
      isPlaying: true,
    },
    include: [
      {
        model: Channel,
      },
    ],
  });
  //Look at every start song, starting every channel's song and sending it to the proper socket channels
  songsChannels.forEach(async songChannel => {
    const token = await authenticate();
    const songInfo = await getSongDetails(token, songChannel.dataValues.songId);
    io.in(songChannel.dataValues.channel.dataValues.id).emit('song-info', {
      songId: songInfo.id,
      timestamp: songChannel.dataValues.channel.dataValues.timestamp,
    });
    setTimeout(
      async () => playNewSong(io, songChannel.dataValues.channel.dataValues.id),
      songInfo.duration_ms
    );
  });
};

const socketComm = async io => {
  io.on('connection', function(socket) {
    console.log('Connecting to socket', socket.id);
    socket.on('leave', function(channelId) {
      console.log('Client leaving room', channelId);
      socket.leave(channelId);
    });
    socket.on('room', async function(channelId) {
      console.log('Client joining room', channelId);
      socket.join(channelId);
      const songInfo = await Song.findOne({
        where: {
          channelId,
          isPlaying: true,
        },
        include: [{ model: Channel }],
      });
      //Send info about current song in this channel + timestamp to user
      socket.emit('song-info', {
        songId: songInfo.songId,
        timestamp: songInfo.channel.dataValues.timestamp,
      });
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left`);
    });
  });
};

module.exports = { socketComm, singularity };

//Call this when a song finishes playing
async function playNewSong(io, channelId) {
  console.log(`Playing new song for channel ${channelId}`);
  //Find any unplayed song to play. If isLast is the only unplayed song, choose that one
  let songToPlay;
  songToPlay = await Song.findOne({
    where: {
      channelId,
      played: false,
      isLast: false,
    },
  });
  if (!songToPlay) {
    songToPlay = await Song.findOne({
      where: {
        channelId,
        played: false,
      },
    });
  }
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
  const channel = await Channel.findById(channelId);
  await channel.update({
    timestamp: Date.now(),
  });

  const songInfo = await getSongDetails(token, songToPlay.songId);
  io.in(channelId).emit('song-info', {
    songId: songInfo.id,
    timestamp: channel.timestamp,
  });

  setTimeout(async () => {
    await channel.update({
      timestamp: Date.now(),
    });

    playNewSong(io, channelId);
  }, songInfo.duration_ms);
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
