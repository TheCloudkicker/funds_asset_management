import React from 'react'

import { dayNames } from '../utils'


function WeekdayHeader({ calendarInfo }) {
    return (
        <div className={"weekday-header " + (calendarInfo.view === 'week' ? 'add-scroll-width' : '')}>
            {
                dayNames.map(dayName =>

                    <div key={dayName.no} className="day-header-box">{dayName.name}</div>

                )
            }

        </ div>
    )
}

export default WeekdayHeader
