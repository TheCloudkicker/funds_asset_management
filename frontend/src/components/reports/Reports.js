import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TableDetailContainer } from '../../assets/styled-components/Containers'
import { Tab, Segment, Table, Button, Icon, Menu, Container, Input, Checkbox, List, Sticky } from 'semantic-ui-react'
import { updateReports, initReport } from '../../store/actions/reports'
import { numberWithCommas } from '../common/helpers'

const detailHeight = 'calc(100vh - 8rem)'
const tableHeight = 'calc(100vh - 10rem)'

const GeneratedReport = ({ activeReportIndex }) => {

    const { reports } = useSelector(state => state.reports)
    const { isDark } = useSelector(state => state.settings)

    return (

        <div style={{ overflowY: 'auto', maxHeight: tableHeight }}>

            <Table inverted={isDark.current} celled padded selectable sortable >

                <Table.Header>
                    <Table.Row>
                        {reports[activeReportIndex].headers.map(header =>
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
                    {reports[activeReportIndex].items.map((item, itemIndex) =>
                        <Table.Row error={false} style={{ height: '3rem', cursor: 'pointer' }} key={itemIndex}>
                            <Table.Cell>{item.indexName}</Table.Cell>
                            {item.values.map((value, valueIndex) =>
                                <Table.Cell key={valueIndex}>{value.isNumber ? numberWithCommas(value.value) : value.value}</Table.Cell>
                            )}
                        </Table.Row>
                    )}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={reports[activeReportIndex].headers.length}>

                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}

const FundsSelector = ({ activeReportIndex }) => {

    const reports = useSelector(state => state.reports)
    const [fundsFilter, setFundsFilter] = useState('')
    const [selectAll, setSelectAll] = useState(false)
    const dispatch = useDispatch()


    const onChange = (reportIndex, key, value) => {
        console.log('onChange', reportIndex, key, value)
    }

    const handleSelectAll = bool => {
        setSelectAll(bool)
        updateReports({ ...reports }, dispatch, [activeReportIndex, null, null], 'fund-checked-all', bool)
    }

    const handleClick = (fundIndex, checked) => {
        updateReports({ ...reports }, dispatch, [activeReportIndex, fundIndex, null], 'fund-checked', checked)
    }

    console.log('activeReportIndex', activeReportIndex)

    const isRender = () => {
        return reports.reports.length > 0
    }


    return (
        <>
            <div style={{ display: 'flex', height: '3rem', width: '100%' }}>
                <div style={{ height: '100%', width: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Checkbox checked={selectAll} onChange={(e, data) => handleSelectAll(data.checked)} />
                </div>

                <div style={{ height: '100%', flex: 1, paddingRight: 10 }}>
                    <Input value={fundsFilter} onChange={(e, data) => setFundsFilter(data.value)} style={{ flex: 1, minWidth: '100%' }} placeholder='Filter funds...' />
                </div>
            </div>

            <div style={{ flex: 1, flexDirection: 'column', overflowY: 'auto', maxHeight: 'calc(45vh)' }}>

                <List divided relaxed>
                    {isRender() ? reports.reports[activeReportIndex].params.funds.map((fund, fundIndex) => {

                        if (fund.label.toLowerCase().includes(fundsFilter.toLowerCase()) || !fundsFilter) {
                            return (

                                <List.Item key={fundIndex} style={{ display: 'flex' }}>
                                    <div style={{ height: '100%', width: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Checkbox checked={fund.checked} onChange={(e, data) => handleClick(fundIndex, data.checked)} />
                                    </div>

                                    <div style={{ height: '100%', flex: 1, display: 'flex', alignItems: 'center', paddingTop: 4 }}>
                                        {fund.label}
                                    </div>
                                </List.Item>
                            )
                        }
                    }) : null}

                </List>
            </div>
        </>
    )
}

const PeriodSelector = ({ activeReportIndex }) => {

    const reports = useSelector(state => state.reports)
    const [periodsFilter, setPeriodsFilter] = useState('')
    const dispatch = useDispatch()

    const handleClick = (periodIndex, checked) => {
        updateReports({ ...reports }, dispatch, [activeReportIndex, null, periodIndex], 'period-checked', checked)
    }

    const isRender = () => {
        return reports.reports.length > 0
    }

    return (
        <>
            <div style={{ display: 'flex', height: '3rem', width: '100%' }}>
                <div style={{ height: '100%', width: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Checkbox checked={false} disabled={true} />
                </div>

                <div style={{ height: '100%', flex: 1, paddingRight: 10 }}>
                    <Input value={periodsFilter} onChange={(e, data) => setPeriodsFilter(data.value)} style={{ flex: 1, minWidth: '100%' }} placeholder='Filter periods...' />
                </div>
            </div>

            <div style={{ flex: 1, flexDirection: 'column', overflowY: 'auto', maxHeight: 'calc(15vh)' }}>

                <List divided relaxed>
                    {isRender() ? reports.reports[activeReportIndex].params.periods.map((period, periodIndex) => {
                        if (period.label.toLowerCase().includes(periodsFilter.toLowerCase()) || !periodsFilter) {
                            return (
                                <List.Item key={periodIndex} style={{ display: 'flex' }}>
                                    <div style={{ height: '100%', width: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Checkbox checked={period.checked} onChange={(e, data) => handleClick(periodIndex, data.checked)} />
                                    </div>

                                    <div style={{ height: '100%', flex: 1, display: 'flex', alignItems: 'center', paddingTop: 4 }}>
                                        {period.label}
                                    </div>
                                </List.Item>
                            )
                        }
                    }) : null}

                </List>
            </div>
        </>
    )
}


const CustomReportForm = ({ handleGenerate, activeReportIndex }) => {


    const database = useSelector(state => state.database)
    const [reportsFilter, setReportsFilter] = useState('')

    return (
        <Container style={{ width: '100%', flex: 1, padding: 5, display: 'flex', flexDirection: 'column', height: detailHeight }}>

            <Segment secondary style={{ flex: 3, padding: 5, display: 'flex', flexDirection: 'column', marginBottom: 2 }}>

                <FundsSelector activeReportIndex={activeReportIndex} />

            </Segment>

            <Segment secondary style={{ flex: 1, marginBottom: 2, marginTop: 2 }}>

                <PeriodSelector activeReportIndex={activeReportIndex} />

            </Segment>

            <Segment secondary style={{ flex: 1, marginTop: 2 }}>

                <div style={{ display: 'flex', height: '3rem', width: '100%' }}>
                    <div style={{ height: '100%', width: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Checkbox checked={true} />
                    </div>

                    <div style={{ height: '100%', flex: 1 }}>
                        <Input value={reportsFilter} onChange={(e, data) => setReportsFilter(data.value)} style={{ flex: 1, minWidth: '100%' }} placeholder='Filter source reports...' />
                    </div>
                </div>

                <div style={{ flex: 1, flexDirection: 'column', overflowY: 'auto', maxHeight: 'calc(15vh)' }}>

                    <List divided relaxed>
                        {database.database.length > 0 ? database.database[0].reports.map((report, reportIndex) => {
                            if (report.label.toLowerCase().includes(reportsFilter.toLowerCase()) || !reportsFilter) {

                                return (
                                    <List.Item key={reportIndex} style={{ display: 'flex' }}>
                                        <div style={{ height: '100%', width: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Checkbox checked={true} />
                                        </div>

                                        <div style={{ height: '100%', flex: 1, display: 'flex', alignItems: 'center', paddingTop: 4 }}>
                                            {report.label}
                                        </div>
                                    </List.Item>
                                )
                            }
                        }) : null}

                    </List>
                </div>
            </Segment>

            <div style={{ height: '4rem', padding: 5, display: 'flex', alignItems: 'center' }}>

                <Button content='Generate' color='black' icon='table' labelPosition='left' onClick={() => handleGenerate('generate', true)} />
                <Button content='Save' color='black' icon='save' labelPosition='left' />
                <Button content='Delete' color='black' icon='trash' labelPosition='right' />

            </div>

        </Container>
    )
}

const StandardReportSelector = ({ activeReportIndex }) => {

    const reports = useSelector(state => state.reports)
    const [reportsFilter, setReportsFilter] = useState('')
    const dispatch = useDispatch()


    const isChecked = option => {
        if (reports.reports.length === 0) {
            return false
        } else if (option.value === reports.reports[activeReportIndex].params.standardReport) {
            return true
        } else {
            return false
        }
    }
    const handleClick = (optionIndex, checked) => {
        updateReports({ ...reports }, dispatch, [activeReportIndex, null, null, optionIndex], 'option-checked', checked)
    }


    return (
        <>
            <div style={{ display: 'flex', height: '3rem', width: '100%' }}>
                <div style={{ height: '100%', width: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Checkbox checked={false} disabled={true} />
                </div>

                <div style={{ height: '100%', flex: 1, paddingRight: 10 }}>
                    <Input value={reportsFilter} onChange={(e, data) => setReportsFilter(data.value)} style={{ flex: 1, minWidth: '100%' }} placeholder='Filter standard reports...' />
                </div>
            </div>

            <div style={{ flex: 1, flexDirection: 'column', overflowY: 'auto', maxHeight: 'calc(15vh)' }}>

                <List divided relaxed>
                    {reports.standardOptions.map((option, optionIndex) => {
                        if (option.label.toLowerCase().includes(reportsFilter.toLowerCase()) || !reportsFilter) {

                            return (
                                <List.Item key={optionIndex} style={{ display: 'flex' }}>
                                    <div style={{ height: '100%', width: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Checkbox checked={isChecked(option)} onChange={(e, data) => handleClick(option.value, data.checked)} />
                                    </div>

                                    <div style={{ height: '100%', flex: 1, display: 'flex', alignItems: 'center', paddingTop: 4 }}>
                                        {option.label}
                                    </div>
                                </List.Item>
                            )
                        }
                    })}

                </List>
            </div>
        </>
    )
}


const StandardReportForm = ({ handleGenerate, activeReportIndex }) => {

    return (
        <Container style={{ width: '100%', flex: 1, padding: 5, display: 'flex', flexDirection: 'column', height: detailHeight }}>

            <Segment secondary style={{ flex: 3, padding: 5, display: 'flex', flexDirection: 'column', marginBottom: 2 }}>

                <FundsSelector activeReportIndex={activeReportIndex} />

            </Segment>

            <Segment secondary style={{ flex: 1, marginBottom: 2, marginTop: 2 }}>

                <PeriodSelector activeReportIndex={activeReportIndex} />

            </Segment>

            <Segment secondary style={{ flex: 1, marginTop: 2 }}>

                <StandardReportSelector activeReportIndex={activeReportIndex} />

            </Segment>

            <div style={{ height: '4rem', padding: 5, display: 'flex', alignItems: 'center' }}>

                <Button content='Generate' color='black' icon='table' labelPosition='left' onClick={() => handleGenerate('generate', true)} />
                <Button content='Save' color='black' icon='save' labelPosition='left' />
                <Button content='Delete' color='black' icon='trash' labelPosition='right' />

            </div>

        </Container>
    )

}

const Reports = () => {

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/reports')
    }, [])

    const { isDark } = useSelector(state => state.settings)
    const reports = useSelector(state => state.reports)
    const { funds } = useSelector(state => state.funds)
    const { periods } = useSelector(state => state.periods)
    const dispatch = useDispatch()

    const closeReport = (e, reportIndex) => {
        e.stopPropagation();
        setActiveReportIndex(0)
        updateReports({ ...reports }, dispatch, [reportIndex], 'close', true)
    }

    useEffect(() => {

        if (reports.reports.length === 0) {
            initReport(dispatch, funds, periods)
        }

    }, [])

    const [activeIndex, setActiveIndex] = useState(0)
    const [activeReportIndex, setActiveReportIndex] = useState(0)

    const renderPanes = () => {

        let reportPanes = []

        for (var i = 0; i < reports.reports.length; i++) {

            const name = reports.reports[i].name
            const isLoading = reports.reports[i].isLoading
            const reportIndex = i

            reportPanes.push({
                menuItem: (
                    <Menu.Item key={name}>
                        {isLoading ? 'Loading...' : name}<Button onClick={e => closeReport(e, reportIndex)} style={{ marginLeft: 15 }} icon color='black'><Icon name="close" /></Button>
                    </Menu.Item>
                ),
                render: () => <Tab.Pane inverted={isDark.current} loading={isLoading} style={{ height: 'calc(100vh - 8.6rem)' }} attached='top'><GeneratedReport activeReportIndex={activeReportIndex} /></Tab.Pane>,
            })

        }

        return reportPanes
    }

    const onChange = (reportIndex, key, value) => {
        console.log('onChange', reportIndex, key, value)
    }

    const handleGenerate = (key, value) => {
        updateReports({ ...reports }, dispatch, [activeIndex,], key, value)
    }


    const sidePanes = [
        {
            menuItem: 'Standard',
            render: () => <Tab.Pane style={{ height: detailHeight, padding: 0 }} attached='top'><StandardReportForm handleGenerate={handleGenerate} onChange={onChange} activeReportIndex={activeReportIndex} /></Tab.Pane>,
        },
        {
            menuItem: 'Custom',
            render: () => <Tab.Pane style={{ height: detailHeight, padding: 0 }} attached='top'><CustomReportForm handleGenerate={handleGenerate} onChange={onChange} activeReportIndex={activeReportIndex} /></Tab.Pane>,
        },

    ]

    const onTabChange = (e, data) => setActiveIndex(data.activeIndex)
    const onTabChange2 = (e, data) => setActiveReportIndex(data.activeIndex)

    return (
        <TableDetailContainer style={{ padding: 5 }}>

            {reports.reports.length === 0 ? <div></div> : <Tab activeIndex={activeReportIndex} onTabChange={onTabChange2} menu={{ attached: 'bottom' }} panes={renderPanes()} />}

            <Tab onTabChange={onTabChange} activeIndex={activeIndex} menu={{ attached: 'bottom' }} panes={sidePanes} />

        </TableDetailContainer>
    )
}

export default Reports