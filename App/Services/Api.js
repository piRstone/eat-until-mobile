// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import Secrets from 'react-native-config';

// our "constructor"
const create = (baseURL = Secrets.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 10000,
  });

  return {
    setToken: token => api.setHeader('Authorization', `Bearer ${token}`),
    removeToken: () => api.deleteHeader('Authorization'),
    verifyToken: token => api.post('/check-token', { token }),
    refreshToken: token => api.post('/refresh-token', { token }),
    login: data => api.post('/login', data),
    forgotPassword: email => {
      api.deleteHeader('Authorization');
      return api.post('/forgot-password', { email });
    },
    register: data => api.post('/register', data),
    editUser: (id, data) => api.patch(`/users/${id}`, data),
    activate: data => api.post('/user/activate', data),
    getUser: () => api.get('/me'),
    getLists: () => api.get('/inventories'),
    createList: name => api.post('/inventories', { name }),
    updateListName: (id, name) => api.patch(`/inventories/${id}`, { name }),
    removeList: id => api.delete(`/inventories/${id}`),
    emptyList: id => api.post(`/inventories/${id}/clear-products`),
    getProducts: inventoryId =>
      api.get(`/inventories/${inventoryId}/products`),
    createProduct: product => api.post('/products', product),
    editProduct: (id, data) => api.patch(`/products/${id}`, data),
    removeProduct: id => api.delete(`/products/${id}`),
  };
};

export default {
  create,
};
