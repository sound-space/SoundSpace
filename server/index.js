const express = require('express');
const request = require('request');
// const { client_id, client_secret } = require('../credentials');
const querystring = require('querystring');
const session = require('express-session')
const cors = require('cors');
const path = require('path');
const IP = process.env.SPOTIFY_CLIENT_ID ? 'https://soundspace-fsa.herokuapp.com' : 'http://localhost:8080'
const redirect_uri = `${IP}/callback`;
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const { User, Song } = require('./db/models');
const PORT = 8080;
const url = require('url');
const scope =
'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-read-birthdate';
const socketio = require('socket.io');
const passport = require('passport');

const app = express();
app
  .use(express.static(path.resolve(__dirname, '..', 'public')))
  .use(volleyball)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use(session({ secret: 'The sound of space' }))
  .use(passport.initialize())
  .use(passport.session())

//Passport Auth
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID, // || client_id,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET, //|| client_secret,
      callbackURL: /*process.env.SPOTIFY_CLIENT_ID ?*/ 'https://soundspace-fsa.herokuapp.com/callback'// : 'http://localhost:8080/callback',
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
      //   // return done(err, user);
      // });
      profile.access_token = accessToken
      profile.refresh_token = refreshToken
      // console.log('PROFILE: ', profile)
      return done(null, profile)
    }
  )
);

passport.serializeUser(function(user, done) {
  // console.log('IN SERIALIZE:')
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // console.log('IN DESERIALIZE:')
  done(null, obj);
});


app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get(
  '/login',
  passport.authenticate('spotify', {
    scope, failureRedirect: '/login'
  }));
        
app.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  // console.log('REQ USER:', req.user)
  res.redirect('/#/channels')
});

app.get('/me', function(req,res) {
  // console.log('HIT /ME ROUTE')
  if(req.user) res.json(req.user)
  else res.json({})
})

app.get('/logout', (req,res) => {
  req.logout()
  // res.redirect('/')
  res.json({})
})

app.use('/api', require('./api')); // include our routes!

// app.get('/home/:id', (req, res, next) => {
//   res.redirect('/#/home/' + req.params.id);
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

// start server
const server = app.listen(process.env.PORT || PORT, () => console.log(`Listening on ${PORT}`));

// start listening to socket connections
const io = socketio.listen(server);
const { socketComm, singularity, playNewSong } = require('./socket');
socketComm(io);
singularity(io);
app.put('/startChannel', async (req, res, next) => {
  //Check if no song already playing for the requested channel
  const songIfExists = await Song.findOne({
    where: {
      channelId: req.body.channelId,
      isPlaying: true,
    },
  });
  //Only play if no song is already playing, this prevents network attacks from forcing channels to skip tracks
  if (!songIfExists) playNewSong(io, req.body.channelId);
});
