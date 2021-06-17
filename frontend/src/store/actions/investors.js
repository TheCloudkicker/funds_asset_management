import { GET_INVESTORS, UPDATE_INVESTORS, SAVE_INVESTOR, DELETE_INVESTOR } from './types'


import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'
import { numberWithCommas } from '../../components/common/helpers'


export const getInvestors = fundID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/investors/?fundID=${fundID}`)

    axios
        .get(url, config)
        .then(res => {
            console.log('investors', res.data)

            dispatch({
                type: GET_INVESTORS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(createError('Investors failed to load'))
            console.error(err)
        });
}


export const saveInvestor = (investor, key = null) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/investors/`)
    const profile = getState().user.currentUser.displayName
    const fundID = getState().funds.selectedFund.value

    const body = {
        investor,
        profile,
        fundID,
        key,
        method: 'UPDATE'
    }

    axios
        .post(url, body, config)
        .then(res => {

            dispatch({
                type: SAVE_INVESTOR,
                payload: res.data
            })

        })
        .catch(err => {
            console.log("ERR", err)
            dispatch(createError('Investor update failed'))
        });
}


const checkVal = val => {
    return val.current !== val.previous
}


export const updateInvestors = (investorsState, index, key, value, dispatch) => {

    if (key === 'isAffiliate') {
        investorsState.investors[index][key].current = value
        investorsState.investors[index][key].unsaved_changes = checkVal(investorsState.investors[index][key])
        dispatch(saveInvestor(investorsState.investors[index], key))

    }

    console.log('updateInvestors', index, key, value)


    dispatch({
        type: UPDATE_INVESTORS,
        payload: investorsState
    })
}

