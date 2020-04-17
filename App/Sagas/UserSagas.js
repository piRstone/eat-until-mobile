import { call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import { NavigationActions } from 'react-navigation';

import UserActions from '../Redux/UserRedux';

export function* login(api, action) {
  const { email, password } = action;
  const response = yield call(api.login, { email, password });

  if (response.ok) {
    const accessToken = path(['data', 'access_token'], response);
    api.setAccessToken(accessToken);
    yield put(UserActions.setAccessToken(accessToken));
    yield put(NavigationActions.navigate({ routeName: 'Main' }));
  } else {
    yield put(UserActions.failure(response.data));
  }
}

export function* logout(api) {
  api.removeAccessToken();
  yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }));
}
