import React from 'react'

function CalendarHeader({ calendarInfo, onHeaderClick, toggleMonth, toggleDay }) {


    const calculatePrevDay = day => {

        if ((day - 1) === 0) {
            return calendarInfo.prevMonth.name + " " + (calendarInfo.selectedDay - 1)
        } else {
            return calendarInfo.selectedMonth.name + " " + (calendarInfo.selectedDay - 1)
        }
    }

    const calculateNextDay = day => {

        if ((day + 1) > 31) {
            return calendarInfo.nextMonth.name + " 1"
        } else {
            return calendarInfo.selectedMonth.name + " " + (calendarInfo.selectedDay + 1)
        }
    }

    return (
        <div className="calendar-header" onClick={() => onHeaderClick()}>

            {calendarInfo.view === 'month' ?
                <button
                    className='header-button'
                    onClick={e => toggleMonth(e, calendarInfo.prevMonth, 'prev')}>
                    {calendarInfo.prevMonth.name}
                </button>
                :
                <button
                    className='header-button'
                    onClick={e => toggleDay(e, (calendarInfo.selectedDay - 1), 'prev')}>

                    {calculatePrevDay(calendarInfo.selectedDay)}

                </button>
            }

            <div className="header-text">
                {calendarInfo.headerString}
            </div>

            {calendarInfo.view === 'month' ?
                <button
                    className='header-button'
                    onClick={e => toggleMonth(e, calendarInfo.nextMonth, 'next')}>
                    {calendarInfo.nextMonth.name}
                </button>
                :
                <button
                    className='header-button'
                    onClick={e => toggleDay(e, (calendarInfo.selectedDay + 1), 'next')}>
                    {calculateNextDay(calendarInfo.selectedDay)}
                </button>
            }

        </div>
    )
}

export default CalendarHeader
