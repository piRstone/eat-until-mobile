import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ListsTypes } from '../Redux/ListsRedux'
import { ProductsTypes } from '../Redux/ProductsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout } from './UserSagas'
import { retrieveLists, createList } from './ListsSagas'
import { retrieveProducts, createProduct } from './ProductsSagas'

/* ------------- API ------------- */

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(UserTypes.LOGIN, login, api),
    takeLatest(UserTypes.LOGOUT, logout, api),
    takeLatest(ListsTypes.REQUEST, retrieveLists, api),
    takeLatest(ListsTypes.CREATE, createList, api),
    takeLatest(ProductsTypes.REQUEST, retrieveProducts, api),
    takeLatest(ProductsTypes.CREATE, createProduct, api)
  ])
}