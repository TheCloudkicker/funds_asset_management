import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getRepository, updateRepository, toggleRepoLoading, addSupport } from '../../store/actions/repository'
import { changeSelectedFund } from '../../store/actions/funds/funds'
import { TableDetailContainer } from '../../assets/styled-components/Containers'
import { Tab, Segment, Table, Popup, Input, Icon, Button } from 'semantic-ui-react'

const detailHeight = 'calc(100vh - 9rem)'
const mainHeight = 'calc(100vh - 6.1rem)'


const RepoTable = ({ selectedIndex, onRowSelect, handleDoubleClick }) => {

    const repository = useSelector(state => state.repository)
    const dispatch = useDispatch()
    const { isDark } = useSelector(state => state.settings)

    const [filters, setFilters] = useState([''])

    const handleHeaderClick = headerIndex => {
        updateRepository(dispatch, { ...repository }, [headerIndex, null, null, null], 'sort', 'descending')
    }
    const onInputChange = (headerIndex, value) => {
        const filtersCopy = [...filters]
        filtersCopy[headerIndex] = value
        setFilters(filtersCopy)
    }


    const handleClearFilter = headerIndex => {
        const filtersCopy = [...filters]
        filtersCopy[headerIndex] = ''
        setFilters(filtersCopy)
    }

    useEffect(() => {
        if (repository.headers.length) {
            const f = []
            for (var i = 0; i < repository.headers.length; i++) {
                f.push('')
            }
            setFilters(f)
        }
    }, [repository.headers.length])

    return (
        <Table inverted={isDark.current} celled selectable >

            <Table.Header>
                <Table.Row>
                    {repository.headers.map((header, headerIndex) =>
                        <Table.HeaderCell style={{ padding: 3 }} key={headerIndex}>
                            <Input placeholder={header.title} style={{ minWidth: '80%', marginRight: 4 }} onChange={e => onInputChange(headerIndex, e.target.value)} value={filters[headerIndex]} />
                            <Icon name="undo" onClick={() => handleClearFilter(headerIndex)} />
                            <Icon name={header.sorted === 'ascending' ? 'angle down' : 'angle up'} onClick={() => handleHeaderClick(headerIndex)} />
                        </Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {repository.items.map((item, itemIndex) => {

                    if (item.indexName.toLowerCase().includes(filters[0].toLowerCase()) || !filters[0]) {

                        return (
                            <Table.Row style={{ cursor: 'pointer' }} onDoubleClick={() => handleDoubleClick(item.id)} active={selectedIndex === itemIndex} onClick={() => onRowSelect(itemIndex)} key={itemIndex}>
                                <Table.Cell>{item.indexName}</Table.Cell>
                                <Table.Cell>{item.id}</Table.Cell>
                                {item.reports.map((report, reportIndex) =>
                                    <Table.Cell error={!report.supports.length} key={reportIndex}>{report.supports.length}</Table.Cell>
                                )}
                            </Table.Row>
                        )
                    }
                })}

            </Table.Body>
        </Table>
    )
}

const SupportTree = ({ selectedIndex }) => {

    const repository = useSelector(state => state.repository)
    const { isDark } = useSelector(state => state.settings)
    const { displayName } = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()


    if (selectedIndex === null) return null


    const SupportType = ({ report, reportIndex }) => {

        const renderName = (support, supportIndex) => {
            if (support.fileName === '') {
                return <input value={support.fileObj} type='file' onChange={e => updateRepository(dispatch, { ...repository }, [null, selectedIndex, reportIndex, supportIndex], 'attachment', e.target.files[0])} />
            } else {
                return <a href={support.attachment} target="_blank">{support.fileName}</a>
            }
        }

        const children = report.supports.map((support, supportIndex) =>
            <Table.Row key={supportIndex}>
                <Table.Cell>{renderName(support, supportIndex)}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                    <Popup content={support.unsaved_data ? `UNSAVED: ${support.uploadedBy} on ${support.dateCreated}` : `${support.uploadedBy} on ${support.dateCreated}`} trigger={<Icon name='info' color={support.unsaved_data ? 'red' : 'black'} />} />
                </Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell style={{ width: '6rem' }}>
                    <Button.Group size='small'>
                        <Button color='black' icon disabled={false}>
                            <Icon disabled={false} name={support.unsaved_data ? 'save' : 'edit'} />
                        </Button>
                        <Button color='black' icon disabled={false} onClick={() => updateRepository(dispatch, { ...repository }, [null, selectedIndex, reportIndex, supportIndex], 'delete', !report.isOpen)}>
                            <Icon disabled={false} name={'trash'} />
                        </Button>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>

        )
        return (
            <>
                <Table.Row style={{ cursor: 'pointer', height: '3.5rem' }}>
                    <Table.Cell selectable onClick={() => updateRepository(dispatch, { ...repository }, [null, selectedIndex, reportIndex, null], 'isOpen', !report.isOpen)}>
                        <Icon name={report.isOpen ? 'down triangle' : 'right triangle'} />
                        {report.name}
                    </Table.Cell>
                    <Table.Cell>{report.supports.length} Supports</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>
                        {report.isOpen ?
                            <Button.Group size='small'>
                                <Button color='black' icon disabled={false} onClick={() => addSupport(dispatch, [...repository.items], selectedIndex, reportIndex, displayName)}>
                                    <Icon disabled={false} name={'add'} />
                                </Button>
                            </Button.Group>
                            : null}
                    </Table.Cell>
                </Table.Row>

                {report.isOpen ? children : null}
            </>
        )
    }

    return (
        <Table singleLine inverted={isDark.current}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Supports</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {repository.items[selectedIndex].reports.map((report, reportIndex) =>

                    <SupportType report={report} key={reportIndex} reportIndex={reportIndex} />

                )}

            </Table.Body>
        </Table>

    )
}

const Repository = () => {

    const dispatch = useDispatch()
    const { isDark } = useSelector(state => state.settings)
    const { currentUser } = useSelector(state => state.user)
    const repository = useSelector(state => state.repository)
    const { funds } = useSelector(state => state.funds)

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/repository')
        dispatch(toggleRepoLoading(true))
        dispatch(getRepository('funds'))
    }, [])

    const [selectedIndex, setSelectedIndex] = useState(null)
    const onRowSelect = itemIndex => {
        if (selectedIndex === itemIndex) {
            setSelectedIndex(null)
        } else {
            setSelectedIndex(itemIndex)
        }
    }

    const sidePanes = [
        {
            menuItem: 'Supports',
            render: () => <Tab.Pane style={{ height: detailHeight, padding: 0 }} attached='top'><SupportTree selectedIndex={selectedIndex} /></Tab.Pane>,
        },
        {
            menuItem: '2',
            render: () => <Tab.Pane style={{ height: detailHeight }} attached='top'> {selectedIndex ? repository.items[selectedIndex].indexName : 'None Selected'}</Tab.Pane>,
        },
    ]

    const history = useHistory()

    const handleDoubleClick = id => {

        const selectedFund = funds[funds.findIndex(f => f.value === id)]

        dispatch(changeSelectedFund(selectedFund))
        history.push(`/setup/funds/${id}`)
    }

    return (

        <TableDetailContainer style={{ padding: 2 }}>

            <Segment loading={repository.isLoading} style={{ overflowY: 'scroll', maxHeight: mainHeight, padding: 0 }}>

                <RepoTable onRowSelect={onRowSelect} selectedIndex={selectedIndex} handleDoubleClick={handleDoubleClick} />

            </Segment>

            <Tab menu={{ attached: 'bottom' }} panes={sidePanes} />

        </TableDetailContainer>
    )
}

export default Repository
