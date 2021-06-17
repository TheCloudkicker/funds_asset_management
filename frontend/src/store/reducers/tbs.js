import { GET_TBS, GET_TB, UPDATE_TB } from '../actions/types.js';

const initialState = {
    tbs: [],
    tb: {},
    loading: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_TB:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}