import React, { useState, useEffect } from 'react'
import Deliverables from './Deliverables'
import DeliverableForm from './DeliverableForm'

import axios from 'axios'

function Day({ calendarInfo, onDeliverableSelect }) {

    const [clientsDeliverables, setClientsDeliverables] = useState([
        {
            id: 1,
            name: 'Tesla',
            date: '',
            deliverables: [
                {
                    id: 1,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 2,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 3,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 4,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                }
            ]
        },
        {
            id: 2,
            name: 'Google',
            date: '',
            deliverables: [
                {
                    id: 1,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 2,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 3,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 4,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                }
            ]
        },
        {
            id: 3,
            name: 'Amazon',
            date: '',
            deliverables: [
                {
                    id: 1,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 2,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 3,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                },
                {
                    id: 4,
                    deliverable: 'Trial Balance',
                    action: 'Receipt',
                    status: 'Open'
                }
            ]
        },
        {
            id: 4,
            name: 'SpaceEx',
            date: '',
            deliverables: []
        },
        {
            id: 5,
            name: 'Alteryx',
            date: '',
            deliverables: []
        },
        {
            id: 6,
            name: 'SpaceEx',
            date: '',
            deliverables: []
        },
        {
            id: 7,
            name: 'Alteryx',
            date: '',
            deliverables: []
        },
    ])


    const [deliverable, setDeliverable] = useState({})

    const getDayDeliverables = () => {
        console.log("Getting Deliverables")
    }

    useEffect(() => getDayDeliverables(), [])


    return (
        <div className='day-container'>

            <DeliverableForm deliverable={deliverable} />


            <Deliverables clientsDeliverables={clientsDeliverables} />

        </div>

    )
}

export default Day
