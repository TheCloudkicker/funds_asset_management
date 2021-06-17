import {
    GET_PROFILES, SET_SELECTED_PROFILE
} from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'
import uuidv4 from 'uuid/v4'

export const setSelectedProfile = profile => {
    return {
        type: SET_SELECTED_PROFILE,
        payload: profile
    }
}


export const getProfiles = () => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/accounts/api/profiles`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            });
        })
        .catch(err => {

            dispatch(createError('Profiles failed to Load'))
            console.error(err)
        });

}
