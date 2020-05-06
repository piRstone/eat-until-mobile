import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import i18n from 'i18next';

import FixtureAPI from '../../Services/FixtureApi';
import {
  retrieveLists,
  createList,
  removeList,
  updateName,
  emptyList,
} from '../ListsSagas';
import NotificationActions from '../../Redux/NotificationRedux';
import { types } from '../../Containers/Notification';
import ListsActions from '../../Redux/ListsRedux';
import ProductsActions from '../../Redux/ProductsRedux';

describe('retriveLists', () => {
  let generator;
  beforeEach(() => {
    generator = retrieveLists(FixtureAPI);
  });

  it('should call getList request', () => {
    expect(generator.next().value).toEqual(call(FixtureAPI.getLists));
  });

  it('should dispatch success action', () => {
    generator.next(); // call

    const response = FixtureAPI.getLists();

    expect(generator.next(response).value).toEqual(
      put(ListsActions.success(response.data)),
    );
  });

  it('should dispatch failure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ListsActions.failure(response.data)),
    );
  });
});

describe('createLists', () => {
  let generator;
  const name = 'Fridge';
  beforeEach(() => {
    generator = createList(FixtureAPI, { name });
  });

  it('should call createList request', () => {
    expect(generator.next().value).toEqual(call(FixtureAPI.createList, name));
  });

  it('should dispatch createSuccess action', () => {
    generator.next(); // call

    const response = FixtureAPI.createList();

    expect(generator.next(response).value).toEqual(
      put(ListsActions.createSuccess(response.data)),
    );
  });

  it('should dispatch failure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ListsActions.createFailure(response.data)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('notification:serverError'),
          types.danger,
        ),
      ),
    );
  });
});

describe('removeLists', () => {
  let generator;
  const id = 12;
  beforeEach(() => {
    generator = removeList(FixtureAPI, { id });
  });

  it('should call removeList request', () => {
    expect(generator.next().value).toEqual(call(FixtureAPI.removeList, id));
  });

  it('should dispatch removeSuccess action', () => {
    generator.next(); // call

    const response = { ok: true };

    expect(generator.next(response).value).toEqual(
      put(ListsActions.removeSuccess(id)),
    );
    expect(generator.next().value).toEqual(
      put(NavigationActions.navigate({ routeName: 'ListsScreen' })),
    );
    expect(generator.next().value).toEqual(put(ListsActions.request()));
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(i18n.t('lists:listDeleted'), types.success),
      ),
    );
  });

  it('should dispatch failure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ListsActions.removeFailure(response.data)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('notification:serverError'),
          types.danger,
        ),
      ),
    );
  });
});

describe('updateName', () => {
  let generator;
  const id = 12;
  const name = 'Fridge';
  beforeEach(() => {
    generator = updateName(FixtureAPI, { id, name });
  });

  it('should call createList request', () => {
    expect(generator.next().value).toEqual(
      call(FixtureAPI.updateListName, id, name),
    );
  });

  it('should dispatch updateNameSuccess action', () => {
    generator.next(); // call

    const response = FixtureAPI.createList();

    expect(generator.next(response).value).toEqual(
      put(ListsActions.updateNameSuccess(id, name)),
    );
  });

  it('should dispatch updateNameFailure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ListsActions.updateNameFailure(response.data)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('notification:serverError'),
          types.danger,
        ),
      ),
    );
  });
});

describe('emptyList', () => {
  let generator;
  const inventoryId = 2;
  beforeEach(() => {
    generator = emptyList(FixtureAPI, { inventoryId });
  });

  it('should call emptyList request', () => {
    expect(generator.next().value).toEqual(
      call(FixtureAPI.emptyList, inventoryId),
    );
  });

  it('should dispatch emptySuccess action', () => {
    generator.next(); // call

    const response = FixtureAPI.createList();

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.emptySuccess(inventoryId)),
    );
  });

  it('should dispatch emptyFailure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.emptyFailure(response.data)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('products:emptyError'),
          types.danger,
        ),
      ),
    );
  });
});
