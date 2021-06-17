import React from 'react'
import { Modal, Button } from "semantic-ui-react";

function DayChangeForm({ calendarInfo }) {
    return (
        <React.Fragment>
            <Modal.Header className="modal-header-container">
                <Button className="modal-toggle-button">Prev</Button>
                <div className="modal-header-text">
                    {calendarInfo.selectedMonth.name && calendarInfo.selectedMonth.name}
                </div>
                <Button className="modal-toggle-button" >Next</Button>
            </Modal.Header>
            <Modal.Content >
                <div className="modal-days">

                    Modal Days

                {/* {monthData.map(month =>

                    <Button key={month.id} onClick={() => onMonthSelect(month)} className="modal-month-button">{month.name}</Button>

                )} */}

                </div>
            </Modal.Content>
        </React.Fragment>
    )
}

export default DayChangeForm
