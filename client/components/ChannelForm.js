import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postChannels } from '../store/channels'

class ChannelForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      imageURL: '',
      description: '',
      songSeeds: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.createChannels(this.state)
  }

  render () {
    const { name, imageURL, description } = this.state

    return (
      <div id='channelFormId' uk-modal='true'>
        <div className='uk-modal-dialog'>
          <form onSubmit={this.handleSubmit}>
            <fieldset className='uk-fieldset'>
              <legend className='uk-legend'>Make Your Channel</legend>

              <div className='uk-margin'>
                <input
                  onChange={this.handleChange}
                  name='name'
                  className='uk-input'
                  value={name}
                  type='text'
                  placeholder='Name'
                />
              </div>

              <div className='uk-margin'>
                <input
                  onChange={this.handleChange}
                  name='imageURL'
                  value={imageURL}
                  className='uk-input'
                  type='text'
                  placeholder='imageURL'
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
                />
              </div>
              <div className='uk-search uk-search-default'>
                <span uk-search-icon />
                <input className="uk-search-input" type="search" placeholder="song seeds" />
              </div>
            </fieldset>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createChannels: body => dispatch(postChannels(body))
})

export default connect(
  null,
  mapDispatchToProps
)(ChannelForm)
