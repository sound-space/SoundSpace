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
            style={{ height: '60px', width: 'auto' }}
            src="./assets/SS_Logo-WHITE.svg"
            alt=""
          />
        </a>
      </div>

      {props.user.id && (
        <div
          className="uk-navbar-right logout-container"
          width="500"
          style={{
            height: '60px',
          }}
        >
          <div
            id="logout-button"
            style={{
              paddingTop: 9,
              lineHeight: '60px',
              fontSize: '20px',
              fontFamily: 'Tajawal',
              fontWeight: 'bold',
            }}
            onClick={props.logout}
            className="nav-button uk-button uk-margin-right"
          >
            Log Out
          </div>
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
