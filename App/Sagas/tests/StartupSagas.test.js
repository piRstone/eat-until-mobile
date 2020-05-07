import { put, call, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import FixtureApi from '../../Services/FixtureApi';
import { startup } from '../StartupSagas';
import UserActions, { UserSelectors } from '../../Redux/UserRedux';

describe('Startup saga', () => {
  let generator;
  const hasEverLaunchedApp = true;
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';

  beforeEach(() => {
    generator = startup(FixtureApi);
  });

  it('should select user informations from the store', () => {
    expect(generator.next().value).toEqual(
      select(UserSelectors.hasEverLaunchedApp),
    );
    expect(generator.next(hasEverLaunchedApp).value).toEqual(
      select(UserSelectors.token),
    );
  });

  it('should navigate to the onboarding', () => {
    const hasLaunchedApp = false;
    generator.next(); // Select hasEverLaunchedApp
    generator.next(hasLaunchedApp); // Select hasEverLaunchedApp

    expect(generator.next(token).value).toEqual(
      put(NavigationActions.navigate({ routeName: 'Onboarding' })),
    );

    expect(generator.next().value).toBeFalsy();
  });

  it('should clean user errors', () => {
    generator.next(); // Select hasEverLaunchedApp
    generator.next(hasEverLaunchedApp); // Select hasEverLaunchedApp

    expect(generator.next(token).value).toEqual(put(UserActions.clearErrors()));
  });

  it('should navigate to the login screen', () => {
    const invalidToken = undefined;
    generator.next(); // Select hasEverLaunchedApp
    generator.next(hasEverLaunchedApp); // Select hasEverLaunchedApp
    generator.next(invalidToken); // Clear user error

    expect(generator.next().value).toEqual(
      put(NavigationActions.navigate({ routeName: 'AuthStack' })),
    );
  });

  it('should navigate to the main stack and set the token in api authorization headers', () => {
    generator.next(); // Select hasEverLaunchedApp
    generator.next(hasEverLaunchedApp); // Select hasEverLaunchedApp
    generator.next(token); // Clear user error

    expect(generator.next().value).toEqual(
      put(NavigationActions.navigate({ routeName: 'Main' })),
    );

    expect(generator.next().value).toEqual(call(FixtureApi.setToken, token));
  });

  it('should the token validity', () => {
    generator.next(); // Select hasEverLaunchedApp
    generator.next(hasEverLaunchedApp); // Select hasEverLaunchedApp
    generator.next(token); // Clear user error
    generator.next(); // Navigation to main stack
    generator.next(); // Set token to api

    expect(generator.next().value).toEqual(call(FixtureApi.verifyToken, token));

    const response = { ok: false };

    expect(generator.next(response).value).toEqual(
      call(FixtureApi.refreshToken, token),
    );

    const refreshResponse = { ok: false };

    expect(generator.next(refreshResponse).value).toEqual(
      call(FixtureApi.removeToken),
    );
    expect(generator.next(refreshResponse).value).toEqual(
      put(NavigationActions.navigate({ routeName: 'AuthStack' })),
    );
  });
});
