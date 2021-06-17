import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import admin from './admin'
import alerts from './alerts'
import cash from './cash'
import calendar from './calendar'
import capital from './capital'
import carry from './carry'
import database from './database'
import dates from './dates'
import fs from './fs'
import funds from './funds'
import investments from './investments'
import investors from './investors'
import layout from './layout'
import main from './main'
import materiality from './materiality'
import navigator from './navigator'
import reports from './reports'
import periods from './periods'
import recycle from './recycle'
import repository from './repository'
import settings from './settings'
import testing from './testing'
import tbs from './tbs'
import uploads from './uploads'
import user from './user'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const rootReducer = combineReducers({
    admin,
    alerts,
    calendar,
    capital,
    carry,
    cash,
    database,
    dates,
    fs,
    funds,
    investments,
    investors,
    layout,
    main,
    materiality,
    navigator,
    periods,
    recycle,
    reports,
    repository,
    settings,
    testing,
    tbs,
    uploads,
    user,
})

export default persistReducer(persistConfig, rootReducer);