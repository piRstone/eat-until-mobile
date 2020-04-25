import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    request: ['listId'],
    success: ['products'],
    failure: ['error'],
    create: ['product'],
    createSuccess: ['product'],
    createFailure: ['error'],
    remove: ['id'],
    removeSuccess: ['id'],
    removeFailure: ['error'],
  },
  {
    prefix: 'PRODUCTS/',
  },
);

export const ProductsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  isLoading: false,
  isCreateLoading: false,
  error: undefined,
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

export const success = (state, { products }) =>
  state.merge({
    isLoading: false,
    data: products,
  });

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

export const createSuccess = (state, { product }) =>
  state.merge({
    isCreateLoading: false,
    data: [...state.data, product],
  });

export const createFailure = (state, { error }) =>
  state.merge({
    isCreateLoading: false,
    error,
  });

export const remove = (state, { id }) =>
  state.merge({
    isCreateLoading: true,
    error: undefined,
  });

export const removeSuccess = (state, { id }) => {
  const products = [...state.data];
  const i = state.data.findIndex(l => l.id === id);
  if (i > -1) products.splice(i, 1);
  return state.merge({
    isCreateLoading: false,
    data: products,
  });
};

export const removeFailure = (state, { error }) =>
  state.merge({
    isCreateLoading: false,
    error,
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.CREATE]: create,
  [Types.CREATE_SUCCESS]: createSuccess,
  [Types.CREATE_FAILURE]: createFailure,
  [Types.REMOVE]: remove,
  [Types.REMOVE_SUCCESS]: removeSuccess,
  [Types.REMOVE_FAILURE]: removeFailure,
});
