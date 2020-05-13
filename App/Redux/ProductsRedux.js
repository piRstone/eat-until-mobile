import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    request: ['inventoryId'],
    success: ['products', 'inventoryId'],
    failure: ['error'],
    create: ['product'],
    createSuccess: ['product', 'inventoryId'],
    createFailure: ['error'],
    edit: ['id', 'product', 'inventoryId'],
    editSuccess: ['id', 'product', 'inventoryId'],
    editFailure: ['error'],
    remove: ['id', 'inventoryId'],
    removeSuccess: ['id', 'inventoryId'],
    removeFailure: ['error'],
    empty: ['inventoryId'],
    emptySuccess: ['inventoryId'],
    emptyFailure: ['error'],
    getOffData: ['ean13'],
    offSuccess: null,
  },
  {
    prefix: 'PRODUCTS/',
  },
);

export const ProductsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  isLoading: false,
  isCreateLoading: false,
  isEditLoading: false,
  isEmptyLoading: false,
  isOffLoading: false, // OpenFoodFacts loading (CameraScreen)
  error: undefined,
  editError: undefined,
});

/* ------------- Selectors ------------- */

// export const UserSelectors = {
//   user: state => state.user.data,
// }

/* ------------- Reducers ------------- */

export const request = state =>
  state.merge({
    isLoading: true,
    error: undefined,
  });

export const success = (state, { products, inventoryId }) => {
  const data = { ...state.data };
  data[inventoryId] = products;
  return state.merge({
    isLoading: false,
    data,
  });
};

export const failure = (state, { error }) =>
  state.merge({
    isLoading: false,
    error,
  });

export const create = state =>
  state.merge({
    isCreateLoading: true,
    error: undefined,
  });

export const createSuccess = (state, { product, inventoryId }) => {
  const data = { ...state.data };
  const products = data[inventoryId];
  data[inventoryId] = [...products, product];

  return state.merge({
    isCreateLoading: false,
    data,
  });
};

export const createFailure = (state, { error }) =>
  state.merge({
    isCreateLoading: false,
    error,
  });

export const edit = state =>
  state.merge({
    isEditLoading: true,
    editError: undefined,
  });

export const editSuccess = (state, { id, product, inventoryId }) => {
  const data = { ...state.data };
  const products = [...data[inventoryId]];
  const i = products.findIndex(p => p.id === id);
  if (i > -1) products.splice(i, 1, product); // Replace product by the new one
  data[inventoryId] = products;
  return state.merge({
    isEditLoading: false,
    data,
  });
};

export const editFailure = (state, { error }) =>
  state.merge({
    isEditLoading: false,
    editError: error,
  });

export const remove = state =>
  state.merge({
    isCreateLoading: true,
    error: undefined,
  });

export const removeSuccess = (state, { id, inventoryId }) => {
  const data = { ...state.data };
  const products = [...data[inventoryId]];
  const i = products.findIndex(p => p.id === id);
  if (i > -1) products.splice(i, 1);
  data[inventoryId] = products;
  return state.merge({
    isCreateLoading: false,
    data,
  });
};

export const removeFailure = (state, { error }) =>
  state.merge({
    isCreateLoading: false,
    error,
  });

export const empty = state =>
  state.merge({
    isEmptyLoading: true,
    error: undefined,
  });

export const emptySuccess = (state, { inventoryId }) => {
  const data = { ...state.data };
  data[inventoryId] = [];
  return state.merge({
    isEmptyLoading: false,
    data,
  });
};

export const emptyFailure = (state, { error }) =>
  state.merge({
    isEmptyLoading: false,
    error,
  });

export const offRequest = state =>
  state.merge({
    isOffLoading: true,
  });

export const offSuccess = state =>
  state.merge({
    isOffLoading: false,
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.CREATE]: create,
  [Types.CREATE_SUCCESS]: createSuccess,
  [Types.CREATE_FAILURE]: createFailure,
  [Types.EDIT]: edit,
  [Types.EDIT_SUCCESS]: editSuccess,
  [Types.EDIT_FAILURE]: editFailure,
  [Types.REMOVE]: remove,
  [Types.REMOVE_SUCCESS]: removeSuccess,
  [Types.REMOVE_FAILURE]: removeFailure,
  [Types.EMPTY]: empty,
  [Types.EMPTY_SUCCESS]: emptySuccess,
  [Types.EMPTY_FAILURE]: emptyFailure,
  [Types.GET_OFF_DATA]: offRequest,
  [Types.OFF_SUCCESS]: offSuccess,
});
