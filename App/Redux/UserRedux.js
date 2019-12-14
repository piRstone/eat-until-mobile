import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['email', 'password'],
  logout: null,
  setAccessToken: ['accessToken'],
  request: null,
  success: ['user'],
  failure: ['error']
}, {
  prefix: 'USER/'
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  accessToken: undefined,
  isConnected: false,
  isLoading: false,
  error: undefined
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  selectUser: state => state.user.data
}

/* ------------- Reducers ------------- */

export const login = (state, { username, password }) =>
  state.merge({
    isLoading: true
  })

export const logout = state =>
  state.merge({
    data: {},
    isConnected: false,
    accessToken: undefined
  })

export const setAccessToken = (state, { accessToken }) =>
  state.merge({
    isLoading: false,
    accessToken,
    isConnected: true
  })

export const request = state =>
  state.merge({
    isLoading: true,
    error: undefined
  })

export const success = (state, { user }) =>
  state.merge({
    isLoading: false,
    data: user
  })

export const failure = (state, { error }) =>
  state.merge({
    isLoading: false,
    error
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout,
  [Types.SET_ACCESS_TOKEN]: setAccessToken,
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
})
