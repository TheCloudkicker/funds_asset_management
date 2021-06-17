import { exportCarryCalc } from '../../../store/actions/testing/carry'
import { updateCapital, addCapitalMovement } from '../../../store/actions/capital'
import { updateLayout } from '../../../store/actions/layout'
import React from 'react'

export const addRouter = (layout, dispatch, selectedPeriod, carry, currentUser, funds, capital) => {

    const { app, subApp } = layout

    const onClick = (key, value) => {

        if (key === 'ADD_CRITERIA') {
            dispatch(updateLayout('modalVisible', true))
            dispatch(updateLayout('modalForm', value))
        }
    }

    return [
        {
            name: 'Add Capital Movement',
            onClick: () => dispatch(addCapitalMovement()),
            icon: <i className="plus icon"></i>
        },
        {
            name: 'Add New Entity',
            onClick: () => console.log("Clicked"),
            icon: <i className="sitemap icon"></i>
        },
        {
            name: 'Fund Criteria',
            onClick: () => onClick('ADD_CRITERIA', { key: 'Criteria', value: 'fund' }),
            icon: <i className="plus icon"></i>
        },
        {
            name: 'Add Name Alias',
            onClick: () => console.log("Alias"),
            icon: <i className="plus icon"></i>
        },
        {
            name: 'Investment Criteria',
            onClick: () => onClick('ADD_CRITERIA', { key: 'Criteria', value: 'investment' }),
            icon: <i className="plus icon"></i>
        },
        {
            name: 'Investor Criteria',
            onClick: () => onClick('ADD_CRITERIA', { key: 'Criteria', value: 'investor' }),
            icon: <i className="plus icon"></i>
        },
        {
            name: 'Selected',
            onClick: () => console.log("Clicked"),
            icon: <i className="file excel outline icon"></i>
        },
        {
            name: 'All Funds',
            onClick: () => console.log("Clicked"),
            icon: <i className="file excel outline icon"></i>
        },
    ]

}