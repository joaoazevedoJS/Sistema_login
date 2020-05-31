import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './auth/PrivateRoute'

import SignIn from './pages/SingIn/index'
import SignUp from './pages/SignUp/index'
import Forget from './pages/Forget/index'
import Reset from './pages/Reset/index'
import Profile from './pages/Profile/index'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/forgot_password' exact component={Forget} />
        <Route path='/reset_password/:token' exact component={Reset} />
        <Redirect path="/reset_password" to='/' />
        <PrivateRoute path='/profile' exact component={Profile} />
        <Route path="*" component={() => <h1>Page Not found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}
