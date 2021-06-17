import {
    GET_CARRY, UPDATE_CARRY_SECTION, UPDATE_CARRY_COMPARE, SAVE_CARRY, SET_CARRY_LOADING,

    UPDATE_CARRY_DETAIL, SAVE_CLIENT_DETAIL, UPDATE_CARRY_CALC, SAVE_CLIENT_VALUE, SAVE_PARAMETER
} from '../actions/types'

const initialState = {
    isLoading: false,
    isReadOnly: true,

    carryDict: {},

    affilInfo: {
        'total_commitments': 100,
        'unaff_commitments': 100,
        'percent': 100
    },

    supportDetails: [
        {
            name: 'derivatives',
            years: [],
            total: 0
        },
        {
            name: 'other_income',
            years: [],
            total: 0
        },
        {
            name: 'master',
            years: [],
            total: 0
        },
    ],


    sections: {
        investor: {
            'primaryTitle': 'Step 1',
            'secondaryTitle': 'Investor Flows',
            'rows': [],
        },
        investment: {
            'primaryTitle': 'Step 2',
            'secondaryTitle': 'Investment Flows',
            'rows': []
        },
        allocation: {
            primaryTitle: 'Step 3',
            secondaryTitle: 'Allocation',
            rows: [],
        }
    },

    clientValue: {
        'current': 0,
        'previous': 0,
        'unsaved_data': false,
        'readOnly': true,
        'isError': false,
    },

    difference: 0,
    conclusion: 'Difference is below SUM'

}



export default function (state = initialState, action) {

    switch (action.type) {
        case SET_CARRY_LOADING:

            return {
                ...state,
                isLoading: action.payload
            }
        case SAVE_PARAMETER:

            console.log("SAVE_PARAMETER", action.payload)

            return {
                ...state
            }
        case SAVE_CLIENT_DETAIL:

            if (action.payload.actType === null) {

                const copyDetails = [...state.supportDetails]
                const detIndex = copyDetails.findIndex(s => s.name === action.payload.dataType)
                const yearIndex = copyDetails[detIndex].years.findIndex(y => y.year === action.payload.year)
                let t1 = copyDetails[detIndex].years.splice(yearIndex, 1)
                copyDetails[detIndex].years.splice(yearIndex, 0, action.payload.value)

                return {
                    ...state,
                    supportDetails: copyDetails
                }


            } else {
                console.log('HERR')
                return {
                    ...state,
                }

            }





        case SAVE_CLIENT_VALUE:
            return {
                ...state,
                clientValue: action.payload.client_value
            }
        case UPDATE_CARRY_COMPARE:

            return {
                ...state,
                clientValue: action.payload.clientValue,
                difference: action.payload.difference,
                conclusion: action.payload.conclusion,
                isReadOnly: action.payload.isReadOnly,

            }
        case UPDATE_CARRY_DETAIL:

            return {
                ...state,
                supportDetails: action.payload
            }
        case UPDATE_CARRY_SECTION:
            const copy = { ...state.sections }
            copy[action.payload.key] = action.payload.value
            return {
                ...state,
                sections: copy
            }
        case GET_CARRY:


            return {
                ...state,
                sections: action.payload.sections,
                supportDetails: action.payload.supportDetails,
                carryDict: action.payload.carryDict,
                clientValue: action.payload.clientValue,
                affilInfo: action.payload.affilInfo,
                isLoading: false
            }

        default:
            return state;
    }
}