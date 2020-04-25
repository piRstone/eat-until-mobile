import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    login: ['email', 'password'],
    logout: null,
    setToken: ['token'],
    forgotPassword: ['email'],
    forgotPasswordSuccess: null,
    forgotPasswordFailure: null,
    request: null,
    success: ['user'],
    failure: ['error'],
    clearErrors: null,
  },
  {
    prefix: 'USER/',
  },
);

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  token: undefined,
  isConnected: false,
  isLoading: false,
  error: undefined,
  resetPasswordState: undefined,
});

/* ------------- Selectors ------------- */

export const UserSelectors = {
  user: state => state.user.data,
  token: state => state.user.token,
};

/* ------------- Reducers ------------- */

export const login = state =>
  state.merge({
    isLoading: true,
    error: undefined,
  });

export const logout = state =>
  state.merge({
    data: {},
    isConnected: false,
    token: undefined,
  });

export const setToken = (state, { token }) =>
  state.merge({
    isLoading: false,
    token,
    isConnected: true,
  });

export const forgotPassword = state =>
  state.merge({
    isLoading: true,
    resetPasswordState: undefined,
  });

export const forgotPasswordSuccess = state =>
  state.merge({
    isLoading: false,
    resetPasswordState: true,
  });

export const forgotPasswordFailure = state =>
  state.merge({
    isLoading: false,
    resetPasswordState: false,
  });

export const request = state =>
  state.merge({
    isLoading: true,
    error: undefined,
  });

export const success = (state, { user }) =>
  state.merge({
    isLoading: false,
    data: user,
  });

export const failure = (state, { error }) =>
  state.merge({
    isLoading: false,
    error,
  });

export const clearErrors = state =>
  state.merge({
    error: undefined,
    resetPasswordState: undefined,
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout,
  [Types.SET_TOKEN]: setToken,
  [Types.FORGOT_PASSWORD]: forgotPassword,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.FORGOT_PASSWORD_FAILURE]: forgotPasswordFailure,
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.CLEAR_ERRORS]: clearErrors,
});
