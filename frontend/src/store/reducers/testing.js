import {
    GET_TESTING_SUMMARY, GET_TESTING_OVERVIEW, UPDATE_TESTING_AREAS,
    SET_TESTING_VIEW, DELETE_CARRY_OTHER_ATTACH, ADD_CARRY_OTHER_ATTACH,

} from '../actions/types.js';

import uuidv4 from 'uuid/v4'

const initialState = {

    isLoading: false,

    headers: [
        { id: 1, title: "Entity" },
        { id: 2, title: "Results" },
        { id: 3, title: "Client" },
        { id: 4, title: "PwC" },
        { id: 5, title: "Difference" },
        { id: 6, title: "Status" },
    ],
    items: [],

    testingAreas: [
        {
            name: 'asssets',
            isOpen: true,
            subAreas: [
                { 'id': 1, 'name': 'Invest Rec', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 2, 'name': 'Invest MV', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 3, 'name': 'Due from RP', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 4, 'name': 'Other Assets', 'status': { 'total': 15, 'ready': 5 } },
            ]
        },
        {
            name: 'liabilities',
            isOpen: true,
            subAreas: [
                { 'id': 1, 'name': 'Mgmt Fee Payable', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 2, 'name': 'Accrued Exp', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 3, 'name': 'Notes Payable', 'status': { 'total': 15, 'ready': 5 } },
            ]
        },
        {
            name: 'incomes',
            isOpen: true,
            subAreas: [
                { 'id': 1, 'name': 'Dividends', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 2, 'name': 'Interest', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 3, 'name': 'Other', 'status': { 'total': 15, 'ready': 5 } },
            ]
        },
        {
            name: 'expenses',
            isOpen: true,
            subAreas: [
                { 'id': 1, 'name': 'Mgmt Fees', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 2, 'name': 'Int Exp', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 3, 'name': 'Prof Fees', 'status': { 'total': 15, 'ready': 5 } },
            ]
        },
        {
            name: 'capitals',
            isOpen: true,
            subAreas: [
                { 'id': 1, 'name': 'Equity', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 2, 'name': 'Carry', 'status': { 'total': 15, 'ready': 5 } },
            ]
        },
        {
            name: 'fss',
            isOpen: true,
            subAreas: [
                { 'id': 1, 'name': 'IRR', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 2, 'name': 'FiHi', 'status': { 'total': 15, 'ready': 5 } },
                { 'id': 3, 'name': 'Exp Ratio', 'status': { 'total': 15, 'ready': 5 } },
            ]
        },
    ],

};


const checkAll = (questions, isOpenBool) => {

    for (var k = 0; k < questions.length; k++) {

        if (questions[k].isOpen !== isOpenBool) {
            return false
        }
    }

    return true

}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_TESTING_OVERVIEW:
            console.log('GET_TESTING_OVERVIEW', action.payload)
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            };

        case GET_TESTING_SUMMARY:
            console.log('GET_TESTING_SUMMARY', action.payload)
            return {
                ...state,
                items: [],
            }

        case UPDATE_TESTING_AREAS:
            console.log('UPDATE_TESTING_AREAS', action.payload)
            return {
                ...state,
                testingAreas: action.payload,
            }


        default:
            return state;
    }
}