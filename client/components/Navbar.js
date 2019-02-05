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
          <div
            style={{
              fontFamily: 'Tajawal',
              fontSize: '23px',
              fontWeight: '700',
              marginTop: '5px'
            }}
            onClick={() => props.props.history.push('/channels')}
            className='navBtn nav-button uk-button uk-margin-right'
          >
            CHANNELS
          </div>
          <a className='navBtn' style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontFamily: 'Tajawal',
                fontSize: '23px',
                fontWeight: '700',
                marginTop: '5px',
                textDecoration: 'none'
              }}
              onClick={props.logout}
            >
              LOG OUT
            </div>
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
