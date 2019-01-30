import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchChannels } from '../store'
import ChannelCard from './ChannelCard'

class AllChannels extends Component {
  componentDidMount () {
    this.props.fetchChannels()
  }

  render () {
    return (
      <div>
        <h1>Channels</h1>
        {this.props.channels.map(channel => {
          return <ChannelCard channel={channel} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.channels
})

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannels)
