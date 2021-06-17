import React, { useEffect } from "react";

import Calendar from './calendar/Calendar'
import Deliverables from './feed/Deliverables'

import { dayNames } from './utils'
import { useDispatch, useSelector } from 'react-redux'

import '../../assets/css/Calendar.css'


function ScheduleContainer({ todaysDate, setCalendarInfo, calendarInfo }) {

    const dispatch = useDispatch()


    useEffect(() => {
    }, [])

    const initializeCalendarInfo = todaysDate => {

        if (todaysDate) {
            const year = todaysDate.getFullYear()
            const day = todaysDate.getDate()

            const month = {
                no: todaysDate.getMonth(),
                name: todaysDate.toLocaleString('default', { month: 'long' }).toLocaleString('default', { month: 'long' })
            }

            const lastMonth = new Date(year, month.no - 1, day)
            const afterMonth = new Date(year, month.no + 1, day)

            const prevMonth = {
                no: lastMonth.getMonth(),
                name: lastMonth.toLocaleString('default', { month: 'long' }).toLocaleString('default', { month: 'long' })
            }
            const nextMonth = {
                no: afterMonth.getMonth(),
                name: afterMonth.toLocaleString('default', { month: 'long' }).toLocaleString('default', { month: 'long' })
            }

            setCalendarInfo(prevState => {
                return { ...prevState, selectedYear: year, selectedMonth: month, prevMonth: prevMonth, nextMonth: nextMonth, selectedDay: day }
            })
        }
    }


    const changeDay = (day, dir) => {
        console.log("ASAS", day)
        setCalendarInfo(prevState => {
            return { ...prevState, selectedDay: day }
        })
    }

    const changeYear = year => {
        setCalendarInfo(prevState => {
            return { ...prevState, selectedYear: year }
        })
    }

    const changeMonth = (month, dir) => {

        let newYear = calendarInfo.selectedYear

        if (dir === 'prev' && month.no === 11) {
            newYear = newYear - 1
        } else if (dir === 'next' && month.no === 0) {
            newYear = newYear + 1
        } else {

        }

        const lastMonth = new Date(calendarInfo.selectedYear, month.no - 1, calendarInfo.selectedDay)
        const afterMonth = new Date(calendarInfo.selectedYear, month.no + 1, calendarInfo.selectedDay)

        const prevMonth = {
            no: lastMonth.getMonth(),
            name: lastMonth.toLocaleString('default', { month: 'long' }).toLocaleString('default', { month: 'long' })
        }
        const nextMonth = {
            no: afterMonth.getMonth(),
            name: afterMonth.toLocaleString('default', { month: 'long' }).toLocaleString('default', { month: 'long' })
        }

        setCalendarInfo(prevState => {
            return { ...prevState, selectedMonth: month, prevMonth: prevMonth, nextMonth: nextMonth, selectedYear: newYear }
        })
    }

    useEffect(() => initializeCalendarInfo(todaysDate), [todaysDate])

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/calendar')
    })

    const onTabClick = tabName => {
        if (tabName === 'Calendar') {
            setCalendarInfo(prevState => {
                return { ...prevState, view: 'month', activeTab: tabName }
            })
        } else {
            setCalendarInfo(prevState => {
                return { ...prevState, activeTab: tabName }
            })
        }

    }

    const renderTabPane = tabName => {
        switch (tabName) {
            case 'Calendar':
                return (
                    <Calendar
                        setCalendarInfo={setCalendarInfo}
                        changeYear={changeYear}
                        changeMonth={changeMonth}
                        changeDay={changeDay}
                        todaysDate={todaysDate}
                        calendarInfo={calendarInfo} />
                )
            case 'Deliverables':
                return <Deliverables />
            default:
                return null
        }
    }
    const renderHeader = () => {

        return (
            <React.Fragment>
                {dayNames.map(day =>
                    <div className="calender-item weekday-header">
                        <div className="weekday-header-text">
                            {day.name.charAt(0)}
                        </div>
                    </div>

                )}
            </React.Fragment>
        )

    }


    return (
        <React.Fragment >
            <div className={"schedule-container"}>
                <div className="calender-item month-header">
                    <div className="month-header-nav-box">
                        <i className="caret left large icon"></i>
                    </div>
                    <div className="month-header-text">
                        AUGUST
                    </div>
                    <div className="month-header-nav-box">
                        <i className="caret right large icon"></i>
                    </div>
                </div>

                {renderHeader()}

                <div className="calender-item non-current-month"></div>
                <div className="calender-item non-current-month"></div>
                <div className="calender-item current-month">
                    <div className="current-month-header-no">1</div>
                    <div className="current-month-header-text"></div>
                    <div className="current-month-header-main"></div>
                </div>
                <div className="calender-item current-month">
                    <div className="current-month-header-no">2</div>
                    <div className="current-month-header-text"></div>
                    <div className="current-month-header-main"></div>
                </div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>

                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>

                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>

                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>

                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item current-month"></div>
                <div className="calender-item non-current-month"></div>
                <div className="calender-item non-current-month"></div>









            </div>
        </React.Fragment>
    );
}

export default ScheduleContainer;


