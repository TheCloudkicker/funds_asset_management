import { exportCarryCalc } from '../../../store/actions/testing/carry'
import { updateCapital } from '../../../store/actions/capital'
import { updateLayout } from '../../../store/actions/layout'
import React from 'react'
import {
    updateFiles, deleteAllFiles, exportFileToExcel, toggleUploadInProgress, saveFile,
    updateUploadedFilesFilter, updateFileStatus, selectFile
} from '../../../store/actions/uploads/uploads'
import { createSuccess } from '../../../store/actions/alerts'

export const uploadRouter = (layout, dispatch, selectedPeriod, currentUser, funds, uploads) => {

    const { app, subApp } = layout

    const handleUpload = () => {
        dispatch(toggleUploadInProgress(true))
        dispatch(selectFile(null, null))
        dispatch(createSuccess("Upload to Server in Progress..."))

        const { files } = uploads.uploadedFilesObj.noErrorsFiles

        for (var j = 0; j < files.length; j++) {
            dispatch(updateFileStatus('noErrorsFiles', files[j].id, 'PROCESSING'))
            dispatch(saveFile('noErrorsFiles', files[j], currentUser.displayName))
        }
    }

    return [
        {
            name: 'Upload All Validated Files',
            onClick: () => handleUpload(),
            icon: <i className="upload icon"></i>
        },
        {
            name: 'Remove Files from Queue',
            onClick: () => console.log("Clicked"),
            icon: <i className="trash icon"></i>
        }
    ]
}