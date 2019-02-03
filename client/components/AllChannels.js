import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchChannels, findChannel } from '../store'
import ChannelCard from './ChannelCard'
import ChannelForm from './ChannelForm'

class AllChannels extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    this.props.fetchChannels()
  }

  handleSearch (evt) {
    this.setState({
      query: evt.target.value
    })
  }

  render () {
    return (
      <div style={{ paddingTop: '160px', margin: '0 50px' }}>
        <nav className='uk-navbar-container' uk-navbar='true'>
          <div className='uk-navbar-left'>
            <div className='uk-navbar-item'>
              <form className='uk-search uk-search-navbar'>
                <span uk-search-icon='true' />
                <input
                  name='search'
                  onChange={this.handleSearch}
                  className='uk-search-input'
                  type='search'
                  placeholder='Find Channels...'
                />
              </form>
            </div>
          </div>
        </nav>
        <ChannelForm />
        <h1
          style={{
            fontFamily: 'Tajawal',
            fontWeight: 'bold',
            marginTop: '30px'
          }}
        >
          Sound Space Music Channels
        </h1>
        <h3 style={{ fontWeight: 'medium', marginTop: '-10px' }}>
          Active Rooms: {this.props.channels.length}
        </h3>
        {/* <h3 style={{ fontWeight: 'medium', marginTop: '-10px' }}>
          Active Users: 0
        </h3> */}
        <div
          className='uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l uk-grid-match uk-grid-small'
          uk-grid='true'
        >
          <div className='uk-text-center'>
            <div
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
                src='https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
              />
              <div className='uk-position-center'>
                <span
                  className='uk-transition-fade'
                  uk-icon='icon: plus; ratio: 4'
                />
              </div>
            </div>
            <p style={{ fontSize: '22px' }} className='uk-margin-small-top'>
              New Channel
            </p>
          </div>
          {this.state.query
            ? this.props.channels.map(channel => {
              if (
                channel.name
                  .toLowerCase()
                  .includes(this.state.query.toLowerCase())
              ) {
                return <ChannelCard key={channel.id} channel={channel} />
              }
            })
            : this.props.channels.map(channel => {
              return <ChannelCard key={channel.id} channel={channel} />
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.channelsObj.channels,
  player: state.playerObj
})

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannels)
