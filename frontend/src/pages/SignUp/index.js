import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

export default function SignUp() {
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignUp(e) {
    e.preventDefault()

    const data = {
      name,
      email,
      password
    }

    try {
      await api.post('/signup', data)

      history.push('/')
    } catch (e) {
      alert('Ocorreu um erro em registrar sua conta!')
    }
  }

  return (
    <div className="signup-container">
      <form action="/signup" method="post" onSubmit={handleSignUp}>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />

        <label htmlFor="password">Senha</label>
        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />

        <input type="submit" value="Registrar" className="btn" />

        <Link to="/">
          Fazer login
        </Link>
      </form>
    </div>
  )
}
