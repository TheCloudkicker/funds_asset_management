import React from 'react'

const ClientHeader = () => {

    const headers = [
        "Funds", "Balances", "Custom Mapping", "Entries", "Investments", "Ownerships", "Activity"
    ]

    return (
        <div className="client-overview-header">
            {headers.map((header, index) => {
                if (index === 0) {
                    return <div key={index} className="setup-overview-header-name">{header}</div>
                } else {
                    return (
                        <div key={index} className="setup-overview-header-item" >
                            {header}
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default ClientHeader
