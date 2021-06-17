import { updateCarryCompare } from '../../../store/actions/carry'
import { updateCapital2 } from '../../../store/actions/capital'
import { saveFund, updateFund } from '../../../store/actions/funds/funds'
import React from 'react'

export const editRouter = (layout, dispatch, selectedPeriod, carry, currentUser, funds, capital) => {

    const { app, subApp } = layout


    const onChange = action => {
        console.log('action', action)
        if (action === 'editAll') {

            if (funds.isReadOnly === false) {
                dispatch(saveFund(funds.fundObject, 'UPDATE_FUND'))
            }
            dispatch(updateFund(null, action, !funds.isReadOnly))
        }
    }

    return [
        {
            name: carry.isReadOnly ? 'Unlock Carry' : 'Lock/Save Carry',
            onClick: () => updateCarryCompare(dispatch, { ...carry }, null, 'isReadOnly', !carry.isReadOnly),
            icon: carry.isReadOnly ? <i className="unlock icon"></i> : <i className="lock icon"></i>
        },
        {
            name: capital.isReadonly ? 'Unlock Capital' : 'Lock Capital',
            onClick: () => updateCapital2({ ...capital }, null, 'isReadonly', !capital.isReadonly, dispatch),
            icon: capital.isReadonly ? <i className="unlock icon"></i> : <i className="lock icon"></i>,
        },
        {
            name: `${funds.isReadOnly ? 'Edit Fund Details' : 'Lock & Save Details'}`,
            onClick: () => onChange('editAll'),
            icon: funds.isReadOnly ? <i className="edit icon"></i> : <i className="save icon"></i>
        },
    ]
}

// {
//     name: 'Selected',
//     onClick: () => console.log("Clicked"),
//     icon: <i className="file excel outline icon"></i>
// },
// {
//     name: 'All Funds',
//     onClick: () => console.log("Clicked"),
//     icon: <i className="file excel outline icon"></i>
// },