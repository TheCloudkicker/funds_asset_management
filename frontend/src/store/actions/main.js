import {
    UPDATE_AUDIT_SETTINGS, GET_AUDIT_SETTINGS, SAVE_ADUIT_SETTINGS, GET_CURRENCIES,
    ADD_AUDIT_SETTING, DELETE_AUDIT_SETTING, RESET_APP
} from './types'


import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createSuccess, createError } from './alerts'


export const resetApp = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/main/reset/`)
    const body = {
        method: "RESET",
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: RESET_APP,
                payload: res.data,
            });
            dispatch(createSuccess(`App reset - missing ${res.data.missing_ownerships} ownerships`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("App failed to reset"))
        });
}

export const updateAuditSettings = (auditSettings, index, key, value) => {

    if (key === 'name') {
        auditSettings[index].label = value
    }


    auditSettings[index][key].current = value




    return {
        type: UPDATE_AUDIT_SETTINGS,
        payload: auditSettings
    }
}

export const deleteAuditSetting = auditSettingID => (dispatch, getState) => {

    if (isNaN(auditSettingID)) {
        return dispatch({
            type: DELETE_AUDIT_SETTING,
            payload: { deletedID: auditSettingID }
        })
    }

    const config = authConfig(getState)
    const url = devPrefixes(`/api/main/audit/${auditSettingID}`)

    axios
        .delete(url, config)
        .then(res => {
            dispatch({
                type: DELETE_AUDIT_SETTING,
                payload: res.data
            });
            dispatch(createSuccess(`Materiality successfully deleted`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Materiality failed to delete"))
        });

}


export const addAuditSetting = () => {
    return {
        type: ADD_AUDIT_SETTING,
    }
}

export const getCurrencies = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/main/currency/`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_CURRENCIES,
                payload: res.data
            });

        })
        .catch(err => {
            console.log('err', err)
            dispatch(createError('Currencies failed to load'))
        });
}



export const getAuditSettings = yearID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/main/audit/?yearID=${yearID}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_AUDIT_SETTINGS,
                payload: res.data
            });
            dispatch(createSuccess('Audit settings loaded'))

        })
        .catch(err => {
            console.log('err', err)
            dispatch(createError('Audit settings failed to load'))
        });
}

export const saveAuditSettings = auditSettings => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/main/audit/`)

    const body = {
        auditSettings,
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: SAVE_ADUIT_SETTINGS,
                payload: res.data,
            });
            dispatch(createSuccess(`Audit settings successfully saved`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Audit settings failed to save"))
        });


}
