// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = (baseURL = 'http://localhost:8001/api') => {
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
    setAccessToken: accessToken =>
      api.setHeader('Authorization', `Bearer ${accessToken}`),
    removeAccessToken: () => api.deleteHeader('Authorization'),
    login: data => api.post('/token-auth', data),
    forgotPassword: email => {
      api.deleteHeader('Authorization');
      return api.post('/users/forgot-password', { email });
    },
    getLists: token => {
      api.setHeader('Authorization', `Bearer ${token}`);
      return api.get('/inventories');
    },
    createList: (token, name) => {
      api.setHeader('Authorization', `Bearer ${token}`);
      return api.post('/inventories', { name });
    },
    updateListName: (token, id, name) => {
      api.setHeader('Authorization', `Bearer ${token}`);
      return api.patch(`/inventories/${id}`, { name });
    },
    removeList: (token, id) => {
      api.setHeader('Authorization', `Bearer ${token}`);
      return api.delete(`/inventories/${id}`);
    },
    getProducts: (token, inventoryId) => {
      api.setHeader('Authorization', `Bearer ${token}`);
      return api.get(`/products?inventory_id=${inventoryId}`);
    },
    createProduct: (token, product) => {
      api.setHeader('Authorization', `Bearer ${token}`);
      return api.post('/products', product);
    },
  };
};

export default {
  create,
};
