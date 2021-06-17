import {
    FUND_SETUP_TOGGLE_SELECT, GET_CLIENT_MAPPINGS, TOGGLE_EDIT_MODE, SET_CARRY_REPORT
} from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'



export const setCarryReport = (key, report) => {
    return {
        type: SET_CARRY_REPORT,
        payload: { key, report }
    }
}






export const deleteReportSetupFromDatabase = reportID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/setup/report/${reportID}`)


    console.log("DELETING REPORT FROM DB")

    axios
        .delete(url, config)
        .then(res => {
            console.log("res", res)
            dispatch({
                type: null,
                payload: res.data
            });
            dispatch(createSuccess(`Report successfully deleted rerport and ${res.data.no_headers} headers`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Failed to Delete Report"))
        });
}







export const addNewReportToDatabase = report => (dispatch, getState) => {
    const config = authConfig(getState)
    const url = devPrefixes(`/api/setup/report/`)

    const body = {
        report,
    }

    console.log("BODY", body)

    axios
        .post(url, body, config)
        .then(res => {
            console.log("res", res)
            dispatch({
                type: null,
                payload: res.data,
            });
            dispatch(createSuccess(`Report successfully added`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Report save failure"))
        });
}




export const deleteFundSetup = fundID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/fund-setup/${fundID}`)

    console.log("DELETING TO DB")

    axios
        .delete(url, config)
        .then(res => {
            console.log("res", res)
            dispatch({
                type: null,
                payload: res.data,
            });
            dispatch(createSuccess(`Fund Setup Successfully Deleted`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Fund Setup Delete Failed"))
        });


}





export const getClientMappings = clientID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/setup/db-mapping/?clientID=${clientID}`)

    axios
        .get(url, config)
        .then(res => {
            console.log('res', res)
            dispatch({
                type: GET_CLIENT_MAPPINGS,
                payload: res.data
            });
            dispatch(createSuccess('Client Mappings Obtained'))
        })
        .catch(err => {

            dispatch(createError('Client Mappings Failed'))
            console.error(err)
        });
}

