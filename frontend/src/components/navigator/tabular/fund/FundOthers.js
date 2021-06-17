import React from 'react'
import { useSelector } from 'react-redux'
import Box from './Box'

const headers = [
    "Year", "Balances", "Entries", "Investments"
]



function FundOthers() {

    const { fund_overview_periods } = useSelector(state => state.admin)

    const handleRowClick = () => {

    }

    return (

        <div className="fund-overview-fund">

            {fund_overview_periods.map((fund_overview_period, index) =>

                <div key={index} className="setup-overview-row" onClick={() => handleRowClick(fund_overview_period.id, fund_overview_period.name)}>
                    {Object.keys(fund_overview_period).map((value, index) => {

                        if (index === 0) {
                            return <div key={index} className="setup-overview-row-name">{fund_overview_period.name}</div>
                        } else if (index === 1) {
                            return null
                        } {
                            return <Box key={index} value={fund_overview_period[value]} />
                        }

                    })}

                </div>

            )}

        </div>
    )
}

export default FundOthers
