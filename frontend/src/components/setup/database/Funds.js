import React, { useEffect } from 'react'
import { TableMain, HeaderItem, RowItem, TableRow, TableHeader, TableWrapper } from '../../../assets/styled-components/Table'
import Section from './Section'
import { useSelector } from 'react-redux'
import CheckBox from '../../common/CheckBox'
import { ButtonWrapper } from '../../../assets/styled-components/General'

import { Caption } from '../../../assets/styled-components/Carry'
import FormInput from '../../common/FormInput'
import Select from '../../common/Select'
import { getClientReports, updateFundClientReportObject, saveFundClientReport } from '../../../store/actions/database'


const ReportMain = ({ fundClientReport, dispatch, reportIndex }) => {

    const onChange = (key, value) => {
        dispatch(updateFundClientReportObject(reportIndex, null, null, key, value))
    }

    const onMappingChange = (mappingIndex, key, value) => {
        dispatch(updateFundClientReportObject(reportIndex, mappingIndex, null, key, value))
    }

    const handleSave = report => {
        dispatch(saveFundClientReport(report))
    }

    return (
        <div style={{ paddingTop: 5, overflowY: 'auto' }}>
            <TableWrapper>
                <TableMain>
                    <TableRow>
                        <Caption>Report Name</Caption>

                        <FormInput
                            styles={{ height: '3.5rem' }}
                            placeholder="Report Name"
                            isError={fundClientReport.name.isError} unsaved_changes={fundClientReport.name.unsaved_changes}
                            value={fundClientReport.name.current} onChange={value => onChange('name', value)} />


                    </TableRow>
                    <TableRow>
                        <Caption>Fund Identifier</Caption>

                        <div style={{ width: '100%' }}>

                            <Select
                                placeholder="Select criteria which determines fund"
                                isError={fundClientReport.fundIdentifier.isError} unsaved_changes={fundClientReport.fundIdentifier.unsaved_changes}
                                value={fundClientReport.fundIdentifier.current}
                                options={[{ value: 'File Name', label: 'File Name' }, ...fundClientReport.headers]}
                                onChange={value => onChange('fundIdentifier', value)} />

                        </div>


                    </TableRow>
                    <TableRow>
                        <Caption>Year Identifier</Caption>
                        <div style={{ width: '100%' }}>

                            <Select
                                placeholder="Select criteria which determines period"
                                isError={fundClientReport.periodIdentifier.isError} unsaved_changes={fundClientReport.periodIdentifier.unsaved_changes}
                                value={fundClientReport.periodIdentifier.current}
                                options={[{ value: 'File Name', label: 'File Name' }, ...fundClientReport.headers]}
                                onChange={value => onChange('periodIdentifier', value)} />

                        </div>

                    </TableRow>

                    {fundClientReport.mappings.map((mapping, mappingIndex) =>
                        <TableRow key={mapping.id}>
                            <Caption>{mapping.waibeHeader}</Caption>

                            <Select
                                placeholder={`select header which maps to ${mapping.waibeHeader}`}
                                isMulti={true}
                                value={mapping.clientHeaders.current}
                                isError={mapping.clientHeaders.isError} unsaved_changes={mapping.clientHeaders.unsaved_changes}
                                options={fundClientReport.headers}
                                onChange={value => onMappingChange(mappingIndex, 'clientHeaders', value)} />

                        </TableRow>


                    )}

                    <TableRow>
                        <Caption>Actions</Caption>
                        <ButtonWrapper style={{ marginTop: 10 }} className={"ui vertical animated button"} tabIndex="0" onClick={() => handleSave(fundClientReport)} >
                            <div className="hidden content">Save</div>
                            <div className="visible content">
                                <i className={"save icon"}></i>
                            </div>
                        </ButtonWrapper>

                    </TableRow>

                </TableMain>

            </TableWrapper>


        </div>
    )
}

const ReportContainer = ({ fundClientReport, isDark, reportIndex, dispatch }) => {
    const onCheck = () => {

    }

    return (
        <div style={{ marginBottom: 20 }}>


        </div>
    )
}


const Funds = ({ fundClientReports, dispatch, isDark }) => {

    useEffect(() => {
        dispatch(getClientReports('fund'))
    }, [])

    return (
        <div>
            {fundClientReports.map((fundClientReport, reportIndex) =>

                <ReportContainer
                    key={fundClientReport.id}
                    reportIndex={reportIndex}
                    dispatch={dispatch}
                    fundClientReport={fundClientReport}
                    isDark={isDark} />

            )}
        </div>
    )
}

export default Funds
