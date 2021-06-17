import React from 'react'
import CapitalNavigator from './CapitalNavigator'
import { TableDetailContainer } from '../../../assets/styled-components/Containers'

const Capital = ({ dispatch, isDark }) => {
    return (
        <TableDetailContainer>

            <CapitalNavigator />

        </TableDetailContainer>
    )
}

export default Capital
