import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChannelLineItem from './ChannelLineItem'

class ChannelSideBar extends Component {
  render () {
    console.log(this.props)
    return (
      <div className='uk-animation-fade uk-width-medium uk-background-secondary uk-height-1-1 uk-position-top-left'>
        <div className='side-bar-overlay'>
          <p className="uk-text-large uk-text-left uk-margin-left uk-margin-top">Channel list</p>
          <ul className='uk-list uk-list-divider'>
            {this.props.channels.map(channel => (
              <ChannelLineItem key={channel.id} channel={channel} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.channels
})

export default connect(
  mapStateToProps,
  null
)(ChannelSideBar)
