import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from './auth/PrivateRoute'

import SignIn from './pages/SingIn/index'
import SignUp from './pages/SignUp/index'
import Profile from './pages/Profile/index'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <PrivateRoute path='/profile' component={Profile} />
        <Route path="*" component={() => <h1>Page Not found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}
