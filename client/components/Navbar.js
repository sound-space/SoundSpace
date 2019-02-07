import React from 'react';
import { connect } from 'react-redux';
import { logUserOut } from '../store/user';

const NavBar = props => {
  return (
    <nav
      uk-navbar="true"
      style={{
        zIndex: '50',
        top: '0',
        position: 'fixed',
        width: '100%',
      }}
    >
      <div>
        <a href="/#/channels">
          <img
            style={{ width: '100px' }}
            src="./assets/ss_logo_white.png"
            alt=""
          />
        </a>
      </div>

      {props.user.id && (
        <div className="uk-navbar-right" width="500">
          <a
            id="logout-button"
            style={{
              marginTop: '5px',
              fontSize: '24px',
              fontFamily: 'Tajawal',
              fontWeight: 'bold',
              textShadow: '0px 0px 3px rgba(0,0,0,0.75)',
              // color: 'white',
              textDecoration: 'none',
            }}
            onClick={props.logout}
            className="nav-button uk-button uk-margin-right"
          >
            LOG OUT
          </a>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = state => {
  return { user: state.userObj };
};

const mapDispatch = dispatch => {
  return {
    logout() {
      dispatch(logUserOut());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatch
)(NavBar);
