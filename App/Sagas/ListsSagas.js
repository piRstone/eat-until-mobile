import { call, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import { UserSelectors } from '../Redux/UserRedux';
import ListsActions from '../Redux/ListsRedux';

export function* retrieveLists(api) {
  const accessToken = yield select(UserSelectors.accessToken);
  const response = yield call(api.getLists, accessToken);

  if (response.ok) {
    yield put(ListsActions.success(response.data));
  } else {
    yield put(ListsActions.failure(response.data));
  }
}

export function* createList(api, { name }) {
  const accessToken = yield select(UserSelectors.accessToken);
  const response = yield call(api.createList, accessToken, name);

  if (response.ok) {
    yield put(ListsActions.createSuccess(response.data.data));
  } else {
    yield put(ListsActions.createFailure(response.data));
  }
}

export function* removeList(api, { id }) {
  const accessToken = yield select(UserSelectors.accessToken);
  const response = yield call(api.removeList, accessToken, id);

  if (response.ok) {
    yield put(ListsActions.removeSuccess(id));
    yield put(NavigationActions.navigate({ routeName: 'ListsScreen' }));
    yield put(ListsActions.request());
  } else {
    yield put(ListsActions.removeFailure(response.data));
  }
}

export function* updateName(api, { id, name }) {
  const accessToken = yield select(UserSelectors.accessToken);
  const response = yield call(api.updateListName, accessToken, id, name);

  if (response.ok) {
    yield put(ListsActions.updateNameSuccess(id, name));
  } else {
    yield put(ListsActions.updateNameFailure(response.data));
  }
}
