import React, { useEffect } from 'react'

import { TableWrapper, TableHeader, HeaderItem, TableMain, TableRow, RowItem, } from '../../../assets/styled-components/Table'
import FormInput from '../../common/FormInput'
import {
    TableDetailContainer, LeftSection, RightSection
} from '../../../assets/styled-components/Containers'


import { getFslis, fsliToggleEdit, updateFsliInStore, deleteFsli, selectFsli } from '../../../store/actions/fs'
import { useSelector } from 'react-redux'
import { customStyles } from '../../../assets/styles/select'
import { fsliTypeOptions } from '../../common/helpers'
import Select from 'react-select'
import { Tab, Segment, Table, Icon, Container, Button } from 'semantic-ui-react'


const Fslis = ({ dispatch, isDark }) => {

    useEffect(() => {
        dispatch(getFslis())
    }, [])

    const { fslis, selectedFsli } = useSelector(state => state.fs)

    const fsli_headers = [
        { id: 1, name: 'Line Item', isWide: true },
        { id: 2, name: 'FSLI Type', isWide: false },
        { id: 3, name: 'Entity Type', isWide: false },
        { id: 4, name: 'No. Sub Accounts', isWide: false },
        { id: 5, name: 'Actions', isWide: false },
        { id: 5, name: 'Unsaved Changes', isWide: false },
    ]
    const handleEdit = (fsliID, isEditable) => dispatch(fsliToggleEdit(fsliID, isEditable))

    const handleDelete = fsliID => dispatch(deleteFsli(fsliID))
    const onChange = (fsliID, key, value) => dispatch(updateFsliInStore(fsliID, key, value))
    const handleClick = fsli => dispatch(selectFsli(fsli))

    return (
        <TableDetailContainer>

            <Segment>
                <TableWrapper>
                    <TableHeader hasShadow={true}>
                        {fsli_headers.map(header => <HeaderItem key={header.id} isWide={header.isWide}>{header.name}</HeaderItem>)}
                    </TableHeader>

                    <TableMain style={{ backgroundColor: 'var(--bg-primary)' }}>

                        {fslis.map(fsli =>

                            <TableRow onClick={() => handleClick(fsli)} isSelected={selectedFsli && selectedFsli.id === fsli.id} key={fsli.id}>

                                <RowItem isWide={true}>
                                    {fsli.editable ? <FormInput styles={{ height: '100%' }} value={fsli.name} onChange={e => onChange(fsli.id, 'name', e.target.value)} /> : fsli.name}
                                </RowItem>

                                <RowItem >
                                    {fsli.editable ?

                                        <Select
                                            placeholder="fsli type..."
                                            styles={customStyles}
                                            value={fsli.fsliType}
                                            options={fsliTypeOptions}
                                            onChange={fsliType => onChange(fsli.id, 'fsliType', fsliType)} /> : fsli.fsliType ? fsli.fsliType.value : 'Not Set'}

                                </RowItem>

                                <RowItem >{fsli.entityType ? fsli.entityType : 'Not Set'}</RowItem>
                                <RowItem >{fsli.noSubAccounts}</RowItem>

                                <RowItem style={{ justifyContent: 'space-evenly' }}>
                                </RowItem>

                                <RowItem unSavedChanges={fsli.unsaved_changes}></RowItem>
                            </TableRow>

                        )}

                    </TableMain>

                </TableWrapper>
            </Segment>



            <Segment>



            </Segment>

        </TableDetailContainer>
    )
}

export default Fslis
