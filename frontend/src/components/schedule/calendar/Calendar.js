import React, { useState, useEffect } from 'react'

import Month from './Month'
import Week from './Week'
import Day from './Day'

import WeekdayHeader from './WeekdayHeader';
import CalendarHeader from './CalendarHeader'
import CalendarModal from './modal/CalendarModal'
import ClientModal from './modal/ClientModal'


function Calendar({ calendarInfo, todaysDate, changeYear, changeDay, changeMonth, setCalendarInfo }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [clientModalVisible, setClientModalVisible] = useState(false)


    const onClientClick = (event, client) => {
        event.stopPropagation()
        setClientModalVisible(true)
    }

    const onDeliverableSelect = deliverable => {

    }
    const toggleYear = year => changeYear(year)
    const closeModal = () => setModalVisible(false)
    const onHeaderClick = () => setModalVisible(true)

    const onDayClick = day => {
        if (day) {
            setCalendarInfo(prevState => {
                return { ...prevState, selectedDay: day, view: 'day' }
            })
        }
    }

    const renderCalendarHeader = calendarInfo => {

        if (todaysDate) {

            let dateString = ''
            let month = ''
            let year = ''

            if (calendarInfo.view === 'month') {
                month = calendarInfo.selectedMonth.name;
                year = calendarInfo.selectedYear;
                dateString = `${month} ${year}`
            } else if (calendarInfo.view === 'day') {
                month = todaysDate.toLocaleString('default', { month: 'long' });
                year = todaysDate.getFullYear()
                let day = calendarInfo.selectedDay;
                dateString = `${month} ${day}, ${year}`
            }

            setCalendarInfo(prevState => {
                return { ...prevState, headerString: dateString }
            })


        }
    }

    useEffect(() => renderCalendarHeader(calendarInfo), [todaysDate, calendarInfo.selectedMonth, calendarInfo.selectedDay, calendarInfo.view])


    const getFirstDayOfMonth = (yearNo, month) => {
        let firstDay = new Date(yearNo, month.no, 1)
        return firstDay.getDay()
    }

    const renderCalendar = calendarInfo => {

        if (todaysDate) {

            let firstDay = getFirstDayOfMonth(calendarInfo.selectedYear, calendarInfo.selectedMonth)
            let daysInMonth = new Date(calendarInfo.selectedYear, (calendarInfo.selectedMonth.no + 1), 0).getDate();

            let week1 = []
            let week2 = []
            let week3 = []
            let week4 = []
            let week5 = []
            let currDay = 1

            for (var i = 0; i < 7; i++) {
                if (i >= firstDay) {
                    let newDay = {
                        dayOfWeek: i,
                        dayNo: currDay
                    }
                    week1.push(newDay)
                    currDay++
                } else if (i < firstDay) {
                    let newDay = {
                        dayOfWeek: i,
                        dayNo: null
                    }
                    week1.push(newDay)
                }
            }
            for (var i = 0; i < 7; i++) {
                let newDay = {
                    dayOfWeek: i,
                    dayNo: currDay
                }
                week2.push(newDay)
                currDay++
            }
            for (var i = 0; i < 7; i++) {
                let newDay = {
                    dayOfWeek: i,
                    dayNo: currDay
                }
                week3.push(newDay)
                currDay++
            }
            for (var i = 0; i < 7; i++) {
                let newDay = {
                    dayOfWeek: i,
                    dayNo: currDay
                }
                week4.push(newDay)
                currDay++
            }
            for (var i = 0; i < 7; i++) {
                if (currDay <= daysInMonth) {
                    let newDay = {
                        dayOfWeek: i,
                        dayNo: currDay
                    }
                    week5.push(newDay)
                    currDay++
                } else {
                    let newDay = {
                        dayOfWeek: i,
                        dayNo: null
                    }
                    week5.push(newDay)
                    currDay++
                }
            }

            setCalendarInfo(prevState => {
                return {
                    ...prevState, monthData: [
                        {
                            no: 1,
                            days: week1
                        },
                        {
                            no: 2,
                            days: week2
                        },
                        {
                            no: 3,
                            days: week3
                        },
                        {
                            no: 4,
                            days: week4
                        },
                        {
                            no: 5,
                            days: week5
                        }
                    ]
                }
            })

        }

    }

    useEffect(() => renderCalendar(calendarInfo), [calendarInfo.selectedMonth])

    const renderCalendarBody = view => {
        switch (view) {
            case 'month':
                return <Month onClientClick={onClientClick} weeks={calendarInfo.monthData} onDayClick={onDayClick} />
            case 'day':
                return <Day calendarInfo={calendarInfo} onDeliverableSelect={onDeliverableSelect} />
            case 'week':
                return <Week calendarInfo={calendarInfo} />
        }
    }

    const toggleMonth = (evt, newMonth, dir) => {
        evt.stopPropagation()
        changeMonth(newMonth, dir)
    }
    const toggleDay = (evt, newDay, dir) => {
        evt.stopPropagation()
        changeDay(newDay, dir)
    }

    const onMonthSelect = month => {
        setModalVisible(false)
        changeMonth(month, null)
    }

    return (
        <div className="calendar">

            <ClientModal
                clientModalVisible={clientModalVisible}
                setClientModalVisible={setClientModalVisible} />

            <CalendarModal
                monthData={calendarInfo.monthData}
                calendarInfo={calendarInfo}

                modalVisible={modalVisible}
                toggleYear={toggleYear}
                closeModal={closeModal}
                onMonthSelect={onMonthSelect} />

            <CalendarHeader
                calendarInfo={calendarInfo}
                onHeaderClick={onHeaderClick}
                toggleMonth={toggleMonth}
                toggleDay={toggleDay} />

            {calendarInfo.view === 'month' ? <WeekdayHeader calendarInfo={calendarInfo} /> : calendarInfo.view === 'week' ? <WeekdayHeader calendarInfo={calendarInfo} /> : null}

            {renderCalendarBody(calendarInfo.view)}

        </div>
    )
}

export default Calendar
