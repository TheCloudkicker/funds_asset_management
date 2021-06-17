import {
    ADD_FILE, UPDATE_FILE, SELECT_FILE, REMOVE_FILE, ACCEPT_FILE, UPDATE_FILE_BY_ID,
    UPDATE_FILE_STATUS, DELETE_ALL_FILES, UPDATE_FILE_OBJECT, SAVE_FILE,
    UPDATE_UPLOADS,
} from '../actions/types.js';

const file = {
    id: 1,
    fileObj: null,
    checked: false,
    status: null,

    fund: null,
    period: { value: 1, label: '12-31-2019' },
    report: null,
    docType: null,

    errors: [],

    fileExtension: null,
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

const initialState = {
    selectedFile: null,

    fileTables: [
        { id: 'noErrorsFiles', title: 'Validated Files', files: [], status: 'NONE', isChecked: false, isOpen: false },
        { id: 'duplicateFiles', title: 'Duplicate Files', files: [], status: 'NONE', isChecked: false, isOpen: false },
        { id: 'updatedFiles', title: 'Updated Files', files: [], status: 'NONE', isChecked: false, isOpen: false },
        { id: 'needInfoFiles', title: 'Need Info', files: [], status: 'NONE', isChecked: false, isOpen: false },
        { id: 'errorFiles', title: 'Errors', files: [], status: 'NONE', isChecked: false, isOpen: false },

    ],
};

const isFileValid = fileObject => {
    if (fileObject.fund && fileObject.period && fileObject.report) {
        return true
    }
    return false
}



export default function (state = initialState, action) {

    switch (action.type) {
        case UPDATE_UPLOADS:


            return {
                ...state,
                fileTables: action.payload.fileTables
            }
        case SAVE_FILE:

            const filesCopyE = { ...state.uploadedFilesObj }
            let index3 = filesCopyE[action.payload.type].files.findIndex(f => f.id === action.payload.uuid)
            filesCopyE[action.payload.type].files.splice(index3, 1)

            if (filesCopyE[action.payload.type].files.length === 0) {
                filesCopyE[action.payload.type].isOpen = false
            }

            return {
                ...state,
                uploadedFilesObj: filesCopyE

            }
        case UPDATE_FILE_OBJECT:
            console.log('UPDATE_FILE_OBJECT', action.payload)
            const filesCopyD = { ...state.uploadedFilesObj }
            let index2 = filesCopyD[action.payload.type].files.findIndex(f => f.id === action.payload.id)
            filesCopyD[action.payload.type].files.splice(index2, 1)

            if (action.payload.type === 'needInfoFiles' && isFileValid(action.payload.uploadedFile)) {

                filesCopyD['noErrorsFiles'].files.push(action.payload.uploadedFile)

                if (filesCopyD['needInfoFiles'].files.length === 0) {
                    filesCopyD['needInfoFiles'].isOpen = false
                }

            } else {
                filesCopyD[action.payload.type].files.splice(index2, 0, action.payload.uploadedFile)
            }

            return {
                ...state,
                uploadedFilesObj: filesCopyD
            }

        case DELETE_ALL_FILES:
            return {
                ...state,
                uploadedFilesObj: {
                    noErrorsFiles: { files: [], overallStatus: 'SUCCESS', title: "Validated Files", isChecked: false, isOpen: false },
                    duplicateFiles: { files: [], overallStatus: 'FAIL', title: "DuplicateFiles", isChecked: false, isOpen: false },
                    updatedFiles: { files: [], overallStatus: 'FAIL', title: "Updated Files", isChecked: false, isOpen: false },
                    needInfoFiles: { files: [], overallStatus: 'FAIL', title: "Need Info", isChecked: false, isOpen: false },
                    errorFiles: { files: [], overallStatus: 'FAIL', title: "Errors", isChecked: false, isOpen: false },
                }
            }

        case UPDATE_FILE_STATUS:

            const filesCopyC = { ...state.uploadedFilesObj }
            let index1 = filesCopyC[action.payload.type].files.findIndex(f => f.id === action.payload.id)
            filesCopyC[action.payload.type].files[index1].status = action.payload.status

            return {
                ...state,
                uploadedFilesObj: filesCopyC
            }


        case ACCEPT_FILE:
            const filesCopyB = { ...state.uploadedFilesObj }

            if (!filesCopyB[action.payload.type].files[action.payload.index].fund) {
                filesCopyB[action.payload.type].files[action.payload.index].fundError = true
            } else {
                filesCopyB[action.payload.type].files[action.payload.index].fundError = false
            }

            if (!filesCopyB[action.payload.type].files[action.payload.index].period) {
                filesCopyB[action.payload.type].files[action.payload.index].periodError = true
            } else {
                filesCopyB[action.payload.type].files[action.payload.index].periodError = false
            }

            if (!filesCopyB[action.payload.type].files[action.payload.index].report) {
                filesCopyB[action.payload.type].files[action.payload.index].reportError = true
            } else {
                filesCopyB[action.payload.type].files[action.payload.index].reportError = false
            }

            if (!filesCopyB[action.payload.type].files[action.payload.index].fundError &&
                !filesCopyB[action.payload.type].files[action.payload.index].periodError &&
                !filesCopyB[action.payload.type].files[action.payload.index].reportError
            ) {
                let temp = filesCopyB[action.payload.type].files.splice(action.payload.index, 1)[0]
                filesCopyB["noErrorsFiles"].files.push(temp)

                if (filesCopyB[action.payload.type].files.length === 0) {
                    filesCopyB[action.payload.type].isOpen = false
                }

                return {
                    ...state,
                    selectedFile: null,
                    uploadedFilesObj: filesCopyB
                }

            }


            return {
                ...state,
                uploadedFilesObj: filesCopyB
            }
        case REMOVE_FILE:

            const filesCopyA = {
                ...state.uploadedFilesObj
            }
            filesCopyA[action.payload.type].files.splice(action.payload.index, 1)

            return {
                ...state,
                selectedFile: null,
                uploadedFilesObj: filesCopyA
            }
        case SELECT_FILE:
            if (state.selectedFile && action.payload.type && state.selectedFile.type === action.payload.type && state.selectedFile.index === action.payload.index) {
                return {
                    ...state,
                    selectedFile: null
                }
            }
            return {
                ...state,
                selectedFile: action.payload
            }
        case ADD_FILE:
            console.log('ADD_FILE', action.payload)

            const cpy = [...state.fileTables]
            cpy[action.payload.tableIndex].files.push(action.payload.file)

            return {
                ...state,
                fileTables: cpy
            }

        case UPDATE_FILE_BY_ID:

            const filesCopy3 = {
                ...state.uploadedFilesObj
            }
            let index = filesCopy3[action.payload.type].files.findIndex(f => f.id === action.payload.id)
            filesCopy3[action.payload.type].files[index][action.payload.key] = action.payload.value

            let isValid = isFileValid(filesCopy3[action.payload.type].files[index])

            console.log('isValid', isValid)

            if (isValid) {
                let temp = filesCopy3[action.payload.type].files.splice(index, 1)
                filesCopy3['noErrorsFiles'].files.push(temp)

            }

            return {
                ...state,
                uploadedFilesObj: filesCopy3
            }

        case UPDATE_FILE:
            console.log('UPDATE_FILE', action.payload)
            const filesCopy2 = {
                ...state.uploadedFilesObj
            }
            if (action.payload.index === null) {
                filesCopy2[action.payload.type][action.payload.key] = action.payload.value
            } else {
                console.log('UPDATING', filesCopy2[action.payload.type].files[action.payload.index])
                filesCopy2[action.payload.type].files[action.payload.index][action.payload.key] = action.payload.value
            }


            return {
                ...state,
                uploadedFilesObj: filesCopy2

            }

        default:
            return state;
    }
}

