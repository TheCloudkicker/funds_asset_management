import {
    GET_CARRY, UPDATE_CARRY_SECTION, UPDATE_CARRY_COMPARE, SAVE_CARRY,

    UPDATE_CARRY_DETAIL, SAVE_CLIENT_DETAIL, UPDATE_CARRY_CALC, SAVE_CLIENT_VALUE,
    SAVE_PARAMETER, SET_CARRY_LOADING
} from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createSuccess, createError } from './alerts'
import uuidv4 from 'uuid/v4'

export const setCarryLoading = isLoading => {
    return {
        type: SET_CARRY_LOADING,
        payload: isLoading
    }
}

export const getCarry = (fundID, yearID) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/carry-calc/?fundID=${fundID}&yearID=${yearID}`)

    axios
        .get(url, config)
        .then(res => {
            console.log('getCarry', res.data)
            dispatch({
                type: GET_CARRY,
                payload: res.data
            });
        })
        .catch(err => {
            console.error(err)
            dispatch(createError(`Carry calc failed to load`))
        });
}


export const saveClientValue = (clientValue, method = 'UPDATE') => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/client-value/`)
    const profile = getState().user.currentUser.displayName
    const fundID = getState().funds.selectedFund.value

    const body = {
        clientValue,
        method,
        fundID,
        profile,
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch(createSuccess("Client value successfully saved"))
            dispatch({
                type: SAVE_CLIENT_VALUE,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(createError("Client Value failed to save"))
        });
}


