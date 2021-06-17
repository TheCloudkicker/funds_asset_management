import React from 'react'
import DayChangeForm from './DayChangeForm'
import MonthChangeForm from './MonthChangeForm'


import { Modal } from "semantic-ui-react";

function CalendarModal({ modalVisible, closeModal, calendarInfo, onMonthSelect, toggleYear }) {


    const renderModalForm = view => {
        if (view === 'month') {
            return (
                <MonthChangeForm
                    toggleYear={toggleYear}
                    calendarInfo={calendarInfo}
                    onMonthSelect={onMonthSelect} />
            )
        } else if (calendarInfo.view === 'day') {
            return (
                <DayChangeForm
                    calendarInfo={calendarInfo} />
            )
        }
    }

    return (
        <Modal basic open={modalVisible} onClose={closeModal}>

            {renderModalForm(calendarInfo.view)}

        </Modal>
    )
}

export default CalendarModal
