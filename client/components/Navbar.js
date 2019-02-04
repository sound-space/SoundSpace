import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logUserOut } from '../store/user'

const NavBar = props => {
  console.log("HISTORY: ", props)
  return (
    <nav
      uk-navbar='true'
      style={{ zIndex: '50', top: '0', position: 'fixed', width: '100%' }}
    >
      <div>
          <img style={{ width: '100px' }} src='./assets/ss_logo.png' alt=""/>
      </div>
      
      {props.user.id && (
        <div className="uk-navbar-right uk-grid" style={{ marginRight: '40px' }}>
          <button onClick={() => props.props.history.push('/channels')} className="nav-button uk-button uk-button-small uk-width-1-3" >LEAVE</button>
            <button type="button" className="nav-button uk-width-1-3 uk-button uk-button-small">CHANNELS</button>
            <div uk-dropdown="mode: hover">
              <ul className="uk-nav uk-dropdown-nav">
                {props.channels && props.channels.map(channel => (
                <li key={channel.id}>
                  <a href={`/channels/${channel.id}`}>{channel.name}</a>
                  </li>))}
              </ul>
            </div>
          <button className="nav-button uk-width-1-3 uk-button uk-button-small" onClick={props.logout}>LOGOUT</button>
        </div>
      )}
    </nav>
  )
}

const mapStateToProps = state => {
  return { user: state.userObj };
}

const mapDispatch = dispatch => {
  return {
    logout() {
      dispatch(logUserOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(NavBar);
