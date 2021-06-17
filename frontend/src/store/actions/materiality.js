import {
    GET_MATERIALITY,
    UPDATE_MATERIALITY
} from './types'


import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createSuccess, createError } from './alerts'


export const getMateriality = (fundID, periodID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/materiality/?fundID=${fundID}&periodID=${periodID}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_MATERIALITY,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(createError('Materiality failed to load'))
        });
}

export const updateMateriality = (dispatch, materiality, key, value) => {


    if (key === 'recalc') {

        let overall_amount = materiality.net_assets * (materiality.overall_bps / 10000)
        materiality.overall_amount = overall_amount
        materiality.performance_amount = overall_amount * (materiality.performance_percent / 100)
        materiality.deminimis_amount = overall_amount * (materiality.deminimis_percent / 100)

    }






    dispatch({
        type: UPDATE_MATERIALITY,
        payload: materiality

    })
}