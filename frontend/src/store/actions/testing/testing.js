import axios from 'axios'
import { devPrefixes, authConfig } from '../common'
import { createError, createSuccess } from '../alerts'
import uuidv4 from 'uuid/v4'

import {
    SET_TESTING_VIEW, GET_TESTING_OVERVIEW,
    GET_QUESTIONAIRE, UPDATE_QUESTIONAIRE,
    GET_CARRY_SETTINGS, GET_TESTING_SUMMARY,
    DELETE_CARRY_OTHER_ATTACH, ADD_CARRY_OTHER_ATTACH, UPDATE_TESTING_AREAS,

} from '../../actions/types.js';

export const updateTestingAreas = (testingAreas, index, key, value) => {

    if (key === 'isOpen') {
        testingAreas[index].isOpen = value
    }
    return {
        type: UPDATE_TESTING_AREAS,
        payload: testingAreas
    }
}

export const setTestingView = section => {
    return {
        type: SET_TESTING_VIEW,
        payload: section
    }
}





export const addCarryOtherAttach = (yearIndex) => {
    return {
        type: ADD_CARRY_OTHER_ATTACH,
        payload: yearIndex
    }
}

export const deleteCarryOtherAttach = (yearIndex, attachementId) => {
    return {
        type: DELETE_CARRY_OTHER_ATTACH,
        payload: { yearIndex, attachementId }
    }
}

const setByBlocker = years => {

    let index;
    let blockers = []
    let blocker_years = []

    console.log('Beginning', years)

    for (var i = 0; i < years.length; i++) {

        for (var j = 0; j < years[i].blockers.length; j++) {

            let year = {
                'id': years[i].id,
                'name': years[i].name,
                'isOpen': false,
                'total': years[i].blockers[j].total,
                'allocated_total': years[i].blockers[j].allocated_total,
                'source': years[i].blockers[j].source,
                'accounts': years[i].blockers[j].accounts,
            }

            if (!blockers.includes(years[i].blockers[j].name)) {



                let blocker = {
                    'id': years[i].blockers[j].name,
                    'isOpen': false,
                    'gross_percent': years[i].blockers[j].gross_percent,
                    'name': years[i].blockers[j].name,
                    'total': years[i].blockers[j].total,
                    'years': [year,]
                }

                blocker_years.push(blocker)
                blockers.push(years[i].blockers[j].name)

            } else {
                index = blocker_years.findIndex(y => y.id === years[i].blockers[j].name)
                blocker_years[index].years.push(year)
            }
        }
    }

    console.log('End', blocker_years)

    return blocker_years
}

const setByYear = blockers => {

    let index;
    let years = []
    let blocker_years = []

    for (var i = 0; i < blockers.length; i++) {

        for (var j = 0; j < blockers[i].years.length; j++) {

            let blocker = {
                'id': blockers[i].id,
                'name': blockers[i].name,
                'gross_percent': blockers[i].gross_percent,
                'isOpen': false,
                'total': blockers[i].total,
                'source': blockers[i].years[j].source,
                'accounts': blockers[i].years[j].accounts,
            }

            if (!years.includes(blockers[i].years[j].name)) {

                let year = {
                    'id': blockers[i].years[j].name,
                    'isOpen': false,
                    'name': blockers[i].years[j].name,
                    'total': blockers[i].years[j].total,
                    'blockers': [blocker,]
                }

                blocker_years.push(year)
                years.push(blockers[i].years[j].name)

            } else {
                index = blocker_years.findIndex(y => y.id === blockers[i].years[j].name)
                blocker_years[index].blockers.push(blocker)
            }
        }
    }
    return blocker_years
}





export const getTestingSummary = (area = 'testing', fundID = null) => (dispatch, getState) => {

    const config = authConfig(getState)
    let url = devPrefixes(`/api/fs/testing-summary/?area=${area}&fundID=${fundID}`)


    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_TESTING_SUMMARY,
                payload: res.data
            });
        })
        .catch(err => {

            dispatch(createError('Testing summary failed to Load'))
            console.error(err)
        });

}

export const getCarrySettings = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/testing/carry/settings/`)

    axios
        .get(url, config)
        .then(res => {
            console.log("GET_CARRY_SETTINGS", res)
            dispatch({
                type: GET_CARRY_SETTINGS,
                payload: res.data
            });
        })
        .catch(err => {

            dispatch(createError('Carry settings Failed to Load'))
            console.error(err)
        });

}




export const updateQuestionaire = (questionNo, key, value) => {
    return {
        type: UPDATE_QUESTIONAIRE,
        payload: { questionNo, key, value }
    }
}

export const getQuestionaire = fundID => (dispatch, getState) => {


    const config = authConfig(getState)
    const url = devPrefixes(`/api/testing/questionaire/${fundID}`)

    axios
        .get(url, config)
        .then(res => {
            console.log("questionaire", res)
            dispatch({
                type: GET_QUESTIONAIRE,
                payload: res.data
            });
        })
        .catch(err => {
            console.error(err)
            dispatch(createError(`Questionaire Failed to Load`))
        });
}

export const getTestingOverview = testingArea => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/fs/testing/?testingArea=${testingArea}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_TESTING_OVERVIEW,
                payload: res.data
            });
            dispatch(createSuccess(`Testing Overview Obtained`))
        })
        .catch(err => {
            console.error(err)
            dispatch(createError(`Testing Overview Failed to Load`))
        });
}