import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchChannels, findChannel } from '../store'
import ChannelCard from './ChannelCard'
import ChannelForm from './ChannelForm'

class AllChannels extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    this.props.fetchChannels()
  }

  handleSearch (evt) {
    // console.log(this.state.query)
    // const contains = (item, inputQuery) => {
    //   return item.includes(inputQuery)
    // }
    // const data = this.props.channels.filter(channel => {
    //   return contains(channel, evt.target.value)
    // })
    this.setState({
      query: evt.target.value
      // results: [data]
    })
  }

  // handleSubmit (evt) {
  //   evt.preventDefault()
  //   this.props.findChannel(this.state)
  // }

  render () {
    // console.log('query', this.state.query)
    // console.log('results', this.state.results)
    return (
      <div style={{ paddingTop: '100px', margin: '0 50px' }}>
        <nav className='uk-navbar-container' uk-navbar='true'>
          <div className='uk-navbar-left'>
            <div className='uk-navbar-item'>
              <form
                // onSubmit={this.handleSubmit}
                className='uk-search uk-search-navbar'
              >
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
                src='https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
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
  channels: state.channelsObj.channels
})

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels())
  // findChannel: () => dispatch(findChannel())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannels)
