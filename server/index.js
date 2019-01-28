const express = require('express')
const request = require('request')
const { client_id, client_secret } = require('../credentials')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const redirect_uri = 'http://localhost:8080/callback'
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const PORT = 8080
const scope =
  'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-read-birthdate'

const app = express()
app
  .use(express.static(path.resolve(__dirname, '..', 'public')))
  .use(cors())
  .use(cookieParser())

// logging middleware
app.use(volleyball)

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', require('./api')) // include our routes!

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

app.get('/login', function (req, res) {
  // your application requests authorization
  console.log('ABOUT TO REDIRECT TO SPOTIFY AUTH')
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri
      })
  )
})

app.get('/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    json: true
  }

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token

      let refresh_token = body.refresh_token
      const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { Authorization: 'Bearer ' + access_token },
        json: true
      }

      // use the access token to access the Spotify Web API
      request.get(options, function (error, response, body) {
        if (error) console.log(error)
        // console.log(body)
        let myResponse = { ...body, access_token, refresh_token }
        // console.log('stringified body:', querystring.stringify(myResponse))
        res.redirect('/#' + querystring.stringify(myResponse))
      })
    } else {
      console.log('error in post response')
      res.redirect(
        '/#' +
          querystring.stringify({
            error: 'invalid_token'
          })
      )
    }
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
