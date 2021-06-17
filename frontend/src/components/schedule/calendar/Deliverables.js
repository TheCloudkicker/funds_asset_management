import React, { useState } from 'react'
import { Table, Icon } from 'semantic-ui-react'


const Deliverable = ({ clientsDeliverables }) => {
    return (
        <div className="deliverable-container">

        </div>
    )
}


const DelivItem = ({ deliv }) => {
    return (
        <div className="deliv-item">
            <div className="deliv-item-text">
                {deliv.name}

            </div>
        </div>
    )
}

const DeliverablesList = () => {
    const delivs = [
        {
            id: 1,
            name: 'test'
        },
        {
            id: 1,
            name: 'test'
        }
    ]
    return (
        <div className="deliverables-list">
            {delivs.map(deliv =>

                <DelivItem key={deliv.id} deliv={deliv} />

            )}

        </div>
    )
}

const ClientDeliverables = ({ clientDeliverables }) => {
    const [subVisible, setSubVisible] = useState(false)

    return (
        <React.Fragment>
            <div className="client-deliverables" onClick={() => setSubVisible(!subVisible)}>

                <div className="client-deliverables-header">
                    <div className="client-deliverables-text-main">
                        {clientDeliverables.name}
                    </div>
                    <div className="client-deliverables-text-sub">
                        Status:
                    </div>
                </div>


                <Icon className="toggle-icon" name={subVisible ? "angle up" : "angle down"} style={{ margin: '10px', cursor: 'pointer' }} />

            </div>

            {subVisible ? <DeliverablesList /> : null}

        </React.Fragment>
    )
}


function Deliverables({ clientsDeliverables }) {
    return (
        <div className="day-right">
            <div className="deliverables-header">
                <div className="deliverables-header-text">
                    Client Deliverables

                </div>
                <Icon name="close" style={{ margin: '10px', cursor: 'pointer' }} />
            </div>
            <div className="deliverables-container-day">
                {clientsDeliverables.map((clientDeliverables, index) =>

                    <ClientDeliverables key={index} clientDeliverables={clientDeliverables} />

                )}
            </div>
        </div>
    )
}

export default Deliverables
