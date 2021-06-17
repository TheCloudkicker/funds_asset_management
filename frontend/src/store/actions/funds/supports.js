import { GET_SUPPORT_DATA } from '../types'

import axios from 'axios'
import { devPrefixes, authConfig } from '../common'
import { createSuccess, createError } from '../alerts'

export const getSupportData = (supportID, calledBy) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/data/?supportID=${supportID}`)

    axios
        .get(url, config)
        .then(async res => {

            let data = await JSON.parse(res.data.data)

            dispatch({
                type: GET_SUPPORT_DATA,
                payload: { id: res.data.id, data: data, calledBy }
            });

        })
        .catch(err => {
            console.error(err)
            dispatch(createError('Support data failed to load'))
        });
}