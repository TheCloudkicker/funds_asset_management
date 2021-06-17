import React from 'react'
import { useSelector } from 'react-redux'

import { DetailContainer } from '../../../../assets/styled-components/Carry'
import { TableMain, TableWrapper } from '../../../../assets/styled-components/Table'
import { updateCarryCalc } from '../../../../store/actions/testing/carry'

import ExpandableRow from './common/ExpandableRow'
import Footer from '../../../table/Footer'
import Header from '../../../table/Header'

const LiqValue = ({ dispatch }) => {

    const { allocation } = useSelector(state => state.testing.carry)
    const onChange = (type, indexes, key, value) => {
        dispatch(updateCarryCalc('allocation', 'hyp_liq_value', { ...indexes, type: type }, null, key, value))
    }

    return (
        <DetailContainer>
            <TableWrapper>
                <Header description="FSLI" />
                <TableMain style={{ overflowY: 'auto', maxHeight: '85vh' }}>
                    {Object.keys(allocation.hyp_liq_value).map(function (keyName, keyIndex) {

                        if (keyName !== 'total') {

                            return (
                                <ExpandableRow
                                    key={keyIndex}
                                    itemYear={allocation.hyp_liq_value[keyName]}
                                    description={keyName}
                                    type='accounts'
                                    yearIndex={keyName}
                                    onChange={(indexes, key, value) => onChange(keyName, indexes, key, value)} />
                            )
                        }

                    })}

                    <Footer
                        description="Total Hypothetical Liquidation Value"
                        value={allocation.hyp_liq_value.total} />
                </TableMain>
            </TableWrapper>
        </DetailContainer>
    )
}

export default LiqValue
