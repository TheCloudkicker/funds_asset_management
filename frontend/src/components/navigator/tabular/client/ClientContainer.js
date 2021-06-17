import React, { useEffect } from 'react'
import ClientHeader from './ClientHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";


const FundBox = ({ value }) => {
    return (
        <div className={"setup-overview-row-item"} >
            {value}
        </div>
    )
}



const ClientContainer = () => {

    let { clientID } = useParams();

    const dispatch = useDispatch()
    const history = useHistory()
    const { client_overview_funds } = useSelector(state => state.admin)


    const handleRowClick = (fundID, fundName) => {
        history.push(`/setup/fund/${fundID}`)
        // dispatch(updateSetupTitle(`Fund Overview: ${fundName}`))
    }


    return (
        <div className="client-overview-container">

            <ClientHeader />

            {client_overview_funds.map(overview_fund =>

                <div key={overview_fund.id} className="setup-overview-row" onClick={() => handleRowClick(overview_fund.id, overview_fund.name)}>
                    {Object.keys(overview_fund).map((value, index) => {

                        if (index === 0) {
                            return <div key={index} className="setup-overview-row-name">{overview_fund.name}</div>
                        } else if (index === 1) {
                            return null
                        } {
                            return <FundBox key={index} value={overview_fund[value]} />
                        }

                    })}

                </div>

            )}

        </div>
    )
}

export default ClientContainer
