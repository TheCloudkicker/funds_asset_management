import React from 'react'
import MgmtNavigator from './MgmtNavigator'
import { TableDetailContainer } from '../../../assets/styled-components/Containers'


const Mgmt = ({ dispatch, isDark }) => {
    return (
        <TableDetailContainer>

            <MgmtNavigator />

        </TableDetailContainer>
    )
}

export default Mgmt
