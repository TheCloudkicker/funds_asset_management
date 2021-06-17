import { GET_CAPITAL, UPDATE_CAPITAL, SAVE_CAPITAL, DELETE_CAPITAL, ADD_CAPITAL_MOVEMENT } from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createSuccess, createError } from './alerts'
import uuidv4 from 'uuid/v4'

export const getCapital = fundID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/capital/?fundID=${fundID}`)

    axios
        .get(url, config)
        .then(res => {

            const { movements, prefRate } = res.data
            movements.forEach(movement => {
                movement.preferred = calcPref2(movement, prefRate)
            })

            return { movements, prefRate, ...calcTotals2(movements) }

        }).then(data => {
            dispatch({
                type: GET_CAPITAL,
                payload: data
            });
        })
        .catch(err => {
            console.log("ERR")
            dispatch(createError('Failed to load capital'))
        });
}

export const addCapitalMovement = () => {
    return {
        type: ADD_CAPITAL_MOVEMENT,
        payload: null
    }
}

export const saveCapital = (movement, method) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/capital/`)
    const profile = getState().user.currentUser.displayName
    const fundID = getState().funds.selectedFund.value
    const prefRate = getState().capital.prefRate

    const body = {
        movement,
        method,
        fundID,
        profile,
    }

    axios
        .post(url, body, config)
        .then(res => {
            const { movement, method } = res.data
            movement.preferred = calcPref2(movement, prefRate)
            return { movement, method }

        }).then(data => {
            dispatch({
                type: SAVE_CAPITAL,
                payload: data,
            });
        })
        .catch(err => {
            dispatch(createError("Failed to add fund criteria"))
        });
}

export const deleteCapital = movementID => (dispatch, getState) => {

    if (isNaN(movementID)) {
        dispatch({
            type: DELETE_CAPITAL,
            payload: movementID,
        })
        return
    }

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/capital/`)
    const profile = getState().user.currentUser.displayName
    const fundID = getState().funds.selectedFund.value

    const body = {
        movementID,
        method: "DELETE_CAPITAL",
        fundID,
        profile,
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: DELETE_CAPITAL,
                payload: res.data,
            });
            dispatch(createSuccess(`Capital movement deleted`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Capital failed to delete"))
        });
}

const checkForUnsaved = obj => {

    console.log('Checking For Unsaved')

    return (
        obj.totalAmount.unsaved_changes === true ||
        obj.movementType.unsaved_changes === true ||
        obj.movementDate.unsaved_changes === true
    )
}

const checkVal = val => {
    return val.current !== val.previous
}


export const updateCapital2 = (capital, index, key, value, dispatch) => {

    if (key === 'readOnly') {

        if (value === true) {

            if (checkForUnsaved(capital.capitalMovements[index])) {
                dispatch(saveCapital(capital.capitalMovements[index], 'SAVE_CAPITAL_MOVEMENT'))
            }

        }

        toggleEdit(capital.capitalMovements[index], value)

        dispatch({
            type: UPDATE_CAPITAL,
            payload: capital
        })
        return

    } else if (key === 'isReadonly') {

        capital.capitalMovements.forEach(obj => {
            if (checkForUnsaved(obj)) dispatch(saveCapital(obj, 'SAVE_CAPITAL_MOVEMENT'))
        })

        capital.capitalMovements.forEach(obj => toggleEdit(obj, value))
        capital.isReadonly = value



        dispatch({
            type: UPDATE_CAPITAL,
            payload: capital
        })
        return

    } else if (key === 'view') {
        return
    }



    if (key === 'totalAmount') {

        if (!isNaN(value)) {
            capital.capitalMovements[index][key].current = parseFloat(value)
            capital.capitalMovements[index][key].unsaved_changes = checkVal(capital.capitalMovements[index][key])
            if (capital.capitalMovements[index][key].isError) capital.capitalMovements[index][key].isError = false
        } else {
            capital.capitalMovements[index][key].isError = true
            dispatch(createError('Must be value number'))
        }
    } else if (key === 'movementType') {

        capital.capitalMovements[index][key].current = value
        capital.capitalMovements[index][key].unsaved_changes = checkVal(capital.capitalMovements[index][key])

    } else if (key === 'movementDate') {

        capital.capitalMovements[index][key].current = value
        capital.capitalMovements[index][key].unsaved_changes = checkVal(capital.capitalMovements[index][key])

    }

    if (shouldCalcPref(capital.capitalMovements[index])) {
        capital.capitalMovements[index].preferred = calcPref2(capital.capitalMovements[index], 8)
        const { totalContributions, totalDistributions, totalPreferred } = calcTotals2(capital.capitalMovements)
        capital.totalContributions = totalContributions
        capital.totalDistributions = totalDistributions
        capital.totalPreferred = totalPreferred
    }
    dispatch({
        type: UPDATE_CAPITAL,
        payload: capital
    })
}


export const calcPref2 = (movement, prefRate) => {

    console.log('base', base, prefRate)

    if (movement.totalAmount.current == 0) return 0

    const movementDate = new Date(`${movement.movementDate.current} 23:59:59`)
    const asOfDate = new Date('December 31, 2019 23:59:59')

    var Diff_In_Time = asOfDate.getTime() - movementDate.getTime()

    var Diff_In_Days = (Diff_In_Time / (1000 * 3600 * 24) + 1);
    var percent = Diff_In_Days / 366

    var base = 1 + (prefRate / 100)

    var _rate = Math.pow(base, percent)
    var rate = _rate - 1

    var pref = rate * movement.totalAmount.current
    if (movement.movementType.current === 'Distribution') pref = pref * -1

    return pref
}
export const calcTotals2 = movements => {

    let totalContributions = 0
    let totalDistributions = 0
    let totalPreferred = 0

    for (var i = 0; i < movements.length; i++) {

        if (movements[i].movementType.current && movements[i].movementType.current === 'Contribution') {
            totalContributions += movements[i].totalAmount.current
        } else if (movements[i].movementType.current && movements[i].movementType.current === 'Distribution') {
            totalDistributions += movements[i].totalAmount.current
        }
        totalPreferred += movements[i].preferred
    }

    return { totalContributions, totalDistributions, totalPreferred }

}

const shouldCalcPref = movement => {
    return movement.movementDate.current !== '' && movement.movementType.current !== ''
}

const toggleEdit = (obj, value) => {
    obj.readOnly = value
    obj.movementType.readOnly = value
    obj.totalAmount.readOnly = value
    obj.movementDate.readOnly = value
}

const isUnsaved = obj => {
    return obj.current === obj.previous
}
