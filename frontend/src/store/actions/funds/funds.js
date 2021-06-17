import {
    UPDATE_FUND, SAVE_FUND, ADD_FUND,

    SAVE_FUND_CRITERIA, SAVE_INVESTMENT_CRITERIA, SAVE_INVESTOR_CRITERIA,

    SET_ENTITY_OPTIONS, TOGGLE_OWNERSHIPS_LOADING, ADD_CHILD_OWNERSHIP,
    ADD_ALT_FUND_NAME, DELETE_ALT_FUND_NAME, SAVE_ALT_FUND_NAME, UPDATE_ALT_FUND_NAME, GET_ALT_NAMES,


    ADD_ENTITY_TO_REPOSITORY, UPDATE_APP_VIEW,
    GET_FUNDS, CHANGE_SELECTED_FUND, CHANGE_OWNERSHIP_INFO,
    ADD_NEW_OWNERSHIP, GET_ENTITY_OWNERSHIPS, DELETE_OWNERSHIP, SAVE_OWNERSHIP,
    SELECT_OWNERSHIP, ADD_BLOCKER_OWNER, GET_BLOCKER_OWNERS, UPDATE_BLOCKER_OWNERSHIP_INFO,
    SET_SELECTED_BLOCKER, TOGGLE_BLOCKER_LOADING, DELETE_BLOCKER_OWNERSHIP, SAVE_BLOCKER_OWNERSHIP,
    GET_FUND_DETAILS, GET_FUNDS_SETUP,
    TOGGLE_FUND_LOADING, ADD_NEW_FUND,


} from '../types'

import axios from 'axios'
import { devPrefixes, authConfig } from '../common'
import { createSuccess, createError } from '../alerts'
import { updateLayout } from '../layout'


export const getFunds = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/funds/`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_FUNDS,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}



export const getFundsSetup = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/fund-setup/`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_FUNDS_SETUP,
                payload: res.data
            });

        })
        .catch(err => {

            dispatch(createError('Failed to Load Funds Setup'))
            console.error(err)
        });
}
export const saveCriteria = (criterias, criteriaType) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/fund-criteria/`)

    const body = {
        criterias,
        criteriaType,
    }

    axios
        .post(url, body, config)
        .then(res => {
            if (res.data.criteriaType === 'fund') {
                dispatch({
                    type: SAVE_FUND_CRITERIA,
                    payload: res.data,
                });
            } else if (res.data.criteriaType === 'investment') {
                dispatch({
                    type: SAVE_INVESTMENT_CRITERIA,
                    payload: res.data,
                });
            } else if (res.data.criteriaType === 'investor') {
                dispatch({
                    type: SAVE_INVESTOR_CRITERIA,
                    payload: res.data,
                });
            }
            dispatch(updateLayout('modalVisible', false));
            dispatch(createSuccess(`Fund criteria successfully added`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Failed to add fund criteria"))
        });


}

export const updateFund = (index, key, value) => {
    return {
        type: UPDATE_FUND,
        payload: { index, key, value }
    }
}

export const saveFund = (fundObject, method) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/funds/`)

    const body = {
        fundObject,
        method,
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: SAVE_FUND,
                payload: res.data,
            });
            dispatch(createSuccess(`Fund successfully added`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Failed to add fund"))
        });


}







export const getFundDetails = (fundID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/funds/?fundID=${fundID}`)

    axios
        .get(url, config)
        .then(res => {

            dispatch({
                type: GET_FUND_DETAILS,
                payload: res.data
            });

        })
        .catch(err => {
            console.error(err)
            dispatch(createError('Fund details failed to load'))
        });
}


export const getAliases = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/aliases/`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_ALT_NAMES,
                payload: res.data
            });

        })
        .catch(err => {

            dispatch(createError('Failed to Load Funds Setup'))
            console.error(err)
        });
}


export const updateAltFundName = (index, key, value) => {
    return {
        type: UPDATE_ALT_FUND_NAME,
        payload: { index, key, value }
    }
}

