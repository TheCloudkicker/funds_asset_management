import {
    GET_DATABASE, UPDATE_DATABASE,


    UPDATE_DB_OBJECT, GET_DB_OBJECT, SAVE_DB_OBJECT, UPDATE_FUND_CLIENT_REPORT_OBJECT,
    GET_CLIENT_REPORTS, SAVE_FUND_CLIENT_REPORT
} from '../actions/types.js';
import uuidv4 from 'uuid/v4'


const initialState = {

    database: [],

    databaseObj: {
        Funds: {
            title: 'Fund Reports',
            isOpen: true,
            reports: []
        },
        Investments: {
            title: 'Investment Reports',
            isOpen: true,
            reports: []
        },
        Investors: {
            title: 'Investor Reports',
            isOpen: true,
            reports: []
        }
    },

    fundClientReports: []
}

export default function (state = initialState, action) {

    switch (action.type) {
        case UPDATE_DATABASE:
            return {
                ...state,
                database: action.payload.database
            }
        case GET_DATABASE:

            return {
                ...state,
                database: action.payload
            }


        case SAVE_FUND_CLIENT_REPORT:

            console.log('SAVE_FUND_CLIENT_REPORT', action.payload)

            const fundClientReports2 = [...state.fundClientReports]

            let indy4 = fundClientReports2.findIndex(r => r.id === action.payload.id)

            fundClientReports2.splice(indy4, 1, action.payload)

            return {
                ...state,
                fundClientReports: fundClientReports2
            }
        case GET_CLIENT_REPORTS:

            return {
                ...state,
                fundClientReports: action.payload
            }
        case UPDATE_FUND_CLIENT_REPORT_OBJECT:

            const fundClientReports1 = [...state.fundClientReports]

            if (action.payload.key === 'isOpen') {


                for (var i = 0; i < fundClientReports1.length; i++) {
                    if (fundClientReports1[i].isOpen) {
                        fundClientReports1[i].isOpen = false
                    }

                    fundClientReports1[action.payload.reportIndex][action.payload.key] = action.payload.value

                }

            } else if (action.payload.key !== 'isOpen' && action.payload.mappingIndex === null) {

                fundClientReports1[action.payload.reportIndex][action.payload.key].current = action.payload.value

                if (fundClientReports1[action.payload.reportIndex][action.payload.key].current === fundClientReports1[action.payload.reportIndex][action.payload.key].previous) {
                    fundClientReports1[action.payload.reportIndex][action.payload.key].unsaved_changes = false
                } else {
                    fundClientReports1[action.payload.reportIndex][action.payload.key].unsaved_changes = true
                }

            } else if (action.payload.key !== 'isOpen' && action.payload.mappingIndex !== null) {

                fundClientReports1[action.payload.reportIndex].mappings[action.payload.mappingIndex][action.payload.key].current = [action.payload.value,]

                console.log("AAA", fundClientReports1[action.payload.reportIndex].mappings[action.payload.mappingIndex][action.payload.key])

                if (fundClientReports1[action.payload.reportIndex].mappings[action.payload.mappingIndex][action.payload.key].current === fundClientReports1[action.payload.reportIndex].mappings[action.payload.mappingIndex][action.payload.key].previous) {
                    fundClientReports1[action.payload.reportIndex].mappings[action.payload.mappingIndex][action.payload.key].unsaved_changes = false
                } else {
                    fundClientReports1[action.payload.reportIndex].mappings[action.payload.mappingIndex][action.payload.key].unsaved_changes = true
                }

            }



            return {
                ...state,
                fundClientReports: fundClientReports1
            }
        case SAVE_DB_OBJECT:
        case GET_DB_OBJECT:
            return {
                ...state,
                databaseObj: action.payload

            }
        case UPDATE_DB_OBJECT:
            console.log('UPDATE_DB_OBJECT', action.payload)
            const dbCopy = { ...state.databaseObj }

            if (action.payload.reportIndex === null) {
                dbCopy[action.payload.type][action.payload.key] = action.payload.value
            } else {

                if (!action.payload.headerID) {

                    if (action.payload.key === 'identifier' || action.payload.key === 'name') {
                        dbCopy[action.payload.type].reports[action.payload.reportIndex][action.payload.key].current = action.payload.value

                        if (dbCopy[action.payload.type].reports[action.payload.reportIndex][action.payload.key].current == dbCopy[action.payload.type].reports[action.payload.reportIndex][action.payload.key].previous) {
                            dbCopy[action.payload.type].reports[action.payload.reportIndex][action.payload.key].unsaved_changes = false
                        } else {
                            dbCopy[action.payload.type].reports[action.payload.reportIndex][action.payload.key].unsaved_changes = true
                        }
                    } else {
                        dbCopy[action.payload.type].reports[action.payload.reportIndex][action.payload.key] = action.payload.value
                    }

                }

            }


            return {
                ...state,
                databaseObj: dbCopy

            }
        default:
            return state;
    }
}