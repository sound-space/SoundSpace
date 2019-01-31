import React, { Component } from 'react';
import axios from 'axios';
import createClientSocket from 'socket.io-client';
import Methods from '../EmbedPlayer';
import { connect } from 'react-redux';
import '../styles/ChannelViewStyles.css';
const {
  stopPlayer,
  transferPlaybackHere,
  checkForPlayer,
  createEventHandlers,
  setTrack,
} = Methods;
const IP = 'http://localhost:8080';

class ChannelView extends Component {
  constructor() {
    super();
    this.state = {
      voted: false,
      currentSongId: '',
      device_id: '',
    };
    this.socket = createClientSocket(IP);
    this.stopPlayer = stopPlayer.bind(this);
    this.setTrack = setTrack.bind(this);
    this.transferPlaybackHere = transferPlaybackHere.bind(this);
    this.checkForPlayer = checkForPlayer.bind(this);
    this.createEventHandlers = createEventHandlers.bind(this);
  }

  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  componentWillUnmount() {
    //If navigating away from ChannelView, disconnect from socket and stop player
    this.socket.emit('leave', this.props.match.params.id);
    this.stopPlayer();
  }

  vote = async userVote => {
    if (this.state.voted) return;
    try {
      await axios.put(`api/channels/${this.props.match.params.id}/votes`, {
        vote: userVote,
      });
      this.setState({
        voted: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="channel-view-container">
        <h1>This is the Channel View</h1>
        <h2>Current Song: {this.state.currentSongId || 'None'}</h2>

        <div className="vote-button-container">
          <button onClick={() => this.vote(1)}>Upvote!</button>
          <button onClick={() => this.vote(-1)}>Downvote!</button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.userObj.user,
  };
};

export default connect(
  mapState,
  null
)(ChannelView);
