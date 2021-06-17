import {
    GET_REPOSITORY, DELETE_SUPPORT_ITEM, SAVE_REPOSITORY, TOGGLE_REPO_LOADING, UPDATE_REPOSITORY, ADD_SUPPORT
} from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'
import uuidv4 from 'uuid/v4'

export const addSupport = (dispatch, items, selectedIndex, reportIndex, displayName) => {

    var today = new Date();

    const support = {
        uuid: uuidv4(),
        fileName: '',
        attachment: '',
        dateCreated: today.toISOString().substring(0, 10),
        unsaved_data: true,
        uploadedBy: displayName,
        fileObj: ''

    }

    items[selectedIndex].reports[reportIndex].supports.push(support)

    dispatch({
        type: ADD_SUPPORT,
        payload: items
    })
}

export const toggleRepoLoading = isLoading => {
    return {
        type: TOGGLE_REPO_LOADING,
        payload: isLoading
    }
}


export const getRepository = repoType => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/repository/?repoType=${repoType}`)

    axios
        .get(url, config)
        .then(res => {
            dispatch({
                type: GET_REPOSITORY,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}

export const saveRepository = (currentUser, key, attachment) => (dispatch, getState) => {

    console.log("SAVING", attachment)

    //2. SEND TO SERVER
    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/repository/`)

    let formdata = new FormData();
    formdata.append('attachment', attachment['fileObj'])
    formdata.append('actionType', key)

    axios
        .post(url, formdata, config)
        .then(res => {

            dispatch({
                type: SAVE_REPOSITORY,
                payload: res.data,
            });

            dispatch(createSuccess(`Attachment successfully saved`))

        })
        .catch(err => {

            dispatch(createError("Attachment failed to save"))

        });

}
export const updateRepository = (dispatch, repository, indexes, key, value) => {


    if (key === 'sort') {

        if (repository.headers[indexes[0]].sorted === 'ascending') {
            repository.headers[indexes[0]].sorted = 'descending'
        } else if (repository.headers[indexes[0]].sorted === 'descending') {
            repository.headers[indexes[0]].sorted = 'ascending'
        }

    } else if (key === 'isOpen') {

        repository.items[indexes[1]].reports[indexes[2]].isOpen = value

    } else if (key === 'delete') {

        repository.items[indexes[1]].reports[indexes[2]].supports.splice(indexes[3], 1)

        if (repository.items[indexes[1]].reports[indexes[2]].supports.length === 0) {
            repository.items[indexes[1]].reports[indexes[2]].isOpen = false
        }

    } else if (key === 'attachment') {


        console.log('attachment', value)
        repository.items[indexes[1]].reports[indexes[2]].supports[indexes[3]].fileName = value.name
    }



    dispatch({
        type: UPDATE_REPOSITORY,
        payload: repository
    })
}





export const deleteSupportItem = supportID => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/upload/${supportID}`)


    axios
        .delete(url, config)
        .then(res => {
            console.log("res", res)
            dispatch({
                type: DELETE_SUPPORT_ITEM,
                payload: res.data,
            });
            dispatch(createSuccess(`Support successfully deleted`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError("Error deleting Support"))
        });

}





