import { GET_SETTINGS, UPDATE_SETTING, SAVE_SETTING } from '../actions/types.js';



const initVal = val => {

    return {
        current: val,
        previous: val,
        unsaved_changes: false,
        isError: false
    }
}

const initialState = {

    rounding_tolerance: initVal(0),
    date_format: initVal(''),
    defaultCcy: initVal(''),
    isDark: initVal(false),

};

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_SETTINGS:
            return {
                ...state,
                rounding_tolerance: action.payload.rounding_tolerance,
                date_format: action.payload.date_format,
                defaultCcy: action.payload.defaultCcy,
            };

        case UPDATE_SETTING:
            return {
                ...state,
                rounding_tolerance: action.payload.rounding_tolerance,
                date_format: action.payload.date_format,
                defaultCcy: action.payload.defaultCcy,
                isDark: action.payload.isDark
            };

        case SAVE_SETTING:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        default:
            return state;
    }
}