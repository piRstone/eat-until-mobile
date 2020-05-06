export default {
  // Functions return fixtures
  login: () => ({
    ok: true,
    data: require('../Fixtures/login.json'),
  }),
  forgotPassword: () => ({
    ok: true,
  }),
  register: () => ({
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
};
