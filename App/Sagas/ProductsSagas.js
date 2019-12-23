import { call, put, select } from 'redux-saga/effects'

import { UserSelectors } from '../Redux/UserRedux'
import ProductsActions from '../Redux/ProductsRedux'

export function * retrieveProducts (api, { listId }) {
  const accessToken = yield select(UserSelectors.accessToken)
  const response = yield call(api.getProducts, accessToken, listId)

  if (response.ok) {
    yield put(ProductsActions.success(response.data))
  } else {
    yield put(ProductsActions.failure(response.data))
  }
}

export function * createProduct (api, action) {
  const accessToken = yield select(UserSelectors.accessToken)

  const { name, expiresAt, notifyBefore, listId } = action.product
  const product = {
    name,
    description: 'Produit',
    expires_at: expiresAt,
    notify_before: parseInt(notifyBefore, 10),
    list_id: listId,
    code_value: '0000000000000', // TODO: set dynamic code
    code_type: 'ean13' // TODO: set dynamic code type
  }
  console.tron.log('Product saga', product)
  const response = yield call(api.createProduct, accessToken, product)

  if (response.ok) {
    yield put(ProductsActions.createSuccess(response.data.data))
  } else {
    yield put(ProductsActions.createFailure(response.data))
  }
}
