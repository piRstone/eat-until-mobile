import { put, call, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import UserActions, { UserSelectors } from '../Redux/UserRedux';

export function* startup(api) {
  const token = yield select(UserSelectors.token);

  yield put(UserActions.clearErrors());

  if (!token) {
    yield put(NavigationActions.navigate({ routeName: 'AuthStack' }));
  } else {
    yield call(api.setToken, token);

    // Verify token
    const response = yield call(api.verifyToken, token);
    if (!response.ok) {
      const refreshResponse = yield call(api.refreshToken, token);
      if (!refreshResponse.ok) {
        // Token expired: redirect to LoginScreen
        yield call(api.removeToken);
        yield put(NavigationActions.navigate({ routeName: 'AuthStack' }));
      } else {
        console.tron.warn('Token refreshed');
      }
    }
  }
}
