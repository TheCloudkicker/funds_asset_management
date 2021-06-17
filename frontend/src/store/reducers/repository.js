import {
    GET_REPOSITORY, UPDATE_REPOSITORY,

    ADD_SUPPORT,

    TOGGLE_REPO_LOADING, DELETE_SUPPORT_ITEM,
} from '../actions/types.js';
import uuidv4 from 'uuid/v4'

const initialState = {
    isLoading: false,
    headers: [],
    items: [],
};


export default function (state = initialState, action) {

    switch (action.type) {
        case ADD_SUPPORT:

            return {
                ...state,
                items: action.payload
            }
        case UPDATE_REPOSITORY:

            return {
                ...state,
                headers: action.payload.headers,
                items: action.payload.items,
            }

        case GET_REPOSITORY:
            return {
                ...state,
                isLoading: false,
                headers: action.payload.headers,
                items: action.payload.items,
            };


        case DELETE_SUPPORT_ITEM:

            return {
                ...state,
            }
        case TOGGLE_REPO_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            return state;
    }
}