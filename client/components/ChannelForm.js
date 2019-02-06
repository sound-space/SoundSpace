import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postChannels } from '../store/channels';
import { search } from '../SpotifySearch';
import {urlList} from './urlList'

class ChannelForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      imageURL: '',
      description: '',
      searchQuery: '',
      searchResults: [],
      songSeeds: [],
      buttonText: false,
      validation: false,
    };
    this.pickedImage = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.search = search.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }



  handleImageChange(evt) {
    const imageURL = evt.target.src
    evt.target.style.opacity = ".5"
    if (this.pickedImage.style) {
      this.pickedImage.style.opacity = "1"
    }
    this.pickedImage = evt.target
    this.setState({
      imageURL
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // Form validates for all requirements
    if (
      this.state.songSeeds.length &&
      this.state.name.length &&
      this.state.description.length
    ) {
      this.props.createChannels({
        ...this.state,
        isSuggestable: document.getElementById('suggestions-enabled').checked,
      });
      this.setState({
        name: '',
        imageURL: '',
        description: '',
        searchQuery: '',
        searchResults: [],
        songSeeds: [],
        buttonText: !this.state.buttonText,
        validation: false,
      });
    } else if (!this.state.name.length && !this.state.description.length) {
      this.setState({
        validation: true,
      });
    }
  }

  handleClose() {
    this.setState({ buttonText: false });
  }

  handleCancel() {
    this.setState({
      name: '',
      imageURL: '',
      description: '',
      searchQuery: '',
      searchResults: [],
      songSeeds: [],
    });
  }

  async handleSearch(evt) {
    if (evt.target.value === '') {
      this.setState({
        searchResults: [],
      });
      return;
    }
    this.setState({
      searchQuery: evt.target.value,
    });
    const { tracks } = await this.search(evt.target.value);
    this.setState({
      searchResults: tracks.items,
    });
  }

  addToSeed(song) {
    let seed = this.state.songSeeds;
    // Seed can't be more than 5
    if (seed.length >= 5) return;
    for (let i = 0; i < seed.length; i++) {
      // Only add the track if it is not in the seed already
      if (seed[i].id === song.id) return;
    }
    seed.push(song);
    this.setState({
      songSeeds: seed,
    });
  }

  removeFromSeed(song) {
    let seed = this.state.songSeeds;
    let updatedSeed = seed.filter(singleSong => {
      return song !== singleSong;
    });
    this.setState({
      songSeeds: updatedSeed,
    });
  }

  render() {
    const {
      name,
      imageURL,
      description,
      songSeeds,
      searchResults,
    } = this.state;

    return (
      <div id="modal-example" uk-modal="true">
        <div id="channelFormId" uk-modal="true">
          <div className="uk-modal-dialog uk-border-rounded">
            {this.state.buttonText ? (
              ''
            ) : (
              <button
                className="uk-modal-close-default"
                type="button"
                uk-close="true"
              />
            )}

            <form onSubmit={this.handleSubmit}>
              <fieldset className="uk-fieldset">
                <h2 style={{ margin: '25px' }} className="uk-modal-title">
                  {this.state.buttonText ? 'Success' : 'New Channel'}
                </h2>
                {this.state.buttonText ? (
                  <div style={{ marginLeft: '25px' }}>
                    The channel has been created successfully and your tracks
                    are now playing live!
                  </div>
                ) : (
                  <div style={{ margin: '0 25px' }}>
                    <div className="uk-margin">
                      <input
                        onChange={this.handleChange}
                        name="name"
                        className="uk-input"
                        value={name}
                        type="text"
                        placeholder="Name (required)"
                      />
                    </div>
                    {!this.state.name.length && this.state.validation ? (
                      <div className="uk-alert-warning" uk-alert="true">
                        <p>Name field is required.</p>
                      </div>
                    ) : null}
                    <div className="uk-margin">
                      <textarea
                        onChange={this.handleChange}
                        name="description"
                        value={description}
                        className="uk-textarea"
                        rows="5"
                        placeholder="Description (required)"
                      />
                    </div>
                    {!this.state.description.length && this.state.validation ? (
                      <div className="uk-alert-warning" uk-alert="true">
                        <p>Description field is required.</p>
                      </div>
                    ) : null}

<div className="uk-margin" >
                      <input
                        onChange={this.handleChange}
                        name="imageURL"
                        value={imageURL}
                        className="uk-input"
                        type="text"
                        placeholder="Paste image URL or click the image below"
                      />
                    </div>
                    <div uk-grid="true" uk-grid-small="true" uk-height-match="row: false" className="uk-align-center uk-container uk-margin-remove uk-padding-remove uk-child-width-1-3" >
                      {urlList.map((imageUrl,idx) => (
                        <img 
                          style={{objectFit:"cover"}} 
                          className="uk-padding-small uk-margin-remove" 
                          key={idx} 
                          data-src={imageUrl} 
                          alt="" 
                          uk-img="true"
                          onClick={(imageUrl) => this.handleImageChange(imageUrl)}></img> 
                        ))}
                    </div>
                    <div className="uk-margin">
                      <input
                        value={this.state.searchQuery}
                        onChange={this.handleSearch}
                        className="uk-input"
                        type="text"
                        placeholder="Search Songs..."
                      />
                    </div>
                    {!this.state.songSeeds.length ? (
                      <div className="uk-alert-danger" uk-alert="true">
                        <p>Add at least one track to your list.</p>
                      </div>
                    ) : null}
                    <div>
                      {songSeeds.length > 0 && (
                        <h5>{songSeeds.length} tracks are added:</h5>
                      )}
                      {songSeeds.map((track, i) => {
                        return (
                          <div
                            className="remove"
                            key={i}
                            onClick={() => this.removeFromSeed(track)}
                          >
                            <span
                              className="uk-margin-small-right"
                              uk-icon="minus-circle"
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

                    <hr />
                    <div>
                      {searchResults.length ? (
                        <h5>Add up to {5 - songSeeds.length} tracks:</h5>
                      ) : null}
                      {searchResults.map((track, i) => {
                        return (
                          <div
                            className="add"
                            key={i}
                            onClick={() => {
                              this.setState({
                                searchQuery: '',
                                searchResults: [],
                              });
                              this.addToSeed(track);
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
                    <hr />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      User Suggestions Enabled?
                      <input id="suggestions-enabled" type="checkbox" />
                    </div>
                  </div>
                )}
                <p className="uk-text-right" style={{ margin: '25px' }}>
                  {this.state.buttonText ? (
                    ''
                  ) : (
                    <button
                      onClick={this.handleCancel}
                      className="uk-button uk-button-default uk-modal-close"
                      type="button"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={this.handleClose}
                    className={`${this.state.buttonText &&
                      'uk-modal-close'} uk-button uk-button-primary`}
                    type="submit"
                  >
                    {this.state.buttonText ? 'Close' : 'Submit'}
                  </button>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createChannels: body => dispatch(postChannels(body)),
});

function mapState(state) {
  return {
    user: state.userObj,
  };
}

export default connect(
  mapState,
  mapDispatchToProps
)(ChannelForm);
