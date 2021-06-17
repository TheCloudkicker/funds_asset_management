import { CREATE_SUCCESS, CREATE_ERROR } from './types'

export const createSuccess = successMessage => {
    return {
        type: CREATE_SUCCESS,
        payload: successMessage,
    };
};
export const createError = errorMessage => {
    return {
        type: CREATE_ERROR,
        payload: errorMessage,
    };
};