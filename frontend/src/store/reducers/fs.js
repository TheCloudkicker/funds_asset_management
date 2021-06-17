import {
    GET_FSLIS, ADD_NEW_FSLI, FSLI_TOGGLE_EDIT, SAVE_FSLI, SELECT_FSLI,

    GET_FS, UPDATE_FSLI,
    DELETE_FSLI, UPDATE_FSLI_FILTER, ADD_FSLI, UPDATE_FSLI_IN_STORE,
    GET_UNMAPPED_ACCOUNTS, GET_GENERIC_MAPPINGS, GET_CUSTOM_MAPPINGS,
    ADD_GENERIC_MAPPING, UPDATE_SELECTED_FSLI, UPDATE_SELECTED_UNMAPPED,
    REMOVE_SELECTED_UNMAPPED
} from '../actions/types.js';
import uuidv4 from 'uuid/v4'

const initialState = {
    fslis: [],
    selectedFsli: null,










    statements: [
        {
            statement_name: "Balance Sheet",
            fsli_types: []
        },
        {
            statement_name: "Income Statement",
            fsli_types: []
        },
        {
            statement_name: "Statement of Equity",
            fsli_types: []
        },
    ],
    unmapped: [],
    statementsLoaded: false,

    generic_mappings: [],
    custom_mappings: [],

    unmapped_accounts: [],

    tb_mapping: {},

    selectedUnmapped: null,
    fsliInputValue: '',
    fsli: { name: '', fsli_type: '' },
    loading: false,

};

export default function (state = initialState, action) {

    switch (action.type) {
        case SELECT_FSLI:

            if (state.selectedFsli && state.selectedFsli.id === action.payload.id) {
                return {
                    ...state,
                    selectedFsli: null
                }
            } else {
                return {
                    ...state,
                    selectedFsli: action.payload
                }
            }


        case SAVE_FSLI:
            const copyFslis2 = [...state.fslis]
            let indexx;
            if (action.payload.created) {
                indexx = copyFslis2.findIndex(u => u.uuid === action.payload.uuid);
            } else {
                indexx = copyFslis2.findIndex(u => u.id === action.payload.id);
            }
            copyFslis2[indexx].unsaved_changes = false
            copyFslis2[indexx].editable = false

            return {
                ...state,
                fslis: copyFslis2

            }
        case FSLI_TOGGLE_EDIT:

            const copyFslis = [...state.fslis]
            let index = copyFslis.findIndex(u => u.id === action.payload.fsliID);
            copyFslis[index].editable = action.payload.isEditable

            return {
                ...state,
                fslis: copyFslis
            }

        case ADD_NEW_FSLI:

            const blankFsli = {
                'id': uuidv4(),
                'uuid': uuidv4(),
                'name': '',
                'name_prev': '',
                'fsliType': null,
                'fsliType_prev': null,
                'entityType': null,
                'noSubAccounts': 0,
                'editable': true,
                'unsaved_changes': true,
            }

            return {
                ...state,
                fslis: [...state.fslis, blankFsli]
            }
        case UPDATE_FSLI_IN_STORE:
            console.log('UPDATE_FSLI_IN_STORE', action.payload)

            const fslisCopy = [...state.fslis]
            const indx = fslisCopy.findIndex(f => f.id === action.payload.fsliID);
            fslisCopy[indx][action.payload.key] = action.payload.value

            return {
                ...state,
                fslis: fslisCopy,
            };
        case DELETE_FSLI:

            const fslisCopy2 = [...state.fslis]

            const delIndex = fslisCopy2.findIndex(f => f.id === action.payload.deletedID);
            fslisCopy2.splice(delIndex, 1)

            return {
                ...state,
                fslis: fslisCopy2
            };
        case UPDATE_SELECTED_FSLI:
            return {
                ...state,
                selectedFsli: action.payload,
            };
        case REMOVE_SELECTED_UNMAPPED:
            const remIndex = state.selectedUnmapped.findIndex(u => u.value === action.payload);
            const newSelectedUnmapped = state.selectedUnmapped
            newSelectedUnmapped.splice(remIndex, 1)
            return {
                ...state,
                selectedUnmapped: newSelectedUnmapped,
            };
        case UPDATE_SELECTED_UNMAPPED:
            return {
                ...state,
                selectedUnmapped: action.payload,
            };
        case ADD_FSLI:
            return {
                ...state,
                fslis: [...state.fslis.concat(action.payload)],
            };
        case GET_UNMAPPED_ACCOUNTS:
            return {
                ...state,
                unmapped_accounts: action.payload,
            };
        case ADD_GENERIC_MAPPING:
            console.log("ADDED GENERIC MAPPING")

            const delUnmappedIndex = state.unmapped_accounts.findIndex(u => u.id === action.payload.accountID);
            const newUnmapped = state.unmapped_accounts
            newUnmapped.splice(delUnmappedIndex, 1)

            return {
                ...state,
                generic_mappings: [...state.generic_mappings.concat(action.payload)],
                unmapped_accounts: newUnmapped
            };
        case GET_GENERIC_MAPPINGS:
            return {
                ...state,
                generic_mappings: action.payload,
            };
        case GET_CUSTOM_MAPPINGS:
            return {
                ...state,
                custom_mappings: action.payload,
            };
        case GET_FS:
            return {
                ...state,
                statements: action.payload.fs,
                unmapped: action.payload.unmapped,
                statementsLoaded: true
            };
        case GET_FSLIS:
            return {
                ...state,
                fslis: action.payload,
            };
        case UPDATE_FSLI_FILTER:
            return {
                ...state,
                fsliInputValue: action.payload,
            };
        default:
            return state;
    }
}