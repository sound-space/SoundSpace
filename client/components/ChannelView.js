import React, { Component } from 'react';
import axios from 'axios';
import createClientSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../styles/ChannelViewStyles.css';
import ChannelSideBar from './ChannelSideBar';
import Player from './Player';
const IP = 'http://localhost:8080';

class ChannelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numUsers: 0,
      voted: false,
      currentSongId: '',
      device_id: '',
      playerState: {},
      messages: [],
      message: '',
    };
    this.socket = createClientSocket(IP);
  }

  componentDidMount() {
    this.socket.emit('room', this.props.match.params.id);
    this.socket.on('num-users', numUsers => {
      this.setState({
        numUsers,
      });
    });
    this.socket.on('new-message', message => {
      const messages = [...this.state.messages, message];
      this.setState({
        messages,
      });
    });
  }

  componentWillUnmount() {
    // If navigating away from ChannelView, disconnect from socket
    this.socket.emit('leave', this.props.match.params.id);
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
    if (!this.props.user.id) return <Redirect to="/" />;
    const playerState = this.props.playerState;
    const albumCoverUrl = playerState
      ? playerState.track_window.current_track.album.images[0].url
      : '';
    const currentTrackName = playerState
      ? playerState.track_window.current_track.name
      : '';
    const currentTrackAlbum = playerState
      ? playerState.track_window.current_track.album.name
      : '';

    const currentTrackArtist = playerState
      ? playerState.track_window.current_track.artists[0].name
      : '';
    return (
      <div className="uk-width-1-1 uk-container uk-container-expand uk-align-left">
        <div>
          <div uk-grid="true">
            <img
              className="uk-align-center"
              src={albumCoverUrl}
              width="400"
              height="400"
              alt=""
            />
          </div>
          <div className="uk-text-center">
            <div uk-grid="true" className="uk-align-center">
              <i
                className="fas fa-thumbs-up uk-margin-right"
                uk-tooltip="Upvote!"
                onClick={() => this.vote(1)}
              />
              <i
                className="fas fa-thumbs-down uk-margin-right"
                uk-tooltip="Upvote!"
                onClick={() => this.vote(1)}
              />
            </div>
            <div className="uk-text-large">{currentTrackName}</div>
            <div>{currentTrackArtist}</div>
            <div>{currentTrackAlbum}</div>
            <br />
            <div>
              Chat
              {this.state.messages.map(message => {
                return <div>{message}</div>;
              })}
              <input
                value={this.state.message}
                onChange={evt => {
                  this.setState({
                    message: evt.target.value,
                  });
                }}
                placeholder="Enter message..."
              />
              <button
                onClick={() => {
                  this.socket.emit(
                    'message',
                    this.props.match.params.id,
                    this.state.message
                  );
                  this.setState({
                    message: '',
                  });
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <Player socket={this.socket} channelId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.userObj,
    player: state.playerObj,
    playerState: state.playerStateObj,
  };
};

export default connect(
  mapState,
  null
)(ChannelView);
