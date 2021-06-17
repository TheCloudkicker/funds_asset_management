import { GET_CAPITAL, UPDATE_CAPITAL, SAVE_CAPITAL, DELETE_CAPITAL, ADD_CAPITAL_MOVEMENT } from '../actions/types'
import uuidv4 from 'uuid/v4'

const initialState = {
    isReadonly: true,
    capitalMovements: [],
    totalContributions: 0,
    totalDistributions: 0,
    totalPreferred: 0,
    isLoading: true,
    prefRate: null
}


const determineNewIndex = (movements, newMovement) => {

    let newIndex = movements.length - 1
    let d1 = new Date(`${newMovement.movementDate.current} 23:59:59`)
    let d2

    for (var i = 0; i < movements.length; i++) {

        d2 = new Date(`${movements[i].movementDate.current} 23:59:59`)

        if (d1.getTime() < d2.getTime()) {
            newIndex = i
            break
        }
    }

    return newIndex
}


export default function (state = initialState, action) {

    switch (action.type) {
        case ADD_CAPITAL_MOVEMENT:

            const newMovement = {
                'id': uuidv4(),
                'readOnly': false,
                'movementType': {
                    'previous': 'Contribution',
                    'current': 'Contribution',
                    'readOnly': false,
                    'options': [
                        { 'value': 'Contribution', 'label': 'Contribution' },
                        { 'value': 'Distribution', 'label': 'Distribution' },
                    ],
                    'isError': false,
                    'unsaved_changes': false
                },
                'totalAmount': {
                    'previous': 0,
                    'current': 0,
                    'placeholder': 'Enter net movement in USD',
                    'readOnly': false,
                    'isError': false,
                    'unsaved_changes': false
                },
                'movementDate': {
                    'previous': '',
                    'current': '',
                    'readOnly': false,
                    'isError': false,
                    'false': false,
                    'unsaved_changes': false
                },
                'addedBy': '',
                'dateAdded': '',
                'preferred': 0,
                'hasSupport': false,
            }
            console.log('ADD_CAPITAL_MOVEMENT')

            return {
                ...state,
                capitalMovements: [...state.capitalMovements, newMovement]
            }


        case DELETE_CAPITAL:
            const copy = [...state.capitalMovements]
            let tmp = copy.splice(state.capitalMovements.findIndex(c => c.id == action.payload.deletedID), 1)
            return {
                ...state,
                capitalMovements: copy
            }
        case SAVE_CAPITAL:
            const movsCopy = [...state.capitalMovements]
            let oldIndex, newIndex

            console.log('SAVE_CAPITAL', action.payload)

            if (action.payload.method === 'NEW_MOVEMENT') {
                oldIndex = movsCopy.findIndex(m => m.id === action.payload.movement.uuid)
            } else if (action.payload.method === 'UPDATE_MOVEMENT') {
                oldIndex = movsCopy.findIndex(m => m.id === action.payload.movement.id)
            }

            let t = movsCopy.splice(oldIndex, 1)
            newIndex = determineNewIndex(movsCopy, action.payload.movement)
            console.log('newIndex', newIndex)
            movsCopy.splice(newIndex, 0, action.payload.movement)
            return {
                ...state,
                capitalMovements: movsCopy,
            };
        case GET_CAPITAL:
            return {
                ...state,
                capitalMovements: action.payload.movements,
                totalContributions: action.payload.totalContributions,
                totalDistributions: action.payload.totalDistributions,
                totalPreferred: action.payload.totalPreferred,
                isLoading: false,
                prefRate: action.payload.prefRate
            };
        case UPDATE_CAPITAL:
            // console.log('UPDATE_CAPITAL', action.payload)
            return {
                ...state,
                capitalMovements: action.payload.capitalMovements,
                totalContributions: action.payload.totalContributions,
                totalDistributions: action.payload.totalDistributions,
                totalPreferred: action.payload.totalPreferred,
                isReadonly: action.payload.isReadonly,

            }

        default:
            return state;
    }
}