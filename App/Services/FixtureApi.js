export default {
  // Functions return fixtures
  login: () => ({
    ok: true,
    data: require('../Fixtures/login.json'),
  }),
  setToken: () => {},
  removeToken: () => {},
  forgotPassword: () => ({
    ok: true,
  }),
  register: () => ({
    ok: true,
  }),
  getUser: () => ({
    ok: true,
    data: require('../Fixtures/user.json'),
  }),
  editUser: () => ({
    ok: true,
    data: require('../Fixtures/user.json'),
  }),
  activate: () => ({
    ok: true,
  }),
  verifyToken: () => ({
    ok: true,
  }),
  refreshToken: () => ({
    ok: true,
  }),
  getLists: () => ({
    ok: true,
    data: require('../Fixtures/lists/lists.json'),
  }),
  createList: () => ({
    ok: true,
    data: require('../Fixtures/lists/createList.json'),
  }),
  removeList: () => ({
    ok: true,
  }),
  updateListName: () => ({
    ok: true,
    data: require('../Fixtures/lists/createList.json'),
  }),
  emptyList: () => ({
    ok: true,
  }),
  getProducts: () => ({
    ok: true,
    data: require('../Fixtures/products/products.json'),
  }),
  createProduct: () => ({
    ok: true,
    data: require('../Fixtures/products/createProduct.json'),
  }),
  removeProduct: () => ({
    ok: true,
  }),
};
