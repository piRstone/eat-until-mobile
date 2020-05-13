import Immutable from 'seamless-immutable';

import Actions, { reducer, INITIAL_STATE } from '../ProductsRedux';

describe('ProductsRedux', () => {
  test('request', () => {
    const state = reducer(INITIAL_STATE, Actions.request());

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('success', () => {
    const inventoryId = 1;
    const products = [{ id: 1, name: 'Tomatoes' }];
    const state = reducer(
      INITIAL_STATE,
      Actions.success(products, inventoryId),
    );

    const expectedData = {
      [inventoryId]: products,
    };

    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(expectedData);
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
    const inventoryId = 1;
    const product = { id: 2, name: 'Bacon' };
    const initialState = Immutable({
      data: { [inventoryId]: [{ id: 1, name: 'Tomatoes' }] },
      isCreateLoading: true,
    });
    const state = reducer(
      initialState,
      Actions.createSuccess(product, inventoryId),
    );

    const expectedData = {
      [inventoryId]: [{ id: 1, name: 'Tomatoes' }, { id: 2, name: 'Bacon' }],
    };

    expect(state.data).toStrictEqual(expectedData);
    expect(state.isCreateLoading).toBeFalsy();
  });

  test('createFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.createFailure());

    expect(state.isCreateLoading).toBeFalsy();
    expect(state.error).toBeUndefined();
  });

  test('edit', () => {
    const state = reducer(INITIAL_STATE, Actions.edit());

    expect(state.isEditLoading).toBeTruthy();
    expect(state.editError).toBeUndefined();
  });

  test('editSuccess', () => {
    const idToEdit = 1;
    const inventoryId = 1;
    const product = { id: 1, name: 'Carrots' };
    const initialState = Immutable({
      isEditLoading: true,
      data: {
        [inventoryId]: [{ id: 1, name: 'Tomatoes' }, { id: 2, name: 'Bacon' }],
      },
    });
    const state = reducer(
      initialState,
      Actions.editSuccess(idToEdit, product, inventoryId),
    );

    const expectedData = {
      [inventoryId]: [{ id: 1, name: 'Carrots' }, { id: 2, name: 'Bacon' }],
    };

    expect(state.isEditLoading).toBeFalsy();
    expect(state.data).toStrictEqual(expectedData);
  });

  test('editFailure', () => {
    const error = 'error';
    const state = reducer(INITIAL_STATE, Actions.editFailure(error));

    expect(state.isEditLoading).toBeFalsy();
    expect(state.editError).toEqual(error);
  });

  test('remove', () => {
    const state = reducer(INITIAL_STATE, Actions.remove());

    expect(state.isCreateLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('removeSuccess', () => {
    const inventoryId = 1;
    const initialState = Immutable({
      isCreateLoading: true,
      data: {
        [inventoryId]: [{ id: 1, name: 'Tomatoes' }, { id: 2, name: 'Bacon' }],
      },
    });
    const idToRemove = 2;
    const state = reducer(
      initialState,
      Actions.removeSuccess(idToRemove, inventoryId),
    );

    const expectedData = { [inventoryId]: [{ id: 1, name: 'Tomatoes' }] };

    expect(state.isCreateLoading).toBeFalsy();
    expect(state.data).toStrictEqual(expectedData);
  });

  test('removeFailure', () => {
    const error = 'error';
    const state = reducer(INITIAL_STATE, Actions.removeFailure(error));

    expect(state.isCreateLoading).toBeFalsy();
    expect(state.error).toEqual(error);
  });

  test('empty', () => {
    const state = reducer(INITIAL_STATE, Actions.empty());

    expect(state.isEmptyLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('emptySuccess', () => {
    const inventoryId = 1;
    const initialState = Immutable({
      isEmptyLoading: true,
      data: {
        [inventoryId]: [{ id: 1, name: 'Tomatoes' }, { id: 2, name: 'Bacon' }],
      },
    });
    const state = reducer(initialState, Actions.emptySuccess(inventoryId));

    const expectedData = { [inventoryId]: [] };

    expect(state.isEmptyLoading).toBeFalsy();
    expect(state.data).toStrictEqual(expectedData);
  });

  test('emptyFailure', () => {
    const error = 'error';
    const state = reducer(INITIAL_STATE, Actions.emptyFailure(error));

    expect(state.isEmptyLoading).toBeFalsy();
    expect(state.error).toEqual(error);
  });

  test('offRequest', () => {
    const state = reducer(INITIAL_STATE, Actions.getOffData());

    expect(state.isOffLoading).toBeTruthy();
  });

  test('offSuccess', () => {
    const initialState = Immutable({
      isOffLoading: true,
    });
    const state = reducer(initialState, Actions.offSuccess());

    expect(state.isOffLoading).toBeFalsy();
  });
});
