import React from 'react'
import { Route, HashRouter, BrowserRouter, Switch } from 'react-router-dom'
import Home from './components/Home'
import Player from './components/Player'
import Landing from './components/Landing'
// import Oauth from './components/Oauth'

const App = () => (
  <HashRouter>
    <div>
      <main>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/callback*' component={Player} />
          <Route path='/login' component={Home} />
        </Switch>
      </main>
    </div>
  </HashRouter>
)

export default App
