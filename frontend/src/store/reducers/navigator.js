import { SET_ENTITY_POSITION, CALCULATE_NAVIGATOR_LINES, ADJUST_NAVIGATOR_LINES, GET_STRUCTURE } from '../actions/types.js';

const initialState = {
    structure: null,
    ownership_lines: [],
    ownership_texts: []
};
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_STRUCTURE:
            return {
                ...state,
                structure: action.payload

            }
        case ADJUST_NAVIGATOR_LINES:
            console.log('ADJUST_NAVIGATOR_LINES')
            const bCopy = [...state.ownership_lines]

            for (var i = 0; i < bCopy.length; i++) {
                bCopy[i][0] = bCopy[i][0] + 50

            }

            return {
                ...state,
                ownership_lines: bCopy
            };

        case SET_ENTITY_POSITION:

            const aCopy = { ...state.structure }
            let index = aCopy[action.payload.level].findIndex(f => f.id === action.payload.entityID);
            aCopy[action.payload.level][index].coordinates = action.payload.coordinates

            return {
                ...state,
                structure: aCopy
            };


        case CALCULATE_NAVIGATOR_LINES:

            return {
                ...state,
                ownership_lines: action.payload.ownership_lines,
                ownership_texts: action.payload.ownership_texts
            }
        default:
            return state;
    }
}