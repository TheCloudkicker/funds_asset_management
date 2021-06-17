import React, { useState, useEffect } from 'react'

import { Caption } from '../../../assets/styled-components/Carry'
import { TableRow } from '../../../assets/styled-components/Table'
import { IconWrapper } from '../../../assets/styled-components/General'
// import AccountSelector from './AccountSelector'
// import BalanceSelector from './BalanceSelector'
// import FormInput from '../../../../common/FormInput'
// import { numberWithCommas } from '../../../../common/helpers'
import styled, { keyframes, css } from 'styled-components'
import { capitalizeFirstLetter } from '../../common/helpers'

export const RowWrapper = styled.div`
    display: flex;
    flex-direction: column;

    border-bottom: ${props => props.isOpen ? '1px solid var(--text-secondary-light)' : 'none'}
`
const ExpandableRow = ({ area, onChange, index }) => {

    const handleClick = () => {

    }

    const renderSub = () => {
        if (area.isOpen) {
            return area.subAreas.map((subArea, subAreaIndex) =>

                <TableRow style={{ height: '3rem' }} isHoverable={true} key={subAreaIndex} onClick={() => onChange(null, 'GET_TESTING_AREA', subArea.name)} >
                    <Caption style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', textIndent: '6rem' }}>
                        {subArea.name}
                    </Caption>

                    <Caption style={{ maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}>{subArea.status.total}</Caption>
                    <Caption style={{ maxWidth: '8rem', display: 'flex', padding: 0 }}>{subArea.status.total}</Caption>

                </TableRow>

            )
        }
    }

    const renderIcon = () => {
        return true
    }



    return (
        <RowWrapper isOpen={area.isOpen}>
            <TableRow style={{ height: '3rem' }} isHoverable={true} onClick={() => onChange(index, 'isOpen', !area.isOpen)}>

                <div style={{ flex: 3, display: 'flex', height: '100%' }}>
                    <IconWrapper>
                        {renderIcon() ? <i className={(area.isOpen ? "minus" : "plus") + " icon"}></i> : null}
                    </IconWrapper>
                    <Caption style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}>{capitalizeFirstLetter(area.name)}</Caption>
                </div>

                <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>
                </Caption>

                <Caption style={{ maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}>{area.subAreas.length}</Caption>
                <Caption style={{ maxWidth: '8rem', display: 'flex', padding: 0 }}>



                </Caption>

            </TableRow>

            {renderSub()}

        </RowWrapper>
    )
}

export default ExpandableRow
