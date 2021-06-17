import React from 'react'
import { months } from '../../utils'
import { Modal, Button } from "semantic-ui-react";

function MonthChangeForm({ calendarInfo, toggleYear, onMonthSelect }) {
    return (
        <React.Fragment>
            <Modal.Header className="modal-header-container">
                <Button className="modal-toggle-button" onClick={() => toggleYear((calendarInfo.selectedYear - 1))}>{calendarInfo.selectedYear && (calendarInfo.selectedYear - 1)}</Button>
                <div className="modal-header-text">
                    {calendarInfo.selectedYear && calendarInfo.selectedYear}
                </div>
                <Button className="modal-toggle-button" onClick={() => toggleYear((calendarInfo.selectedYear + 1))}>{calendarInfo.selectedYear && (calendarInfo.selectedYear + 1)}</Button>
            </Modal.Header>
            <Modal.Content >
                <div className="modal-months">

                    {months.map(month =>

                        <Button key={month.id} onClick={() => onMonthSelect(month)} className="modal-month-button">{month.name}</Button>

                    )}

                </div>
            </Modal.Content>
        </React.Fragment>
    )
}

export default MonthChangeForm
