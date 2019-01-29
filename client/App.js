import React from 'react'
import { Route } from 'react-router-dom'
import Home from './components/Home'
import Channel from './components/Channel'
import User from './components/User'
import Navbar from './components/Navbar'

const App = () => (
  <div>
    <nav>
      <Navbar />
    </nav>
    <main>
      <Route exact path='/login' component={Home} />
      <Route path='/channels/:id' component={Channel} />
      <Route path='/users/:id' component={User} />
    </main>
  </div>
)

export default App
