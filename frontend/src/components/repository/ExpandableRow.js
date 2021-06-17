import React from 'react'
import { TableRow, RowWrapper, LeftRow, RightRow, TableWrapper, TableHeader, TableMain } from '../../assets/styled-components/Table'
import { Caption, RowItem, HeaderItem } from '../../assets/styled-components/Carry'
import { IconWrapper } from '../../assets/styled-components/General'
import { numberWithCommas, trimString } from '../common/helpers'

const tableStyle = {
    gridTemplateRows: '2.5rem auto',
    borderTop: '1px solid #2828285e',
    borderBottom: '1px solid #2828285e'
}
const headerStyle = {
    width: '100%',
    height: '2.5rem',
    backgroundColor: 'var(--header-color)',
    display: 'flex',
}
const maxWidthStyle = {
    width: '8rem',
    maxWidth: '8rem'
}
const attStyle = {
    fontSize: '1rem',
}


const Attachments = ({ files, onChange }) => {

    const onAddFile = (fileIndex, key, value) => {
        console.log('File added', fileIndex, key, value)

        onChange(fileIndex, key, value)
    }


    const renderName = (file, fileIndex) => {
        if (file.isUploaded) {
            return file.name
        } else {
            return (
                <input
                    style={{ marginLeft: 5 }}
                    type="file"
                    onChange={e => onAddFile(fileIndex, 'add-attachment', e.target.files[0])} />
            )
        }
    }

    const renderIcon = file => {

        if (file.dateCreated === '') {
            return <i className="save icon"></i>
        } else if (file.editable) {
            return <i className="save icon"></i>
        } else {
            return <i className="edit icon"></i>
        }
    }

    const onSaveEditClick = (file, fileIndex) => {
        if (file.dateCreated === '') {
            onChange(fileIndex, 'save-attachment', file)
        } else {

        }
        // onChange('editable', !file.editable)
    }


    return (

        <TableWrapper style={tableStyle}>

            <TableHeader style={headerStyle}>

                <LeftRow>
                    <HeaderItem style={{ paddingLeft: '1rem', flex: 2, justifyContent: 'flex-start', color: '#fff' }}>File Name</HeaderItem>
                    <HeaderItem style={{ paddingLeft: '1rem', justifyContent: 'flex-start', color: '#fff' }}>Uploaded By</HeaderItem>
                    <HeaderItem style={{ paddingLeft: '1rem', justifyContent: 'flex-start', color: '#fff' }}>Uploaded Date</HeaderItem>
                </LeftRow>

                <RightRow style={{ width: '12rem', maxWidth: '12rem' }}>
                    <HeaderItem style={{ display: 'flex', justifyContent: 'center', color: '#fff' }}>Actions</HeaderItem>
                </RightRow>

            </TableHeader>

            <TableMain style={{ maxHeight: 350, overflowY: 'auto' }}>

                {files.map((file, fileIndex) =>
                    <TableRow key={fileIndex} style={{ display: 'flex' }}>
                        <LeftRow isOverride={false}>
                            <RowItem style={{ ...attStyle, flex: 2, textIndent: '1rem' }}>
                                {renderName(file, fileIndex)}
                            </RowItem>
                            <RowItem style={{ ...attStyle }}>{file.uploadedBy}</RowItem>
                            <RowItem style={{ ...attStyle }}>{file.dateCreated}</RowItem>
                        </LeftRow>

                        <RightRow style={{ width: '12rem', maxWidth: '12rem' }}>

                            {/* <EditWrapper
                                style={{ flex: 1 }}
                                isHoverable={true}
                                onClick={() => onSaveEditClick(file, fileIndex)}>

                                {renderIcon(file)}

                            </EditWrapper>

                            <EditWrapper
                                style={{ flex: 1 }}
                                isHoverable={true}
                                onClick={() => onChange(fileIndex, 'delete', !file.editable)}>

                                <i className="trash icon"></i>

                            </EditWrapper> */}

                        </RightRow>

                    </TableRow>
                )}

            </TableMain>

        </TableWrapper>

    )
}

const ExpandableRow = ({ row, onChange, fieldIndex }) => {

    const isHoverable = () => {
        return true
    }

    const handleOpen = (key, value) => {
        onChange(null, { fieldIndex: fieldIndex, fileIndex: null }, key, value)
    }

    const handleAdd = () => {
        onChange(null, { fieldIndex: fieldIndex, fileIndex: null }, 'add', null)
    }

    const renderDescription = () => {

    }

    const handleRowChange = () => {

    }

    const onAttachmentChange = (fileIndex, key, value) => {

        onChange(null, { fieldIndex: fieldIndex, fileIndex: fileIndex }, key, value)
    }

    return (
        <RowWrapper>

            <TableRow
                key={row.id}
                isHoverable={false}
                style={{
                    height: '3rem',
                    borderBottom: '1px solid var(--text-secondary-light)'
                }}
            >

                <div style={{ flex: 3, display: 'flex', height: '100%' }}>

                    <IconWrapper isHoverable={isHoverable()} onClick={() => handleOpen('isOpen', !row.isOpen)}>
                        {row.files.length === 0 ? null : <i className={(row.isOpen ? "minus" : "plus") + " icon"}></i>}
                    </IconWrapper>
                    <Caption style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}>{row.label}</Caption>

                </div>

                <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    {/* {row.editable ?
                        <FormInput
                            value={row.total.current}
                            placeholder="Enter Pre-Waibe amount"
                            onChange={value => handleRowChange('total', value)}
                            isError={row.total.isError}
                            unsaved_changes={row.total.unsaved_changes} /> :
                        `$${numberWithCommas(row.total.current)}`} */}
                </Caption>

                <Caption style={{ maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}>{row.files.length}</Caption>
                <Caption style={{ maxWidth: '8rem', display: 'flex', padding: 0 }}>
                    <IconWrapper style={{ height: '100%', width: '100%', flex: 1, cursor: 'pointer' }} isHoverable={true} onClick={() => handleAdd()}>
                        <i className="plus icon"></i>
                    </IconWrapper>

                </Caption>

            </TableRow>


            {row.isOpen ? <Attachments files={row.files} onChange={onAttachmentChange} /> : null}
        </RowWrapper>
    )
}

export default ExpandableRow
