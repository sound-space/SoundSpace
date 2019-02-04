import React from 'react'
import { Link } from 'react-router-dom'

const ChannelLineItem = props => (
  <div
    style={{ zIndex: '50' }}
    // className='uk-text-left uk-margin-left uk-margin-top'
  >
    <Link className='' to={`/channels/redirect/${props.channel.id}`}>
      <div class='uk-inline'>
        <button class='uk-button uk-button-default' type='button'>
          Click
        </button>
        <div uk-dropdown='mode: click'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </div>
      </div>
      <li style={{ backgroundColor: '#FFF' }}>{props.channel.name}</li>
    </Link>
  </div>
)

export default ChannelLineItem
