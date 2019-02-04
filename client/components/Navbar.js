import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logUserOut } from '../store/user'

const NavBar = props => {
  return (
    <nav
      uk-navbar='true'
      style={{ zIndex: '50', top: '0', position: 'fixed', width: '100%' }}
    >
      <div>
        <Link to='/channels'>
          {' '}
          <img style={{ width: '100px' }} src='./assets/ss_logo.png' />
        </Link>
      </div>
      {props.user.id && (
        <div className="uk-navbar-right" style={{ marginRight: '40px' }}>
          <button onClick={props.logout}>Log Out</button>
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
