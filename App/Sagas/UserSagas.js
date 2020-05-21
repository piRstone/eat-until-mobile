import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import i18n from 'i18next';

import Secrets from 'react-native-config';
import UserActions from '../Redux/UserRedux';
import NotificationActions from '../Redux/NotificationRedux';
import { types } from '../Containers/Notification';

export function* login(api, action) {
  const { email, password } = action;
  const response = yield call(api.login, { email, password });

  if (response.ok) {
    const { token, user } = response.data;
    yield call(api.setToken, token); // Set token in requests authorizations header
    yield put(UserActions.setToken(token));
    yield put(UserActions.success(user));
    yield put(NavigationActions.navigate({ routeName: 'Main' }));
  } else {
    yield put(
      NotificationActions.display(
        `${Secrets.API_URL} ${JSON.stringify(response.data)}`,
        types.danger,
      ),
    );
    let errorMessage = i18n.t('login:anErrorOccurred');
    if (response.status === 400) {
      errorMessage = i18n.t('login:wrongEmailOrPassword');
    }
    yield put(UserActions.failure(errorMessage));
  }
}

export function* logout(api) {
  yield call(api.removeToken);
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

export function* register(api, { firstname, lastname, email, password }) {
  const response = yield call(api.register, {
    first_name: firstname,
    last_name: lastname,
    email,
    password,
  });

  if (response.ok) {
    yield put(UserActions.registerSuccess());
    yield put(
      NavigationActions.navigate({
        routeName: 'RegisterSuccessScreen',
      }),
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

export function* edit(api, { id, firstname, lastname, email }) {
  const response = yield call(api.editUser, id, {
    first_name: firstname,
    last_name: lastname,
    email,
  });

  if (response.ok) {
    yield put(UserActions.editSuccess(response.data));
    yield put(
      NavigationActions.navigate({
        routeName: 'ProfileScreen',
      }),
    );
  } else {
    if (response.status === 400) {
      const key = Object.keys(response.data)[0];
      const error = response.data[key][0];
      yield put(NotificationActions.display(`${key} : ${error}`, types.danger));
    }
    yield put(UserActions.editFailure());
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
