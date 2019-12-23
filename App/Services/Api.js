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
    },
    updateListName: (token, id, name) => {
      api.setHeader('Authorization', 'Bearer ' + token)
      return api.patch(`/lists/${id}`, { name })
    },
    removeList: (token, id) => {
      api.setHeader('Authorization', 'Bearer ' + token)
      return api.delete(`/lists/${id}`)
    },
    getProducts: (token, listId) => {
      api.setHeader('Authorization', 'Bearer ' + token)
      return api.get(`/products/?list_id=${listId}`)
    },
    createProduct: (token, product) => {
      api.setHeader('Authorization', 'Bearer ' + token)
      return api.post('/products', product)
    }
  }
}

export default {
  create
}
