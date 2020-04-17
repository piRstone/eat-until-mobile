import { put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import { UserSelectors } from '../Redux/UserRedux';

export function* startup(api) {
  const accessToken = yield select(UserSelectors.accessToken);

  if (!accessToken) {
    api.setAccessToken(accessToken);
    yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }));
  }
}
