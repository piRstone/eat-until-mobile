import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { NavigationActions } from 'react-navigation'

import UserActions from '../Redux/UserRedux'

export function * login (api, action) {
  const { email, password } = action
  const response = yield call(api.login, { email, password })

  console.warn(response.data)
  if (response.ok) {
    const accessToken = path(['access_token'], response)
    yield put(UserActions.setAccessToken(accessToken))
    yield put(NavigationActions.navigate({ routeName: 'Main' }))
  } else {
    yield put(UserActions.failure(response.data))
  }
}

export function * logout (api, action) {
  yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }))
}
