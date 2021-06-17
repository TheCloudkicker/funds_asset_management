import React from 'react'

function FundHeader({ headers }) {


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

export default FundHeader
