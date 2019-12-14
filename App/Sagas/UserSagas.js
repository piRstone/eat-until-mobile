import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UserActions from '../Redux/UserRedux'

export function * login (api, action) {
  const { email, password } = action
  const response = yield call(api.login, { email, password })

  console.warn(response.data)
  if (response.ok) {
    const accessToken = path(['access_token'], response)
    yield put(UserActions.setAccessToken(accessToken))
  } else {
    yield put(UserActions.failure(response.data))
  }
}
