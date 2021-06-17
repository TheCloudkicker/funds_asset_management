import React from 'react'
import { useSelector } from 'react-redux'

const InvestmentBox = ({ value }) => {
    return (
        <div className={"setup-overview-row-item"} >
            {value}
        </div>
    )
}

const headers = [
    "Investments", "Ownerships", "Activity"
]

function FundInvestments() {

    const { fund_overview_investments } = useSelector(state => state.admin)

    const handleRowClick = () => {

    }


    return (
        <div className="fund-overview-investments">

            {fund_overview_investments.map((fund_overview_investment, index) =>

                <div key={index} className="setup-overview-row" onClick={() => handleRowClick(fund_overview_investment.id, fund_overview_investment.name)}>
                    {Object.keys(fund_overview_investment).map((value, index) => {

                        if (index === 0) {
                            return <div key={index} className="setup-overview-row-name">{fund_overview_investment.name}</div>
                        } else if (index === 1) {
                            return null
                        } {
                            return <InvestmentBox key={index} value={fund_overview_investment[value]} />
                        }

                    })}

                </div>

            )}

        </div>
    )
}

export default FundInvestments
