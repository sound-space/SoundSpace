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
  handleSearch (evt) {
    this.setState({
      query: evt.target.value
    })
  }

  render () {
    return (
      <div className='channels' style={{ padding: '40px 50px' }}>
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
            margin: '60px 0 10px 0'
          }}
        >
          SoundSpace Channels
        </h1>
        {this.state.query ? (
          <h3
            style={{
              fontFamily: 'Tajawal',
              fontWeight: '500',
              fontSize: '30px',
              marginTop: '-10px'
            }}
          >
            Search Results
          </h3>
        ) : (
          <h3
            style={{
              fontFamily: 'Tajawal',
              fontWeight: '500',
              fontSize: '30px',
              marginTop: '-10px'
            }}
          >
            Active Sound Channels: {this.props.channels.length}
          </h3>
        )}
        <div
          style={{
            display: 'flex',
            margin: '30px',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: ' flex-start'
          }}
        >
          <div className='uk-text-center'>
            <div
              style={{
                margin: '1em',
                width: '250px',
                height: '250px',
                cursor: 'pointer',
                background: 'black'
              }}
              className='uk-inline-clip uk-transition-toggle uk-light'
              tabIndex='0'
              uk-toggle='target: #channelFormId'
            >
              <div className='uk-position-center'>
                <span uk-icon='icon: plus; ratio: 4' />
              </div>
            </div>
            <p
              style={{ fontFamily: 'Tajawal', fontSize: '22px' }}
              className='uk-margin-small-top'
            >
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
  channels: state.channels,
  user: state.userObj,
  player: state.playerObj
})

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannels)
