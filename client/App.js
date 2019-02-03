import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Oauth from './components/Oauth'
import UserInfo from './components/UserInfo'
import ChannelView from './components/ChannelView'
import AllChannels from './components/AllChannels'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
// import { setPlayer } from './store/player'
// import { checkForPlayer, createEventHandlers,  } from './EmbedPlayer'

const App = (props) => {
  console.log(props.user)
  return (
    <div style={{ height: '1400px' }}>
      <nav>
        <Navbar />
      </nav>
      <main style={{ position:"relative", top: '100px' }}>
        <Switch>
          {props.user.id && 
            <Switch>
              <Redirect from='/channels/redirect/:id' to='/channels/:id' />
              <Route path='/channels/:id' component={ChannelView} />
              <Route path='/channels' component={AllChannels} />
              <Redirect from='*' to="/channels"/>
              {/* <Route path='/login' component={Oauth} /> */}
            </Switch>
          }
          <Route path='/home' component={UserInfo} />
          <Route exact path='/' component={Landing} />
          <Redirect from='*' to="/"/>
        </Switch>
      </main>
    </div>
  )
}

function mapState (state) {
  return {
    user: state.userObj.user
  }
}

// function mapDispatch(dispatch) {
//   return {
//     exportPlayer(player) {
//       dispatch(setPlayer(player))
//     }
//   }
// }

export default connect(
  mapState,
  null
)(App)
