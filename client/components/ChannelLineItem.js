import React from 'react'
import { Link } from 'react-router-dom'

const ChannelLineItem = props => (
  <div className='uk-text-left uk-margin-left uk-margin-top'>
      <Link className="" to={`/channels/redirect/${props.channel.id}`}>
        {props.channel.name}
      </Link>
  </div>
)

export default ChannelLineItem
