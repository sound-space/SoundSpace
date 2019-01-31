import React from 'react'
import { Link } from 'react-router-dom'

const ChannelCard = props => (
  <div className='uk-text-center'>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
      className='uk-inline-clip uk-transition-toggle'
      tabIndex='0'
    >
      <Link to={`/channels/${props.channel.id}`}>
        <img
          style={{ width: '140%', height: '140%' }}
          src={props.channel.imageURL}
        />
      </Link>
      <div className='uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-default'>
        <p className='uk-h4 uk-margin-remove'>(Name of Song)</p>
      </div>
    </div>
    <p className='uk-margin-small-top'>{props.channel.name}</p>
  </div>
)

export default ChannelCard
