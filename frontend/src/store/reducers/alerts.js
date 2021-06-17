import { CREATE_SUCCESS, CREATE_ERROR } from '../actions/types';


const initialState = {
    successMessage: '',
    successTime: null,
    successStatus: null,
    errorMessage: '',
    errorTime: null,
    errrorStatus: null,
}


export default function (state = initialState, action) {

    switch (action.type) {
        case CREATE_SUCCESS:
            return {
                ...state,
                successMessage: action.payload,
                successTime: new Date(),
            };
        case CREATE_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                errorTime: new Date(),
            };

        default:
            return state;
    }
}