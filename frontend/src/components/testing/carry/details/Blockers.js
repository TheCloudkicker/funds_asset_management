import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Caption, DetailContainer } from '../../../../assets/styled-components/Carry'
import { TableMain, TableRow, TableWrapper, LeftRow, RightRow } from '../../../../assets/styled-components/Table'
import { numberWithCommas } from '../../../common/helpers'
import { updateCarryCalc, saveCarryCalc } from '../../../../store/actions/testing/carry'
import { Checkbox as Toggle } from 'semantic-ui-react'
import styled, { keyframes, css } from 'styled-components'
import ExpandableRow, { NestededContainer } from '../../../table/ExpandableRow'
import Header from '../../../table/Header'

const BlockersLegacy = styled.div`
    width: 100%;
`
const BlockersWaibe = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
`

const Blockers = ({ supportIndex, name, onChange }) => {

    const { selectedFund } = useSelector(state => state.funds)
    const { supportDetails } = useSelector(state => state.carry)
    const dispatch = useDispatch()
    const onToggle = isChecked => { }

    return (
        <DetailContainer style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <BlockersLegacy>
                <TableWrapper>
                    <Header hasShadow={false} description="Pre Waibe Blockers" />
                    <TableMain style={{ minHeight: 40, maxHeight: 100, overflowY: 'auto' }}>

                        {supportDetails[supportIndex].legacy_years.map((year, yearIndex) =>

                            <ExpandableRow
                                key={yearIndex}
                                type='accounts'
                                year={year}
                                yearIndex={yearIndex}
                                onChange={(indexArr, key, value) => onChange([supportIndex, ...indexArr, null, 'legacy_years'], key, value)} />

                        )}

                    </TableMain>
                </TableWrapper>
            </BlockersLegacy>


            <BlockersWaibe>
                <TableWrapper>
                    <Header hasShadow={false} description="Waibe Era Blocker" isAllocated={true} />
                    <TableMain style={{ overflowY: 'auto', minHeight: 40, maxHeight: 'calc(100vh - 37.5rem)' }}>
                        {supportDetails[supportIndex].current_blockers.map((blocker, blockerIndex) => {

                            return (
                                <NestededContainer
                                    obj={blocker}
                                    isAllocated={true}
                                    key={blockerIndex}
                                    onChange={(indexArry, key, value) => onChange([supportIndex, ...indexArry, blockerIndex, 'current_blockers'], key, value)} />
                            )
                        })}

                    </TableMain>

                </TableWrapper>
            </BlockersWaibe>

            <TableRow style={{ height: '3rem', borderTop: '1px solid var(--text-secondary)' }}>

                <LeftRow style={{ width: '75%' }}>

                    <Caption style={{ flex: 3, justifyContent: 'flex-start', paddingLeft: '1rem', fontStyle: 'italic' }}>Total {selectedFund && selectedFund.label} Blocker Activity</Caption>
                    <Caption style={{ flex: 2, justifyContent: 'flex-end' }}>${numberWithCommas(supportDetails[supportIndex].total)}</Caption>

                </LeftRow>

                <RightRow style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>

                    <Toggle
                        toggle
                        label={supportDetails[supportIndex].byBlocker ? "By Blocker" : "By Year"}
                        checked={supportDetails[supportIndex].byBlocker}
                        onClick={() => onToggle(true)} />

                </RightRow>

            </TableRow>

        </DetailContainer>
    )
}

export default Blockers
