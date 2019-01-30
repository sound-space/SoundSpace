import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Home from './components/Home'
import Channel from './components/Channel'
import User from './components/User'
import Landing from './components/Landing'

const App = () => (
  <HashRouter>
    <div>
      <main>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Home} />
          <Route path='/channels' component={Channel} />
          <Route path='/users' component={User} />
        </Switch>
      </main>
    </div>
  </HashRouter>
)

export default App
