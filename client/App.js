import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Oauth from './components/Oauth'
import UserInfo from './components/UserInfo'
import ChannelView from './components/ChannelView'
import AllChannels from './components/AllChannels'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
import { getMe } from './store/user'
// import { setPlayer } from './store/player'
// import { checkForPlayer, createEventHandlers,  } from './EmbedPlayer'

class App extends React.Component {
  
  componentDidMount() {
    this.props.getUser()
  }
  
  render() {
    if(!this.props.user.id) return <Landing />
    return (
      <div>
        <nav>
          <Navbar props={this.props} channels={this.props.channels}/>
        </nav>
        <main style={{ position: 'relative', top: '100px' }}>
          <Switch>
            <Redirect from='/channels/redirect/:id' to='/channels/:id'/>
            <Route exact path='/channels' component={AllChannels} />
            <Route path='/channels/:id' component={ChannelView} />
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
    user: state.userObj,
    channels: state.channelsObj.channels
  }
}

function mapDispatch(dispatch) {
  return {
   getUser() {
     dispatch(getMe())
   }
  }
}

export default connect(mapState, mapDispatch)(App)
