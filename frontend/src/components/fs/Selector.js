import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFunds, changeSelectedFund } from '../../store/actions/funds/funds'
import { getPeriods, setSelectedPeriod } from '../../store/actions/periods'
import { getFs } from '../../store/actions/fs'
import Select from 'react-select'
import { customStyles } from '../../assets/styles/select'
import { createError } from '../../store/actions/alerts'

function Selector() {
    const dispatch = useDispatch()
    const { funds, selectedFund } = useSelector(state => state.funds)
    const { periods, selectedPeriod } = useSelector(state => state.periods)
    const { selectedClient } = useSelector(state => state.clients)


    useEffect(() => {
        if (funds.length === 0) {
            dispatch(getFunds())
        }
        if (periods.length === 0) {
            dispatch(getPeriods())
        }
    }, [])

    const handlePeriodChange = period => {
        dispatch(setSelectedPeriod(period))

        if (!selectedClient) {
            dispatch(createError("Client not set"))
        } else if (!selectedFund) {
            dispatch(createError("Fund not set"))
        } else {
            dispatch(getFs((selectedClient.value, selectedFund.id, period.value)))
        }

    }

    const handleFundChange = fund => {
        dispatch(changeSelectedFund(fund))

        if (!selectedClient) {
            dispatch(createError("Client not set"))
        } else if (!selectedPeriod) {
            dispatch(createError("Period not set"))
        } else {
            dispatch(getFs((selectedClient.value, fund.id, selectedPeriod.value)))
        }
    }

    return (
        <div className="fs-sidebar-selector">

            <div className="fs-sidebar-selector-fund-container">
                <div className="fs-sidebar-selector-fund-form">
                    <Select placeholder="Select fund..." styles={customStyles} value={selectedFund} onChange={fund => handleFundChange(fund)} options={funds.map(fund => {
                        return { value: fund.name, label: fund.name }
                    })} />
                </div>

            </div>

            <div className="fs-sidebar-selector-year-container">
                <div className="fs-sidebar-selector-year-form">
                    <Select placeholder="Select period..." styles={customStyles} onChange={period => handlePeriodChange(period)} options={periods.map(period => {
                        return { value: period.id, label: period.end }
                    })} />
                </div>

            </div>

            <div className="fs-sidebar-selector-cycle-container">
                <div className="fs-sidebar-selector-cycle-form">
                    <input type="text" className="fs-sidebar-selector-cycle-form-input" placeholder="Filter Version..." />
                </div>

            </div>

        </div>
    )
}

export default Selector
