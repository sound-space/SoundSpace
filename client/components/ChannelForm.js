import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postChannels } from '../store/channels';
import { search } from '../SpotifySearch';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this)
    this.search = search.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createChannels(this.state);
  }

  async handleSearch(evt) {
    const searchResults = await this.search(evt.target.value);
    console.log(searchResults)
    this.setState({
      searchResults,
    });
  }

  render() {
    const { name, imageURL, description } = this.state;

    return (
      <div id="modal-example" uk-modal="true">
        <div id="channelFormId" uk-modal="true">
          <div className="uk-modal-dialog uk-border-rounded">
            <form onSubmit={this.handleSubmit}>
              <fieldset className="uk-fieldset">
                <h2 style={{ margin: '25px' }} className="uk-modal-title">
                  New Channel
                </h2>
                <div style={{ margin: '0 25px' }}>
                  <div className="uk-margin">
                    <input
                      onChange={this.handleChange}
                      name="name"
                      className="uk-input"
                      value={name}
                      type="text"
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="uk-margin">
                    <input
                      onChange={this.handleChange}
                      name="imageURL"
                      value={imageURL}
                      className="uk-input"
                      type="text"
                      placeholder="Image URL"
                    />
                  </div>

                  <div className="uk-margin">
                    <input
                      onChange={this.handleSearch}
                      className="uk-input"
                      type="text"
                      placeholder="Search Songs"
                      required
                    />
                  </div>

                  <div>
                    {this.state.searchResults.map(track => {
                      return <div>{track}</div>;
                    })}
                  </div>

                  <div className="uk-margin">
                    <textarea
                      onChange={this.handleChange}
                      name="description"
                      value={description}
                      className="uk-textarea"
                      rows="5"
                      placeholder="Description"
                      required
                    />
                  </div>
                </div>
                <p className="uk-text-right" style={{ margin: '25px' }}>
                  <button
                    className="uk-button uk-button-default uk-modal-close"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button className="uk-button uk-button-danger" type="submit">
                    Submit
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
    user: state.userObj
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(ChannelForm);
