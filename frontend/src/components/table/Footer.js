import React from 'react'
import { Caption } from '../../assets/styled-components/Carry'
import { TableRow, LeftRow, RightRow } from '../../assets/styled-components/Table'
import { numberWithCommas } from '../common/helpers'

const Footer = ({ description, value, border = true, isAllocated = false, unique = null }) => {

    if (unique === 'capital') {
        return (
            <TableRow style={{ height: '3rem', borderTop: border ? '1px solid var(--text-secondary-light)' : 'none' }}>

                <LeftRow style={{ flex: 1 }}>
                    <Caption style={{ justifyContent: 'flex-start', flex: 2, width: '40%' }}>{description}</Caption>
                    <Caption style={{ justifyContent: 'flex-end', width: '20%', paddingRight: 10 }}>{value}</Caption>
                    <Caption style={{ justifyContent: 'flex-end', flex: 1 }}></Caption>
                    <Caption style={{ width: 20, flex: 'none', paddingBottom: 5, marginLeft: 5 }}></Caption>
                </LeftRow>

                <RightRow style={{ width: 100, maxWidth: 100, minWidth: 100 }}>
                </RightRow>


            </TableRow>
        )


    } else {
        return (
            <TableRow style={{ height: '3rem', borderTop: border ? '1px solid var(--text-secondary-light)' : 'none' }}>

                <LeftRow style={{ flex: 1, alignItems: 'center' }}>

                    <Caption style={{ flex: 3, justifyContent: 'flex-start', paddingRight: '2rem', fontStyle: 'italic' }}>{description}</Caption>
                    <Caption style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'double',
                        paddingRight: '3.5rem'
                    }}>${numberWithCommas(value)}</Caption>
                    {isAllocated ? <Caption style={{ flex: 1 }}></Caption> : null}
                </LeftRow>
                <RightRow style={{ width: 100, maxWidth: 100, minWidth: 100 }}>

                </RightRow>
            </TableRow>
        )
    }
}

export default Footer
