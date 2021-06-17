import {
    GET_CASH_MOVEMENTS
} from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'



export const getCashMovements = (fundID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/cash/capital/?fundID=${fundID}`)

    axios
        .get(url, config)
        .then(res => {
            console.log("res", res)
            dispatch({
                type: GET_CASH_MOVEMENTS,
                payload: res.data
            });
            dispatch(createSuccess('Cash Flows Loaded'))
        })
        .catch(err => {

            dispatch(createError('Cash Flows Failed to Load'))
            console.error(err)
        });
}