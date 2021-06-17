import {
    GET_FSLIS, ADD_NEW_FSLI, FSLI_TOGGLE_EDIT, SAVE_FSLI, SELECT_FSLI,

    GET_FSLI, UPDATE_FSLI_IN_STORE, DELETE_FSLI,
    UPDATE_FSLI_FILTER, ADD_FSLI, GET_FS,
    GET_UNMAPPED_ACCOUNTS, GET_GENERIC_MAPPINGS, GET_CUSTOM_MAPPINGS,
    ADD_GENERIC_MAPPING, UPDATE_SELECTED_FSLI, UPDATE_SELECTED_UNMAPPED, REMOVE_SELECTED_UNMAPPED
} from './types'

import { authConfig, devPrefixes } from './common'
import { createSuccess, createError } from '../actions/alerts'
import axios from 'axios'

export const selectFsli = fslis => {
    return {
        type: SELECT_FSLI,
        payload: fslis
    }
}

export const saveFsli = fsli => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/fslis/`)

    const body = {
        fsli: fsli,
    }


    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: SAVE_FSLI,
                payload: res.data,
            });
            dispatch(createSuccess("Fsli successfully saved"))
        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Fsli failed to save"))
        });

}
export const deleteFsli = fsliID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/fslis/${fsliID}`)

    axios
        .delete(url, config)
        .then(res => {
            dispatch({
                type: DELETE_FSLI,
                payload: res.data,
            });
            dispatch(createSuccess('Fsli successfully deleted'))

        })
        .catch(err => {
            console.error("ERR", err)

        });

}


export const fsliToggleEdit = (fsliID, isEditable) => {
    return {
        type: FSLI_TOGGLE_EDIT,
        payload: { fsliID, isEditable }
    }
}

export const addNewFsli = () => {
    return {
        type: ADD_NEW_FSLI
    }
}


export const removeSelectedUnmapped = acctID => {
    return {
        type: REMOVE_SELECTED_UNMAPPED,
        payload: acctID
    }
}

export const updateSelectedUnmapped = unmappedAcct => {
    return {
        type: UPDATE_SELECTED_UNMAPPED,
        payload: unmappedAcct
    }
}

export const updateSelectedFsli = fsli => {
    return {
        type: UPDATE_SELECTED_FSLI,
        payload: fsli
    }
}

export const addGenericMapping = (clientID, fsliID, accountID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/generic_mappings/`)

    const body = {
        clientID: clientID,
        accountID: accountID,
        fsliID: fsliID,
    }

    dispatch(createSuccess('Saving New Mapping'))

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: ADD_GENERIC_MAPPING,
                payload: res.data,
            });
            dispatch(createSuccess("Mapping successfully added"))
            dispatch(updateSelectedFsli(null))
            dispatch(removeSelectedUnmapped(accountID))
        })
        .catch(err => {
            console.error("ERR", err)
        });

}


export const getCustomMappings = (clientID, fundID, periodID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/custom_mappings/?clientID=${clientID}&fundID=${fundID}&periodID=${periodID}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_CUSTOM_MAPPINGS,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}

export const getGenericMappings = (clientID, fundID, periodID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/generic_mappings/?clientID=${clientID}&fundID=${fundID}&periodID=${periodID}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_GENERIC_MAPPINGS,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}

export const getUnmappedAccounts = (clientID, fundID, periodID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/unmapped/?clientID=${clientID}&fundID=${fundID}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_UNMAPPED_ACCOUNTS,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}


export const getFs = (clientID, fundID, periodID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/?clientID=${clientID}&fundID=${fundID}&periodID=${periodID}`)

    axios
        .get(url, config)
        .then(res => {
            console.log("FS", res)
            dispatch({
                type: GET_FS,
                payload: res.data
            });
            dispatch(createSuccess('FS Success generated'))
        })
        .catch(err => {
            dispatch(createError('Error rendering FS'))
            console.error(err)
        })
}





export const addFsli = fsli => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/fslis/`)

    const body = {
        fsli: fsli,
    }

    axios
        .post(url, body, config)
        .then(res => {
            console.log("FSLI ADDED", res)
            dispatch({
                type: ADD_FSLI,
                payload: res.data,
            });
            dispatch(createSuccess("FSLI Successfully Added"))

        })
        .catch(err => {
            dispatch(createError("Error adding FSLI"))
            console.error("ERR", err)
        });

}



export const updateFsliFilter = fsliString => {
    return {
        type: UPDATE_FSLI_FILTER,
        payload: fsliString
    }
}

export const updateFsliInStore = (fsliID, key, value) => {
    return {
        type: UPDATE_FSLI_IN_STORE,
        payload: { fsliID, key, value }
    }
}

export const getFslis = (clientID = null) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/fslis/`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_FSLIS,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}