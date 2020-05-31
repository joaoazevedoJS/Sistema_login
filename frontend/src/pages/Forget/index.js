import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

function Forget() {
  const history = useHistory()
  const [ email, setEmail ] = useState('')

  async function handleFormForgot(e) {
    e.preventDefault()

    try {
      await api.post('forgot_password', { email })

      alert('Verifique o seu email')

      history.push('/')
    } catch(e) {
      alert('Aconteceu algum erro inesperado! Tente novamente mais tarde.')
    }
  }

  return (
    <div className="forget-container">
      <form action="/forgot_password" method="post" onSubmit={handleFormForgot}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />

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

export default Forget
