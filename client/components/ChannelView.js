import React, { Component } from 'react';
import axios from 'axios';
import createClientSocket from 'socket.io-client';
import { connect } from 'react-redux';
import '../styles/ChannelViewStyles.css';
import { search } from '../SpotifySearch';
import Player from './Player';
import * as Vibrant from 'node-vibrant'
const IP =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://soundspace-fsa.herokuapp.com';

class ChannelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numUsers: 0,
      vote: '',
      currentSongId: '',
      device_id: '',
      playerState: {},
      messages: [],
      message: '',
      channelDetails: {},
      searchQuery: '',
      searchResults: [],
      currentAlbumUrl: '',
      colorScheme: {}
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.setColorScheme = this.setColorScheme.bind(this);
    this.rgb = this.rgb.bind(this);
    this.search = search.bind(this);
    this.socket = createClientSocket(IP);
  }

  async componentDidMount() {
    let { data } = await axios.get(
      `/api/channels/${this.props.match.params.id}`
    );
    this.setState({ channelDetails: data });
    this.socket.on('num-users', numUsers => {
      this.setState({
        numUsers,
      });
    });
    this.socket.on('new-message', message => {
      const messages = [message, ...this.state.messages];
      this.setState({
        messages,
      });
      document.getElementsByClassName('chat-messages-container').scrollTop = 0;
    });
    this.setColorScheme()
  }

  componentWillUnmount() {
    // If navigating away from ChannelView, disconnect from socket
    this.socket.emit('leave', this.props.match.params.id);
  }

  componentWillReceiveProps() {
    this.setColorScheme()
  }

  // set color scheme on state
  async setColorScheme() {
    if (this.props.playerState) {
      const currentAlbumUrl = this.props.playerState.track_window.current_track.album.images[0].url
      if (this.state.currentAlbumUrl !== currentAlbumUrl) {
        const colorScheme = await Vibrant.from(currentAlbumUrl).getPalette()
        this.setState({currentAlbumUrl, colorScheme})
      }
    }
  }

  // convert color to CSS rgb value
  rgb(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ['rgb(', r, ',', g, ',', b, ')'].join('');
  };

  async handleSearch(evt) {
    this.setState({
      searchQuery: evt.target.value,
    });
    if (evt.target.value === '') {
      this.setState({
        searchResults: [],
      });
      return;
    }
    const { tracks } = await this.search(this.state.searchQuery);
    this.setState({
      searchResults: tracks.items,
    });
  }

  vote = async (userVote, voteState) => {
    let changeInDB, newVoteState;
    if (userVote === 'up') {
      switch (voteState) {
        case 'up':
          changeInDB = -1;
          newVoteState = '';
          break;
        case 'down':
          changeInDB = +2;
          newVoteState = 'up';
          break;
        default:
          changeInDB = +1;
          newVoteState = 'up';
      }
    } else if (userVote === 'down') {
      switch (voteState) {
        case 'up':
          changeInDB = -2;
          newVoteState = 'down';
          break;
        case 'down':
          changeInDB = +1;
          newVoteState = '';
          break;
        default:
          changeInDB = -1;
          newVoteState = 'down';
      }
    }

    try {
      await axios.put(`api/channels/${this.props.match.params.id}/votes`, {
        vote: changeInDB,
      });
      this.setState({
        vote: newVoteState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  clearVotes = () => {
    this.setState({
      vote: '',
    });
  };

  render() {
    console.log("COLOR OBJECT: ", this.state.colorScheme)
    // variables for meta data
    const playerState = this.props.playerState;
    const albumCoverUrl = playerState
      ? playerState.track_window.current_track.album.images[0].url
      : null;
    const currentTrackName = playerState
      ? playerState.track_window.current_track.name
      : null;
    const currentTrackAlbum = playerState
      ? playerState.track_window.current_track.album.name
      : null;

    const currentTrackArtist = playerState
      ? playerState.track_window.current_track.artists[0].name
      : null;

// setting colors from the state
    let colorScheme = this.state.colorScheme
    let check = false
    let vibrant, lightVibrant, darkVibrant, muted,lightMuted,darkMuted
    if (colorScheme.Vibrant) {
      check=true
      vibrant = colorScheme.Vibrant ? this.rgb(colorScheme.Vibrant.r, colorScheme.Vibrant.g, colorScheme.Vibrant.b) : null
      lightVibrant = colorScheme.LightVibrant ? this.rgb(colorScheme.LightVibrant.r, colorScheme.LightVibrant.g, colorScheme.LightVibrant.b) : null
      darkVibrant = colorScheme.DarkVibrant ? this.rgb(colorScheme.DarkVibrant.r, colorScheme.DarkVibrant.g, colorScheme.DarkVibrant.b) : null
      muted = colorScheme.Muted ? this.rgb(colorScheme.Muted.r, colorScheme.Muted.g, colorScheme.Muted.b) : null
      lightMuted = colorScheme.LightMuted ? this.rgb(colorScheme.LightMuted.r, colorScheme.LightMuted.g, colorScheme.LightMuted.b) : null
      darkMuted = colorScheme.DarkMuted ? this.rgb(colorScheme.DarkMuted.r, colorScheme.DarkMuted.g, colorScheme.DarkMuted.b) : null
    }

    return (
      <div className="uk-width-1-1 uk-container uk-container-expand uk-align-left" style={{backgroundColor:vibrant}}>
        <div>
          <div align="center">
            <br />
            <h2>{this.state.channelDetails.name}</h2>
            <p>{this.state.channelDetails.description}</p>
          </div>
          {check && 
          <div className="uk-align-center" style={{leftMargin:"auto", rightMargin:"auto", maxWidth:"200px", border:"solid", borderColor:"grey", textAlign:"center"}} >
            <div style={{backgroundColor: vibrant}}>vibrant</div>
            <div style={{backgroundColor: lightVibrant}}>lightVibrant</div>
            <div style={{backgroundColor: darkVibrant}}>darkVibrant</div>
            <div style={{backgroundColor: muted}}>muted</div>
            <div style={{backgroundColor: lightMuted}}>lightMuted</div>
            <div style={{backgroundColor: darkMuted}}>darkMuted</div>
          </div>}
          <div uk-grid="true">
            <img
              style={{ objectFit: 'cover' }}
              className="uk-align-center album-img"
              src={albumCoverUrl}
            />
          </div>
          <div className="uk-text-center">
            <div uk-grid="true" className="uk-align-center">
              <i
                className={`fas fa-thumbs-down uk-margin-right ${
                  this.state.vote === 'down' ? 'active-down' : ''
                }`}
                uk-tooltip="Downvote!"
                onClick={() => this.vote('down', this.state.vote)}
              />{' '}
              <i
                className={`fas fa-thumbs-up uk-margin-right ${
                  this.state.vote === 'up' ? 'active-up' : ''
                }`}
                uk-tooltip="Upvote!"
                onClick={() => this.vote('up', this.state.vote)}
              />
            </div>
            <div
              style={{ color: 'rgb(0, 140, 255)' }}
              className="uk-text-large"
            >
              {currentTrackName}
            </div>
            <div>By {currentTrackArtist}</div>
            <div>{currentTrackAlbum}</div>
            <br />

            {this.state.channelDetails.isSuggestable ? (
              <div>
                <div
                  style={{
                    fontFamily: 'Tajawal',
                    fontSize: '22px',
                    marginTop: '50px',
                  }}
                  className="uk-margin"
                >
                  Add a suggestion:
                </div>
                <input
                  style={{ width: '50%' }}
                  value={this.state.searchQuery}
                  onChange={this.handleSearch}
                  className="uk-input"
                  type="text"
                  placeholder="Search Songs..."
                />
                <div>
                  {this.state.searchResults.map((track, i) => {
                    return (
                      <div
                        className="add"
                        key={i}
                        onClick={async () => {
                          this.setState({
                            searchQuery: '',
                            searchResults: [],
                          });
                          await axios.post('/api/songs', {
                            songIds: [track.id],
                            channelId: this.props.match.params.id,
                            isSuggestion: true,
                          });
                          window.UIkit.notification(
                            `<span uk-icon='icon: check'></span> Queued ${
                              track.name
                            }!`
                          );
                        }}
                      >
                        <span
                          className="uk-margin-small-right"
                          uk-icon="plus-circle"
                        />
                        {track.name} by{' '}
                        {track.artists.map((artist, j) => {
                          return j === track.artists.length - 1
                            ? artist.name
                            : artist.name + ', ';
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              undefined
            )}
            <br />
            <hr />

            <p>Listeners: {this.state.numUsers}</p>
            <hr />
            <div className="chat-container">
              <div className="chat-input-container">
                <form
                  onSubmit={evt => {
                    evt.preventDefault();
                    if (this.state.message.length > 0) {
                      this.socket.emit('message', this.props.match.params.id, {
                        text: this.state.message,
                        user: this.props.user.displayName,
                      });
                      this.setState({
                        message: '',
                      });
                    }
                  }}
                >
                  <p
                    style={{
                      marginTop: '20px',
                      fontFamily: 'Tajawal',
                      fontSize: '40px',
                      fontWeight: '500',
                    }}
                  >
                    Chat Room
                  </p>
                  <div className="chat-messages-container">
                    {this.state.messages.map((message, i) => {
                      return (
                        <div className="message">
                          <em>{message.user}</em>: {message.text}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mainchatinput">
                    <input
                      className="uk-input uk-form-width-medium chat-input"
                      value={this.state.message}
                      onChange={evt => {
                        this.setState({
                          message: evt.target.value,
                        });
                      }}
                      placeholder="Enter message..."
                    />
                    <button
                      className="uk-button uk-button-primary uk-button-large"
                      type="submit"
                      style={{ backgroundColor: 'rgb(0, 140, 255)' }}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Player
          socket={this.socket}
          channelId={this.props.match.params.id}
          clearVotes={this.clearVotes}
        />
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
