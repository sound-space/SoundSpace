const express = require('express');
const request = require('request');
const { client_id, client_secret } = require('../credentials');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const IP = 'http://localhost:8080';
const redirect_uri = `${IP}/callback`;
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const { User, Song } = require('./db/models');
const PORT = 8080;
const url = require('url');

const scope =
  'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-read-birthdate';
const socketio = require('socket.io');

const app = express();
app
  .use(express.static(path.resolve(__dirname, '..', 'public')))
  .use(cors())
  .use(cookieParser());

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Passport Auth
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: 'http://localhost:8080/callback',
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use('/api', require('./api')); // include our routes!

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get(
  '/login',
  passport.authenticate('spotify', {
    scope,
  }),
  function(req, res) {
    // application requests authorization
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
        })
    );
  }
);

app.get('/callback', function(req, res) {
  // application requests refresh and access tokens

  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64'),
    },
    json: true,
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      let refresh_token = body.refresh_token;
      const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { Authorization: 'Bearer ' + access_token },
        json: true,
      };

      // use the access token to access the Spotify Web API
      request.get(options, function(error, response, body) {
        if (error) console.log(error);
        let myResponse = { ...body, access_token, refresh_token };
        // res.json(myResponse)
        res.redirect('/home/' + querystring.stringify(myResponse));
      });
    } else {
      console.log('error in post response');
      res.redirect(
        '/#' +
          querystring.stringify({
            error: 'invalid_token',
          })
      );
    }
  });
});

app.get('/home/:id', (req, res, next) => {
  res.redirect('/#/home/' + req.params.id);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

// start server
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

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
