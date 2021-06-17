import React from 'react'




const Deliverable = ({ del, onClientClick }) => {
    let delColor = '#667eea'
    if (del.id === 1) {
        delColor = '#4c51bf'
    }

    return (
        <div onClick={e => onClientClick(e)} className="deliverable-box" style={{ backgroundColor: delColor }}>

            <div className="deliverable-box-text">
                {del.client}
            </div>

        </div>
    )
}

const Day = ({ dayObj, onDayClick, onClientClick }) => {
    const dels = [
        {
            id: 1,
            client: 'Tesla'
        },
        {
            id: 2,
            client: 'Google'
        },
    ]


    const formatDay = dayObj => {
        let dayStyle = "day-box "

        if (dayObj.dayNo) {
            dayStyle += "day-active "
            if (dayObj.dayOfWeek === 0 || dayObj.dayOfWeek === 6) {
                dayStyle += ' weekend'
            }
            return dayStyle

        } else {
            dayStyle += "day-disabled "
            return dayStyle
        }

    }
    return (
        <div className={formatDay(dayObj)} onClick={() => onDayClick(dayObj.dayNo)}>

            {dayObj.dayNo ? dayObj.dayNo : ''}
            {dayObj.dayNo ? dels.map(del => { return <Deliverable onClientClick={onClientClick} key={del.id} del={del} /> }) : ''}

        </div>
    )
}

const Week = ({ week, onDayClick, onClientClick }) => {
    return (
        <div className="week-row">
            {week.days.map((dayObj, index) =>

                <Day key={index} dayObj={dayObj} onClientClick={onClientClick} onDayClick={onDayClick} />

            )}
        </div>
    )
}


function Month({ weeks, onDayClick, onClientClick }) {
    return (
        <div className="calendar-month">

            {weeks.map((week, index) =>

                <Week key={index} week={week} onClientClick={onClientClick} onDayClick={onDayClick} />

            )}

        </div>
    )
}

export default Month
