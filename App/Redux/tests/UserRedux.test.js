import Immutable from 'seamless-immutable';

import Actions, { reducer, INITIAL_STATE } from '../UserRedux';

describe('UserRedux', () => {
  test('login', () => {
    const email = 'email@test.com';
    const password = 'password';
    const state = reducer(INITIAL_STATE, Actions.login(email, password));

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('logout', () => {
    const state = reducer(INITIAL_STATE, Actions.logout());

    expect(state.data).toEqual({});
    expect(state.accessToken).toBeUndefined();
    expect(state.isConnected).toBeFalsy();
  });

  test('setAccessToken', () => {
    const token = 'dlkfhselfkjdsflskfjhdkf';
    const state = reducer(INITIAL_STATE, Actions.setAccessToken(token));

    expect(state.isLoading).toBeFalsy();
    expect(state.accessToken).toEqual(token);
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
