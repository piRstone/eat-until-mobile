import { call, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import { UserSelectors } from '../Redux/UserRedux';
import ListsActions from '../Redux/ListsRedux';

export function* retrieveLists(api) {
  const response = yield call(api.getLists);

  if (response.ok) {
    yield put(ListsActions.success(response.data));
  } else {
    yield put(ListsActions.failure(response.data));
  }
}

export function* createList(api, { name }) {
  const response = yield call(api.createList, name);

  if (response.ok) {
    yield put(ListsActions.createSuccess(response.data.data));
  } else {
    yield put(ListsActions.createFailure(response.data));
  }
}

export function* removeList(api, { id }) {
  const response = yield call(api.removeList, id);

  if (response.ok) {
    yield put(ListsActions.removeSuccess(id));
    yield put(NavigationActions.navigate({ routeName: 'ListsScreen' }));
    yield put(ListsActions.request());
  } else {
    yield put(ListsActions.removeFailure(response.data));
  }
}

export function* updateName(api, { id, name }) {
  const response = yield call(api.updateListName, id, name);

  if (response.ok) {
    yield put(ListsActions.updateNameSuccess(id, name));
  } else {
    yield put(ListsActions.updateNameFailure(response.data));
  }
}
