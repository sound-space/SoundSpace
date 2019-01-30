import React, { Component } from 'react'
import axios from 'axios';

export default class ChannelView extends Component {
  constructor() {
    super()
    this.state = {
      voted: false
    }
  }
  
  vote = async (userVote) => {
    if(this.state.voted) return
    try {
      await axios.put(`api/channels/${this.props.match.params.channelId}/votes`, {vote: userVote})
      this.setState({
        voted: true
      })
    }
    catch(err) {
      console.log(err)
    }
  }
  
  render() {
    return (
      <div className='channel-view-container'>
        <h1>This is the Channel View</h1>
        
        <button onClick={() => this.vote(1)}>
          Upvote!
        </button>
        
        <button onClick={() => this.vote(-1)}>
          Downvote!
        </button>
      </div>
    )
  }
}
