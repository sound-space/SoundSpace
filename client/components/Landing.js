import React from 'react'
import { urlList } from './urlList'

const Landing = () => {
  return (
    <div
      style={{
        height: '1500px'
      }}
    >
      <div />
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <div
          className='uk-height-large uk-background-cover uk-light uk-flex'
          uk-parallax='bgy: -200'
          style={{
            height: '800px',
            backgroundImage: `url(${
              urlList[Math.floor(Math.random() * Math.floor(10))]
            })`
          }}
        >
          <h1
            style={{
              color: '#FFF',
              fontSize: '100px',
              fontWeight: 'bold'
            }}
            className='uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical'
          >
            Sound Space
            <a
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: ' 50px 0',
                alignItems: 'center'
              }}
              href='/login'
            >
              <button
                style={{
                  color: '#FFF',
                  backgroundColor: '#000',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '25px 50px'
                }}
                class='uk-button uk-button-primary'
              >
                Sign In
              </button>
            </a>
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
    </div>
  )
}

export default Landing
