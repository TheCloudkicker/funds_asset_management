import { updateLayout } from '../../../store/actions/layout'
import { resetApp } from '../../../store/actions/main'
import React from 'react'
import { Icon } from 'semantic-ui-react'

export const viewRouter = (layout, dispatch) => {

    const { app, subApp, detailView } = layout

    const onClick = value => {

        dispatch(updateLayout('modalVisible', true))
        dispatch(updateLayout('modalForm', value))
    }

    return [
        {
            name: detailView ? 'Hide Details' : 'Show Details',
            onClick: () => dispatch(updateLayout('detailView', !layout.detailView)),
            icon: detailView ? 'eye slash' : 'eye'
        },
        {
            name: 'Preferences',
            onClick: () => onClick({ key: 'GLOBAL_SETTINGS', value: 'fund' }),
            icon: 'settings'
        },
        {
            name: 'Reset Application',
            onClick: () => dispatch(resetApp()),
            icon: 'undo'
        }
    ]

}