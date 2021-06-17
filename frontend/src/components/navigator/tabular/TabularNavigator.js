import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import ClientBox from './client/ClientBox'


function TabularNavigator() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { overviews } = useSelector(state => state.admin)

    useEffect(() => {
        // dispatch(updateSetupTitle('Database Overview'))
    }, [])

    const [hoverCol, setHoverCol] = useState(null)

    const headers = [
        "Client", "Funds", "Periods", "FSLIs", "SubAccounts", "Balances", "Custom Mapping",
        "Generic Mappings", "Entries", "Investments", "Ownerships", "Activity"
    ]

    const handleRowClick = (clientID, clientName) => {
        history.push(`/setup/client/${clientID}`)
        // dispatch(updateSetupTitle(`Client Overview: ${clientName}`))

    }


    return (
        <div className="setup-overview-container">

            <div className="setup-overview-header">
                {headers.map((header, index) => {
                    if (index === 0) {
                        return <div key={index} className="setup-overview-header-name">{header}</div>
                    } else {
                        return (
                            <div key={index} className="setup-overview-header-item" onMouseEnter={() => setHoverCol(index)} onMouseLeave={() => setHoverCol(null)} >
                                {header}
                            </div>
                        )
                    }
                })}
            </div>

            {overviews.map((overview, index) =>

                <div key={index} className="setup-overview-row" onClick={() => handleRowClick(overview.id, overview.name)}>
                    {Object.keys(overview).map((value, index) => {

                        if (index === 0) {
                            return <div key={index} className="setup-overview-row-name">{overview.name}</div>
                        } else if (index === 1) {
                            return null
                        } {
                            return <ClientBox key={index} value={overview[value]} index={index} hoverCol={hoverCol + 1} />
                        }

                    })}

                </div>

            )}
        </div>
    )
}

export default TabularNavigator
