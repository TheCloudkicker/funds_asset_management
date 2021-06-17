import axios from 'axios'
import { devPrefixes, authConfig } from '../common'
import { createError, createSuccess } from '../alerts'
import {
    determineFund, determineFundByAlias, checkReportTypeByFileName,
    proccessXlsWithWebWorker, determineAsofDate, checkFileExtension,
    parseTextFile
} from './utils'
import { v4 as uuidv4 } from 'uuid';

import {
    UPDATE_UPLOADS, SAVE_FILE,

    ADD_FILE, UPDATE_FILE, REMOVE_FILE, ACCEPT_FILE, UPDATE_FILE_BY_ID,




    UPDATE_FILE_OBJECT, ADD_FILES, UPLOAD_IN_PROCESS,
    DELETE_ALL_FILES, UPDATE_FILE_STATUS,
    SELECT_FILE, DELETE_FILE, ACCEPT_DUPLICATE_FILE, SAVE_FUND_SUPPORT
} from '../types.js';



export const updateUploads = (dispatch, uploads, tableIndex, fileIndex, key, value) => {


    if (key === 'isOpen') {

        uploads.fileTables[tableIndex][key] = value

    } else if (key === 'delete') {

        uploads.fileTables[tableIndex].files.splice(fileIndex, 1)

    } else if (key === 'fund') {

        uploads.fileTables[tableIndex].files[fileIndex].fund = { ...value, label: value.text }

    } else if (key === 'period') {

        uploads.fileTables[tableIndex].files[fileIndex].period = { ...value, label: value.text }

    } else if (key === 'report') {

        uploads.fileTables[tableIndex].files[fileIndex].report = { ...value, label: value.text }

    }





    dispatch({
        type: UPDATE_UPLOADS,
        payload: uploads
    })
}






export const updateFileObject = (type, id, uploadedFile) => {
    return {
        type: UPDATE_FILE_OBJECT,
        payload: { type, id, uploadedFile }
    }
}
export const addFile = (file, tableIndex) => {
    return {
        type: ADD_FILE,
        payload: { file, tableIndex }
    }
}

export const processFile = (fileObj, funds, reports, aliases, dispatch) => {

    return new Promise(async (resolve, reject) => {

        let uploadedFile = {
            id: uuidv4(),
            fileObj: fileObj,
            checked: false,

            status: null,
            fund: null,
            period: { value: 1, label: '12-31-2019' },
            report: null,
            docType: null,

            errors: [],

            extension: null,
            aliasesFound: [],

            hasData: true,
            dataPending: false,

            meta: {},
            aliases: [],
            totals: {},
            data: {
                headers: [],
                items: []
            },

        }


        //GET FILE EXTENSION
        uploadedFile['extension'] = checkFileExtension(uploadedFile.fileObj.name)

        if (uploadedFile['extension'] === null) {
            uploadedFile['status'] = "FAIL"
            resolve(uploadedFile)
        }

        uploadedFile['fund'] = determineFund(funds, uploadedFile)
        uploadedFile['report'] = checkReportTypeByFileName(uploadedFile, reports)

        let asOfDate = determineAsofDate(uploadedFile.fileObj.name)

        if (asOfDate) {
            uploadedFile['meta']['asOfDate'] = { original: asOfDate, current: asOfDate }
        }

        if (uploadedFile['extension'] === 'XLSX' || uploadedFile['extension'] === 'XLS') {
            uploadedFile['dataPending'] = true
            proccessXlsWithWebWorker(uploadedFile, reports, aliases, dispatch)
            uploadedFile['status'] = "PROCESSING"
            resolve(uploadedFile)

        } else if (uploadedFile['extension'] === 'TEXT') {
            let obj = await parseTextFile(uploadedFile)
            uploadedFile['data'] = obj['data']
            uploadedFile['meta'] = obj['meta']

            if (uploadedFile['fund'] && uploadedFile['period'] && uploadedFile['report']) {
                uploadedFile['status'] = "SUCCESS"
                resolve(uploadedFile)
            } else {
                uploadedFile['status'] = "NEED INFO"
                resolve(uploadedFile)
            }
        }

    })

}


export const proccessFiles = filesArray => async (dispatch, getState) => {

    const { funds, aliases } = getState().funds
    const { reports } = getState().database.databaseObj.Funds

    for (var i = 0; i < filesArray.length; i++) {

        await processFile(filesArray[i], funds, reports, aliases, dispatch)
            .then(fileObject => {

                switch (fileObject['status']) {
                    case 'SUCCESS':
                        dispatch(addFile(fileObject, 0))
                        return
                    case 'PROCESSING':
                    case 'NEED INFO':
                        dispatch(addFile(fileObject, 3))
                        return
                    case 'FAIL':
                        dispatch(addFile(fileObject, 4))
                        return
                    default:
                        dispatch(addFile(fileObject, 4))
                        return

                }
            })
            .catch(err => {
                dispatch(createError('Initial file processing failed'))
            })
    }
}

export const saveFile = (fileType, fileObj, uploadedBy) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/upload/`)

    let formdata = new FormData();
    formdata.append('uploadedfile', fileObj['fileObj'])
    formdata.append('fileExtension', fileObj['fileExtension'])
    formdata.append('fileType', fileType)
    formdata.append('fundID', fileObj['fund']['value'])
    formdata.append('periodID', fileObj['period']['value'])
    formdata.append('reportID', fileObj['report']['value'])
    formdata.append('docType', fileObj['docType'])
    formdata.append('uuid', fileObj['id'])
    formdata.append('uploadedBy', uploadedBy)
    formdata.append('hasData', fileObj['hasData'])
    formdata.append('meta', JSON.stringify(fileObj['meta']))
    formdata.append('fileData', JSON.stringify(fileObj['data']))
    formdata.append('totals', JSON.stringify(fileObj['totals']))



    axios
        .post(url, formdata, config)
        .then(res => {
            dispatch({
                type: SAVE_FILE,
                payload: res.data,
            });
            dispatch(createSuccess(`File Successfully uploaded`))

        })
        .catch(err => {
            console.error("ERR", err)
            dispatch(createError(`Failed to upload file`))
        });
}



export const acceptFile = (type, index) => {
    return {
        type: ACCEPT_FILE,
        payload: { type, index }
    }
}

export const removeFile = (type, index) => {
    return {
        type: REMOVE_FILE,
        payload: { type, index }
    }
}

export const updateFile = (type, index, key, value) => {
    return {
        type: UPDATE_FILE,
        payload: { type, index, key, value }
    }
}

export const updateFileById = (type, id, key, value) => {
    return {
        type: UPDATE_FILE_BY_ID,
        payload: { type, id, key, value }
    }
}



export const selectFile = (type, index) => {
    return {
        type: SELECT_FILE,
        payload: { type, index }
    }
}
export const updateFileStatus = (type, id, status) => {
    return {
        type: UPDATE_FILE_STATUS,
        payload: { type, id, status }
    }
}


export const toggleUploadInProgress = inProgess => {
    return {
        type: UPLOAD_IN_PROCESS,
        payload: inProgess
    }
}

export const acceptDuplicateFile = (fileID, type) => {
    return {
        type: ACCEPT_DUPLICATE_FILE,
        payload: { fileID, type }
    }
}

export const deleteFile = (fileID, type) => {
    return {
        type: DELETE_FILE,
        payload: { fileID, type }
    }
}


export const deleteAllFiles = () => {
    return {
        type: DELETE_ALL_FILES,
    }
}

export const addFiles = filesArr => {
    return {
        type: ADD_FILES,
        payload: filesArr
    }
}

