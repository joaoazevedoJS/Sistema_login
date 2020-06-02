import api from '../services/api'
import { logout, isAuthenticated } from '../services/auth'

async function session() {
  if(isAuthenticated()) {
    try {
      await api.post('/session')
    } catch(e) {
      logout()
    }
  }
}

export default session
