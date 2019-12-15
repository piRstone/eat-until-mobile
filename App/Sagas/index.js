import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout } from './UserSagas'

/* ------------- API ------------- */

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(UserTypes.LOGIN, login, api),
    takeLatest(UserTypes.LOGOUT, logout, api)
  ])
}
