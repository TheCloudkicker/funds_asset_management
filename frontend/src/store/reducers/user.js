import * as actionTypes from '../actions/types'

import { SET_USER, CLEAR_USER, GET_PROFILES, SET_SELECTED_PROFILE } from '../actions/types.js';



const initialUserState = {
    currentUser: null,
    isLoading: true,
    profiles: [],
    selectedProfile: null,

}

const user = (state = initialUserState, action) => {
    switch (action.type) {
        case SET_SELECTED_PROFILE:

            return {
                ...state,
                selectedProfile: action.payload
            }

        case GET_PROFILES:

            return {
                ...state,
                profiles: action.payload,
            }

        case SET_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

export default user