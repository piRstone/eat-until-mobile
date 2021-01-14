import Immutable from 'seamless-immutable';

import Actions, { reducer, INITIAL_STATE } from '../UserRedux';

describe('UserRedux', () => {
  test('setHasEverLaunchedApp', () => {
    const state = reducer(INITIAL_STATE, Actions.setHasEverLaunchedApp());

    expect(state.hasEverLaunchedApp).toBeTruthy();
  });

  test('login', () => {
    const email = 'email@test.com';
    const password = 'password';
    const state = reducer(INITIAL_STATE, Actions.login(email, password));

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
    expect(state.email).toEqual(email);
  });

  test('logout', () => {
    const state = reducer(INITIAL_STATE, Actions.logout());

    expect(state.data).toEqual({});
    expect(state.token).toBeUndefined();
    expect(state.isConnected).toBeFalsy();
  });

  test('setToken', () => {
    const token = 'dlkfhselfkjdsflskfjhdkf';
    const state = reducer(INITIAL_STATE, Actions.setToken(token));

    expect(state.isLoading).toBeFalsy();
    expect(state.token).toEqual(token);
    expect(state.isConnected).toBeTruthy();
  });

  test('forgotPassword', () => {
    const state = reducer(INITIAL_STATE, Actions.forgotPassword());

    expect(state.isLoading).toBeTruthy();
    expect(state.resetPasswordState).toBeUndefined();
  });

  test('forgotPasswordSuccess', () => {
    const user = [{ id: 1, name: 'John Doe' }];
    const state = reducer(INITIAL_STATE, Actions.forgotPasswordSuccess(user));

    expect(state.isLoading).toBeFalsy();
    expect(state.resetPasswordState).toBeTruthy();
  });

  test('forgotPasswordFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.forgotPasswordFailure());

    expect(state.isLoading).toBeFalsy();
    expect(state.resetPasswordState).toBeFalsy();
  });

  test('register', () => {
    const state = reducer(INITIAL_STATE, Actions.register());
    expect(state.isLoading).toBeTruthy();
  });

  test('registerSuccess', () => {
    const state = reducer(INITIAL_STATE, Actions.registerSuccess());
    expect(state.isLoading).toBeFalsy();
  });

  test('registerFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.registerFailure());
    expect(state.isLoading).toBeFalsy();
  });

  test('activation', () => {
    const state = reducer(INITIAL_STATE, Actions.activation());

    expect(state.isLoading).toBeTruthy();
    expect(state.activationState).toBeUndefined();
  });

  test('activationSuccess', () => {
    const uidb64 = 'Mw';
    const token = '5g3-66a8b816f915fac688d8';
    const state = reducer(
      INITIAL_STATE,
      Actions.activationSuccess(uidb64, token),
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.activationState).toBeTruthy();
  });

  test('activationFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.activationFailure());

    expect(state.isLoading).toBeFalsy();
    expect(state.activationState).toBeFalsy();
  });

  test('edit', () => {
    const state = reducer(INITIAL_STATE, Actions.edit());

    expect(state.isLoading).toBeTruthy();
  });

  test('editSuccess', () => {
    const initialState = Immutable({
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
      },
      isLoading: true,
    });

    const expectedUser = {
      firstName: 'Paul',
      lastName: 'Simons',
      email: 'psimon@email.com',
    };

    const state = reducer(initialState, Actions.editSuccess(expectedUser));

    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(expectedUser);
  });

  test('editFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.editFailure());

    expect(state.isLoading).toBeFalsy();
  });

  test('request', () => {
    const state = reducer(INITIAL_STATE, Actions.request());

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('success', () => {
    const user = [{ id: 1, name: 'John Doe' }];
    const state = reducer(INITIAL_STATE, Actions.success(user));

    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(user);
  });

  test('failure', () => {
    const error = 'error';
    const state = reducer(INITIAL_STATE, Actions.failure(error));

    expect(state.error).toEqual(error);
    expect(state.isLoading).toBeFalsy();
  });

  test('clearErrors', () => {
    const initialState = Immutable({
      error: 'An error occurred',
      resetPasswordState: false,
    });
    const state = reducer(initialState, Actions.clearErrors());

    expect(state.error).toBeUndefined();
    expect(state.resetPasswordState).toBeUndefined();
  });
});
