import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const ChannelCard = props => (
  <div className='uk-text-center'>
    <Link to={`/channels/${props.channel.id}`}>
      <div className='uk-inline-clip uk-transition-toggle' tabIndex='0'>
        <img
          style={{
            margin: '1em',
            width: '250px',
            height: '250px',
            objectFit: 'cover'
          }}
          src={props.channel.imageURL}
        />
        <div className='uk-transition-fade uk-position-cover uk-position-small uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle'>
          <p
            style={{ fontFamily: 'Tajawal', fontSize: '18px' }}
            className='uk-h6 uk-margin-remove'
          >
            {props.channel.description}
          </p>
        </div>
      </div>
    </Link>

    <p
      style={{ fontFamily: 'Tajawal', fontSize: '22px' }}
      className='uk-margin-small-top'
    >
      {props.channel.name}
    </p>
  </div>
)

export default withRouter(ChannelCard)
