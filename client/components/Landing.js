import React from 'react'
import { urlList } from './urlList'

const Landing = () => {
  return (
    <div className='landing'>
      <div
        className='uk-height-large uk-background-cover uk-light uk-flex'
        uk-parallax='bgy: -200'
        style={{
          height: '800px',
          backgroundImage: `url(${
            urlList[Math.floor(Math.random() * Math.floor(7))]
          })`
        }}
      >
        <div className='uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical'>
          <h1
            className='headline'
            style={{
              color: '#FFF',
              fontWeight: 'bold',
              fontFamily: 'Tajawal',
              marginTop: '80px',
              lineHeight: '100px'
            }}
          >
            SoundSpace
          </h1>
          <h2
            className='subheadline'
            style={{
              marginTop: '-20px',
              fontWeight: 'black',
              fontFamily: 'Tajawal'
            }}
          >
            Your Social Jukebox
          </h2>
          <h3
            className='haveSpotify'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '50px',
              fontFamily: 'Tajawal',
              fontWeight: 'Bold'
            }}
          >
            Have a Spotify Premium Account?
          </h3>
          <a
            style={{
              textDecoration: 'none'
            }}
            href='/login'
          >
            <div
              style={{
                color: '#FFF',
                backgroundColor: 'rgba(66, 244, 137, 1)',
                fontSize: '25px',
                fontWeight: 'Black',
                fontFamily: 'Tajawal',
                padding: '18px 40px 10px 40px'
              }}
              className='signIn uk-button uk-button-primary'
            >
              Sign In
            </div>
          </a>
        </div>
      </div>
      <div>
        <h1
          style={{
            color: 'rgb(0, 140, 255)',
            margin: '100px 0 80px 0'
          }}
          class='uk-heading-primary uk-text-center'
        >
          What is SoundSpace?
        </h1>

        <div
          style={{ margin: '40px 30px 20px 0' }}
          className='uk-child-width-1-2@m uk-grid-match'
          uk-grid='true'
        >
          <div style={{ marginRight: '-5px' }}>
            <div
              className='uk-card uk-card-default uk-card-body'
              uk-scrollspy='cls: uk-animation-slide-left; repeat: true'
            >
              <h3 className='uk-card-title'>
                <span className='uk-margin-small-right' uk-icon='social' />
                Social
              </h3>
              <p>
                A crowd sourced atmosphere for discussing, discovering and
                sharing new music that's played live.
              </p>
            </div>
          </div>
          <div style={{ marginLeft: '-5px' }}>
            <div
              className='uk-card uk-card-default uk-card-body'
              uk-scrollspy='cls: uk-animation-slide-right; repeat: true'
            >
              <h3 className='uk-card-title'>
                <span className='uk-margin-small-right' uk-icon='world' />
                Global
              </h3>
              <p>
                Collaborate and curate musical channels with other individuals
                from around the world.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{ margin: '40px 30px 20px 0' }}
          className='uk-child-width-1-2@m uk-grid-match'
          uk-grid='true'
        >
          <div style={{ marginRight: '-5px' }}>
            <div
              className='uk-card uk-card-default uk-card-body'
              uk-scrollspy='cls: uk-animation-slide-left; repeat: true'
            >
              <h3 className='uk-card-title'>
                <span className='uk-margin-small-right' uk-icon='check' />
                Vote
              </h3>
              <p>
                Individuals can participate in the collaborative process by
                up-voting or down-voting songs which decide what song plays
                next.
              </p>
            </div>
          </div>
          <div style={{ marginLeft: '-5px' }}>
            <div
              className='uk-card uk-card-default uk-card-body'
              uk-scrollspy='cls: uk-animation-slide-right; repeat: true'
            >
              <h3 className='uk-card-title'>
                <span className='uk-margin-small-right' uk-icon='thumbnails' />
                Channels
              </h3>
              <p>
                Music Channels are created by participants who are interested in
                helping to shape the SoundSpace environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
