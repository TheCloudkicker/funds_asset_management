import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'

import { GET_SETTINGS, UPDATE_SETTING, SAVE_SETTING } from '../actions/types.js';


export const updateSetting = (dispatch, settings, key, value) => {

    if (key === 'date_format' || key === 'date_format') {

        settings[key].current = value
        dispatch(saveSetting(key, value))

    } else if (key === 'rounding_tolerance' || key === 'isDark') {

        settings[key].current = value
    }


    dispatch({
        type: UPDATE_SETTING,
        payload: settings
    })
}


export const saveSetting = (key, value) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/main/settings/`)

    const body = {
        key,
        value
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: SAVE_SETTING,
                payload: res.data
            });
            dispatch(createSuccess(`Settings successfully saved`))
        })
        .catch(err => {
            console.log("ERR", err)
            dispatch(createError('Settings save failure'))
        });
}



export const getSettings = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/main/settings/`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_SETTINGS,
                payload: res.data
            });
        })
        .catch(err => {
            console.error(err)
            dispatch(createError(`Settings Failed to Load`))
        });
}