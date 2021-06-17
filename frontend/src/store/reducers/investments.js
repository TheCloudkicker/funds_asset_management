import {
    GET_INVESTMENTS, ADD_INVESTMENT, DELETE_INVESTMENT, UPDATE_INVESTMENT,
    SET_SEL_INVESTMENT, TOGGLE_INV_LOADING, GET_INVESTMENT_DETAILS,
    SAVE_INVESTMENT_CRITERIA
} from '../actions/types.js';


const initialState = {
    selectedInvestment: null,
    investments: [],
    headers: [],
    isLoading: false
};
export default function (state = initialState, action) {

    switch (action.type) {
        case SAVE_INVESTMENT_CRITERIA:

            const headerCopy = [...state.headers]
            headerCopy.push({ value: action.payload.criteria.key, label: action.payload.criteria.text })

            return {
                ...state,
                headers: headerCopy
            }

        case GET_INVESTMENTS:
            return {
                ...state,
                investments: action.payload.investments,
                headers: action.payload.headers,
                isLoading: false,
            };
        case GET_INVESTMENT_DETAILS:

            return {
                ...state,
                details: action.payload,
                isLoading: false
            }
        case TOGGLE_INV_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_SEL_INVESTMENT:
            return {
                ...state,
                selectedInvestment: action.payload
            }

        default:
            return state;
    }
}