import React from 'react'

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
          maxHeight: '80%'
        }}
        className='uk-position-relative uk-visible-toggle uk-light'
        tabIndex='-1'
        uk-slideshow='autoplay: true'
      >
        <h1
          style={{
            zIndex: '10',
            position: 'absolute',
            fontSize: '100px',
            textAlign: 'center',
            left: '50%',
            fontFamily: 'Tajawal, sans-serif'
          }}
        >
          Sound Space
        </h1>
        <ul className='uk-slideshow-items'>
          <li>
            <div
              className='uk-background-cover uk-height-large uk-panel uk-flex uk-flex-center uk-flex-middle'
              style={{ backgroundImage: 'url(./assets/dj.jpg)' }}
            >
              <p className='uk-h4'>Cover</p>{' '}
            </div>
          </li>
          <li>
            <img src='./assets/instruments.jpg' alt='' uk-cover='true' />
          </li>
          <li>
            <img src='./assets/words.jpg' alt='' uk-cover='true' />
          </li>
          <li>
            <img src='./assets/album.jpg' alt='' uk-cover='true' />
          </li>
          <li>
            <img src='./assets/headphones.jpg' alt='' uk-cover='true' />
          </li>
          <li>
            <img src='./assets/turntable.jpg' alt='' uk-cover='true' />
          </li>
        </ul>

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
      <a
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          // left: '45%'
          justifyContent: 'center',
          alignItems: 'center'
        }}
        href='/login'
      >
        <button className='uk-button uk-button-secondary uk-button-large'>
          LOG IN
        </button>
      </a>
    </div>
  )
}

export default Landing
