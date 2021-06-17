import { SET_TODAY, INITIALIZE_MONTHS, CHANGE_CALENDAR_MONTH } from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'




export const months = [
    {
        id: 0,
        name: 'Jan'
    },
    {
        id: 1,
        name: 'Feb'
    },
    {
        id: 2,
        name: 'Mar'
    },
    {
        id: 3,
        name: 'Apr'
    },
    {
        id: 4,
        name: 'May'
    },
    {
        id: 5,
        name: 'Jun'
    },
    {
        id: 6,
        name: 'Jul'
    },
    {
        id: 7,
        name: 'Aug'
    },
    {
        id: 8,
        name: 'Sep'
    },
    {
        id: 9,
        name: 'Oct'
    },
    {
        id: 10,
        name: 'Nov'
    },
    {
        id: 11,
        name: 'Dec'
    },
]

export const generateMonth = (monthNo, yearNo) => {

    //GET FIRST DAY OF MONTH
    let firstDay = new Date(yearNo, monthNo, 1).getDay()
    let daysInMonth = new Date(yearNo, (monthNo + 1), 0).getDate();

    let monthName = months[monthNo]

    let week = []
    let weeks = [week,]
    let boxNo = 0
    let noBoxes = 35
    let weekNo = 0
    let dayNo = null
    let weekDayNo = 0
    console.log('firstDay', firstDay)

    let i = 0
    while (i < noBoxes) {

        if (weekNo === 0 && !dayNo) {

            if (i < firstDay) {
                dayNo = null
            } else {
                dayNo = 1
            }

        }


        if (weekDayNo === 6) {

            if (dayNo <= daysInMonth) {
                weeks[weekNo].push(dayNo)
                weeks.push([])
            } else {
                weeks[weekNo].push(null)
            }



            weekDayNo = 0
            weekNo++
            if (dayNo) {
                dayNo++
            }

        } else {

            if (dayNo <= daysInMonth) {
                weeks[weekNo].push(dayNo)
            } else {
                weeks[weekNo].push(null)
            }

            weekDayNo++
            if (dayNo) {
                dayNo++
            }
        }

        i++
    }


    return {
        firstDay: firstDay,
        daysInMonth: daysInMonth,
        monthName: monthName,
        year: yearNo,
        weeks: weeks
    }

}

export const changeCalendarMonth = (dir, months) => {

    const monthsCopy = { ...months }

    let monthNo;
    let yearNo;


    if (dir === 'prev') {
        monthNo = monthsCopy.first.monthName.id - 1
        yearNo = monthsCopy.first.year

        if (monthNo === -1) {
            monthNo = 11
            yearNo--
        }

        monthsCopy['second'] = monthsCopy['first']
        monthsCopy['first'] = generateMonth(monthNo, yearNo)

    } else if (dir === 'next') {
        monthNo = monthsCopy.second.monthName.id + 1
        yearNo = monthsCopy.second.year

        if (monthNo === 12) {
            monthNo = 0
            yearNo++
        }

        monthsCopy['first'] = monthsCopy['second']
        monthsCopy['second'] = generateMonth(monthNo, yearNo)

    }




    return {
        type: CHANGE_CALENDAR_MONTH,
        payload: monthsCopy
    }

}


export const initializeMonths = today => {

    return {
        type: INITIALIZE_MONTHS,
        payload: {
            first: generateMonth(today.getMonth(), today.getFullYear()),
            second: generateMonth(today.getMonth() + 1, today.getFullYear())
        }
    }
}


export const setToday = () => {

    return {
        type: SET_TODAY,
        payload: new Date()
    }
}


