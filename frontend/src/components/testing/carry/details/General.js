import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TableMain, TableWrapper } from '../../../../assets/styled-components/Table'
import { updateCarryCalc, saveCarryCalc } from '../../../../store/actions/testing/carry'
import ExpandableRow from '../../../table/ExpandableRow'
import Footer from '../../../table/Footer'
import Header from '../../../table/Header'


const General = ({ supportIndex, onChange, name, type = 'accounts' }) => {

    const carry = useSelector(state => state.carry)
    const allocPerc = carry.supportDetails[supportIndex].allocation_percentage

    return (
        <TableWrapper style={{ height: '100%' }} >
            <Header isAllocated={allocPerc !== null} hasShadow={false} description={`${name} Year`} />
            <TableMain>

                {carry.supportDetails[supportIndex].years.map((year, yearIndex) => {

                    return (
                        <ExpandableRow
                            key={yearIndex}
                            allocPerc={allocPerc}
                            year={year}
                            yearIndex={yearIndex}
                            type={type}
                            onChange={(indexArr, key, value) => onChange([supportIndex, ...indexArr, null, 'general'], key, value)} />
                    )
                })}

                <Footer
                    description={`Total ${name}`}
                    isAllocated={allocPerc !== null}
                    value={carry.supportDetails[supportIndex].total} />

            </TableMain>

        </TableWrapper>
    )
}

export default General


