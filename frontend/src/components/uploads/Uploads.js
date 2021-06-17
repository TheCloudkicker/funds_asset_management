import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { proccessFiles, updateUploads } from '../../store/actions/uploads/uploads'
import { getDatabase, updateDatabase } from '../../store/actions/database'

import { TableDetailContainer } from '../../assets/styled-components/Containers'

import Dropzone from '../common/Dropzone'
import { Tab, Segment, Table, Icon, Container, Button, Select } from 'semantic-ui-react'
import { StatusIcon2, FileTypeIcon2 } from '../common/iconUtils'
import { InputForm } from '../common/FormInput'

const detailHeight = 'calc(100vh - 7.9rem)'
const subHeight = 'calc(100vh - 11rem)'

const Viewer = ({ selected }) => {

    const { fileTables } = useSelector(state => state.uploads)
    const { isDark } = useSelector(state => state.settings)

    const isRender = () => {
        return selected.tableIndex !== null && selected.fileIndex !== null
    }

    return (
        <Container style={{ width: '100%', flex: 1, padding: 5, overflowY: 'auto', maxHeight: subHeight }}>

            {isRender() ?

                <Table inverted={isDark.current}>

                    <Table.Header>
                        <Table.Row>
                            {fileTables[selected.tableIndex].files[selected.fileIndex].data.headers.map((header, index) =>
                                <Table.HeaderCell key={index}>{header.original}</Table.HeaderCell>
                            )}
                        </Table.Row>
                    </Table.Header>



                    <Table.Body>
                        {fileTables[selected.tableIndex].files[selected.fileIndex].data.items.map((item, index) =>

                            <Table.Row error={false} style={{ height: '3rem' }} key={index}>

                                {Object.keys(item).map((keyName, keyIndex) => {

                                    if (keyIndex !== Object.keys(item).length - 1) {

                                        return <Table.Cell key={keyIndex}>{item[keyName]}</Table.Cell>
                                    }


                                })}

                            </Table.Row>

                        )}

                    </Table.Body>
                </Table> : null}


        </Container>
    )
}


const Report = ({ report, onChange, reportIndex }) => {

    const { isDark } = useSelector(state => state.settings)

    return (
        <div style={{ maxHeight: 300, overflowY: 'scroll', marginBottom: 5 }}>

            <Table inverted={isDark.current}>

                <Table.Header onClick={() => onChange(reportIndex, null, 'isOpen', !report.isOpen)}>
                    <Table.Row>
                        <Table.HeaderCell style={{ justifyContent: 'flex-start', paddingLeft: '1rem', cursor: 'pointer' }}>{report.label}</Table.HeaderCell>
                        <Table.HeaderCell style={{ width: '5rem', cursor: 'pointer' }}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                {report.isOpen ?
                    <Table.Body>
                        {report.fields.map((field, fieldIndex) =>
                            <Table.Row error={false} style={{ height: '3rem' }} key={fieldIndex} onClick={() => onChange(1)}>
                                <Table.Cell style={{ justifyContent: 'flex-start', paddingLeft: '1rem', }}>
                                    <InputForm obj={field.label} onChange={value => onChange(reportIndex, fieldIndex, 'label', value)} inputStyles={{ textAlign: 'left' }} wrapperStyles={{ minWidth: '100%' }} isText={true} />
                                </Table.Cell>
                                <Table.Cell style={{ width: '5rem', cursor: 'pointer' }}>

                                    <Button.Group size='small'>

                                        <Button color='black' icon disabled={false} onClick={() => onChange(reportIndex, fieldIndex, 'readOnly', !field.label.readOnly)}>
                                            <Icon name={field.label.readOnly ? 'edit' : 'save'} />
                                        </Button>

                                    </Button.Group>

                                </Table.Cell>
                            </Table.Row>
                        )}

                    </Table.Body>

                    : null}

            </Table>
        </div>
    )
}


const DatabaseSetup = ({ reportTypeIndex, onChange }) => {

    const { database } = useSelector(state => state.database)

    return (
        <Container style={{ width: '100%', flex: 1, padding: 5 }}>

            {database[reportTypeIndex].reports.map((report, reportIndex) =>

                <Report
                    key={reportIndex}
                    reportIndex={reportIndex}
                    onChange={onChange}
                    report={report} />

            )}

        </Container>
    )
}


