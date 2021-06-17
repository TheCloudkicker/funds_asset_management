import React, { useState } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { customStyles } from '../../../assets/styles/select'
import { getStructure } from '../../../store/actions/navigator'

function FundSelector({ dispatch }) {
    const [fund, setFund] = useState(null)
    const { funds } = useSelector(state => state.funds)

    const onChange = fund => {

        setFund(fund)
        dispatch(getStructure(null))
    }

    return (
        <div className="visual-container-selector">
            <Select
                placeholder="Select fund..."
                value={fund}
                styles={customStyles}
                options={funds.map(fund => {
                    return { value: fund.id, label: fund.name }
                })}
                onChange={fund => onChange(fund)} />

        </div>
    )
}

export default FundSelector
