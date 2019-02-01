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

const App = () => (
  <div style={{ height: '1400px' }}>
    <nav>
      <Navbar />
    </nav>
    <main>
      <Switch>
        <Redirect from='/channels/redirect/:id' to='/channels/:id' />
        <Route path='/channels/:id' component={ChannelView} />
        <Route path='/channels' component={AllChannels} />
        <Route path='/home' component={UserInfo} />
        <Route path='/login' component={Oauth} />
        <Route exact path='/' component={Landing} />
      </Switch>
    </main>
  </div>
)

// const Routes = props => (
//   <Switch>
//     <Route exact path='/channels' component={AllChannels} />
//     <Route path='/channels/:id' component={ChannelView} />
//     <Route path='/home' component={UserInfo} />
//     <Route path='/login' component={Oauth} />
//     <Route exact path='/' component={Landing} />
//   </Switch>
// )

function mapState(state) {
  return {
    user: state.userObj,
  }
}

// function mapDispatch(dispatch) {
//   return {
//     exportPlayer(player) {
//       dispatch(setPlayer(player))
//     }
//   }
// }

export default connect(mapState, null)(App)
