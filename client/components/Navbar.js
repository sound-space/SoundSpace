import React from 'react'
import { connect } from 'react-redux'
import { logUserOut } from '../store/user'

const NavBar = props => {
  console.log('HISTORY: ', props)
  return (
    <nav
      uk-navbar='true'
      style={{ zIndex: '50', top: '0', position: 'fixed', width: '100%' }}
    >
      <div>
        <img style={{ width: '100px' }} src='./assets/ss_logo.png' alt='' />
      </div>

      {props.user.id && (
        <div className='uk-navbar-right' width='500'>
          <a
            style={{
              marginTop: '5px',
              fontSize: '24px',
              fontFamily: 'Tajawal',
              fontWeight: 'bold'
            }}
            onClick={() => props.props.history.push('/channels')}
            className='nav-button uk-button uk-margin-right'
          >
            CHANNELS
          </a>
          <a
            style={{
              marginTop: '5px',
              fontSize: '24px',
              fontFamily: 'Tajawal',
              fontWeight: 'bold'
            }}
            onClick={props.logout}
            className='nav-button uk-button uk-margin-right'
          >
            LOG OUT
          </a>
        </div>
      )}
    </nav>
  )
}

const mapStateToProps = state => {
  return { user: state.userObj }
}

const mapDispatch = dispatch => {
  return {
    logout () {
      dispatch(logUserOut())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatch
)(NavBar)
