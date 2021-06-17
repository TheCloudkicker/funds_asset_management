import { GET_RECYCLED_ITEMS, RECYCLE_ITEM, DELETE_RECYCLE_ITEM } from '../actions/types.js';

const initialState = {
    isLoading: false,
    recycled_items: [],
};

export default function (state = initialState, action) {

    switch (action.type) {
        case DELETE_RECYCLE_ITEM:
            return {
                ...state,
                recycled_items: state.recycled_items.filter(item => item.id !== action.payload)
            }
        case RECYCLE_ITEM:
            return {
                ...state,
                recycled_items: [...state.recycled_items, action.payload],
            }
        case GET_RECYCLED_ITEMS:
            return {
                ...state,
                recycled_items: action.payload,
            };
        default:
            return state;
    }
}