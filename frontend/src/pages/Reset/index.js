import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

function Reset(props) {
  const history = useHistory()
  const { token } = props.match.params

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  if(token.length !== 40) {
    history.push('/')
  }

  async function handleResetPassword(e) {
    e.preventDefault()

    try {
      await api.post(`/reset_password?token=${token}`, { email, password})

      history.push('/')

    } catch (e) {
      alert('Aconteceu um erro, tente novamente!')
    }
  }

  return (
    <div className="reset-container">
      <form action="/reset_password" method="post" onSubmit={handleResetPassword}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />

        <label htmlFor="password">Senha</label>
        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>

        <input type="submit" value="resetar" className="btn" />

        <Link to="/signup">
          Quero me cadastrar!
        </Link>
        <Link to="/">
          Logar
        </Link>
      </form>
    </div>
  )
}

export default Reset
