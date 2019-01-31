import React from 'react'

const Landing = () => {
  return (
    <div>

      <div
        className='uk-position-relative uk-visible-toggle uk-light'
        tabIndex='-1'
        uk-slideshow='autoplay: true'
      >
        <ul
          className='uk-slideshow-items'
          style={{
            width: '100%',
            maxHeight: '25%',
            padding: '100px 0',
            // display: 'flex',
            // flexDirection: 'column',
            margin: '0 auto'
          }}
        >
          <li>
            <img src='./assets/dj.jpg' alt='' uk-cover='true' />
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
      <p
        uk-margin='true'
        style={{
          width: '25%',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto'
        }}
      >
        <a href='/login'>
          <button className='uk-button uk-button-secondary uk-button-large'>
            LOG IN
          </button>
        </a>
      </p>
    </div>
  )
}

export default Landing
