import React from 'react'
import { Route, HashRouter, BrowserRouter, Switch, } from 'react-router-dom'
import Home from './components/Home'
import Player from './components/Player'
import Landing from './components/Landing'
import Oauth from './components/Oauth'
import UserInfo from './components/UserInfo'



const App = () => (
    <div>
      <main>
        <Switch>
          <Route path='/channels' component={Landing}/>
          <Route path='/home' component={UserInfo} />
          <Route path='/login' component={Oauth} />
          <Route exact path='/' component={Landing} />
        </Switch>
      </main>
    </div>
)

export default App
