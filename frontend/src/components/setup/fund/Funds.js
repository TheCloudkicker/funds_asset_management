import React, { useEffect, useRef, useState } from 'react'
import { changeSelectedFund, getFunds } from '../../../store/actions/funds/funds'
import { updateAppView } from '../../../store/actions/layout'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TableDetailContainer } from '../../../assets/styled-components/Containers'
import { Segment, Input, Icon, Table } from 'semantic-ui-react'

const Funds = () => {

    const funds = useSelector(state => state.funds)
    const { isDark } = useSelector(state => state.settings)
    const { resized } = useSelector(state => state.layout)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/setup/funds')
        dispatch(getFunds())
    }, [])

    const handleDoubleClick = fund => {
        dispatch(changeSelectedFund(fund))
        history.push(`/setup/funds/${fund.value}/general_information`)
    }

    const [dropzoneVisible, setDropzoneVisible] = useState(true)
    const [maxHeight, setMaxHeight] = useState(null)
    const [isCalc, setIsCalc] = useState(true)
    const ref = useRef(null)

    useEffect(() => {
        dispatch(updateAppView('Setup', 'Funds'))
    }, [])


    useEffect(() => {
        setIsCalc(true)
    }, [resized])


    useEffect(() => {
        if (isCalc) {
            setMaxHeight(null)

            setTimeout(() => {
                setMaxHeight(ref.current && ref.current.offsetHeight)
                setIsCalc(false)
            }, 0)
        }
    }, [isCalc])


    const onClick = (index, key, value) => {

    }

    const detailHeight = 'calc(100vh - 6.4rem)'
    const mainHeight = 'calc(100vh - 6.3rem)'

    const handleClearFilter = headerIndex => {

    }
    const onInputChange = (headerIndex, value) => {

    }

    const handleHeaderClick = headerIndex => {

    }

    const onRowSelect = () => {

    }

    const [filters, setFilters] = useState(['', '', '', '', '', '', '', '', '', '', '', '', ''])


    const segStyle = {
        overflowY: 'scroll',
        maxHeight: mainHeight,
        height: mainHeight,
        padding: 0,
        overflowX: 'auto',
        maxWidth: 'calc(100vw - 8rem)'
    }



    return (
        <TableDetailContainer>

            <Segment loading={funds.isLoading} style={segStyle}>

                <Table inverted={isDark.current} celled selectable >

                    <Table.Header>
                        <Table.Row>
                            {funds.headers.map((header, headerIndex) =>
                                <Table.HeaderCell style={{ padding: 3, width: 250, minWidth: 250 }} key={headerIndex}>
                                    <Input placeholder={header.title} style={{ width: 200, maxWidth: 200, minWidth: 200 }} onChange={e => onInputChange(headerIndex, e.target.value)} value={filters[headerIndex]} />
                                    <Icon style={{ width: 15, paddingLeft: 5 }} name="undo" onClick={() => handleClearFilter(headerIndex)} />
                                    <Icon style={{ width: 15 }} name={header.sorted === 'ascending' ? 'angle down' : 'angle up'} onClick={() => handleHeaderClick(headerIndex)} />
                                </Table.HeaderCell>
                            )}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {funds.funds.map((fund, fundIndex) => {

                            if (!filters[0]) {//item.indexName.toLowerCase().includes(filters[0].toLowerCase()) ||

                                return (
                                    <Table.Row style={{ cursor: 'pointer' }} onDoubleClick={() => handleDoubleClick(fund)} active={false} onClick={() => onRowSelect(fundIndex)} key={fundIndex}>
                                        <Table.Cell style={{ width: 250 }}>{fund.label}</Table.Cell>
                                        <Table.Cell style={{ width: 250 }}>{fund.value}</Table.Cell>

                                        {fund.criterias.map((value, valueIndex) =>
                                            <Table.Cell error={false} key={valueIndex}>{value.value}</Table.Cell>
                                        )}

                                    </Table.Row>
                                )
                            }
                        })}

                    </Table.Body>
                </Table>

            </Segment>

            <Segment style={{ marginTop: 0, maxHeight: detailHeight }}>

            </Segment>

        </TableDetailContainer>

    )
}

export default Funds

