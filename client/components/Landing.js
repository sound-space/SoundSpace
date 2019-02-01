import React from 'react'
import { urlList } from './urlList'

const Landing = () => {
  return (
    <div>
      <div />
      <div
      // style={{
      //   width: '100%',
      //   height: '100%'
      // }}
      >
        <div
          className='uk-height-large uk-background-cover uk-light uk-flex'
          uk-parallax='bgy: -200'
          style={{
            height: '800px',
            backgroundImage: `url(${
              urlList[Math.floor(Math.random() * Math.floor(9))]
            })`
          }}
        >
          <h1
            style={{
              color: '#FFF',
              fontSize: '120px',
              fontWeight: 'bold',
              fontFamily: 'Tajawal'
            }}
            className='uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical'
          >
            Sound Space
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'black',
                fontFamily: 'Tajawal'
              }}
            >
              Your Social Jukebox
            </h1>
          </h1>
        </div>

        <a
          className='uk-position-center-left uk-position-small uk-hidden-hover'
          href='#'
          uk-slidenav-previous='true'
          uk-slideshow-item='previous'
        />
        <a
          className='uk-position-center-right uk-position-small uk-hidden-hover'
          href='#'
          uk-slidenav-next='true'
          uk-slideshow-item='next'
        />
      </div>
      <h3
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '80px',
          fontFamily: 'Tajawal',
          fontWeight: 'Bold'
        }}
      >
        Already have a Spotify Premium Account?
      </h3>
      <a
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: ' 50px 0',
          alignItems: 'center',
          textDecoration: 'none'
        }}
        href='/login'
      >
        <button
          style={{
            color: '#FFF',
            backgroundColor: 'rgba(66, 244, 137, 0.8)',
            fontSize: '25px',
            fontWeight: 'Black',
            fontFamily: 'Tajawal',
            padding: '15px 40px 10px 40px'
          }}
          className='uk-button uk-button-primary'
        >
          Sign In
        </button>
      </a>
    </div>
  )
}

export default Landing
