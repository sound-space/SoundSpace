import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const NavBar = props => {
  return (
    <nav className='uk-navbar-container' uk-navbar='true'>
      <div>
        <Link to='/home'>
          {' '}
          <img style={{ width: '100px' }} src='./assets/ss_logo.png' />
        </Link>
      </div>
      {props.user.id && 
        <div className='uk-navbar-right' style={{ marginRight: '40px' }}>
          <Link to='/logout'>Log Out</Link>
        </div>
      }
    </nav>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(NavBar)
