import { put, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'

import { UserSelectors } from '../Redux/UserRedux'

export function * startup (action) {
  const accessToken = yield select(UserSelectors.accessToken)
  console.warn('accessToken', accessToken)
  if (!accessToken) {
    yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }))
  }
}
