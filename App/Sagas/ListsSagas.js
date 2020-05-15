import { call, put } from 'redux-saga/effects';
// import { NavigationActions } from 'react-navigation';
import i18n from 'i18next';

import NotificationActions from '../Redux/NotificationRedux';
import { types } from '../Containers/Notification';
import ListsActions from '../Redux/ListsRedux';
import ProductsActions from '../Redux/ProductsRedux';

export function* retrieveLists(api) {
  const response = yield call(api.getLists);

  if (response.ok) {
    yield put(ListsActions.success(response.data));
  } else {
    yield put(ListsActions.failure(response.data));
    yield put(
      NotificationActions.display(
        i18n.t('notification:serverError'),
        types.danger,
      ),
    );
  }
}

export function* createList(api, { name }) {
  const response = yield call(api.createList, name);

  if (response.ok) {
    yield put(ListsActions.createSuccess(response.data));
  } else {
    yield put(ListsActions.createFailure(response.data));
    yield put(
      NotificationActions.display(
        i18n.t('notification:serverError'),
        types.danger,
      ),
    );
  }
}

export function* removeList(api, { id }) {
  const response = yield call(api.removeList, id);

  if (response.ok) {
    yield put(ListsActions.removeSuccess(id));
    // yield put(NavigationActions.navigate({ routeName: 'ListsScreen' }));
    yield put(ListsActions.request());
    yield put(
      NotificationActions.display(i18n.t('lists:listDeleted'), types.success),
    );
  } else {
    yield put(ListsActions.removeFailure(response.data));
    yield put(
      NotificationActions.display(
        i18n.t('notification:serverError'),
        types.danger,
      ),
    );
  }
}

export function* updateName(api, { id, name }) {
  const response = yield call(api.updateListName, id, name);

  if (response.ok) {
    yield put(ListsActions.updateNameSuccess(id, name));
  } else {
    yield put(ListsActions.updateNameFailure(response.data));
    yield put(
      NotificationActions.display(
        i18n.t('notification:serverError'),
        types.danger,
      ),
    );
  }
}

export function* emptyList(api, { inventoryId }) {
  const response = yield call(api.emptyList, inventoryId);

  if (response.ok) {
    yield put(ProductsActions.emptySuccess(inventoryId));
  } else {
    yield put(ProductsActions.emptyFailure(response.data));
    yield put(
      NotificationActions.display(i18n.t('products:emptyError'), types.danger),
    );
  }
}
