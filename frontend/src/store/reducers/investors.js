import {
    GET_INVESTORS,
    UPDATE_INVESTORS,
    SAVE_INVESTOR,
    DELETE_INVESTOR,
    SAVE_INVESTOR_CRITERIA
} from '../actions/types.js';


const initialState = {
    headers: [
        { value: 1, label: 'Investor Name' },
        { value: 2, label: 'Commitment' },
        { value: 3, label: 'Is Affiliate' },
        { value: 4, label: '' },
    ],
    investors: [],
    isReadonly: true,
};

const checkForUnsaved = investor => {

    if (investor.is_affiliate.value === investor.prev_is_affiliate.value &&
        investor.is_rdr.value === investor.prev_is_rdr.value &&
        investor.is_casp.value === investor.prev_is_casp.value) {
        return false
    } else {
        return true
    }


}

export default function (state = initialState, action) {

    switch (action.type) {

        case SAVE_INVESTOR_CRITERIA:

            const headerCopy = [...state.headers]
            headerCopy.push({ value: action.payload.criteria.key, label: action.payload.criteria.text })

            return {
                ...state,
                headers: headerCopy
            }

        case GET_INVESTORS:
            return {
                ...state,
                investors: action.payload.investors,
                headers: action.payload.headers,
            };
        case SAVE_INVESTOR:
            console.log('SAVE_INVESTOR', action.payload)
            const copy = [...state.investors]
            const indy = copy.findIndex(i => i.id === action.payload.investor.id)
            let t = copy.splice(indy, 1)
            copy.splice(indy, 0, action.payload.investor)

            return {
                ...state,
                investors: copy
            }

        case UPDATE_INVESTORS:


            return {
                ...state,
                investors: action.payload.investors,
            };

        default:
            return state;
    }
}