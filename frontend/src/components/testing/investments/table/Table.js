import React from 'react'
import { MainTable, TableHeader, TableMain, HeaderItem, TableRow, RowItem } from '../components'
import { useSelector } from 'react-redux'
import Spinner from '../../../common/Spinner'

const headers = [
    'Investing Entity', 'Dictating Entity', 'Risk Rating', 'FMV Base', 'Commitments Base', 'Status', 'Assignee', 'Release Date'
]

const Table = ({ isDark, dispatch }) => {

    const { isLoading, details } = useSelector(state => state.investments)

    return (
        <MainTable>
            <TableHeader>
                {headers.map((header, index) => {
                    if (index === 0) {
                        return <HeaderItem style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}>{header}</HeaderItem>
                    } else {
                        return <HeaderItem>{header}</HeaderItem>
                    }

                })}
            </TableHeader>

            <TableMain>

                {isLoading ?
                    <Spinner loadingText="Loading investment details..." inverted={!isDark} /> :
                    <>
                        {details && details.investees.map(investee =>

                            <TableRow>
                                <RowItem style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}>{investee.name}</RowItem>
                                <RowItem>{investee.dictating_entity}</RowItem>
                                <RowItem>{investee.risk_raing}</RowItem>
                                <RowItem>{investee.fmv_base}</RowItem>
                                <RowItem>{investee.commitment_base}</RowItem>
                                <RowItem>{investee.status}</RowItem>
                                <RowItem>{investee.current_assignee && investee.current_assignee.label}</RowItem>
                                <RowItem>{investee.release_date}</RowItem>
                            </TableRow>

                        )}
                    </>
                }

            </TableMain>
        </MainTable>

    )
}

export default Table
