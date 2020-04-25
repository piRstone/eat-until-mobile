import Immutable from 'seamless-immutable';

import Actions, { reducer, INITIAL_STATE } from '../ListsRedux';

describe('ListsRedux', () => {
  test('request', () => {
    const state = reducer(INITIAL_STATE, Actions.request());

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('success', () => {
    const products = [{ id: 1, name: 'Tomatoes' }];
    const state = reducer(INITIAL_STATE, Actions.success(products));

    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(products);
  });

  test('failure', () => {
    const error = 'error';
    const state = reducer(INITIAL_STATE, Actions.failure(error));

    expect(state.isLoading).toBeFalsy();
    expect(state.error).toEqual(error);
  });

  test('create', () => {
    const state = reducer(INITIAL_STATE, Actions.create());

    expect(state.isCreateLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('createSuccess', () => {
    const product = { id: 2, name: 'Bacon' };
    const initialState = Immutable({
      data: [{ id: 1, name: 'Tomatoes' }],
      isCreateLoading: true,
    });
    const state = reducer(initialState, Actions.createSuccess(product));

    const expectedData = [
      { id: 1, name: 'Tomatoes' },
      { id: 2, name: 'Bacon' },
    ];

    expect(state.data).toStrictEqual(expectedData);
    expect(state.isCreateLoading).toBeFalsy();
  });

  test('createFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.createFailure());

    expect(state.isCreateLoading).toBeFalsy();
    expect(state.error).toBeUndefined();
  });

  test('remove', () => {
    const state = reducer(INITIAL_STATE, Actions.remove());

    expect(state.isCreateLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('removeSuccess', () => {
    const initialState = Immutable({
      isCreateLoading: true,
      data: [{ id: 1, name: 'Tomatoes' }, { id: 2, name: 'Bacon' }],
    });
    const idToRemove = 2;
    const state = reducer(initialState, Actions.removeSuccess(idToRemove));

    const expectedData = [{ id: 1, name: 'Tomatoes' }];

    expect(state.isCreateLoading).toBeFalsy();
    expect(state.data).toStrictEqual(expectedData);
  });

  test('removeFailure', () => {
    const error = 'error';
    const state = reducer(INITIAL_STATE, Actions.removeFailure(error));

    expect(state.isCreateLoading).toBeFalsy();
    expect(state.error).toEqual(error);
  });
});
