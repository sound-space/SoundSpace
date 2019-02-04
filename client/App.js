import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import ChannelView from './components/ChannelView'
import AllChannels from './components/AllChannels'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
import { getMe } from './store/user'
import { fetchChannels } from './store/channels'
// import { setPlayer } from './store/player'
// import { checkForPlayer, createEventHandlers,  } from './EmbedPlayer'

class App extends React.Component {
  componentDidMount () {
    this.props.getUser()
    this.props.getChannels()
  }

  render () {
    if (!this.props.user.id) return <Landing />
    return (
      <div>
        <nav>
          <Navbar />
        </nav>
        <main style={{ position: 'relative', top: '100px' }}>
          <Switch>
            <Redirect from='/channels/redirect/:id' to='/channels/:id' />
            <Route exact path='/channels' component={AllChannels} />
            <Route path='/channels/:id' component={ChannelView} />
            {/* <Route path='/home' component={UserInfo} /> */}
            {/* <Route path='/login' component={Oauth} /> */}
            <Route exact path='/' component={Landing} />
            <Redirect from='*' to='/' />
          </Switch>
        </main>
      </div>
    )
  }
}

function mapState (state) {
  return {
    user: state.userObj
  }
}

function mapDispatch (dispatch) {
  return {
    getUser () {
      dispatch(getMe())
    },
    getChannels () {
      dispatch(fetchChannels())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(App)
