import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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
        <div className="uk-navbar-right uk-grid-medium uk-flex-middle uk-margin-top" uk-grid="true">
          <p className="uk-margin-right">Welcome, {props.user.id}</p>
          <button className="uk-button uk-button-link uk-margin-right" onClick={() => this.props.history.push('/logout')}>Log out</button>
        </div>
      )}
    </nav>
  )
}

const mapStateToProps = state => {
  return { user: state.userObj.user }
}

export default connect(mapStateToProps)(NavBar)
