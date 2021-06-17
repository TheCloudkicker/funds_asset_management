import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getTestingOverview, updateTestingAreas, getTestingSummary } from '../../../store/actions/testing/testing'
import { changeSelectedFund } from '../../../store/actions/funds/funds'
import { setSelectedProfile } from '../../../store/actions/user'
import { numberWithCommas } from '../../common/helpers'
import { TableMain } from '../../../assets/styled-components/Table'

import { TableDetailContainer } from '../../../assets/styled-components/Containers'
import Spinner from '../../common/Spinner'
import ExpandableRow from './ExpandableRow'
import { Tab, Segment, Icon, Label, Menu, Table } from 'semantic-ui-react'




const ByArea = ({ testingAreas, onChange }) => {

    return (

        <TableMain style={{ height: '100%' }}>
            {testingAreas.map((area, index) =>

                <ExpandableRow
                    key={index}
                    area={area}
                    index={index}
                    onChange={onChange} />

            )}


        </TableMain>

    )
}

const LandingPage = ({ dispatch, isDark }) => {

    const history = useHistory()
    const { items, testingAreas, headers } = useSelector(state => state.testing)

    useEffect(() => {
        dispatch(getTestingSummary('testing'))
    }, [])


    const onClick = resultsObj => {
        dispatch(changeSelectedFund({ value: resultsObj.id, label: resultsObj.name, isAudited: true }))

        let path;

        if (resultsObj.testingArea === 'invest mv') {
            path = 'investments'
        } else {
            path = resultsObj.testingArea
        }
        history.push(`/testing/${path}/`)

    }

    const panes = [
        {
            menuItem: 'By Testing Area',
            render: () => <Tab.Pane style={{ minHeight: 'calc(100vh - 9rem)' }} attached='top'><ByArea testingAreas={testingAreas} onChange={onChange} /></Tab.Pane>
        },
        {
            menuItem: 'By Person',
            render: () => <Tab.Pane style={{ minHeight: 'calc(100vh - 9rem)' }} attached='top'>Person</Tab.Pane>
        },

    ]
    const onChange = (index, key, value) => {
        if (key === 'GET_TESTING_AREA') {
            dispatch(getTestingOverview(value.toLowerCase()))
        } else {
            dispatch(updateTestingAreas([...testingAreas], index, key, value))
        }
    }
    return (
        <TableDetailContainer>

            <Segment>
                <Table celled padded selectable sortable>

                    <Table.Header>
                        <Table.Row>
                            {headers.map(header =>
                                <Table.HeaderCell
                                    style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}
                                    sorted={'ascending'}
                                    onClick={() => console.log("A")}
                                    key={header.id} >
                                    {header.title}
                                </Table.HeaderCell>
                            )}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {items.map((item, index) =>
                            <Table.Row error={false} style={{ height: '3rem', cursor: 'pointer' }} key={item.id} onClick={() => onClick(item)}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.results}</Table.Cell>
                                <Table.Cell>{item.client_result}</Table.Cell>
                                <Table.Cell>{item.pwc_result}</Table.Cell>
                                <Table.Cell>{item.difference}</Table.Cell>
                                <Table.Cell>{item.difference}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={headers.length}>

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>

            <Tab menu={{ attached: 'bottom' }} panes={panes} />

        </TableDetailContainer>
    )
}

export default LandingPage

