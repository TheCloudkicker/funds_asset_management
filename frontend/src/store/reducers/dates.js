import { GET_DATES, ADD_DATE, DELETE_DATE, UPDATE_DATE } from '../actions/types.js';

const initialState = {
    todaysDate: new Date(),
    dates: [],
    date: {}
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_DATES:
            return {
                ...state,
                dates: action.payload,
            };
        default:
            return state;
    }
}