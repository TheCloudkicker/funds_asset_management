import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RowItem, TableRow, TableWrapper, TableHeader, HeaderItem, TableMain } from '../../../../assets/styled-components/Table'

import { getSupportData } from '../../../../store/actions/funds/supports'

import DataTable from '../data/DataTable'
import Select from '../../../common/Select'


const Data = () => {

    const dispatch = useDispatch()
    const { fundObject } = useSelector(state => state.funds)
    const { periods } = useSelector(state => state.periods)
    const { reports } = useSelector(state => state.database.databaseObj.Funds)

    const [selectedIndex, setSelectedIndex] = useState(null)
    const [dataTypes, setDataTypes] = useState({})

    const determineDataTypes = itemsObj => {
        let types = {}

        Object.keys(itemsObj).map((keyName, keyIndex) => {

            if (keyIndex === 0) {
                types[keyName] = false
            } else if (!itemsObj[keyName]) {
                types[keyName] = false
            } else if (keyName.includes('ID')) {
                types[keyName] = false
            } else if (!isNaN(itemsObj[keyName])) {
                types[keyName] = true
            } else {
                types[keyName] = false
            }
        })
        setDataTypes(types)
    }

    // useEffect(() => {

    //     if (fundObject.uploaded_reports.length > 0) {
    //         for (var i = 0; i < fundObject.uploaded_reports.length; i++) {
    //             dispatch(updateFund('dataStatus', 'LOADING...', i))
    //             dispatch(getSupportData(fundObject.uploaded_reports[i].id, 'fundObject'))
    //         }
    //     }

    // }, [])

    // useEffect(() => {

    //     if (selectedIndex && fundObject.uploaded_reports[selectedIndex - 1].data.items.length > 0) {
    //         determineDataTypes(fundObject.uploaded_reports[selectedIndex - 1].data.items[0])
    //     }

    // }, [selectedIndex])

    const [dims, setDims] = useState({
        tableWidth: 0,
        tableHeight: 0
    })

    const rightRef = useRef(null)

    // useEffect(() => {
    //     setDims(prevState => {
    //         return {
    //             ...prevState,
    //             tableWidth: rightRef.current.offsetWidth,
    //             tableHeight: rightRef.current.offsetHeight - 40
    //         }
    //     })
    // }, [])

    const handleView = (report, index) => {
        if (report.dataStatus === 'Data loaded') {
            console.log('index', index)
            setSelectedIndex(index + 1 === selectedIndex ? null : index + 1)
        }
    }

    const handleEdit = (report, supportIndex) => {
        // dispatch(updateUploadedSupport(supportIndex, 'editable', !report.editable))
    }
    const handleDelete = reportID => {
    }
    const onChange = () => {

    }

    const datas = {
        headers: [
            { value: 'ReportType', label: 'Report Type' },
            { value: 'Period', label: 'Period' },
            { value: 'DateUploaded', label: 'Date Uploaded' },
            { value: 'UploadedBy', label: 'Uploaded By' },
            { value: 'IntegrityIssues', label: 'Integrity Issues' },
            { value: 'SourceFile', label: 'Source File' },
            { value: 'Actions', label: 'Actions' },
        ],
        datas: [
        ]
    }

    return (
        <TableWrapper>
            <TableHeader hasShadow={false} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                {datas.headers.map(header => <HeaderItem key={header.value}>{header.label}</HeaderItem>)}
            </TableHeader>

            <TableMain style={{ backgroundColor: 'var(--bg-primary)', overflowY: 'auto', maxHeight: 'calc(100vh - 13rem)' }}>

                {datas.datas.map((data, dataIndex) =>

                    <TableRow style={{ height: '3rem' }} key={data.value}>
                        <RowItem>{data.label}</RowItem>

                    </TableRow>

                )}

            </TableMain>

        </TableWrapper>
    )
}

export default Data
{/* <TableRow key={report.id}>
                        <RowItem style={{ flex: 2, justifyContent: 'flex-start', paddingLeft: '1rem' }}>
                            {report.editable ? <Select value={null} onChange={onChange} options={reports} unsaved_changes={false} isError={false} placeholder="Select report" /> : report.reportType}
                        </RowItem>
                        <RowItem style={{ flex: 2, justifyContent: 'flex-start' }}>
                            {report.editable ? <Select value={null} onChange={onChange} options={periods} unsaved_changes={false} isError={false} placeholder="Select period" /> : report.period}
                        </RowItem>
                        <RowItem>{report.dateUploaded}</RowItem>
                        <RowItem>{report.uploadedBy.name}</RowItem>
                        <RowItem>{report.integrityIssues.length}</RowItem>
                        <RowItem>{report.dataStatus}</RowItem>
                        <RowItem style={{ flex: 2, justifyContent: 'flex-start' }}>
                            <a target="_blank" href={report.originalFile.attachment}>{report.originalFile.fileName}</a>
                        </RowItem>
                        <RowItem style={{ display: 'flex' }}>
                            <IconWrapper onClick={() => handleDelete(report.id)} >
                                <i className="trash icon"></i>
                            </IconWrapper>
                            <IconWrapper onClick={() => handleEdit(report, index)}>
                                <i className="edit icon"></i>
                            </IconWrapper>
                            <IconWrapper onClick={() => handleView(report, index)} isSelected={selectedIndex && selectedIndex === index + 1}>
                                <i className="eye icon"></i>
                            </IconWrapper>
                        </RowItem>
                    </TableRow> */}
