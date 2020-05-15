import apisauce from 'apisauce';
import { call, put } from 'redux-saga/effects';
// import { NavigationActions } from 'react-navigation';

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
    // yield put(
    //   NavigationActions.navigate({
    //     routeName: 'ProductsScreen',
    //     params: { OFFProduct: response.data.product },
    //   }),
    // );
  }
}
