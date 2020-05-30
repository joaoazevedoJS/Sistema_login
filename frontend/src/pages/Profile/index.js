import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'
import { logout, getToken } from '../../services/auth'

export default function Profile() {
  const history = useHistory()
  const token = getToken()

  const [user, setUser] = useState({})

  useEffect(() => {
    api.get('/users').then(res => {
      console.log("a")
      setUser(res.data)
    })
  }, [token])

  document.title = `${user.name} Profile`

  function handleLogout() {
    logout()

    history.push('/')
  }

  return (
    <div className="profile-container">
      <h1>Alo {user.name}</h1>
      <span className="logout" onClick={handleLogout}>Sair!</span>
    </div>
  )
}
