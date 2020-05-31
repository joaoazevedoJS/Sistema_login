import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'
import { logout, getToken } from '../../services/auth'

export default function Profile() {
  const history = useHistory()
  const token = getToken()

  const [user, setUser] = useState({})

  function handleLogout() {
    logout()

    history.push('/')
  }

  useEffect(() => {
    api.get('/users').then(res => {
      setUser(res.data)
    }).catch(err => {
      logout()

      history.push('/')
    })
  }, [history, token])

  document.title = `Profile`

  return (
    <div className="profile-container">
      <h1>Alo {user.name}</h1>
      <span className="logout btn" onClick={handleLogout}>Sair!</span>
    </div>
  )
}
