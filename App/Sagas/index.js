import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { UserTypes } from '../Redux/UserRedux';
import { ListsTypes } from '../Redux/ListsRedux';
import { ProductsTypes } from '../Redux/ProductsRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { login, register, edit, logout, forgotPassword } from './UserSagas';
import {
  retrieveLists,
  createList,
  removeList,
  updateName,
  emptyList,
} from './ListsSagas';
import {
  retrieveProducts,
  createProduct,
  editProduct,
  removeProduct,
} from './ProductsSagas';
import { getProductData } from './OFFSagas';

/* ------------- API ------------- */

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(UserTypes.LOGIN, login, api),
    takeLatest(UserTypes.LOGOUT, logout, api),
    takeLatest(UserTypes.REGISTER, register, api),
    takeLatest(UserTypes.EDIT, edit, api),
    takeLatest(UserTypes.FORGOT_PASSWORD, forgotPassword, api),
    takeLatest(ListsTypes.REQUEST, retrieveLists, api),
    takeLatest(ListsTypes.CREATE, createList, api),
    takeLatest(ListsTypes.REMOVE, removeList, api),
    takeLatest(ListsTypes.UPDATE_NAME, updateName, api),
    takeLatest(ProductsTypes.REQUEST, retrieveProducts, api),
    takeLatest(ProductsTypes.CREATE, createProduct, api),
    takeLatest(ProductsTypes.EDIT, editProduct, api),
    takeLatest(ProductsTypes.REMOVE, removeProduct, api),
    takeLatest(ProductsTypes.GET_OFF_DATA, getProductData),
    takeLatest(ProductsTypes.EMPTY, emptyList, api),
  ]);
}
