

import {
    GET_DATABASE, UPDATE_DATABASE,

    UPDATE_DB_OBJECT, GET_DB_OBJECT, SAVE_DB_OBJECT, UPDATE_FUND_CLIENT_REPORT_OBJECT,
    GET_CLIENT_REPORTS, SAVE_FUND_CLIENT_REPORT
} from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'

export const checkForUnsaved = obj => {

    obj.unsaved_changes = !(obj.previous === obj.current)

}

export const updateDatabase = (dispatch, database, reportTypeIndex, reportIndex, fieldIndex, key, value) => {

    if (key === 'isOpen') {

        database.database[reportTypeIndex].reports[reportIndex].isOpen = value

    } else if (key === 'readOnly') {

        database.database[reportTypeIndex].reports[reportIndex].fields[fieldIndex].label.readOnly = value

    } else if (key === 'label') {

        database.database[reportTypeIndex].reports[reportIndex].fields[fieldIndex].label.current = value
        // database.database[reportTypeIndex].reports[reportIndex].fields[fieldIndex].label.unsaved_changes = checkForUnsaved(database.database[reportTypeIndex].reports[reportIndex].fields[fieldIndex].label)

    }



    dispatch({
        type: UPDATE_DATABASE,
        payload: database
    })

}


export const getDatabase = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/db/`)

    axios
        .get(url, config)
        .then(res => {
            console.log('GET_DATABASE', res.data)
            dispatch({
                type: GET_DATABASE,
                payload: res.data
            });
        })
        .catch(err => {

            dispatch(createError('Database schema failed to load'))
            console.error(err)
        });




}

export const saveFundClientReport = reportObj => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/client-report/`)

    const body = {
        reportObj: reportObj,
        method: 'SAVE'
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: SAVE_FUND_CLIENT_REPORT,
                payload: res.data
            });

        })
        .catch(err => {
            console.log("ERR", err)
            dispatch(createError('DB object failed to save'))
        });

}


export const getClientReports = reportType => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/client-report/?reportType=${reportType}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_CLIENT_REPORTS,
                payload: res.data
            });
        })
        .catch(err => {

            dispatch(createError('Client reports failed to load'))
            console.error(err)
        });
}

export const updateFundClientReportObject = (reportIndex, mappingIndex, headerIndex, key, value) => {
    return {
        type: UPDATE_FUND_CLIENT_REPORT_OBJECT,
        payload: { reportIndex, mappingIndex, headerIndex, key, value }
    }
}


export const saveDbObject = dbObject => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/reports/database/`)

    const body = {
        dbObject: dbObject,
        method: 'SAVE_ALL'
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: SAVE_DB_OBJECT,
                payload: res.data
            });

        })
        .catch(err => {
            console.log("ERR", err)
            dispatch(createError('DB object failed to save'))
        });
}


export const getDbObject = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/database/`)

    axios
        .get(url, config)
        .then(res => {
            console.log('getDbObject', res.data)
            dispatch({
                type: GET_DB_OBJECT,
                payload: res.data
            });
        })
        .catch(err => {

            dispatch(createError('Database schema failed to load'))
            console.error(err)
        });
}

export const updateDbObject = (type, reportIndex, headerID, key, value) => {
    return {
        type: UPDATE_DB_OBJECT,
        payload: { type, reportIndex, headerID, key, value }
    }
}

