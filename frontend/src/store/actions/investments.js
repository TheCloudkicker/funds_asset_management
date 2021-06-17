import {
    GET_INVESTMENTS, SET_SEL_INVESTMENT,
    TOGGLE_INV_LOADING, GET_INVESTMENT_DETAILS
} from './types'


import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'


export const getInvestments = fundID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/investments/?fundID=${fundID}`)

    axios
        .get(url, config)
        .then(res => {
            console.log('getInvestments', res)
            dispatch({
                type: GET_INVESTMENTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(createError("Investments Failed to Load"))
            console.error(err)
        });
}

export const getInvestmentDetails = investmentID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/investments/?investmentID=${investmentID}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_INVESTMENT_DETAILS,
                payload: res.data
            });
            dispatch(createSuccess("Investment details loaded"))
        })
        .catch(err => {
            dispatch(createError("Investment details failed to load"))
            console.error(err)
        });



}

export const toggleInvLoading = isLoading => {
    return {
        type: TOGGLE_INV_LOADING,
        payload: isLoading
    }
}

export const setSelectedInvestment = investment => {
    return {
        type: SET_SEL_INVESTMENT,
        payload: investment
    }
}


