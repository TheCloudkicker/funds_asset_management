
import {
    RECYCLE_ITEM, DELETE_RECYCLE_ITEM, GET_RECYCLED_ITEMS,

    ADD_REPORT,
} from './types'

import axios from 'axios'
import { authConfig, devPrefixes } from './common'
import { createError, createSuccess } from './alerts'



export const deleteRecycleItem = obj => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/recycle/`)

    const body = {
        itemId: obj.id,
        method: 'DELETE'
    }

    axios
        .post(url, body, config)
        .then(res => {
            console.log("recycleItem", res)
            dispatch({
                type: DELETE_RECYCLE_ITEM,
                payload: res.data.deletedID,
            });
        })
        .catch(err => {
            dispatch(createError("Failed to save"))
        });

}

export const restoreRecyleItem = (dispatch, obj) => {

    dispatch(deleteRecycleItem(obj))

    dispatch({
        type: ADD_REPORT,
        payload: obj
    })

}

export const getRecycledItems = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/recycle/`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_RECYCLED_ITEMS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(createError('Recyled Bin failed to load'))
            console.error(err)
        });
}

export const recycleItem = (obj, reducerName, arrayName) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/recycle/`)

    const deletedBy = getState().user.currentUser.displayName

    const body = {
        obj,
        deletedBy,
        reducerName,
        arrayName,
        method: 'ADD'
    }

    axios
        .post(url, body, config)
        .then(res => {
            console.log("recycleItem", res)
            dispatch({
                type: RECYCLE_ITEM,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(createError("Failed to save"))
        });

}

