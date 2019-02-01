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
      <div id='modal-example' uk-modal='true'>
        <div id='channelFormId' uk-modal='true'>
          <div className='uk-modal-dialog uk-border-rounded'>
            <form onSubmit={this.handleSubmit}>
              <fieldset className='uk-fieldset'>
                <h2 style={{ margin: '25px' }} class='uk-modal-title'>
                  New Channel
                </h2>
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
                    <input
                      onChange={this.handleChange}
                      // search='search'
                      className='uk-input'
                      // value={search}
                      type='text'
                      placeholder='Search Songs'
                      required
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
                </div>
                <p className='uk-text-right' style={{ margin: '25px' }}>
                  <button
                    className='uk-button uk-button-default uk-modal-close'
                    type='button'
                  >
                    Cancel
                  </button>
                  <button className='uk-button uk-button-danger' type='submit'>
                    Submit
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

export default connect(
  null,
  mapDispatchToProps
)(ChannelForm)
