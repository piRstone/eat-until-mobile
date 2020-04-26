import { call, put } from 'redux-saga/effects';
import i18n from 'i18next';

import NotificationActions from '../Redux/NotificationRedux';
import { types } from '../Containers/Notification';
import ProductsActions from '../Redux/ProductsRedux';

export function* retrieveProducts(api, { inventoryId }) {
  const response = yield call(api.getProducts, inventoryId);

  if (response.ok) {
    yield put(ProductsActions.success(response.data));
  } else {
    yield put(ProductsActions.failure(response.data));
    yield put(
      NotificationActions.display(
        i18n.t('notification:serverError'),
        types.danger,
      ),
    );
  }
}

export function* createProduct(api, action) {
  const { name, expiresAt, notifyBefore, inventoryId, ean13 } = action.product;
  const product = {
    name,
    description: 'Produit',
    expiration_date: expiresAt,
    notification_delay: parseInt(notifyBefore, 10),
    inventory: inventoryId,
    ean13: ean13 || null,
  };
  const response = yield call(api.createProduct, product);

  if (response.ok) {
    yield put(ProductsActions.createSuccess(response.data));
    yield put(
      NotificationActions.display(
        i18n.t('products:productAdded'),
        types.success,
      ),
    );
  } else {
    yield put(ProductsActions.createFailure(response.data));
    yield put(
      NotificationActions.display(
        i18n.t('notification:serverError'),
        types.danger,
      ),
    );
  }
}

export function* removeProduct(api, { id, inventoryId }) {
  const response = yield call(api.removeProduct, id);

  if (response.ok) {
    yield put(ProductsActions.removeSuccess(id));
    yield put(ProductsActions.request(inventoryId));
    yield put(
      NotificationActions.display(
        i18n.t('products:productDeleted'),
        types.success,
      ),
    );
  } else {
    yield put(ProductsActions.removeFailure(response.data));
    yield put(
      NotificationActions.display(
        i18n.t('notification:serverError'),
        types.danger,
      ),
    );
  }
}
