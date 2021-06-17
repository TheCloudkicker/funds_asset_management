import {
    UPDATE_REPORTS, GENERATE_REPORT, DELETE_REPORT, ADD_REPORT,

    GET_REPORT_OPTIONS, INIT_REPORT
} from '../actions/types.js';

import uuidv4 from 'uuid/v4'

const values = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
]
const headers = [
    { id: 1, title: 'Header 1' },
    { id: 2, title: 'Header 2' },
    { id: 3, title: 'Header 3' },
    { id: 4, title: 'Header 4' },
]
const items = [
    { id: 1, title: 'A', values: values },
    { id: 2, title: 'B', values: values },
    { id: 3, title: 'C', values: values },
    { id: 4, title: 'D', values: values },
]
const initReport = {
    id: uuidv4(),
    isLoading: true,
    name: 'Sheet 1',
    editable: false,
    headers: headers,
    items: items,


    params: {
        funds: [],
        periods: [],
    }
}

const initialState = {

    selectedReport: null,
    isLoading: false,

    reports: [],


    standardOptions: [
        { value: 1, label: 'Materiality' },
        { value: 2, label: 'Scoping' },
    ],



};

export default function (state = initialState, action) {

    switch (action.type) {
        case INIT_REPORT:
            return {
                ...state,
                reports: [...state.reports, action.payload]
            }
        case ADD_REPORT:

            const copy = [...state.reports]
            copy.push(action.payload.data)

            return {
                ...state,
                reports: copy
            }

        case DELETE_REPORT:

            return {
                ...state,

            }

        case UPDATE_REPORTS:
            return {
                ...state,
                reports: action.payload.reports
            }

        case GENERATE_REPORT:

            const cpy = [...state.reports]
            const i = cpy.findIndex(r => r.id === action.payload.report.id)
            console.log('i', i)
            let t = cpy.splice(i, 1)

            cpy.splice(i, 0, action.payload.report)
            cpy[i].isLoading = false


            return {
                ...state,
                reports: cpy

            }

        default:
            return state;
    }
}




// selected_standard_report: {
//     'headers': [
//         { id: 1, name: 'header 1' },
//         { id: 2, name: 'header 2' },
//         { id: 3, name: 'header 3' },
//         { id: 4, name: 'header 4' },
//         { id: 5, name: 'header 5' },
//     ],
//     'data': [
//         { id: 1, name: 'Item 1' },
//         { id: 2, name: 'Item 2' },
//         { id: 3, name: 'Item 3' },
//         { id: 4, name: 'Item 4' },
//         { id: 5, name: 'Item 5' },
//     ]
// }