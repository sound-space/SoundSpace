import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from './components/Landing'
import Oauth from './components/Oauth'
import UserInfo from './components/UserInfo'
import ChannelView from './components/ChannelView'
import AllChannels from './components/AllChannels'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
// import { setPlayer } from './store/player'
// import { checkForPlayer, createEventHandlers,  } from './EmbedPlayer'

class App extends React.Component {
  // constructor() {
    // super()
    // this.checkForPlayer = checkForPlayer.bind(this)
    // this.createEventHandlers = createEventHandlers.bind(this)
    // this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 200)
  // }
  
  render() {
    return (
      <div>
        <nav>
          <Navbar />
        </nav>
        <main>
          <Switch>
            <Route path='/channels/:id' component={ChannelView} />
            <Route path='/channels' component={AllChannels} />
            <Route path='/home' component={UserInfo} />
            <Route path='/login' component={Oauth} />
            <Route exact path='/' component={Landing} />
          </Switch>
        </main>
      </div>
    )
  }
}

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
