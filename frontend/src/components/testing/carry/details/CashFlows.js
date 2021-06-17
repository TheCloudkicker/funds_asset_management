import React from 'react'
import { Caption, DetailContainer } from '../../../../assets/styled-components/Carry'
import { TableMain, TableRow, TableWrapper } from '../../../../assets/styled-components/Table'
import { useSelector } from 'react-redux'
import { numberWithCommas } from '../../../common/helpers'
import Header from '../../../table/Header'


const CashFlows = ({ dispatch, isDark }) => {

    const { investments } = useSelector(state => state.testing.carry)

    const rows = [
        {
            title: 'Direct Investments',
            total: investments.direct.total,
            percent: 15,
            rowStyle: {
                height: '3rem'
            }
        },
        {
            title: 'Secondary Investments',
            total: investments.secondary.total,
            percent: 15,
            rowStyle: {
                height: '3rem'
            }
        },
        {
            title: 'Primary Investments',
            total: investments.primary.total,
            percent: 15,
            rowStyle: {
                height: '3rem'
            }
        },
        {
            title: 'Derivative Activity',
            total: investments.derivatives.total,
            percent: 15,
            rowStyle: {
                height: '3rem'
            }
        },
        {
            title: 'Other Investment Income',
            total: investments.other_income.total,
            percent: 15,
            rowStyle: {
                height: '3rem'
            }
        },
        {
            title: 'Blocker Activity',
            total: investments.blockers.total,
            percent: 15,
            rowStyle: {
                height: '3rem'
            }
        },
        {
            title: 'Uber Master Activity',
            total: investments.master.total,
            percent: 15,
            rowStyle: {
                height: '3rem',
                textDecorationLine: 'underline',
                textDecorationStyle: 'single'
            }
        },
        {
            title: 'Total',
            total: investments.maximum_allocable_carry.total,
            percent: null,
            rowStyle: {
                height: '3rem',
                textDecorationLine: 'underline',
                textDecorationStyle: 'double'
            }
        },
    ]


    return (
        <DetailContainer>
            <TableWrapper>
                <Header unique="cashFlows" />
                <TableMain>

                    {rows.map((row, rowIndex) =>

                        <TableRow style={row.rowStyle} key={rowIndex} >
                            <Caption style={{ flex: 3, display: 'flex', justifyContent: 'flex-start' }}>{row.title}</Caption>
                            <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>${numberWithCommas(row.total)}</Caption>
                            <Caption style={{ width: '8rem', maxWidth: '8rem', display: 'flex', justifyContent: 'flex-end' }}>{row.percent ? `${row.percent}%` : null}</Caption>
                            <Caption style={{ display: 'flex', justifyContent: 'flex-end' }}>${numberWithCommas(row.total * (row.percent / 100))}</Caption>
                            <Caption style={{ width: '8rem', maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}></Caption>
                        </TableRow>
                    )}


                </TableMain>

            </TableWrapper>
        </DetailContainer>
    )
}

export default CashFlows
