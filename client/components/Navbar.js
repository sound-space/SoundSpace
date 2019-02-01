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
        <Link to='/home'>
          {' '}
          <img style={{ width: '100px' }} src='./assets/ss_logo.png' />
        </Link>
      </div>
      {props.user.id && (
        <div className='uk-navbar-right' style={{ marginRight: '40px' }}>
          <Link to='/logout'>Log Out</Link>
        </div>
      )}
    </nav>
  )
}

const mapStateToProps = state => {
  return { user: state.userObj.user }
}

export default connect(mapStateToProps)(NavBar)
