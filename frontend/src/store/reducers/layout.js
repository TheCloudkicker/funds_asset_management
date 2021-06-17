import {
    UPDATE_LAYOUT,
    UPDATE_APP_VIEW, WINOW_RESIZED,
    UPDATE_REDIRECT_APP, LOCK_LEFT_NAV, TOGGLE_IS_DARK, TOGGLE_SIDE_NAV,

} from '../actions/types.js';

const initialState = {
    isDark: true,
    mainView: "SUMMARY",
    leftNavExpanded: false,
    leftNavLocked: false,

    detailView: false,

    app: "Waibe",
    subApp: null,
    sidePanel: null,

    redirectApp: null,
    dateVisible: false,

    modalVisible: false,
    modalForm: null,

    resized: 0,
    breadcrumbVisible: false,


    appString: 'Main',
    clientString: null,
    fundString: null,
    yearString: null,
    investmentString: null,
};

export default function (state = initialState, action) {

    switch (action.type) {

        case UPDATE_LAYOUT:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }

        case WINOW_RESIZED:
            return {
                ...state,
                resized: state.resized += 1

            }
        case LOCK_LEFT_NAV:
            return {
                ...state,
                leftNavLocked: action.payload,
            };

        case TOGGLE_IS_DARK:
            return {
                ...state,
                isDark: action.payload,
            };

        case UPDATE_REDIRECT_APP:
            return {
                ...state,
                redirectApp: action.payload,
            };
        case UPDATE_APP_VIEW:
            return {
                ...state,
                app: action.payload.app,
                subApp: action.payload.subApp

            };
        case TOGGLE_SIDE_NAV:
            return {
                ...state,
                leftNavExpanded: action.payload,
            };
        default:
            return state;
    }
}