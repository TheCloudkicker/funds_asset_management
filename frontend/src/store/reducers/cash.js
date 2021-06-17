import { GET_CASH_MOVEMENTS, GET_CASH_MOVEMENT, ADD_CASH_MOVEMENTS, ADD_CASH_MOVEMENT, DELETE_CASH_MOVEMENT } from '../actions/types'


const initialState = {
    cashFlows: []
}


export default function (state = initialState, action) {

    switch (action.type) {
        case GET_CASH_MOVEMENTS:
            return {
                ...state,
                cashFlows: action.payload,
            };

        default:
            return state;
    }
}