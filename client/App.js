import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './components/Home'
import Channel from './components/Channel'
import User from './components/User'
import Navbar from './components/Navbar'
import Landing from './components/Landing'

const App = () => (
  <BrowserRouter>
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Switch>
          <Route exact path='/home' component={Landing} />
          <Route exact path='/login' component={Home} />
          <Route exact path='/channels' component={Channel} />
          <Route exact path='/users' component={User} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
)

export default App