export const saveCarryDetail = (key, year, value, isLegacy, actType = null) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/detail/`)

    const profile = getState().user.currentUser.displayName
    const fundID = getState().funds.selectedFund.value

    const body = {
        year,
        key,
        value,
        isLegacy,
        fundID,
        profile,
        actType
    }

    axios
        .post(url, body, config)
        .then(res => {
            console.log("res", res)
            dispatch(createSuccess("Client value successfully saved"))
            dispatch({
                type: SAVE_CLIENT_DETAIL,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(createError("Client Value failed to save"))
        });
}
export const saveParameter = (key, index, value, actType = null) => (dispatch, getState) => {


    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/params/`)

    const profile = getState().user.currentUser.displayName
    const fundID = getState().funds.selectedFund.value
    const periodID = getState().periods.selectedPeriod.value

    const body = {
        index,
        key,
        value,
        actType,
        fundID,
        periodID,
        profile,
    }

    axios
        .post(url, body, config)
        .then(res => {
            console.log("res", res)
            dispatch({
                type: SAVE_PARAMETER,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(createError("Failed to save"))
        });
}


export const checkForUnsaved = obj => {

    obj.unsaved_changes = !(obj.previous === obj.current)

}


export const updateCarryDetail = (dispatch, carry, indexArray, key, value) => {

    const { supportDetails } = carry


    if (key === 'isOpen') {

        // console.log("isOpen", supportDetails, indexArray, key, value)

        if (indexArray[5] === 'general') {

            supportDetails[indexArray[0]].years[indexArray[1]][key] = value

        } else if (indexArray[5] === 'activity_types') {

            console.log("ACTIVITY TYPES IS OPEN", indexArray)
            if (indexArray[1] === null) {
                supportDetails[indexArray[0]][indexArray[5]][indexArray[4]][key] = value

            } else {
                supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]][key] = value
            }

        } else if (indexArray[5] === 'legacy_years' || indexArray[5] === 'current_blockers') {

            if (indexArray[1] === null) {

                supportDetails[indexArray[0]][indexArray[5]][indexArray[4]][key] = value

            } else {
                console.log("HERE")
                supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]][key] = value
            }

        }

    } else if (key === 'include') {

        if (indexArray[5] === 'general') {

            supportDetails[indexArray[0]].years[indexArray[1]].accounts[indexArray[2]].include = value


            dispatch(saveParameter(supportDetails[indexArray[0]].name, indexArray[2], value))

            supportDetails[indexArray[0]].years[indexArray[1]].total.current = sumArrayAcctArray(supportDetails[indexArray[0]].years[indexArray[1]].accounts)
            let total = sumArray(supportDetails[indexArray[0]].years)
            supportDetails[indexArray[0]].total = total
            updateCarryCalc(carry, supportDetails[indexArray[0]].name, total, dispatch)

        } else if (indexArray[5] === 'activity_types') {

            supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].accounts[indexArray[2]].include = value

            let actType = supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].value

            dispatch(saveParameter(supportDetails[indexArray[0]].name, indexArray[2], value, actType))

            supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total.current = sumArrayAcctArray(supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].accounts)
            supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].total.current = sumArray(supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years)
            let total = sumArray(supportDetails[indexArray[0]][indexArray[5]])
            supportDetails[indexArray[0]].total = total
            updateCarryCalc(carry, supportDetails[indexArray[0]].name, total, dispatch)

        } else if (indexArray[5] === 'current_blockers') {

            console.log('current_blockers INCLUDE', indexArray, key, value)

            supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].accounts[indexArray[2]].include = value

            let actType = `blocker_${supportDetails[indexArray[0]]['current_blockers'][indexArray[4]].id}`

            dispatch(saveParameter(supportDetails[indexArray[0]].name, indexArray[2], value, actType))

            supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total.current = sumArrayAcctArray(supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].accounts)
            supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].total.current = sumArray(supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years)

            let current_total = sumArray(supportDetails[indexArray[0]][indexArray[5]])
            let legacy_total = sumArray(supportDetails[4]['legacy_years'])
            let total = current_total + legacy_total
            supportDetails[indexArray[0]].total = total
            updateCarryCalc(carry, supportDetails[indexArray[0]].name, total, dispatch)
            console.log('total', supportDetails[indexArray[0]])
        }

    } else if (key === 'readOnly') {

        if (indexArray[5] === 'general') {

            supportDetails[indexArray[0]].years[indexArray[1]].total.readOnly = value

            if (value === true && supportDetails[indexArray[0]].years[indexArray[1]].total.unsaved_changes) {
                console.log("UPDAING ON SERVER")
                dispatch(saveCarryDetail(supportDetails[indexArray[0]].name, supportDetails[indexArray[0]].years[indexArray[1]].year, supportDetails[indexArray[0]].years[indexArray[1]].total, true))
            }

        } else if (indexArray[5] === 'activity_types') {

            supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total.readOnly = value
            if (value === true && supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total.unsaved_changes) {

                let actType = supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].value
                let name = supportDetails[indexArray[0]].name

                dispatch(saveCarryDetail(name, supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].year, supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total, true, actType))
                console.log("UPDAING INVESTMENT ON SERVER")
            }


        } else if (indexArray[5] === 'legacy_years') {

            supportDetails[indexArray[0]][indexArray[5]][indexArray[1]].total.readOnly = value
            if (value === true && supportDetails[indexArray[0]][indexArray[5]][indexArray[1]].total.unsaved_changes) {
                dispatch(saveCarryDetail('blockers', supportDetails[indexArray[0]][indexArray[5]][indexArray[1]].year, supportDetails[indexArray[0]][indexArray[5]][indexArray[1]].total, true))
                console.log("UPDAING BLOCKER ON SERVER")
            }

        }

    } else if (key === 'total') {

        if (indexArray[5] === 'general') {

            //CHECK IF NUMBER

            if (isNaN(value)) {
                supportDetails[indexArray[0]].years[indexArray[1]].total.isError = true
            } else {
                supportDetails[indexArray[0]].years[indexArray[1]].total.current = value

                checkForUnsaved(supportDetails[indexArray[0]].years[indexArray[1]].total)

                let total = sumArray(supportDetails[indexArray[0]].years)

                supportDetails[indexArray[0]].total = total
                supportDetails[indexArray[0]].years[indexArray[1]].total.isError = checkValue(supportDetails[indexArray[0]].years[indexArray[1]].total)


                if (supportDetails[indexArray[0]].name === 'htd_carry') {
                    updateCarryCalc(carry, supportDetails[indexArray[0]].name, total, dispatch, 'allocation')
                } else {
                    updateCarryCalc(carry, supportDetails[indexArray[0]].name, total, dispatch)
                }

            }


        } else if (indexArray[5] === 'activity_types') {

            if (isNaN(value)) {
                supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total.isError = true
            } else {
                supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total.current = value
                checkForUnsaved(supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total)
                supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].total.current = sumArray(supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years)

                let total = sumArray(supportDetails[indexArray[0]][indexArray[5]])
                supportDetails[indexArray[0]].total = total
                updateCarryCalc(carry, supportDetails[indexArray[0]].name, total, dispatch)

                supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total.isError = checkValue(supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].total)
            }

        } else if (indexArray[5] === 'legacy_years' || indexArray[5] === 'current_blockers') {

            console.log("Blockers", supportDetails[indexArray[0]][indexArray[5]])

            if (isNaN(value)) {
                supportDetails[indexArray[0]][indexArray[5]][indexArray[1]].total.isError = true
            } else {

                supportDetails[indexArray[0]][indexArray[5]][indexArray[1]].total.current = value
                checkForUnsaved(supportDetails[indexArray[0]][indexArray[5]][indexArray[1]].total)
                let legacy_tot = sumArray(supportDetails[indexArray[0]].legacy_years)
                let curr_tot = sumArray(supportDetails[indexArray[0]].current_blockers)
                let total = legacy_tot + curr_tot
                supportDetails[indexArray[0]].total = total

                updateCarryCalc(carry, supportDetails[indexArray[0]].name, total, dispatch)

            }
        }
    }


    dispatch({
        type: UPDATE_CARRY_DETAIL,
        payload: supportDetails
    })
}

