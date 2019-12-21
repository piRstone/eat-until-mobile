import { call, put, select } from 'redux-saga/effects'

import { UserSelectors } from '../Redux/UserRedux'
import ProductsActions from '../Redux/ProductsRedux'

export function * retrieveProducts (api) {
  const accessToken = yield select(UserSelectors.accessToken)
  const response = yield call(api.getLists, accessToken)

  if (response.ok) {
    yield put(ProductsActions.success(response.data))
  } else {
    yield put(ProductsActions.failure(response.data))
  }
}

export function * createProduct (api, { name }) {
  const accessToken = yield select(UserSelectors.accessToken)
  const response = yield call(api.createList, accessToken, name)

  if (response.ok) {
    yield put(ProductsActions.createSuccess(response.data.data))
  } else {
    yield put(ProductsActions.createFailure(response.data))
  }
}
