import axios from 'axios'
import { devPrefixes, authConfig } from './common'
import { createError, createSuccess } from './alerts'

import { SET_ENTITY_POSITION, CALCULATE_NAVIGATOR_LINES, ADJUST_NAVIGATOR_LINES, GET_STRUCTURE } from '../actions/types.js';

export const getStructure = (entityID = 1) => (dispatch, getState) => {

    const config = authConfig(getState)
    const url = devPrefixes(`/api/entities/structure/${entityID}`)

    axios
        .get(url, config)
        .then(res => {
            console.log('asdas', res)
            dispatch({
                type: GET_STRUCTURE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(createError('Structure failed to load'))
            console.error(err)
        });
}


export const adjustNavigatorLines = () => {
    return {
        type: ADJUST_NAVIGATOR_LINES
    }
}


export const calculateNavigatorLines = fundObj => {

    const ownership_lines = []
    const ownership_texts = []
    let x1, y1, x2, y2, index, textX, textY

    const { level_1_entities, level_2_entities, level_3_entities } = fundObj

    // CALC CONSOLIDATED ENTITIES
    // CALC COMBINED ENTITIES

    x1 = level_1_entities[1].coordinates[2] + level_1_entities[1].coordinates[3] / 2
    y1 = level_1_entities[1].coordinates[0] + level_1_entities[1].coordinates[1]


    for (var i = 0; i < level_2_entities.length; i++) {

        x2 = level_2_entities[i].coordinates[2] + level_2_entities[i].coordinates[3] / 2
        y2 = level_2_entities[i].coordinates[0]

        ownership_lines.push([x1, y1, x2, y2, "unconsolidated-line"])

    }

    // CALC LEVEL 2 OWNERSHIPS
    // CALC LEVEL 2 CONSOLIDATED ENTITIES


    // CALC LEVEL 3 OWNERSHIPS
    // CALC LEVEL 3 CONSOLIDATED ENTITIES

    for (var j = 0; j < level_3_entities.length; j++) {

        if (level_3_entities[j].owned_by.length > 0) {

            index = level_2_entities.findIndex(f => f.id === level_3_entities[j].owned_by[0]);

            x1 = level_2_entities[index].coordinates[2] + level_2_entities[index].coordinates[3] / 2
            y1 = level_2_entities[index].coordinates[0] + level_2_entities[index].coordinates[1]

            x2 = level_3_entities[j].coordinates[2] + level_3_entities[j].coordinates[3] / 2
            y2 = level_3_entities[j].coordinates[0]


            ownership_lines.push([x1, y1, x2, y2, "consolidated-line"])



            textX = (x1 + x2) / 2
            textY = (y1 + y2) / 2

            ownership_texts.push([textX, textY, '50%'])

        }







    }




    return {
        type: CALCULATE_NAVIGATOR_LINES,
        payload: { ownership_lines, ownership_texts }
    }
}

export const setEntityPosition = (level, entityID, coordinates) => {
    return {
        type: SET_ENTITY_POSITION,
        payload: { level, entityID, coordinates }
    }
}

