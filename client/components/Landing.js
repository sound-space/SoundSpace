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
          <div className='uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical'>
            <h1
              style={{
                color: '#FFF',
                fontSize: '120px',
                fontWeight: 'bold',
                fontFamily: 'Tajawal',
                marginTop: '80px',
                lineHeight: '100px'
              }}
            >
              SoundSpace
            </h1>
            <h2
              style={{
                marginTop: '-20px',
                fontSize: '40px',
                fontWeight: 'black',
                fontFamily: 'Tajawal'
              }}
            >
              Your Social Jukebox
            </h2>
            <h3
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50px',
                fontFamily: 'Tajawal',
                fontWeight: 'Bold',
                fontSize: '25px'
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
      </div>
    </div>
  )
}

export default Landing
