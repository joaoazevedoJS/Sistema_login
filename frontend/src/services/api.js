import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'http://localhost:3333/'
})

// antes de todas as requisições ele vaia setar uma config
api.interceptors.request.use(async config => {
  const token = getToken()

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
