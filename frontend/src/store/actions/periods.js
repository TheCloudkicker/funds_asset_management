
import {
    GET_PERIODS, SET_SELECTED_PERIOD
} from './types'

import axios from 'axios'
import { authConfig, devPrefixes } from './common'
import { createError, createSuccess } from './alerts'

export const setSelectedPeriod = period => {
    return {
        type: SET_SELECTED_PERIOD,
        payload: period
    }
}

export const getPeriods = (clientID = 1) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/main/periods/`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_PERIODS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(createError('Audit Periods failed to load'))
            console.error(err)
        });
}