// else if (key === 'editable') {

//     if (indexArray[5] === 'general') {

//         console.log('gen', indexArray)

//         if (indexArray[2] === null) {

//             //THEN LEGACY AMOUNT
//             supportDetails[indexArray[0]].years[indexArray[1]].total.readOnly = value

//         } else {
//             supportDetails[indexArray[0]].years[indexArray[1]].accounts[indexArray[2]].readOnly = value
//         }



//         if (value === false) {

//             console.log("UDPATE ON SERVER")

//         }



//     } else if (indexArray[5] === 'activity_types') {

//         console.log("EDITABLE ", indexArray)

//         supportDetails[indexArray[0]][indexArray[5]][indexArray[4]].years[indexArray[1]].accounts[indexArray[2]].editable = value


//     }



// }

export const updateCarryCompare = (dispatch, carry, materiality, key, value) => {


    console.log('key', key, value)


    if (key === 'isReadOnly') {

        console.log('isReadOnly')

        if (carry.clientValue.unsaved_changes) dispatch(saveClientValue(carry.clientValue))

        carry.isReadOnly = value
        carry.clientValue.readOnly = value


    } else if (key === 'clientValue') {

        const { clientValue } = carry

        if (isNaN(value)) {
            clientValue.isError = true
            dispatch(createError('Must enter number'))
        } else {

            clientValue.current = parseFloat(value)
            clientValue.unsaved_changes = !(clientValue.current === clientValue.previous)

            if (clientValue.isError) clientValue.isError = false

            let index = carry.sections.allocation.rows.findIndex(r => r.key === 'cy_carry')

            if (index > -1) {
                if (value === '-') {
                    carry.difference = 0
                } else {
                    carry.difference = carry.sections.allocation.rows[index].value.current * (carry.carryDict['lpPercent'] / 100) - value
                }
            }

            if (Math.abs(carry.difference) < materiality.deminimis_amount) {
                carry.conclusion = 'Difference is below SUM'
            } else {
                carry.conclusion = 'Difference exceeds SUM'
            }
        }
        carry.clientValue = clientValue
    }

    dispatch({
        type: UPDATE_CARRY_COMPARE,
        payload: carry
    })

}



const sumArray = array => {
    let total = 0
    for (var k = 0; k < array.length; k++) {
        total += parseFloat(array[k].total.current)
    }
    return total
}

const sumArrayAcctArray = array => {
    let total = 0
    for (var k = 0; k < array.length; k++) {

        if (array[k].include === true) {
            total += parseFloat(array[k].balance)
        }
    }
    return total
}

const checkValue = value => {


    if (value.isError) {
        return false
    } else {
        return false
    }
}

// export const updateCarryCalc = (section, subSection, indexes, accountIndex, key, value) => {
//     return {
//         type: UPDATE_CARRY_CALC,
//         payload: { section, subSection, indexes, accountIndex, key, value }
//     }
// }


