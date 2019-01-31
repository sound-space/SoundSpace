import React from 'react'

const ChannelForm = () => (
  <div id='channelFormId' uk-modal='true'>
    <div className='uk-modal-dialog'>
      <form>
        <fieldset className='uk-fieldset'>
          <legend className='uk-legend'>Make Your Channel</legend>

          <div className='uk-margin'>
            <input className='uk-input' type='text' placeholder='Name' />
          </div>

          <div className='uk-margin'>
            <input className='uk-input' type='text' placeholder='imageURL' />
          </div>

          <div className='uk-margin'>
            <textarea
              className='uk-textarea'
              rows='5'
              placeholder='Description'
            />
          </div>

          <div className='uk-margin'>
            <input
              className='uk-range'
              type='range'
              // value='2'
              min='0'
              max='10'
              step='0.1'
            />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
)

export default ChannelForm
