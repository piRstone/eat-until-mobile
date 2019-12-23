import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    request: null,
    success: ['lists'],
    failure: ['error'],
    create: ['name'],
    createSuccess: ['list'],
    createFailure: ['error'],
    remove: ['id'],
    removeSuccess: null,
    removeFailure: ['error']
  },
  {
    prefix: 'LISTS/'
  }
)

export const ListsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  isLoading: false,
  isCreateLoading: false,
  error: undefined
})

/* ------------- Selectors ------------- */

// export const UserSelectors = {
//   user: state => state.user.data,
// }

/* ------------- Reducers ------------- */

export const request = state =>
  state.merge({
    isLoading: true,
    error: undefined
  })

export const success = (state, { lists }) =>
  state.merge({
    isLoading: false,
    data: lists
  })

export const failure = (state, { error }) =>
  state.merge({
    isLoading: false,
    error
  })

export const create = state =>
  state.merge({
    isCreateLoading: true,
    error: undefined
  })

export const createSuccess = (state, { list }) =>
  state.merge({
    isCreateLoading: false,
    data: [...state.data, list]
  })

export const createFailure = (state, { error }) =>
  state.merge({
    isCreateLoading: false,
    error
  })

export const remove = state =>
  state.merge({
    isCreateLoading: true,
    error: undefined
  })

export const removeSuccess = (state, { id }) => {
  const list = [...state.data]
  const i = state.data.findIndex(l => l.id === id)
  if (i > -1) list.splice(i, 1)
  return state.merge({
    isCreateLoading: false,
    data: list
  })
}

export const removeFailure = (state, { error }) =>
  state.merge({
    isCreateLoading: false,
    error
  })

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
  [Types.REMOVE_FAILURE]: removeFailure
})
