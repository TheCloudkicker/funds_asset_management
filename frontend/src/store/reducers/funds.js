import {
    SAVE_FUND, UPDATE_FUND, SAVE_FUND_CRITERIA,

    GET_FUNDS, ADD_FUND, DELETE_FUND,
    CHANGE_SELECTED_FUND, CHANGE_OWNERSHIP_INFO,
    SET_ENTITY_OPTIONS, ADD_NEW_OWNERSHIP, TOGGLE_OWNERSHIPS_LOADING,
    ADD_CHILD_OWNERSHIP, ADD_ALT_FUND_NAME, DELETE_ALT_FUND_NAME, SAVE_ALT_FUND_NAME, UPDATE_ALT_FUND_NAME, GET_ALT_NAMES,

    GET_SUPPORT_DATA,

    GET_ENTITY_OWNERSHIPS, DELETE_OWNERSHIP, SAVE_OWNERSHIP,
    SELECT_OWNERSHIP, ADD_BLOCKER_OWNER, GET_BLOCKER_OWNERS, UPDATE_BLOCKER_OWNERSHIP_INFO,
    SET_SELECTED_BLOCKER, TOGGLE_BLOCKER_LOADING, DELETE_BLOCKER_OWNERSHIP, SAVE_BLOCKER_OWNERSHIP,
    GET_FUND_DETAILS, GET_FUNDS_SETUP, TOGGLE_FUND_LOADING,
    ADD_NEW_FUND
} from '../actions/types.js';
import uuidv4 from 'uuid/v4'
import { updateFundDetails } from './functions/funds'

const initialState = {

    isReadOnly: true,
    isLoading: false,
    selectedFund: null,
    funds: [],
    headers: [],

    aliases: [],

    fundObject: {
        id: '',
        details: [],
        alt_names: [],

        legacy: {
            capital_movements: [],
            investment_years: [],
            allocation_years: [],
            derivative_years: []
        },
    },

    uploaded_reports: [],


    //OWNERSHIPS
    entity_ownership_obj: {
        'value': '',
        'label': '',
        'combined_entities': [],
        'consolidated_entities': [],
        'unconsolidated_entities': [],
        'accounts': [],
        'level': '',
    },

    selected_ownership: null,
    owner_options: [],
    owned_options: [],
    ownershipsLoading: false,

};

const checkForChanges = ownership => {
    if (ownership.ownership_percentage == ownership.prev_ownership_percentage &&
        ownership.ownership_type.value === ownership.prev_ownership_type.value &&
        ownership.owner_entity.value === ownership.prev_owner_entity_id) {
        return false
    } else {
        return true
    }
}

const addBlankOwnership = () => {

    return {
        'value': '',
        'label': '',
        'combined_entities': [],
        'consolidated_entities': [],
        'unconsolidated_entities': [],
        'accounts': [],
        'level': '',
    }

}


const checkChildren = (ownerEntity, targetEntity) => {

    let children = ownerEntity.unconsolidated_entities.concat(ownerEntity.consolidated_entities);

    for (var i = 0; i < children.length; i++) {

        if (children[i].value === targetEntity.value) {
            children[i].unconsolidated_entities.push(addBlankOwnership())
            console.log('found it', children[i])
            continue
        } else {
            console.log('not it')
            if (children[i].unconsolidated_entities.length !== 0 || children[i].consolidated_entities.length) {
                console.log('checking children')
                checkChildren(children[i], targetEntity)

            }

        }
    }
}


