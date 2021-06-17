import {
    UPDATE_REPORTS, GENERATE_REPORT, DELETE_REPORT, ADD_REPORT, INIT_REPORT,
} from './types'

import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'
import { recycleItem } from './recycle'
import { v4 as uuidv4 } from 'uuid'

export const initReport = (dispatch, funds, periods) => {

    const _funds = []
    funds.forEach(fund => {
        _funds.push({ id: fund.value, label: fund.label, checked: false })
    })

    const _periods = []
    periods.forEach(period => {
        _periods.push({ id: period.value, label: period.label, checked: false })
    })

    const report = {
        id: uuidv4(),
        isLoading: false,
        isGenerated: false,

        name: 'Sheet 1',
        editable: false,

        headers: [],
        items: [],

        params: {
            funds: _funds,
            periods: _periods,
            standardReport: null,
        }
    }


    dispatch({
        type: INIT_REPORT,
        payload: report
    })
}

export const addReport = report => {
    return {
        type: ADD_REPORT,
        payload: { data: report }
    }
}

const values = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
]

const items = [
    { id: 1, title: 'A', values: values },
    { id: 2, title: 'B', values: values },
]

const headers = [
    { id: 1, title: 'Header 1' },
    { id: 2, title: 'Header 2' },
]

export const updateReports = (reports, dispatch, indexes, key, value) => {

    if (key === 'fund-checked') {

        reports.reports[indexes[0]].params.funds[indexes[1]].checked = value

    } else if (key === 'fund-checked-all') {

        reports.reports[indexes[0]].params.funds.forEach(f => f.checked = value)

    } else if (key === 'period-checked') {

        if (value) {
            reports.reports[indexes[0]].params.periods.forEach(p => p.checked = false)
        }

        reports.reports[indexes[0]].params.periods[indexes[2]].checked = value

    } else if (key === 'option-checked') {

        if (reports.reports[indexes[0]].params.standardReport === indexes[3]) {
            reports.reports[indexes[0]].params.standardReport = null
        } else {
            reports.reports[indexes[0]].params.standardReport = indexes[3]
        }


    } else if (key === 'generate') {

        let missing = ''

        if (reports.reports[indexes[0]].params.standardReport === null) {
            missing += 'Report Type '
        }

        let f = false
        for (var i = 0; i < reports.reports[indexes[0]].params.funds.length; i++) {
            if (reports.reports[indexes[0]].params.funds[i].checked) {
                f = true
            }
        }
        if (f === false) missing += 'Funds '

        let p = false
        for (var i = 0; i < reports.reports[indexes[0]].params.periods.length; i++) {
            if (reports.reports[indexes[0]].params.periods[i].checked) p = true
        }
        if (p === false) missing += 'Period '


        if (reports.reports[indexes[0]].params.standardReport !== null && f && p) {


            const report = {
                id: uuidv4(),
                isLoading: true,
                name: `Report ${reports.reports.length + 1}`,
                editable: false,
                headers: headers,
                items: items,
                params: {
                    funds: [],
                    periods: [],
                    standardReport: null
                },
            }
            reports.reports.push(report)
            dispatch(generateReport(report, 'standard'))


        } else {
            dispatch(createError(`MISSING: ${missing}`))
        }

    } else if (key === 'close') {
        const obj = reports.reports.splice(indexes[0], 1)
        dispatch(recycleItem(obj[0], 'reports', 'reports'))
    }

    dispatch({
        type: UPDATE_REPORTS,
        payload: reports
    })
}


export const generateReport = (report, reportType) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/supports/report/`)

    const body = {
        report: report,
        reportType: reportType
    }

    axios
        .post(url, body, config)
        .then(res => {
            dispatch({
                type: GENERATE_REPORT,
                payload: res.data
            });

        })
        .catch(err => {
            dispatch(createError('Report Failed to Generate'))
        });

}



const copyTextToClipboard = text => {
    if (!navigator.clipboard) {
        // fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        // console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

export const copyToClipboard = reportArray => (dispatch, getState) => {

    const copy2DToClipboard = array => {

        var csv = '', row, cell;

        for (row = 0; row < array.length; row++) {

            console.log('array-row', array[row])


            for (cell = 0; cell < array[row].length; cell++) {

                console.log('cell', array[row][cell])

                csv += (array[row][cell].value + '').replace(/[\n\t]+/g, ' ');

                if (cell + 1 < array[row].length) csv += '\t';
            }
            if (row + 1 < array.length) csv += '\n';
        }
        copyTextToClipboard(csv);
    }
    copy2DToClipboard(reportArray);
    dispatch(createSuccess('Copied to Clipboard'))
}
