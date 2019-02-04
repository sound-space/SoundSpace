import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postChannels } from '../store/channels'
import { search } from '../SpotifySearch'

class ChannelForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      imageURL: '',
      description: '',
      searchQuery: '',
      searchResults: [],
      songSeeds: [],
      buttonText: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.search = search.bind(this)
  }
  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    // Prevent submission when no songs are selected
    if (this.state.songSeeds.length < 1) {
      alert('Please select some tracks to start your channel!')
      return
    }
    this.props.createChannels(this.state)
    this.setState({
      name: '',
      imageURL: '',
      description: '',
      searchQuery: '',
      searchResults: [],
      songSeeds: [],
      buttonText: !this.state.buttonText
    })
  }

  handleClick () {
    this.setState({ buttonText: false })
  }

  async handleSearch (evt) {
    if (evt.target.value === '') {
      this.setState({
        searchResults: []
      })
      return
    }
    const { tracks } = await this.search(evt.target.value)
    this.setState({
      searchResults: tracks.items
    })
  }

  addToSeed (song) {
    let seed = this.state.songSeeds
    // Seed can't be more than 5
    if (seed.length >= 5) return
    for (let i = 0; i < seed.length; i++) {
      // Only add the track if it is not in the seed already
      if (seed[i].id === song.id) return
    }
    seed.push(song)
    this.setState({
      songSeeds: seed
    })
  }

  removeFromSeed (song) {
    let seed = this.state.songSeeds
    let updatedSeed = seed.filter(singleSong => {
      return song !== singleSong
    })
    this.setState({
      songSeeds: updatedSeed
    })
  }

  render () {
    const { name, imageURL, description, songSeeds, searchResults } = this.state

    return (
      <div id='modal-example' uk-modal='true'>
        <div id='channelFormId' uk-modal='true'>
          <div className='uk-modal-dialog uk-border-rounded'>
            {this.state.buttonText ? (
              ''
            ) : (
              <button
                className='uk-modal-close-default'
                type='button'
                uk-close='true'
              />
            )}

            <form onSubmit={this.handleSubmit}>
              <fieldset className='uk-fieldset'>
                <h2 style={{ margin: '25px' }} className='uk-modal-title'>
<<<<<<< HEAD
                  New Channel
=======
                  {this.state.buttonText ? 'Success' : 'New Channel'}
>>>>>>> master
                </h2>
                {this.state.buttonText ? (
                  <div style={{ marginLeft: '25px' }}>
                    New channel has been created successfully and your songs are
                    now playing live!
                  </div>
                ) : (
                  <div style={{ margin: '0 25px' }}>
                    <div className='uk-margin'>
                      <input
                        onChange={this.handleChange}
                        name='name'
                        className='uk-input'
                        value={name}
                        type='text'
                        placeholder='Name'
                        required
                      />
                    </div>

                    <div className='uk-margin'>
                      <input
                        onChange={this.handleChange}
                        name='imageURL'
                        value={imageURL}
                        className='uk-input'
                        type='text'
                        placeholder='Image URL'
                      />
                    </div>
                    <div className='uk-margin'>
                      <textarea
                        onChange={this.handleChange}
                        name='description'
                        value={description}
                        className='uk-textarea'
                        rows='5'
                        placeholder='Description'
                        required
                      />
                    </div>
                    <div className='uk-margin'>
                      <input
                        onChange={this.handleSearch}
                        className='uk-input'
                        type='text'
                        placeholder='Search Songs...'
                      />
                    </div>

                    <div>
                      {songSeeds.length > 0 && (
                        <h5>
                          {songSeeds.length} Selected Tracks Currently Added{' '}
                        </h5>
                      )}

                      {songSeeds.map((track, i) => {
                        return (
                          <div
                            className='remove'
                            key={i}
                            onClick={() => this.removeFromSeed(track)}
                          >
                            <span
                              className='uk-margin-small-right'
                              uk-icon='minus-circle'
                            />
                            {track.name} by{' '}
                            {track.artists.map((artist, j) => {
                              return j === track.artists.length - 1
                                ? artist.name
                                : artist.name + ', '
                            })}
                          </div>
                        )
                      })}
                    </div>
                    <hr />
                    <div>
                      {searchResults.length ? (
                        <h5>Add Up to {5 - songSeeds.length} Tracks</h5>
                      ) : null}
                      {searchResults.map((track, i) => {
                        return (
                          <div
                            className='add'
                            key={i}
                            onClick={() => this.addToSeed(track)}
                          >
                            {' '}
                            <span
                              className='uk-margin-small-right'
                              uk-icon='plus-circle'
                            />
                            {track.name} by{' '}
                            {track.artists.map((artist, j) => {
                              return j === track.artists.length - 1
                                ? artist.name
                                : artist.name + ', '
                            })}
                          </div>
                        )
                      })}
                    </div>
                    <hr />
                  </div>
                )}
                <p className='uk-text-right' style={{ margin: '25px' }}>
                  {this.state.buttonText ? (
                    ''
                  ) : (
                    <button
                      className='uk-button uk-button-default uk-modal-close'
                      type='button'
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={this.handleClick}
                    className={`${this.state.buttonText &&
                      'uk-modal-close'} uk-button uk-button-danger`}
                    type='submit'
                  >
                    {this.state.buttonText ? 'Close' : 'Submit'}
                  </button>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createChannels: body => dispatch(postChannels(body))
})

function mapState (state) {
  return {
    user: state.userObj
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(ChannelForm)
