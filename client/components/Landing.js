import React from 'react'
import { urlList } from './urlList'

const Landing = () => {
  return (
    <div className='landing' style={{ paddingBottom: '20px' }}>
      <div
        className='uk-height-large uk-background-cover uk-light uk-flex'
        uk-parallax='bgy: -200'
        style={{
          height: '900px',
          backgroundImage: `url(${
            urlList[Math.floor(Math.random() * Math.floor(9))]
          })`
        }}
      >
        <div className='uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical'>
        
          <div className='glass-pane'>
            <h1
              className='headline'
              style={{
                color: '#FFF',
                fontWeight: 'bold',
                fontFamily: 'Tajawal',
                // marginTop: '80px',
                lineHeight: '100px'
              }}
            >
              SoundSpace
            </h1>
            <h2
              className='subheadline'
              style={{
                marginTop: '-20px',
                fontWeight: '700',
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
                  color: 'white',
                  backgroundColor: 'rgba(56, 200, 127, 0.85)',
                  fontSize: '25px',
                  fontWeight: '700',
                  fontFamily: 'Tajawal',
                  padding: '18px 40px 8px 40px',
                  borderRadius: '15px',
                  textShadow: '3px 3px 3px rgba(0,0,0,0.4)',
                  boxShadow: '3px 3px 5px rgba(0,0,0,0.3)'
                }}
                className='signIn uk-button uk-button-primary'
              >
                Sign In
              </div>
            </a>
          </div>
          
          
          <h6
            style={{
              margin: '150px 0 -20px 0',
              fontFamily: 'Tajawal',
              fontSize: '30px',
              fontWeight: '700',
              textShadow: '3px 3px 5px rgba(0,0,0,0.7)'
            }}
          >
            Learn More
          </h6>
          <div className='uk-animation-toggle' tabIndex='0'>
            <a
              className='arrow uk-animation-shake'
              href='#learn'
              uk-icon='icon: chevron-down; ratio: 4'
              uk-scroll='true'
            />
          </div>
        </div>
      </div>
      <div id='learn'>
        <h1
          style={{
            color: 'gray',
            marginTop: '120px',
            fontFamily: 'Tajawal',
            fontWeight: '900'
          }}
          className='uk-heading-primary uk-text-center'
        >
          What is SoundSpace?
        </h1>

        <div
          style={{ padding: '50px' }}
          className='slideRight uk-child-width-1-1@s uk-child-width-1-2@s uk-grid-match'
          uk-grid='true'
        >
          <div
            style={{
              marginRight: '-5px'
            }}
          >
            <div
              style={{ borderLeft: '5px solid rgb(0, 140, 255)' }}
              className='uk-card uk-card-default uk-card-body'
              uk-scrollspy='cls: uk-animation-slide-left; repeat: true'
            >
              <h3
                style={{ color: 'rgb(0, 140, 255)' }}
                className='uk-card-title'
              >
                <span
                  className='uk-margin-small-right'
                  uk-icon='icon: social; ratio: 2'
                />
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
              style={{ borderLeft: '5px solid rgb(0, 140, 255)' }}
              className='uk-card uk-card-default uk-card-body'
              uk-scrollspy='cls: uk-animation-slide-right; repeat: true'
            >
              <h3
                style={{ color: 'rgb(0, 140, 255)' }}
                className='uk-card-title'
              >
                <span
                  style={{ color: 'rgb(0, 140, 255)' }}
                  className='uk-margin-small-right'
                  uk-icon='icon: world; ratio: 2'
                />
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
          style={{ padding: '0 50px' }}
          className='slideLeft uk-child-width-1-1@m uk-child-width-1-2@m uk-grid-match'
          uk-grid='true'
        >
          <div style={{ marginRight: '-5px' }}>
            <div
              style={{ borderLeft: '5px solid rgb(0, 140, 255)' }}
              className='uk-card uk-card-default uk-card-body'
              uk-scrollspy='cls: uk-animation-slide-left; repeat: true'
            >
              <h3
                style={{ color: 'rgb(0, 140, 255)' }}
                className='uk-card-title'
              >
                <i
                  style={{ fontSize: '30px', color: 'rgb(0, 140, 255)' }}
                  className='far fa-thumbs-up'
                />{' '}
                Vote
              </h3>
              <p>
                Individuals can participate in the collaborative process by
                up-voting or down-voting songs which decides what song plays
                next.
              </p>
            </div>
          </div>
          <div style={{ marginLeft: '-5px', color: 'rgb(0, 140, 255)' }}>
            <div
              style={{ borderLeft: '5px solid rgb(0, 140, 255)' }}
              className='uk-card uk-card-default uk-card-body'
              uk-scrollspy='cls: uk-animation-slide-right; repeat: true'
            >
              <h3
                style={{ color: 'rgb(0, 140, 255)' }}
                className='uk-card-title'
              >
                <span
                  className='uk-margin-small-right'
                  uk-icon='icon: thumbnails; ratio: 2'
                />
                Channels
              </h3>
              <p>
                Music channels are created by participants who are interested in
                helping to shape the SoundSpace environment.
              </p>
            </div>
          </div>
        </div>
      </div>
      <h3
        className='haveSpotify'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '100px',
          fontFamily: 'Tajawal',
          fontWeight: 'Bold',
          textAlign: 'center'
        }}
      >
        Are you ready? Sign in with your Spotify Premium account or create one
        today!
        <a
          style={{
            textDecoration: 'none'
          }}
          href='/login'
        >
          <div
            style={{
              color: 'white',
              backgroundColor: 'rgba(56, 185, 127, 1)',
              fontSize: '25px',
              fontWeight: '700',
              fontFamily: 'Tajawal',
              padding: '18px 40px 8px 40px',
              borderRadius: '15px',
              textShadow: '3px 3px 3px rgba(0,0,0,0.4)',
              boxShadow: '3px 3px 5px rgba(0,0,0,0.3)',
              marginTop: '30px',
            }}
            className='signIn uk-button uk-button-primary'
          >
            Enter
          </div>
        </a>
      </h3>
      <footer style={{ marginTop: '30px', textAlign: 'center' }}>
        <p>
          Made with{' '}
          <i
            style={{ fontSize: '15px', color: 'red' }}
            className='fas fa-heart'
          />{' '}
          in NYC.
        </p>
      </footer>
    </div>
  )
}

export default Landing
