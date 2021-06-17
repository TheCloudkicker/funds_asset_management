import React, { useState, useEffect } from 'react'
import { OverrideInput } from '../common/FormInput'

import { TableWrapper, TableHeader, TableMain, LeftRow, RightRow } from '../../assets/styled-components/Table'
import { TableRow, RowItem, InputWrapper, CheckboxWrapper, EditWrapper, Caption } from '../../assets/styled-components/Carry'
import { numberWithCommas, trimString } from '../common/helpers'
import Header from './Header'
import { Icon, Button, Checkbox } from 'semantic-ui-react'

const tableStyle = {
    gridTemplateRows: '2.5rem auto',
    borderTop: '1px solid #2828285e',
    borderBottom: '1px solid #2828285e'
}


const SelectionRow = ({ obj, index, onChange, sourceType }) => {

    const checkIfOverride = () => {
        return false
    }

    return (
        <TableRow>

            <LeftRow style={{ flex: 1, alignItems: 'center' }}>
                <Caption style={{ textIndent: '1rem' }}>{obj.name}</Caption>
                {sourceType === 'tb' ? <Caption style={{ textIndent: '1rem' }}>{trimString(obj.description, 25)}</Caption> : null}
                <OverrideInput wrapperStyles={{ minWidth: 150 }} obj={obj} onChange={onChange} />
            </LeftRow>

            <RightRow style={{ justifyContent: 'space-around', alignItems: 'center', paddingTop: 5, paddingBottom: 5, width: 100, maxWidth: 100, minWidth: 100 }}>

                <Checkbox checked={obj.include} onChange={() => onChange(index, 'include', !obj.include)} />
                <Button.Group size='small'>

                    <Button color='black' icon disabled={false} onClick={() => onChange(index, 'reset', true)}>
                        <Icon name={obj.editable ? 'undo' : 'edit'} />
                    </Button>
                    <Button color='black' icon disabled={obj.source !== 'Pre Waibe'} onClick={() => onChange(index, 'editable', true)}>
                        <Icon name={'undo'} />
                    </Button>

                </Button.Group>

            </RightRow>
        </TableRow>
    )
}




const Selector = ({ accounts, onChange, sourceType, yearIndex, ownership_perc = null }) => {

    return (
        <TableWrapper style={tableStyle}>

            <Header
                indexName={sourceType === 'tb' ? 'Account No.' : 'Investment Name'}
                subIndexName={sourceType === 'tb' ? 'Description' : ''}
                unique="selector" />

            <TableMain style={{ maxHeight: 350, overflowY: 'auto' }}>

                {accounts.map((account, accountIndex) =>

                    <SelectionRow
                        obj={account}
                        key={accountIndex}
                        sourceType={sourceType}
                        index={accountIndex}
                        onChange={onChange} />
                )}

            </TableMain>
        </TableWrapper>
    )
}

export default Selector

