import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChannelLineItem from './ChannelLineItem'

class ChannelSideBar extends Component {
  render () {
    console.log(this.props)
    return (
      <div className='uk-background-blend-darken uk-animation-fade uk-width-medium uk-background-secondary uk-height-1-1 uk-position-top-right'>
        <div className='side-bar-overlay'>
          <ul className='uk-list uk-list-divider'>
            {this.props.channels.map(channel => (
              <li key={channel.id}>
                <ChannelLineItem channel={channel} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.channelsObj.channels
})

export default connect(
  mapStateToProps,
  null
)(ChannelSideBar)
