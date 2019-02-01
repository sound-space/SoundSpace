import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const ChannelCard = props => (
  <div className='uk-text-center'>
    <div className='uk-inline-clip uk-transition-toggle' tabIndex='0'>
    {console.log('Channel Id:', props.channel.id)}
      <a href={`/channels/${props.channel.id}`}>
        <img
          style={{ minWidth: '200px', minHeight: '200px', objectFit: 'cover' }}
          src={props.channel.imageURL}
        />
      </a>
      <div className='uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-default'>
        <p className='uk-h4 uk-margin-remove'>(Name of Song)</p>
      </div>
    </div>
    <p className='uk-margin-small-top'>{props.channel.name}</p>
  </div>
)

export default withRouter(ChannelCard)