export const saveAltFundName = (altFundName, profile) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/aliases/`)

    const body = {
        altFundName,
        profile,
    }

    axios
        .post(url, body, config)
        .then(res => {
            console.log("res", res)
            dispatch({
                type: SAVE_ALT_FUND_NAME,
                payload: res.data,
            });
            dispatch(createSuccess(`Alt fund name successfully saved`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Alt fund name failed to save"))
        });


}


export const deleteAltFundName = altFundNameID => (dispatch, getState) => {

    if (isNaN(altFundNameID)) {
        return dispatch({
            type: DELETE_ALT_FUND_NAME,
            payload: { deletedID: altFundNameID }
        })

    }

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/aliases/${altFundNameID}`)

    axios
        .delete(url, config)
        .then(res => {
            dispatch({
                type: DELETE_ALT_FUND_NAME,
                payload: res.data
            });
            dispatch(createSuccess(`Alt fund name successfully deleted`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Alt name failed to delete"))
        });

}

export const addAltFundName = fundID => {
    return {
        type: ADD_ALT_FUND_NAME,
        payload: fundID
    }
}

export const addChildOwnership = entity => {
    return {
        type: ADD_CHILD_OWNERSHIP,
        payload: entity
    }
}


export const toggleOwnershipsLoading = isLoading => {
    return {
        type: TOGGLE_OWNERSHIPS_LOADING,
        payload: isLoading,
    }
}


export const setEntityOptions = (key, optionsArray) => {
    return {
        type: SET_ENTITY_OPTIONS,
        payload: { key, optionsArray }
    }
}



export const addNewFund = () => {
    return {
        type: ADD_NEW_FUND
    }
}


export const toggleFundLoading = isLoading => {
    return {
        type: TOGGLE_FUND_LOADING,
        payload: isLoading
    }
}









export const saveBlockerOwnership = blocker_ownership => (dispatch, getState) => {


    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/blocker-owners/`)
    const body = {
        blocker_ownership: blocker_ownership
    }

    axios
        .post(url, body, config)
        .then(res => {

            dispatch({
                type: SAVE_BLOCKER_OWNERSHIP,
                payload: res.data
            });
            dispatch(createSuccess(`Blocker ownership successfully saved`))

        })
        .catch(err => {
            console.log("ERR", err)
            dispatch(createError('Blocker ownership save failure'))
        });
}


export const deleteBlockerOwnership = ownershipID => (dispatch, getState) => {


    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/blocker-owners/${ownershipID}`)

    axios
        .delete(url, config)
        .then(res => {
            dispatch({
                type: DELETE_BLOCKER_OWNERSHIP,
                payload: res.data
            });
            dispatch(createSuccess(`Ownership successfully deleted`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Failed to delete ownership"))
        });
}


export const toggleBlockerLoading = isLoading => {
    return {
        type: TOGGLE_BLOCKER_LOADING,
        payload: isLoading
    }
}

export const setSelectedBlocker = blocker => {
    return {
        type: SET_SELECTED_BLOCKER,
        payload: blocker
    }
}


export const updateBlockerOwnershipInfo = (ownershipID, key, value) => {
    return {
        type: UPDATE_BLOCKER_OWNERSHIP_INFO,
        payload: { ownershipID, key, value }
    }
}


export const getBlockerOwners = (entityID = 1) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/blocker-owners/${entityID}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_BLOCKER_OWNERS,
                payload: res.data
            });
        })
        .catch(err => {
            console.error(err)
            dispatch(createError('Blocker owners failed to load'))
        });
}

export const addBlockerOwner = owned_entity => {
    return {
        type: ADD_BLOCKER_OWNER,
        payload: owned_entity
    }
}

export const selectOwnership = ownership => {
    return {
        type: SELECT_OWNERSHIP,
        payload: ownership
    }
}

export const saveOwnership = ownership => (dispatch, getState) => {


    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/entity-ownerships/`)
    const body = {
        ownership: ownership
    }

    axios
        .post(url, body, config)
        .then(res => {

            if (res.data.status === 'success') {
                dispatch(createSuccess('Ownership successfully saved'))
                dispatch({
                    type: SAVE_OWNERSHIP,
                    payload: res.data.entity_ownership,
                });

            } else if (res.data.status === 'fail') {
                dispatch(createError(`${res.data.message}`))
            }

        })
        .catch(err => {
            console.log("ERR", err)
            dispatch(createError('Ownership save failure'))
        });


}

export const deleteOwnership = ownershipID => (dispatch, getState) => {


    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/entity-ownerships/${ownershipID}`)

    axios
        .delete(url, config)
        .then(res => {
            dispatch({
                type: DELETE_OWNERSHIP,
                payload: res.data
            });
            dispatch(createSuccess(`Ownership successfully deleted`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Failed to delete ownership"))
        });
}


export const getEntityOwnerships = (entityID = 1) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/entity-ownerships/${entityID}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch(createError('Entity ownerships successfully loaded'))
            dispatch({
                type: GET_ENTITY_OWNERSHIPS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(createError('Entity ownerships failed to load'))
            console.error(err)
        });
}


export const addNewOwnership = () => {
    return {
        type: ADD_NEW_OWNERSHIP,
    }
}


export const changeOwnershipInfo = (ownershipID, key, value) => {
    return {
        type: CHANGE_OWNERSHIP_INFO,
        payload: { ownershipID, key, value }
    }
}


export const changeSelectedFund = fund => {
    return {
        type: CHANGE_SELECTED_FUND,
        payload: fund
    }
}






export const addFund = fund => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/funds/`)
    const body = {
        fund: fund,
        method: "ADD"
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch(createSuccess('Fund Successfully Added'))
            dispatch({
                type: ADD_FUND,
                payload: res.data,
            });
            dispatch({
                type: UPDATE_APP_VIEW,
                payload: "Repository",
            });
        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError('Failed to Add Fund'))
        });

}