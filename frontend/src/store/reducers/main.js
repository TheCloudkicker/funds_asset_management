import {
    GET_CURRENCIES, ADD_CURRENCY, UPDATE_CURRENCY, DELETE_CURRENCY,
    GET_COUNTRIES, GET_COUNTRY, ADD_COUNTRY, UPDATE_COUNTRY, DELETE_COUNTRY,
    GET_GAAPS, GET_GAAP, ADD_GAAP, UPDATE_GAAP, DELETE_GAAP,
    GET_AUDITORS, GET_AUDITOR, ADD_AUDITOR, UPDATE_AUDITOR, DELETE_AUDITOR,


    UPDATE_AUDIT_SETTINGS, GET_AUDIT_SETTINGS, SAVE_ADUIT_SETTINGS, ADD_AUDIT_SETTING, DELETE_AUDIT_SETTING
} from '../actions/types.js';

import uuidv4 from 'uuid/v4'

const initialState = {
    currencies: [],
    countries: [],
    gaaps: [],
    auditors: [],

    auditSettings: [],
}


export default function (state = initialState, action) {

    switch (action.type) {

        case UPDATE_AUDIT_SETTINGS:
            console.log('UPDATE_AUDIT_SETTINGS', action.payload)
            return {
                ...state,
                auditSettings: action.payload
            }
        case DELETE_AUDIT_SETTING:
            const copy = [...state.auditSettings]
            const index = copy.findIndex(a => a.id === action.payload.deletedID)
            copy.splice(index, 1)

            return {
                ...state,
                auditSettings: copy
            }
        case ADD_AUDIT_SETTING:
            console.log("ADD", action.payload)
            let uuid = uuidv4()
            const newSetting = {
                id: uuid,
                value: uuid,
                editable: true,
                label: '',
                name: {
                    current: '',
                    previous: '',
                    unsaved_changes: false,
                    readOnly: false,
                    isError: false,
                },
                benchmark: {
                    current: null,
                    previous: null,
                    unsaved_changes: false,
                    readOnly: false,
                    isError: false,
                },
                overall: {
                    current: 0,
                    previous: 0,
                    unsaved_changes: false,
                    readOnly: false,
                    isError: false,
                },
                performance: {
                    current: 0,
                    previous: 0,
                    unsaved_changes: false,
                    readOnly: false,
                    isError: false,
                },
                deminimis: {
                    current: 0,
                    previous: 0,
                    unsaved_changes: false,
                    readOnly: false,
                    isError: false,
                },
            }
            return {
                ...state,
                auditSettings: [...state.auditSettings, newSetting]

            }
        case SAVE_ADUIT_SETTINGS:
            const copy3 = [...state.auditSettings]
            const index3 = copy3.findIndex(a => a.id === action.payload.uuid)
            copy3.splice(index3, 1)
            copy3.splice(index3, 0, action.payload)
            return {
                ...state,
                auditSettings: copy3,
            }
        case GET_AUDIT_SETTINGS:
            return {
                ...state,
                auditSettings: action.payload,
            }

        case GET_CURRENCIES:
            return {
                ...state,
                currencies: action.payload,
            };
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };
        case GET_GAAPS:
            return {
                ...state,
                gaaps: action.payload,
            };
        case GET_AUDITORS:
            return {
                ...state,
                auditors: action.payload,
            };
        default:
            return state;
    }
}