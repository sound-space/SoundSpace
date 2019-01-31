import React from 'react'
import { Link } from 'react-router-dom'

const ChannelCard = props => (
  <div className='uk-text-center'>
    <div className='uk-inline-clip uk-transition-toggle' tabIndex='0'>
      <Link to={`/channels/${props.channel.id}`}>
        <img
          style={{ minWidth: '200px', minHeight: '200px', objectFit: 'cover' }}
          src={props.channel.imageURL}
        />
      </Link>
      <div className='uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-default'>
        <p className='uk-h6 uk-margin-remove'>{props.channel.description}</p>
      </div>
    </div>
    <p className='uk-margin-small-top'>{props.channel.name}</p>
  </div>
)

export default ChannelCard
