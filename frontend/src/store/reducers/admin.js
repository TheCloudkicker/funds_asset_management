import {
    TOGGLE_SETUP_MODAL, GET_CLIENT_MAPPINGS, GET_FUND_OVERVIEW,
} from '../actions/types.js';
import uuidv4 from 'uuid/v4'

const initialState = {
    health: {},
    title: 'Waibe Setup',
    loading: false,
    tb: [],
    hld_mappings: [],
    tb_mappings: [],



};



export default function (state = initialState, action) {

    var index1;

    switch (action.type) {


        case GET_CLIENT_MAPPINGS:
            return {
                ...state,
                hld_mappings: action.payload,
            };
        case TOGGLE_SETUP_MODAL:
            return {
                ...state,
                modalVisible: action.payload,
            };
        case GET_FUND_OVERVIEW:
            return {
                ...state,
                fund_overview_investments: action.payload.fund_overview_investments,
                fund_overview_periods: action.payload.fund_overview_periods,
            };
        default:
            return state;
    }
}

