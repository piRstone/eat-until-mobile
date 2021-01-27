import apisauce from 'apisauce';
import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import i18n from 'i18next';

import ProductsActions from '../Redux/ProductsRedux';
import NotificationActions from '../Redux/NotificationRedux';
import { types } from '../Containers/Notification';

export function* getProductData({ ean13 }) {
  const baseURL = 'https://fr.openfoodfacts.org/api/v0';
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 10000,
  });

  const response = yield call(api.get, `/product/${ean13}.json`);

  if (response.data.status === 1) {
    yield put(ProductsActions.offSuccess());
    yield put(
      NavigationActions.navigate({
        routeName: 'ProductsScreen',
        params: { OFFProduct: response.data.product },
      }),
    );
  } else {
    yield put(ProductsActions.offFailure());
    yield put(
      NotificationActions.display(
        i18n.t('camera:unknownProduct'),
        types.danger,
      ),
    );
  }
}
