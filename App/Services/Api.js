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
    login: (data) => api.post('/auth/login', data)
  }
}

export default {
  create
}
