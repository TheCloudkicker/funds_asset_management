import React from 'react'
import { Modal } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLayout } from '../../store/actions/layout'
import FundCriteria from './forms/FundCriteria'
import AddForm from './forms/AddForm'
import UpdateForm from './forms/UpdateForm'
import GloablSettings from './forms/GlobalSettings'

const formRouter = (modalForm, dispatch) => {

    console.log('modalForm', modalForm)

    if (modalForm === null) {
        return "NO FORM SELECTED"
    } else if (modalForm.key === 'GLOBAL_SETTINGS') {
        return <GloablSettings />
    } else if (modalForm.key === 'Criteria') {
        return <FundCriteria dispatch={dispatch} formObj={modalForm} />
    } else if (modalForm.key === 'audit_setting') {
        return <UpdateForm dispatch={dispatch} formObj={modalForm} />
    } else if (modalForm.key.includes('_id')) {
        return <AddForm dispatch={dispatch} formObj={modalForm} />
    } else {
        return "NONE SELECTED"
    }

}

const WaibeModal = ({ dispatch }) => {

    const { modalForm } = useSelector(state => state.layout)

    return (

        <Modal
            dimmer={true}
            open={true}
            onClose={() => dispatch(updateLayout('modalVisible', false))}
        >

            {formRouter(modalForm, dispatch)}

        </Modal>
    )
}


export default WaibeModal