const FileTable = ({ fileTable, onChange, tableIndex }) => {

    const { funds } = useSelector(state => state.funds)
    const { periods } = useSelector(state => state.periods)
    const { database } = useSelector(state => state.database)
    const { isDark } = useSelector(state => state.settings)

    return (
        <Table inverted={isDark.current}>
            <Table.Header onClick={() => onChange(tableIndex, null, 'isOpen', !fileTable.isOpen)}>
                <Table.Row  >
                    <Table.HeaderCell style={{ justifyContent: 'flex-start', paddingLeft: '1rem', width: 'auto', cursor: 'pointer' }}>{fileTable.title} -  {fileTable.files.length} Files</Table.HeaderCell>
                    {fileTable.isOpen ? <Table.HeaderCell style={{ cursor: 'pointer' }}></Table.HeaderCell> : null}
                    {fileTable.isOpen ? <Table.HeaderCell style={{ cursor: 'pointer' }}></Table.HeaderCell> : null}
                    {fileTable.isOpen ? <Table.HeaderCell style={{ cursor: 'pointer' }}></Table.HeaderCell> : null}
                    {fileTable.isOpen ? <Table.HeaderCell style={{ cursor: 'pointer' }}></Table.HeaderCell> : null}
                    {fileTable.isOpen ? <Table.HeaderCell style={{ cursor: 'pointer' }}></Table.HeaderCell> : null}
                    <Table.HeaderCell style={{ width: '12rem', cursor: 'pointer' }}>Overall Status: {fileTable.status}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            {fileTable.isOpen ?

                <Table.Body>
                    {fileTable.files.map((file, fileIndex) =>
                        <Table.Row error={false} style={{ height: '3rem' }} key={fileIndex} onClick={() => onChange(1)}>
                            <Table.Cell style={{ width: '20rem' }}>{file.fileObj.name}</Table.Cell>

                            <Table.Cell>
                                <Select value={file.fund ? file.fund.value : null} style={{ width: '100%' }} onChange={(e, data) => onChange(tableIndex, fileIndex, 'fund', data.options[data.options.findIndex(o => o.value === data.value)])} placeholder="select fund" options={funds.map(fund => {
                                    return { value: fund.value, text: fund.label }
                                })} />
                            </Table.Cell>

                            <Table.Cell>
                                <Select value={file.period ? file.period.value : null} style={{ width: '100%' }} onChange={(e, data) => onChange(tableIndex, fileIndex, 'period', data.options[data.options.findIndex(o => o.value === data.value)])} placeholder="select period" options={periods.map(period => {
                                    return { value: period.value, text: period.label }
                                })} />
                            </Table.Cell>

                            <Table.Cell>
                                <Select value={file.report ? file.report.value : null} style={{ width: '100%' }} onChange={(e, data) => onChange(tableIndex, fileIndex, 'report', data.options[data.options.findIndex(o => o.value === data.value)])} placeholder="select report" options={database.length === 0 ? [] : database[0].reports.map(report => {
                                    return { value: report.value, text: report.label }
                                })} />
                            </Table.Cell>

                            <Table.Cell>
                                <Button.Group size='small'>

                                    <Button color='black' icon disabled={false} onClick={() => onChange(tableIndex, fileIndex, 'delete', true)}>
                                        <Icon disabled={false} name={'trash'} />
                                    </Button>
                                    <Button color='black' icon disabled={false} onClick={() => onChange(tableIndex, fileIndex, 'view', true)}>
                                        <Icon disabled={false} name={'eye'} />
                                    </Button>

                                </Button.Group>
                            </Table.Cell>

                            <Table.Cell><FileTypeIcon2 extension={file.extension} /></Table.Cell>
                            <Table.Cell><StatusIcon2 status={file.status} /></Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>

                : null}

        </Table>
    )
}

const Blocked = () => {

    const blockedFunds = [
        { id: 1, name: 'Fund 1', aliases: [], dataSources: [], entityOwnerships: [], history: 'history' },
        { id: 2, name: 'Fund 2', aliases: [], dataSources: [], entityOwnerships: [], history: 'history' },
        { id: 3, name: 'Fund 3', aliases: [], dataSources: [], entityOwnerships: [], history: 'history' },
    ]

    return (
        <Segment>
            <Table>
                <Table.Header >
                    <Table.HeaderCell>Blocked Fund Name</Table.HeaderCell>
                    <Table.HeaderCell>Data Sources</Table.HeaderCell>
                    <Table.HeaderCell>Aliases</Table.HeaderCell>
                    <Table.HeaderCell>Ownerships</Table.HeaderCell>
                    <Table.HeaderCell>History</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Header>

                <Table.Body>
                    {blockedFunds.map(blockedFund =>

                        <Table.Row isHoverable={true} key={blockedFund.id}>
                            <Table.Cell>{blockedFund.name}</Table.Cell>
                            <Table.Cell>{blockedFund.dataSources.length}</Table.Cell>
                            <Table.Cell>{blockedFund.aliases.length}</Table.Cell>
                            <Table.Cell>{blockedFund.entityOwnerships.length}</Table.Cell>
                            <Table.Cell>{blockedFund.history}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>

                    )}
                </Table.Body>
            </Table>


        </Segment>
    )
}

const Uploads = () => {

    const dispatch = useDispatch()
    const uploads = useSelector(state => state.uploads)
    const database = useSelector(state => state.database)
    const { isDark } = useSelector(state => state.settings)

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/uploads')
    }, [])



    const [activeIndex, setActiveIndex] = useState(0)
    const [selected, setSelected] = useState({ tableIndex: null, fileIndex: null })

    const onDragOverSide = () => {
        setActiveIndex(0)
    }

    const onChange = (tableIndex, fileIndex, key, value) => {

        if (key === 'view') {
            setActiveIndex(2)
            setSelected({ tableIndex, fileIndex })
        } else if (key === 'delete') {
            setSelected({ tableIndex: null, fileIndex: null })
            updateUploads(dispatch, { ...uploads }, tableIndex, fileIndex, key, value)
        } else {
            updateUploads(dispatch, { ...uploads }, tableIndex, fileIndex, key, value)
        }


    }
    const onDbChange = (reportTypeIndex, reportIndex, fieldIndex, key, value) => {
        updateDatabase(dispatch, { ...database }, reportTypeIndex, reportIndex, fieldIndex, key, value)
    }

    const onDrop = useCallback(acceptedFiles => {
        dispatch(proccessFiles(acceptedFiles))
    }, [])





    const onTabChange = (e, data) => setActiveIndex(data.activeIndex)

    const databasePanes = []

    database.database.map((reportType, reportTypeIndex) =>

        databasePanes.push({
            menuItem: reportType.label,
            render: () => <Tab.Pane key={reportTypeIndex} style={{ padding: 0, height: subHeight, display: 'flex', flexDirection: 'column' }} attached='top'><DatabaseSetup reportTypeIndex={reportTypeIndex} onChange={(reportIndex, fieldIndex, key, value) => onDbChange(reportTypeIndex, reportIndex, fieldIndex, key, value)} /></Tab.Pane>,
        }))


    const sidePanes = [
        {
            menuItem: 'Dropzone',
            render: () => <Tab.Pane style={{ height: detailHeight, padding: 0 }} attached='top'><Dropzone onDrop={onDrop} /></Tab.Pane>,
        },
        {
            menuItem: 'Database',
            render: () => <Tab.Pane style={{ height: detailHeight, padding: 0 }} attached='top'><Tab menu={{ attached: 'bottom' }} panes={databasePanes} /></Tab.Pane>,
        },
        {
            menuItem: 'Viewer',
            render: () => <Tab.Pane style={{ height: detailHeight, padding: 0 }} attached='top'><Viewer selected={selected} /></Tab.Pane>,
        },
        {
            menuItem: 'Blocked',
            render: () => <Tab.Pane style={{ height: detailHeight, padding: 0 }} attached='top'><Blocked /></Tab.Pane>,
        },
    ]


    return (
        <TableDetailContainer style={{ padding: 3 }}>

            <Segment inverted={isDark.current} style={{ margin: 0, padding: 5 }}>

                {uploads.fileTables.map((fileTable, index) => {

                    if (index === 0 || fileTable.files.length > 0) {

                        return <FileTable key={index} fileTable={fileTable} tableIndex={index} onChange={onChange} />
                    }

                })}

            </Segment>

            <Tab onDragOver={onDragOverSide} activeIndex={activeIndex} onTabChange={onTabChange} menu={{ attached: 'bottom' }} panes={sidePanes} />

        </TableDetailContainer>
    );
}

export default Uploads;
