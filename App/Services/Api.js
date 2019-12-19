// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://localhost:8001/api') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: 10000
  })

  return {
    setAccessToken: (accessToken) => api.setHeader('Authorization', 'Bearer ' + accessToken),
    removeAccessToken: () => api.deleteHeader('Authorization'),
    login: (data) => api.post('/auth/login', data),
    getLists: (token) => {
      api.setHeader('Authorization', 'Bearer ' + token)
      return api.get('/lists')
    },
    createList: (token, name) => {
      api.setHeader('Authorization', 'Bearer ' + token)
      return api.post('/lists', { name })
    }
  }
}

export default {
  create
}
