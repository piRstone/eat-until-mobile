import Immutable from 'seamless-immutable';

import Actions, { reducer, INITIAL_STATE } from '../ListsRedux';

describe('ListsRedux', () => {
  test('request', () => {
    const state = reducer(INITIAL_STATE, Actions.request());

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('success', () => {
    const lists = [{ id: 1, name: 'Fridge' }];
    const state = reducer(INITIAL_STATE, Actions.success(lists));

    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(lists);
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
    const list = { id: 2, name: 'Freezer' };
    const initialState = Immutable({
      data: [{ id: 1, name: 'Fridge' }],
      isCreateLoading: true,
    });
    const state = reducer(initialState, Actions.createSuccess(list));

    const expectedData = [
      { id: 1, name: 'Fridge' },
      { id: 2, name: 'Freezer' },
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
      data: [{ id: 1, name: 'Fridge' }, { id: 2, name: 'Freezer' }],
    });
    const idToRemove = 2;
    const state = reducer(initialState, Actions.removeSuccess(idToRemove));

    const expectedData = [{ id: 1, name: 'Fridge' }];

    expect(state.isCreateLoading).toBeFalsy();
    expect(state.data).toStrictEqual(expectedData);
  });

  test('removeFailure', () => {
    const error = 'error';
    const state = reducer(INITIAL_STATE, Actions.removeFailure(error));

    expect(state.isCreateLoading).toBeFalsy();
    expect(state.error).toEqual(error);
  });

  test('updateName', () => {
    const name = 'Fresh food';
    const state = reducer(INITIAL_STATE, Actions.updateName(name));

    expect(state.isNameUpdateLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('updateNameSuccess', () => {
    const initialState = Immutable({
      isCreateLoading: true,
      data: [{ id: 1, name: 'Fridge' }, { id: 2, name: 'Freezer' }],
    });
    const idToUpdate = 2;
    const newName = 'Fresh food';
    const state = reducer(
      initialState,
      Actions.updateNameSuccess(idToUpdate, newName),
    );

    const expectedData = [{ id: 1, name: 'Fridge' }, { id: 2, name: newName }];

    expect(state.isNameUpdateLoading).toBeFalsy();
    expect(state.data).toStrictEqual(expectedData);
  });

  test('updateNameFailure', () => {
    const error = 'error';
    const state = reducer(INITIAL_STATE, Actions.updateNameFailure(error));

    expect(state.isNameUpdateLoading).toBeFalsy();
    expect(state.error).toEqual(error);
  });
});
