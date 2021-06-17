import React from 'react'


const ClientBox = ({ value, index, hoverCol }) => {


    return (
        <div className={"setup-overview-row-item " + (index === hoverCol ? "overview-hover" : "")} >
            {value}
        </div>
    )
}

export default ClientBox
