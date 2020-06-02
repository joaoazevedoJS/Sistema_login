import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import { login, getToken } from '../../services/auth'
import session from '../../auth/session'

function SignIn() {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function auth() {
    await session()

    if(getToken()) {
      history.push('/profile')
    }
  }

  if (getToken()) {
    auth()
  }

  async function handleForm(e) {
    e.preventDefault()

    const data = {
      email,
      password
    }

    try {
      const response = await api.post('/signin', data)
      login(response.data.token)

      history.push('/profile')
    } catch (e) {
      alert('Aconteceu um erro verifique sua credenciais')
    }
  }

  return (
    <div className="signin-container">
      <form action="/signin" method="post" onSubmit={handleForm}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />

        <label htmlFor="password">Senha</label>
        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />

        <input type="submit" value="Logar" className="btn" />

        <Link to="/signup">
          Quero me cadastrar!
        </Link>

        <Link to="/forgot_password">
          Esqueci a senha.
        </Link>
      </form>
    </div>
  )
}

export default SignIn
