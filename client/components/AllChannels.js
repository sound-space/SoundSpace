import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchChannels } from '../store'
import { Redirect } from 'react-router-dom'
import ChannelCard from './ChannelCard'
import ChannelForm from './ChannelForm'

class AllChannels extends Component {
  componentDidMount () {
    this.props.fetchChannels()
  }

  render () {
    // if(!this.props.user.id) return <Redirect to='/' />
    return (
      <div style={{ margin: '0 50px' }}>
        <ChannelForm />
        <h1>Channels</h1>
        <div
          className='uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l uk-grid-match uk-grid-small'
          uk-grid='true'
        >
          <div className='uk-text-center'>
            <div
              // onClick={this.newChannel.bind(this)}
              className='uk-inline-clip uk-transition-toggle uk-light'
              tabIndex='0'
              uk-toggle='target: #channelFormId'
            >
              <img
                style={{
                  cursor: 'pointer',
                  minWidth: '200px',
                  minHeight: '200px',
                  objectFit: 'cover'
                }}
                src='./assets/instruments.jpg'
              />
              <div className='uk-position-center'>
                <span
                  className='uk-transition-fade'
                  uk-icon='icon: plus; ratio: 2'
                />
              </div>
            </div>
            <p className='uk-margin-small-top'>New Channel</p>
          </div>
          {this.props.channels.map(channel => {
            return <ChannelCard key={channel.id} channel={channel} />
          })}{' '}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.channelsObj.channels,
  user: state.userObj
})

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannels)
