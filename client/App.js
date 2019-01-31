import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Oauth from './components/Oauth'
import UserInfo from './components/UserInfo'
import ChannelView from './components/ChannelView'
import AllChannels from './components/AllChannels'
import Navbar from './components/Navbar'

const App = () => (
  <div>
    <nav>
      <Navbar />
    </nav>
    <main>
      <Switch>
        <Redirect from='/channels/redirect/:id' to='/channels/:id'/>
        <Route path='/channels/:id' component={ChannelView} />
        <Route path='/channels' component={AllChannels} />
        <Route path='/home' component={UserInfo} />
        <Route path='/login' component={Oauth} />
        <Route exact path='/' component={Landing} />
      </Switch>
    </main>
  </div>
)

export default App
