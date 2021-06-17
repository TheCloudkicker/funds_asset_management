import React, { useState, useEffect } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

import { useSelector, useDispatch } from 'react-redux'
import { toggleDelModal, deleteReportSetupFromDatabase, updateDBLoading, getDbStatus } from '../../../store/actions/admin'
import { createSuccess } from '../../../store/actions/alerts'


const InitialButtons = ({ onInitialButtonClick, dbStatusLoading }) => {

    return (
        <div>
            <Button
                disabled={dbStatusLoading}
                content="Cancel, Keep Report"
                color='red'
                labelPosition='right'
                icon='close'
                onClick={() => onInitialButtonClick('no')}
            />
            <Button
                disabled={dbStatusLoading}
                content="Yes, Delete Report"
                labelPosition='right'
                icon='checkmark'
                color='green'
                onClick={() => onInitialButtonClick('yes')}
            />
        </div>
    )
}
const SecondaryButtons = ({ onSecondaryButtonClick }) => {
    return (
        <ButtonsContainer style={{ justifyContent: 'flex-start' }}>
            <Button
                content="Cancel, Keep Report"
                color='red'
                style={{ justifySelf: 'left' }}
                labelPosition='right'
                icon='close'
                onClick={() => onSecondaryButtonClick('no')}
            />
            <Button
                content="Yes, I am Sure"
                labelPosition='right'
                icon='checkmark'
                color='green'
                onClick={() => onSecondaryButtonClick('yes')}
            />
        </ButtonsContainer>
    )
}


const DbLoading = () => {
    return (
        <div className="db-loading-div">
            Loading Related Database Info...
        </div>
    )
}

const DBStatus = ({ dbStatus }) => {
    return (
        <div className="db-status-div">
            <div className="db-status-item">
                Related Report Data: {dbStatus && dbStatus.attached_records}
            </div>
            <div className="db-status-item">
                Do you want to delete these as well?
            </div>
        </div>
    )
}

function DeleteModal() {


    const dispatch = useDispatch()

    const [delReport, setDelReport] = useState({
        name: '',
        id: '',
        headers: []
    })
    const [btns, setBtns] = useState('initial')
    const { reportsHeaders, dbStatusLoading, dbStatus } = useSelector(state => state.admin)

    useEffect(() => {
        if (delReport.id) {
            dispatch(getDbStatus(delReport.id))

        }
    }, [delReport.id])


    useEffect(() => {

        console.log('setting del')
        dispatch(updateDBLoading(true))

        let areChecked = false

        for (var i = 0; i < reportsHeaders.length; i++) {


            if (reportsHeaders[i].checked) {
                setDelReport(reportsHeaders[i])
                areChecked = true
                break
            }
        }

        if (!areChecked) {

            handleClose()
        }




    }, [reportsHeaders.length])

    const onInitialButtonClick = () => {
        setBtns('secondary')
    }

    const onSecondaryButtonClick = btnSelected => {

        if (btnSelected === 'yes') {
            dispatch(deleteReportSetupFromDatabase(delReport.id))


        } else if (btnSelected === 'no') {
            setBtns('initial')
        }

    }

    const renderButtons = () => {
        switch (btns) {
            case 'initial':
                return <InitialButtons onInitialButtonClick={onInitialButtonClick} dbStatusLoading={dbStatusLoading} />
            case 'secondary':
                return <SecondaryButtons onSecondaryButtonClick={onSecondaryButtonClick} />
            default:
                return null
        }
    }

    const handleClose = () => {
        dispatch(toggleDelModal(false))
    }
    const handleOpen = () => {
        dispatch(toggleDelModal(true))
    }


    return (
        <Modal
            onClose={handleClose}
            onOpen={handleOpen}
            open={true}
        >

            <Modal.Header> Reports Selected For Deletion</Modal.Header>

            <div className="delete-modal-content">

                <div className="report-form-container">

                    <div className="del-report-name-div">
                        Report Name: {delReport.name}
                    </div>
                    <div className="del-report-name-div">
                        Associated Headers:
                    </div>

                    <div className="del-report-headers-list">

                        {delReport.headers.map(header =>

                            <div key={header.id} className="del-header-item">
                                {header.name}
                            </div>

                        )}

                    </div>

                </div>

                <div className="report-form-details">
                    <div className="del-report-name-div">
                        Database Activity Associated with this Report
                    </div>

                    {dbStatusLoading ? <DbLoading /> : <DBStatus dbStatus={dbStatus} />}

                </div>

            </div>


            {renderButtons()}
        </Modal>
    )
}

export default DeleteModal
