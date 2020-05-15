import { put, call, select } from 'redux-saga/effects';

import UserActions, { UserSelectors } from '../Redux/UserRedux';

export function* startup(api) {
  const hasEverLaunchedApp = yield select(UserSelectors.hasEverLaunchedApp);
  const token = yield select(UserSelectors.token);

  if (hasEverLaunchedApp === undefined) {
    yield put(UserActions.setHasEverLaunchedApp(false));
  }

  yield put(UserActions.clearErrors());

  if (token) {
    yield call(api.setToken, token);

    // Verify token
    const response = yield call(api.verifyToken, token);
    if (!response.ok) {
      const refreshResponse = yield call(api.refreshToken, token);
      if (!refreshResponse.ok) {
        // Token expired: redirect to LoginScreen
        yield call(api.removeToken);
      }
    }
  }
}
