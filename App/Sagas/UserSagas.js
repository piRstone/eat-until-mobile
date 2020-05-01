import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import i18n from 'i18next';

import UserActions from '../Redux/UserRedux';
import NotificationActions from '../Redux/NotificationRedux';
import { types } from '../Containers/Notification';

export function* login(api, action) {
  const { email, password } = action;
  const response = yield call(api.login, { email, password });

  if (response.ok) {
    const { token, user } = response.data;
    yield call(api.setToken, token);
    yield put(UserActions.setToken(token));
    yield put(UserActions.success(user));
    yield put(NavigationActions.navigate({ routeName: 'Main' }));
  } else {
    let errorMessage = i18n.t('login:anErrorOccurred');
    if (response.status === 400) {
      errorMessage = i18n.t('login:wrongEmailOrPassword');
    }
    yield put(UserActions.failure(errorMessage));
  }
}

export function* logout(api) {
  api.removeToken();
  yield put(NavigationActions.navigate({ routeName: 'AuthStack' }));
}

export function* forgotPassword(api, { email }) {
  const response = yield call(api.forgotPassword, email);

  if (response.ok) {
    yield put(UserActions.forgotPasswordSuccess());
  } else {
    yield put(UserActions.forgotPasswordFailure());
  }
}

export function* register(api, { email, password }) {
  const response = yield call(api.register, { email, password });

  if (response.ok) {
    yield put(UserActions.registerSuccess());
    yield put(
      NavigationActions.navigate({ routeName: 'RegisterSuccessScreen' }),
    );
  } else {
    if (response.status === 400) {
      const key = Object.keys(response.data)[0];
      const error = response.data[key][0];
      yield put(NotificationActions.display(`${key} : ${error}`, types.danger));
    }
    yield put(UserActions.registerFailure());
  }
}

export function* activate(api, { uidb64, token }) {
  const response = yield call(api.activate, { uidb64, token });

  if (response.ok) {
    yield put(UserActions.activationSuccess());
  } else {
    yield put(UserActions.activationFailure());
  }
}

export function* getUser(api) {
  const response = yield call(api.getUser);

  if (response.ok) {
    yield put(UserActions.success(response.data));
  } else {
    yield put(UserActions.failure());
  }
}
