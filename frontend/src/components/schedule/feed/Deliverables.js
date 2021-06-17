import React, { useState } from 'react'

import DeliverableFeed from './DeliverableFeed'

function Deliverables() {
    const [deliverables, setDeliverables] = useState([
        {
            id: 1,
            client: "Tesla",
            title: 'Trial Balance',
            date: '7/25/2020',
            status: 'Open'

        },
        {
            id: 2,
            client: "Tesla",
            title: 'Trial Balance',
            date: '7/25/2020',
            status: 'Open'
        },
        {
            id: 3,
            client: "Tesla",
            title: 'Trial Balance',
            date: '7/25/2020',
            status: 'Open'
        },
        {
            id: 4,
            client: "Tesla",
            title: 'Trial Balance',
            date: '7/25/2020',
            status: 'Open'
        },
    ])
    return (
        <div className="deliverables-container">


            <DeliverableFeed deliverables={deliverables} />



        </div>
    )
}

export default Deliverables
