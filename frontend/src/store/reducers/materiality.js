import { GET_MATERIALITY, UPDATE_MATERIALITY } from '../actions/types.js';

const initialState = {

    accounts: [],
    net_assets: 10000,
    audit_setting: null,

    dictating_entity: "Fund 4",
    overall_bps: 500,
    overall_amount: 5000,
    performance_percent: 37.5,
    performance_amount: 3750,
    deminimis_percent: 50,
    deminimis_amount: 50,



};

export default function (state = initialState, action) {

    switch (action.type) {
        case UPDATE_MATERIALITY:
            return {
                ...state,
                overall_amount: action.payload.overall_amount,
                performance_amount: action.payload.performance_amount,
                deminimis_amount: action.payload.deminimis_amount,
            }
        case GET_MATERIALITY:
            return {
                ...state,
                audit_setting: action.payload.audit_setting,
                net_assets: action.payload.net_assets,
                overall_bps: action.payload.audit_setting.overall,
                performance_percent: action.payload.audit_setting.performance,
                deminimis_percent: action.payload.audit_setting.deminimis,
                accounts: action.payload.accounts,
            };
        default:
            return state;
    }
}