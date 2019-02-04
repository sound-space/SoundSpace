const express = require('express');
const request = require('request');
const { client_id, client_secret } = require('../credentials');
// const { User } = require('./db/models');
const querystring = require('querystring');
// const cookieParser = require('cookie-parser');
const session = require('express-session')
const cors = require('cors');
const path = require('path');
const IP = 'http://localhost:8080';
const redirect_uri = `${IP}/callback`;
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
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
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: 'http://localhost:8080/callback',
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
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// start listening to socket connections
const io = socketio.listen(server);
const { socketComm, singularity } = require('./socket');
socketComm(io);
singularity(io);
        
        // res.redirect('/');
        // }, function(req, res) {
          //   res.redirect('/#/channels')
          // application requests refresh and access tokens
          
          // const code = req.query.code || null;
          // const authOptions = {
            //   url: 'https://accounts.spotify.com/api/token',
            //   form: {
              //     code: code,
              //     redirect_uri: redirect_uri,
              //     grant_type: 'authorization_code',
              //   },
              //   headers: {
                //     Authorization:
                //     'Basic ' +
                //     new Buffer(client_id + ':' + client_secret).toString('base64'),
                //   },
                //   json: true,
                // };
                
                // request.post(authOptions, function(error, response, body) {
                  //   if (!error && response.statusCode === 200) {
                    //     let access_token = body.access_token;
                    //     let refresh_token = body.refresh_token;
                    //     const options = {
                      //       url: 'https://api.spotify.com/v1/me',
                      //       headers: { Authorization: 'Bearer ' + access_token },
                      //       json: true,
                      //     };
                      
                      //     // use the access token to access the Spotify Web API
                      //     request.get(options, function(error, response, body) {
                        //       if (error) console.log(error);
                        //       let myResponse = { ...body, access_token, refresh_token };
                        //       // res.json(myResponse)
                        //       res.redirect('/home/' + querystring.stringify(myResponse));
                        //     });
                        //   } else {
                          //     console.log('error in post response');
                          //     res.redirect(
                            //       '/#' +
                            //       querystring.stringify({
                              //         error: 'invalid_token',
                              //       })
                              //       );
                              //     }
                              //   });
