import React from 'react'

const ChannelCard = props => (
  <div
    className='uk-child-width-1-2 uk-child-width-1-3@s uk-grid-match uk-grid-small'
    uk-grid
  >
    <div className='uk-text-center'>
      <div
        className='uk-inline-clip uk-transition-toggle uk-light'
        tabindex='0'
      >
        <img src='./assets/dj.jpg' />
        <div className='uk-position-center'>
          <div className='uk-transition-slide-top-small'>
            <h4 className='uk-margin-remove'>Users</h4>
          </div>
          <div className='uk-transition-slide-bottom-small'>
            <h4 className='uk-margin-remove'>Number</h4>
          </div>
        </div>
      </div>
      <p className='uk-margin-small-top'>{props.channel.name}</p>
    </div>
  </div>
)

export default ChannelCard