export default function (state = initialState, action) {

    switch (action.type) {
        case GET_FUNDS:
            return {
                ...state,
                funds: action.payload.funds,
                headers: action.payload.headers,
            };
        case SAVE_FUND_CRITERIA:

            const fundObjectCopy3 = { ...state.fundObject }
            fundObjectCopy3.details.push(action.payload.criteria)

            const headerCopy = [...state.headers]
            headerCopy.push({ value: action.payload.criteria.key, label: action.payload.criteria.text })

            return {
                ...state,
                headers: headerCopy,
                fundObject: fundObjectCopy3
            };

        case UPDATE_FUND:

            return updateFundDetails({ ...state }, action.payload);

        case SAVE_FUND:

            if (action.payload.method === 'UPDATE_FUND') {

                return {
                    ...state,
                    fundObject: action.payload.fundObject
                };
            }



        case GET_SUPPORT_DATA:

            if (action.payload.calledBy === 'carryObject') {

                const capSumCopy = [...state.capitalSummary]
                let indy1 = capSumCopy.findIndex(m => m.id == action.payload.id)
                capSumCopy[indy1].status = 'Calculating totals'

                return {
                    ...state,
                    capitalLoading: false,
                    capitalSummary: capSumCopy,
                }

            } else if (action.payload.calledBy === 'fundObject') {

                const gCopy = { ...state.fundObject }
                let index4 = gCopy.uploaded_reports.findIndex(f => f.id == action.payload.id)
                gCopy.uploaded_reports[index4].data = action.payload.data
                gCopy.uploaded_reports[index4].dataStatus = 'Data loaded'

                return {
                    ...state,
                    fundObject: gCopy,
                }
            }


        case TOGGLE_FUND_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case GET_ALT_NAMES:

            return {
                ...state,
                aliases: action.payload
            }


        case UPDATE_ALT_FUND_NAME:

            const detailsCopy = { ...state.fundObject }

            detailsCopy.alt_names[action.payload.index][action.payload.key].current = action.payload.value

            if (detailsCopy.alt_names[action.payload.index][action.payload.key].current == detailsCopy.alt_names[action.payload.index][action.payload.key].previous) {
                detailsCopy.alt_names[action.payload.index][action.payload.key].unsaved_changes = false
            } else {
                detailsCopy.alt_names[action.payload.index][action.payload.key].unsaved_changes = true
            }

            return {
                ...state,
                fundObject: detailsCopy
            }
        case SAVE_ALT_FUND_NAME
            :
            const detailsCopy3 = { ...state.fundObject }

            const indexA = detailsCopy3.alt_names.findIndex(a => a.id === action.payload.uuid)
            detailsCopy3.alt_names.splice(indexA, 1)
            detailsCopy3.alt_names.splice(indexA, 0, action.payload)

            const alias = {
                'id': action.payload.id,
                'name': action.payload.name.current,
                'fund': { value: action.payload.fundID, label: action.payload.fundName }
            }


            return {
                ...state,
                fundObject: detailsCopy3,
                aliases: [...state.aliases, alias]

            }
        case DELETE_ALT_FUND_NAME:
            const detailsCopy2 = { ...state.fundObject }
            detailsCopy2.alt_names.splice(detailsCopy2.alt_names.findIndex(a => a.id === action.payload.deletedID), 1)

            return {
                ...state,
                fundObject: detailsCopy2

            }
        case ADD_ALT_FUND_NAME:

            const copy = { ...state.fundObject }

            const obj = {
                id: uuidv4(),
                fundID: action.payload,
                editable: true,
                name: {
                    current: '',
                    previous: '',
                    unsaved_changes: false,
                    isError: false,
                },
                dateCreated: '',
                createdBy: ''
            }
            copy.alt_names.push(obj)

            return {
                ...state,
                fundObject: copy

            }
        case ADD_CHILD_OWNERSHIP:

            const entity_ownership_obj_copy = { ...state.entity_ownership_obj }
            checkChildren(entity_ownership_obj_copy, action.payload)

            return {
                ...state,
                entity_ownership_obj: entity_ownership_obj_copy
            }
        case GET_ENTITY_OWNERSHIPS:
            return {
                ...state,
                entity_ownership_obj: action.payload,
                ownershipsLoading: false

            };
        case TOGGLE_OWNERSHIPS_LOADING:
            return {
                ...state,
                ownershipsLoading: action.payload
            }
        case SET_ENTITY_OPTIONS:

            return {
                ...state,
                [action.payload.key]: action.payload.optionsArray
            }




        case ADD_NEW_FUND:

            const newEntity = {
                'id': uuidv4(),
                'trackingID': {
                    'current': '',
                    'previous': '',
                    'unsaved_changes': false,
                    'isError': false,
                },
                'legal_name': {
                    'current': '',
                    'previous': '',
                    'unsaved_changes': false,
                    'isError': false,
                },
                'isAudited': {
                    'current': false,
                    'previous': false,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'general_partner': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'carry_partner': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'depository': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'administrator': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'acct_system': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'domicile_location': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'entityType': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'advisor': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'sub_advisor': {
                    'current': null,
                    'previous': null,
                    'unsaved_changes': false,
                    'isError': false,
                },
                'commencement_date': {
                    'current': '',
                    'previous': '',
                    'unsaved_changes': false,
                    'isError': false,
                },
                'fund_life': {
                    'current': '',
                    'previous': '',
                    'unsaved_changes': false,
                    'isError': false,
                },
                'alt_names': [],
                'legacy': {
                    'capital_movements': [],
                    'investment_years': [],
                    'allocation_years': [],
                    'derivative_years': []
                },
                'uploaded_reports': [],
            }

            return {
                ...state,
                fundObject: newEntity,
                selectedFund: null,
            }



        case GET_FUNDS_SETUP:

            return {
                ...state,
                existingFunds: action.payload,
                isLoading: false
            };

        case GET_FUND_DETAILS:
            return {
                ...state,
                fundObject: action.payload.fundObject,
                uploaded_reports: action.payload.uploaded_reports,
                isLoading: false
            }
        case SAVE_BLOCKER_OWNERSHIP:
            const blockerOwnershipsCopyB = [...state.blocker_ownerships]
            let index3 = blockerOwnershipsCopyB.findIndex(c => c.id === action.payload.uuid);
            blockerOwnershipsCopyB.splice(index3, 1)
            blockerOwnershipsCopyB.splice(index3, 0, action.payload)


            return {
                ...state,
                blocker_ownerships: blockerOwnershipsCopyB
            }

        case DELETE_BLOCKER_OWNERSHIP:

            const blockerOwnershipsCopyA = [...state.blocker_ownerships]
            let index2 = blockerOwnershipsCopyA.findIndex(c => c.id === action.payload.deletedID);
            blockerOwnershipsCopyA.splice(index2, 1)

            return {
                ...state,
                blocker_ownerships: blockerOwnershipsCopyA
            };
        case TOGGLE_BLOCKER_LOADING:
            return {
                ...state,
                blocker_loading: action.payload,
            };
        case SET_SELECTED_BLOCKER:
            return {
                ...state,
                selected_blocker: action.payload,
            };
        case UPDATE_BLOCKER_OWNERSHIP_INFO:

            const blockerOwnershipsCopy = [...state.blocker_ownerships]
            let index1 = blockerOwnershipsCopy.findIndex(c => c.id === action.payload.ownershipID);
            blockerOwnershipsCopy[index1][action.payload.key] = action.payload.value

            if (action.payload.key !== 'editable' && !isNaN(blockerOwnershipsCopy[index1].id)) {
                blockerOwnershipsCopy[index1]['unsaved_changes'] = checkForChanges(blockerOwnershipsCopy[index1])
            }

            return {
                ...state,
                blocker_ownerships: blockerOwnershipsCopy
            };
        case GET_BLOCKER_OWNERS:

            return {
                ...state,
                blocker_ownerships: action.payload,
                blocker_loading: false
            };
        case ADD_BLOCKER_OWNER:

            const new_blocker_ownership = {
                id: uuidv4(),
                owner_entity: null,
                owned_entity: action.payload,
                ownership_percentage: 0,
                editable: true,
                unsaved_changes: true,
                ownership_type: null
            }
            return {
                ...state,
                blocker_ownerships: [new_blocker_ownership, ...state.blocker_ownerships],
            };
        case SELECT_OWNERSHIP:

            return {
                ...state,
                selected_ownership: action.payload,
            };
        case SAVE_OWNERSHIP:

            const ownershipCopyB = [...state.entity_ownerships]
            let indexx = ownershipCopyB.findIndex(c => c.id === action.payload.uuid);
            ownershipCopyB.splice(indexx, 1)
            ownershipCopyB.splice(indexx, 0, action.payload)

            return {
                ...state,
                entity_ownerships: ownershipCopyB
            };
        case DELETE_OWNERSHIP:
            const ownershipCopyA = [...state.entity_ownerships]
            ownershipCopyA.splice(ownershipCopyA.findIndex(c => c.id === action.payload.deletedID), 1)
            return {
                ...state,
                entity_ownerships: ownershipCopyA
            };

        case ADD_NEW_OWNERSHIP:

            const newOwnership = {
                id: uuidv4(),
                editable: true,
                level: 'Not Set',

                owner_entity: {
                    current: null,
                    prev: null,
                    unsaved_changes: false,
                },
                owned_entity: {
                    current: null,
                    prev: null,
                    unsaved_changes: false,
                },
                ownership_percentage: {
                    current: '',
                    prev: '',
                    unsaved_changes: false,
                },
                ownership_type: {
                    current: '',
                    prev: '',
                    unsaved_changes: false,
                },
                net_ownership: 0,
                errors: [],
            }

            return {
                ...state,
                new_entity_ownerships: [...state.new_entity_ownerships, newOwnership],
            };
        case CHANGE_OWNERSHIP_INFO:

            const ownershipCopy = [...state.entity_ownerships]
            let index = ownershipCopy.findIndex(c => c.id === action.payload.ownershipID);


            if (action.payload.key === 'ownership_percentage') {
                if (isNaN(action.payload.value)) {

                    ownershipCopy[index][action.payload.key] = action.payload.value
                    ownershipCopy[index]['ownership_percentage_error'] = true
                    ownershipCopy[index]['net_ownership'] = action.payload.value

                    if (ownershipCopy[index]['ownership_percentage'] != ownershipCopy[index]['prev_ownership_percentage']) {
                        ownershipCopy[index]['saved'] = false
                    } else {
                        ownershipCopy[index]['saved'] = true
                    }

                } else {
                    ownershipCopy[index][action.payload.key] = action.payload.value
                    ownershipCopy[index]['net_ownership'] = action.payload.value



                    if (ownershipCopy[index]['ownership_percentage'] != ownershipCopy[index]['prev_ownership_percentage']) {
                        ownershipCopy[index]['saved'] = false
                    } else {
                        ownershipCopy[index]['saved'] = true
                    }

                    if (ownershipCopy[index]['ownership_percentage_error']) {
                        ownershipCopy[index]['ownership_percentage_error'] = false
                    }
                }
            } else if (action.payload.key === 'owner_entity' || action.payload.key === 'owned_entity') {
                ownershipCopy[index][action.payload.key] = action.payload.value


                if (action.payload.key === 'owner_entity' && action.payload.value.value !== ownershipCopy[index]['prev_owner_entity_id']) {
                    ownershipCopy[index]['saved'] = false
                } else if (action.payload.key === 'owned_entity' && action.payload.value.value !== ownershipCopy[index]['prev_owned_entity_id']) {
                    ownershipCopy[index]['saved'] = false
                } else {
                    ownershipCopy[index]['saved'] = true
                }



                if (ownershipCopy[index]['ownership_error'] && ownershipCopy[index]['owner_entity'].value !== ownershipCopy[index]['owned_entity'].value) {
                    ownershipCopy[index]['ownership_error'] = false
                }

            } else {
                ownershipCopy[index][action.payload.key] = action.payload.value

            }

            return {
                ...state,
                entity_ownerships: ownershipCopy,
            };
        case CHANGE_SELECTED_FUND:
            return {
                ...state,
                selectedFund: action.payload,
            };
        case ADD_FUND:
            return {
                ...state,
                funds: [...state.funds.concat(action.payload)],
            };

        default:
            return state;
    }
}