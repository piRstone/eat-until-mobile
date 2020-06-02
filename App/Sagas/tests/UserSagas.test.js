import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import i18n from 'i18next';

import {
  login,
  logout,
  forgotPassword,
  register,
  edit,
  activate,
  getUser,
} from '../UserSagas';
import FixtureApi from '../../Services/FixtureApi';
import UserActions from '../../Redux/UserRedux';
import NotificationActions from '../../Redux/NotificationRedux';
import { types } from '../../Containers/Notification';

describe('login', () => {
  let generator;
  const action = {
    email: 'admin@test.com',
    password: 'password',
  };

  beforeEach(() => {
    generator = login(FixtureApi, action);
  });

  it('should call the login request', () => {
    expect(generator.next().value).toEqual(call(FixtureApi.login, action));
  });

  it('should dispatch the success action', () => {
    generator.next(); // Login call

    const response = FixtureApi.login();

    const { token, user } = response.data;
    expect(generator.next(response).value).toEqual(
      call(FixtureApi.setToken, token),
    );
    expect(generator.next().value).toEqual(put(UserActions.setToken(token)));
    expect(generator.next().value).toEqual(put(UserActions.success(user)));
    expect(generator.next().value).toEqual(
      put(NavigationActions.navigate({ routeName: 'Main' })),
    );
  });

  it('should dispatch the failure action with wrong creds notif', () => {
    generator.next(); // Login call

    const response = { ok: false, status: 400 };

    expect(generator.next(response).value).toEqual(
      put(UserActions.failure(i18n.t('login:wrongEmailOrPassword'))),
    );
    expect(generator.next(response).value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('login:wrongEmailOrPassword'),
          types.danger,
        ),
      ),
    );
  });

  it('should dispatch the failure action with generic error', () => {
    generator.next(); // Login call

    const response = { ok: false };

    expect(generator.next(response).value).toEqual(
      put(UserActions.failure(i18n.t('login:anErrorOccurred'))),
    );
  });
});

describe('logout', () => {
  const generator = logout(FixtureApi);

  it('should navigate to the login screen', () => {
    expect(generator.next().value).toEqual(call(FixtureApi.removeToken));
    expect(generator.next().value).toEqual(
      put(NavigationActions.navigate({ routeName: 'AuthStack' })),
    );
  });
});

describe('forgotPassword', () => {
  const email = 'admin@test.com';
  let generator;

  beforeEach(() => {
    generator = forgotPassword(FixtureApi, { email });
  });

  it('should call the forgotPassword request', () => {
    expect(generator.next().value).toEqual(
      call(FixtureApi.forgotPassword, email),
    );
  });

  it('should dispatch forgotPasswordSuccess action', () => {
    generator.next(); // Call

    const response = FixtureApi.forgotPassword();

    expect(generator.next(response).value).toEqual(
      put(UserActions.forgotPasswordSuccess()),
    );
  });

  it('should dispatch forgotPasswordFailure action', () => {
    generator.next(); // Call

    const response = { ok: false };

    expect(generator.next(response).value).toEqual(
      put(UserActions.forgotPasswordFailure()),
    );
  });
});

describe('register', () => {
  const action = {
    firsname: 'John',
    lastname: 'Doe',
    email: 'admin@test.com',
    password: 'password',
  };
  let generator;

  beforeEach(() => {
    generator = register(FixtureApi, action);
  });

  it('should call the register request', () => {
    const data = {
      first_name: action.firstname,
      last_name: action.lastname,
      email: action.email,
      password: action.password,
    };
    expect(generator.next().value).toEqual(call(FixtureApi.register, data));
  });

  it('should dispatch the registerSuccess action', () => {
    generator.next(); // Call

    const response = FixtureApi.forgotPassword();

    expect(generator.next(response).value).toEqual(
      put(UserActions.registerSuccess()),
    );
    expect(generator.next().value).toEqual(
      put(
        NavigationActions.navigate({
          routeName: 'RegisterSuccessScreen',
        }),
      ),
    );
  });

  it('should dispatch the registerFailure action', () => {
    generator.next(); // Call

    const response = { ok: false, status: 400, data: { email: ['Error'] } };

    expect(generator.next(response).value).toEqual(
      put(NotificationActions.display('email : Error', types.danger)),
    );
    expect(generator.next(response).value).toEqual(
      put(UserActions.registerFailure()),
    );
  });
});

describe('edit', () => {
  const action = {
    id: 1,
    firsname: 'Paul',
    lastname: 'Simons',
  };
  let generator;

  beforeEach(() => {
    generator = edit(FixtureApi, action);
  });

  it('should call the register request', () => {
    const data = {
      first_name: action.firstname,
      last_name: action.lastname,
    };
    expect(generator.next().value).toEqual(
      call(FixtureApi.editUser, action.id, data),
    );
  });

  it('should dispatch the editSuccess action', () => {
    generator.next(); // Call

    const response = FixtureApi.editUser();

    expect(generator.next(response).value).toEqual(
      put(UserActions.editSuccess(response.data)),
    );
    expect(generator.next().value).toEqual(
      put(
        NavigationActions.navigate({
          routeName: 'ProfileScreen',
        }),
      ),
    );
  });

  it('should dispatch the editFailure action', () => {
    generator.next(); // Call

    const response = { ok: false, status: 400, data: { email: ['Error'] } };

    expect(generator.next(response).value).toEqual(
      put(NotificationActions.display('email : Error', types.danger)),
    );
    expect(generator.next(response).value).toEqual(
      put(UserActions.editFailure()),
    );
  });
});

describe('activate', () => {
  const action = {
    uidb64: 'Mw',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
  };
  let generator;

  beforeEach(() => {
    generator = activate(FixtureApi, action);
  });

  it('should call the activate request', () => {
    expect(generator.next().value).toEqual(call(FixtureApi.activate, action));
  });

  it('should dispatch activationSuccess action', () => {
    generator.next(); // Call

    const response = FixtureApi.forgotPassword();

    expect(generator.next(response).value).toEqual(
      put(UserActions.activationSuccess()),
    );
  });

  it('should dispatch activationFailure action', () => {
    generator.next(); // Call

    const response = { ok: false };

    expect(generator.next(response).value).toEqual(
      put(UserActions.activationFailure()),
    );
  });
});

describe('getUser', () => {
  let generator;

  beforeEach(() => {
    generator = getUser(FixtureApi);
  });

  it('should call the getUser request', () => {
    expect(generator.next().value).toEqual(call(FixtureApi.getUser));
  });

  it('should dispatch success action', () => {
    generator.next(); // Call

    const response = FixtureApi.getUser();

    expect(generator.next(response).value).toEqual(
      put(UserActions.success(response.data)),
    );
  });

  it('should dispatch failure action', () => {
    generator.next(); // Call

    const response = { ok: false };

    expect(generator.next(response).value).toEqual(put(UserActions.failure()));
  });
});
