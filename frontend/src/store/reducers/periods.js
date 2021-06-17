import { GET_PERIODS, SET_SELECTED_PERIOD } from '../actions/types.js';

const initialState = {
    periods: [],
    selectedPeriod: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PERIODS:
            let selectedPeriod = null
            for (var i = 0; i < action.payload.length; i++) {
                if (action.payload[i].active) {
                    selectedPeriod = action.payload[i]
                }
            }

            return {
                ...state,
                periods: action.payload,
                selectedPeriod: selectedPeriod
            };
        case SET_SELECTED_PERIOD:
            return {
                ...state,
                selectedPeriod: action.payload,
            };
        default:
            return state;
    }
}