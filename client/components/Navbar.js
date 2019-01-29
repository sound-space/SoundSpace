import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const NavBar = props => {
  return (
    <nav>
      <div className='nav-wrapper'>
        <a className='brand-logo'>
          Logo
          {/* <img
            style={{ left: '20px', width: 'auto' }}
            src='./assets/ss_logo.png'
          /> */}
        </a>
        {props.isLoggedIn ? (
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <Link to='/logout'>Log Out</Link>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps)(NavBar)
