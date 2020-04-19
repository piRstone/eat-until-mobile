import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import UserActions from '../Redux/UserRedux';

export function* login(api, action) {
  const { email, password } = action;
  const response = yield call(api.login, { email, password });

  console.log('response', response);
  if (response.ok) {
    const { token, user } = response.data;
    api.setAccessToken(token);
    yield put(UserActions.setAccessToken(token));
    yield put(UserActions.success(user));
    yield put(NavigationActions.navigate({ routeName: 'Main' }));
  } else {
    yield put(UserActions.failure(response.data));
  }
}

export function* logout(api) {
  api.removeAccessToken();
  yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }));
}
