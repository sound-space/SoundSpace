import React from 'react';
import axios from 'axios';
import createClientSocket from 'socket.io-client';
import store, { setUser } from '../store';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const IP ='https://soundspace-fsa.herokuapp.com'

class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      body: this.getHashParams(),
    };
    this.socket = createClientSocket(IP);
  }

  componentDidMount() {
    this.props.setUser(this.state.body);
  }

  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  render() {
    return <Redirect push to="/channels" />;
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: userInfo => dispatch(setUser(userInfo)),
});

export default connect(
  null,
  mapDispatchToProps
)(UserInfo);
