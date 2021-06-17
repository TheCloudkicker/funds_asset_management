import React from 'react'
import { TableWrapper, TableHeader, TableMain, HeaderItem, TableRow, RowItem } from '../../../../assets/styled-components/Table'
const Fees = ({ }) => {

    const fees = {
        headers: [
            { value: 'feeType', label: 'Fee Type' }
        ],
        fees: [
            { value: 'management_fee', label: 'Management Fee' },
            { value: 'performance_fee', label: 'Performance Fee' },
            {}
        ],
    }

    return (
        <TableWrapper>
            <TableHeader hasShadow={true} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                {fees.headers.map(header => <HeaderItem key={header.value}>{header.label}</HeaderItem>)}
            </TableHeader>

            <TableMain style={{ backgroundColor: 'var(--bg-primary)', overflowY: 'auto', maxHeight: 'calc(100vh - 13rem)' }}>

                {fees.fees.map((fee, investorIndex) =>

                    <TableRow style={{ height: '3rem' }} key={fee.value}>
                        <RowItem>{fee.label}</RowItem>

                    </TableRow>

                )}

            </TableMain>

        </TableWrapper>
    )
}

export default Fees
