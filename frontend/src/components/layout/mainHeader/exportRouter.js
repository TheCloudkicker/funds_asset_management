import { exportCarryCalc } from '../../../store/actions/testing/carry'
import React from 'react'

export const exportRouter = (layout, dispatch, selectedPeriod, testing, currentUser, funds) => {

    const { app, subApp } = layout

    if (app === 'Testing') {
        return [
            {
                name: 'Excel',
                onClick: () => dispatch(exportCarryCalc(testing.carry, 'EXCEL', selectedPeriod, currentUser, funds.capitalSummary)),
                icon: <i className="file excel outline icon"></i>
            },
            {
                name: 'PDF',
                onClick: () => dispatch(exportCarryCalc(null, 'PDF', selectedPeriod, currentUser, funds.capitalSummary)),
                icon: <i className="file pdf outline icon"></i>
            }
        ]
    } else if (app === 'Setup') {


        return [
            {
                name: 'Excel',
                onClick: () => dispatch(exportCarryCalc(testing.carry, 'EXCEL', selectedPeriod, currentUser, funds.capitalSummary)),
                icon: <i className="file excel outline icon"></i>
            },
            {
                name: 'PDF',
                onClick: () => dispatch(exportCarryCalc(null, 'PDF', selectedPeriod, currentUser, funds.capitalSummary)),
                icon: <i className="file pdf outline icon"></i>
            }
        ]
    } else if (app === 'Reports') {
        return [
            {
                name: 'Selected',
                onClick: () => console.log("Clicked"),
                icon: <i className="file excel outline icon"></i>
            },
            {
                name: 'Filtered Columns',
                onClick: () => console.log("Clicked"),
                icon: <i className="file excel outline icon"></i>
            },
            {
                name: 'Original Report',
                onClick: () => console.log("Clicked"),
                icon: <i className="file excel outline icon"></i>
            },
            {
                name: 'Columns & Report',
                onClick: () => console.log("Clicked"),
                icon: <i className="file excel outline icon"></i>
            },
        ]
    } else if (app === 'Repository') {
        return [
            {
                name: 'All Funds',
                onClick: () => console.log("Clicked"),
                icon: <i className="file excel outline icon"></i>
            },
            {
                name: 'Missing Supports',
                onClick: () => console.log("Clicked"),
                icon: <i className="file excel outline icon"></i>
            },
        ]
    } else {
        return []
    }

}