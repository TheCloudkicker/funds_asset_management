import React from 'react'
import { Input, Header } from 'semantic-ui-react'

function DeliverableForm() {
    return (
        <div className="day-left">

            <Header as='h3' style={{ marginLeft: '20px' }}>
                Deliverable
            </Header>


            <div className="deliverable-form">

                <Input style={{ margin: '1rem', display: 'block' }} className="deliverable-form-input" />
                <Input style={{ margin: '1rem', display: 'block' }} className="deliverable-form-input" />
                <Input style={{ margin: '1rem', display: 'block' }} className="deliverable-form-input" />
                <Input style={{ margin: '1rem', display: 'block' }} className="deliverable-form-input" />

            </div>

        </div>
    )
}

export default DeliverableForm
