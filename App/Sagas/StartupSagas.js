import { put, call, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import UserActions, { UserSelectors } from '../Redux/UserRedux';

export function* startup(api) {
  const hasEverLaunchedApp = yield select(UserSelectors.hasEverLaunchedApp);
  const token = yield select(UserSelectors.token);

  if (!hasEverLaunchedApp) {
    yield put(NavigationActions.navigate({ routeName: 'Onboarding' }));
    return;
  }

  yield put(UserActions.clearErrors());

  if (!token) {
    yield put(NavigationActions.navigate({ routeName: 'AuthStack' }));
  } else {
    yield put(NavigationActions.navigate({ routeName: 'Main' }));

    yield call(api.setToken, token);

    // Verify token
    const response = yield call(api.verifyToken, token);
    if (!response.ok) {
      const refreshResponse = yield call(api.refreshToken, token);
      if (!refreshResponse.ok) {
        // Token expired: redirect to LoginScreen
        yield call(api.removeToken);
        yield put(NavigationActions.navigate({ routeName: 'AuthStack' }));
      }
    }
  }
}
