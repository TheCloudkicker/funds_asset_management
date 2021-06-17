import React, { useEffect } from 'react'
import { TableDetailContainer, LeftSection, RightSection } from '../../../assets/styled-components/Containers'
import { TableWrapper } from '../../../assets/styled-components/Table'
import { Segment } from 'semantic-ui-react'
const Allocation = () => {

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/setup/allocations')
    }, [])

    return (
        <TableDetailContainer>

            <Segment>

            </Segment>


            <Segment>

            </Segment>


        </TableDetailContainer>
    )
}

export default Allocation
