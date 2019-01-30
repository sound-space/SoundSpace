import React, { Component } from 'react'
import fetchUser from '../store'
import { connect } from 'react-redux'

class Oauth extends Component {
  render () {
    return <div>...Logging in</div>
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: dispatch => fetchUser()
})

export default connect(
  null,
  mapDispatchToProps
)(Oauth)