export const updateCarrySection = (key, value) => {

    return {
        type: UPDATE_CARRY_SECTION,
        payload: { key, value }
    }
}

const updateCarryCalc = (carry, key, total, dispatch, sectionName = 'investment') => {

    console.log('update carry calc', key, total)
    const section = carry.sections[sectionName]
    let sectionTotal = 0

    for (var i = 0; i < section.rows.length; i++) {

        if (section.rows[i].calcType.action === 'detail') {

            if (section.rows[i].key === key) {
                section.rows[i].value.current = total
                sectionTotal += total
            } else {
                sectionTotal += section.rows[i].value.current
            }

        }

    }

    if (sectionName === 'investment') {
        section.rows[section.rows.findIndex(r => r.key === 'net_inv_flows')].value.current = sectionTotal

        section.rows[section.rows.findIndex(r => r.key === 'flows_calc')].value.current = sectionTotal * 0.1
    }



    dispatch(updateCarrySection(sectionName, section))
}



export const calculateInvestorAmounts = (capital, investor, dispatch) => {
    investor.rows[investor.rows.findIndex(r => r.key === 'contributions')].value.current = capital.totalContributions
    investor.rows[investor.rows.findIndex(r => r.key === 'distributions')].value.current = capital.totalDistributions
    investor.rows[investor.rows.findIndex(r => r.key === 'preferred')].value.current = capital.totalPreferred
    investor.rows[investor.rows.findIndex(r => r.key === 'pro_rata_before_carry')].value.current = capital.totalContributions + capital.totalPreferred - capital.totalDistributions
    dispatch(updateCarrySection('investor', investor))
}

export const initAllocations = (carry, materiality, dispatch) => {

    const { allocation } = carry.sections
    let pro_rata_before_carry = carry.sections.investor.rows[carry.sections.investor.rows.findIndex(r => r.key === 'pro_rata_before_carry')].value.current

    let net_investment_flows = carry.sections.investment.rows[carry.sections.investment.rows.findIndex(r => r.key === 'flows_calc')].value.current

    allocation.rows[allocation.rows.findIndex(r => r.key === 'materiality')].value.current = materiality.net_assets

    allocation.rows[allocation.rows.findIndex(r => r.key === 'dist_pro_rata')].value.current = pro_rata_before_carry

    let max_distributable = materiality.net_assets - pro_rata_before_carry

    allocation.rows[allocation.rows.findIndex(r => r.key === 'max_distributable')].value.current = max_distributable

    let total_allocable_carry = 0

    if (net_investment_flows < pro_rata_before_carry) {
        total_allocable_carry = net_investment_flows
    } else {
        total_allocable_carry = pro_rata_before_carry
    }

    allocation.rows[allocation.rows.findIndex(r => r.key === 'total_allocable_carry')].value.current = total_allocable_carry

    let ind = carry.supportDetails.findIndex(r => r.name === 'htd_carry')

    if (ind > -1) {

        allocation.rows[allocation.rows.findIndex(r => r.key === 'htd_carry')].value.current = carry.supportDetails[ind].total
        allocation.rows[allocation.rows.findIndex(r => r.key === 'cy_carry')].value.current = total_allocable_carry - carry.supportDetails[ind].total
    }






    dispatch(updateCarrySection('allocation', allocation))
}

export const initInvestments = (carry, dispatch) => {

    let key, calcType, payload = null
    let details = null
    let invTotal = 0
    let total = 0
    let carryRate = (20 / 100)
    let index

    const { investment } = carry.sections

    for (var k = 0; k < investment.rows.length; k++) {

        calcType = investment.rows[k].calcType
        key = investment.rows[k].key



        if (calcType['action'] === 'detail') {

            index = carry.supportDetails.findIndex(s => s.name === key)

            if (index !== -1) {

                total = carry.supportDetails[index]['total']
                invTotal += total
                investment.rows[k].value.current = total
                investment.rows[k].value.previous = total
            }


        } else if (calcType['action'] === 'mult') {

            payload = calcType['payload']

            investment.rows[k].value.current = invTotal * 0.1

        } else {

            if (key === 'net_inv_flows') {
                investment.rows[k].value.current = invTotal
            }
        }

    }



    dispatch(updateCarrySection('investment', investment))
}

