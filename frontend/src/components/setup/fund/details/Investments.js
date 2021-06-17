import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RowItem, TableRow, TableWrapper, TableHeader, HeaderItem, TableMain } from '../../../../assets/styled-components/Table'
import { numberWithCommas } from '../../../common/helpers'
import { updateAppView } from '../../../../store/actions/layout'
import { getInvestments } from '../../../../store/actions/investments'

const Investments = () => {

    const investments = useSelector(state => state.investments)
    const dispatch = useDispatch()
    const { selectedFund } = useSelector(state => state.funds)

    useEffect(() => {

        // dispatch(updateAppView('Setup', 'Investments'))
        if (selectedFund) {
            dispatch(getInvestments(selectedFund.value))
        }
    }, [])




    return (
        <TableWrapper>

            <TableHeader hasShadow={false} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                {investments.headers.map(header => <HeaderItem key={header.value} >{header.label}</HeaderItem>)}
            </TableHeader>

            <TableMain style={{ backgroundColor: 'var(--bg-primary)', overflowY: 'auto', maxHeight: 'calc(100vh - 15rem)' }}>
                {investments.investments.map((investment, investmentIndex) =>

                    <TableRow style={{ height: '3rem' }} key={investment.value}>
                        <RowItem>{investment.ownerEntity.label}</RowItem>
                        <RowItem>{investment.label}</RowItem>
                        <RowItem>{investment.name}</RowItem>

                    </TableRow>

                )}

            </TableMain>

        </TableWrapper>
    )
}

export default Investments
{/* <RowItem>{investment.investingEntity}</RowItem>
                        <RowItem>{numberWithCommas(investment.commitmentBase)}</RowItem>
                        <RowItem>{numberWithCommas(investment.commitmentLocal)}</RowItem>
                        <RowItem>{investment.domicile}</RowItem>
                        <RowItem>{investment.datePurchased}</RowItem>
                        <RowItem>{investment.genPartner}</RowItem>
                        <RowItem>{investment.project}</RowItem> */}