import React from 'react'
import {
    TableWrapper, TableHeader, HeaderItem, TableMain, TableRow, RowItem
} from '../../../assets/styled-components/Table'
import { TableDetailContainer } from '../../../assets/styled-components/Containers'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Tab, Segment, Table, Icon, Container, Button } from 'semantic-ui-react'

const UnmappedTable = ({ dispatch, isDark, headers }) => {

    const { unmapped_accounts } = useSelector(state => state.fs)

    return (
        <TableWrapper>

            <TableHeader hasShadow={true}>
                {headers.map(header =>
                    <HeaderItem key={header.id}>{header.name}</HeaderItem>
                )}
            </TableHeader>

            <TableMain>
                {unmapped_accounts.map(account =>

                    <TableRow key={account.id}>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                    </TableRow>

                )}
            </TableMain>

        </TableWrapper>
    )
}
const GenericTable = ({ dispatch, isDark, headers }) => {

    const { generic_mappings } = useSelector(state => state.fs)

    return (
        <TableWrapper>

            <TableHeader hasShadow={true}>
                {headers.map(header =>
                    <HeaderItem key={header.id}>{header.name}</HeaderItem>
                )}
            </TableHeader>

            <TableMain>
                {generic_mappings.map(mapping =>

                    <TableRow key={mapping.id}>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                    </TableRow>

                )}
            </TableMain>

        </TableWrapper>
    )
}
const CustomTable = ({ dispatch, isDark, headers }) => {

    const { custom_mappings } = useSelector(state => state.fs)

    return (
        <TableWrapper>

            <TableHeader hasShadow={true}>
                {headers.map(header =>
                    <HeaderItem key={header.id}>{header.name}</HeaderItem>
                )}
            </TableHeader>

            <TableMain>
                {custom_mappings.map(mapping =>

                    <TableRow key={mapping.id}>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                        <RowItem>A</RowItem>
                    </TableRow>

                )}
            </TableMain>

        </TableWrapper>
    )
}

const Mappings = ({ dispatch, isDark }) => {

    const generic_headers = [
        { id: 1, name: 'Account No' },
        { id: 2, name: 'Account Description' },
        { id: 3, name: 'Generic FSLI Mapping' },
        { id: 4, name: 'No Custom Mappings' },
    ]
    const unmapped_headers = [
        { id: 1, name: 'Account No' },
        { id: 2, name: 'Account Description' },
        { id: 3, name: 'FSLI' },
    ]
    const custom_headers = [
        { id: 1, name: 'Account No' },
        { id: 2, name: 'Account Description' },
        { id: 3, name: 'Custom FSLI Mapping' },
        { id: 4, name: 'Applicable Fund' },
    ]

    return (
        <TableDetailContainer>

            <Segment>
                <Switch>
                    <Route path="/fs/mappings/generic">
                        <GenericTable headers={generic_headers} dispatch={dispatch} isDark={isDark} />
                    </Route>
                    <Route path="/fs/mappings/custom">
                        <CustomTable headers={custom_headers} dispatch={dispatch} isDark={isDark} />
                    </Route>
                    <Route path="/fs/mappings/unmapped">
                        <UnmappedTable headers={unmapped_headers} dispatch={dispatch} isDark={isDark} />
                    </Route>
                </Switch>
            </Segment>


            <Segment>


            </Segment>


        </TableDetailContainer>
    )
}

export default Mappings
