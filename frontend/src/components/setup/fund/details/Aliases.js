import React, { useState, useEffect } from 'react'

import { InputForm } from '../../../common/FormInput'
import { TableHeader, HeaderItem, TableMain, TableWrapper, TableRow, RowItem, LeftRow, RightRow } from '../../../../assets/styled-components/Table'
import { Caption, EditWrapper } from '../../../../assets/styled-components/Carry'

import { useSelector, useDispatch } from 'react-redux'
import { addAltFundName, deleteAltFundName, saveAltFundName, updateAltFundName } from '../../../../store/actions/funds/funds'
import Header from '../../../table/Header'
import { Button, Icon } from 'semantic-ui-react'

const tableStyle = {
    overflowY: 'auto',
    maxHeight: '80vh',
    paddingRight: '2rem',
    paddingTop: '1rem'
}


const Aliases = () => {

    const { fundObject } = useSelector(state => state.funds)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const onChange = (index, key, value) => {

    }

    return (
        <TableWrapper style={{ height: '100%' }} >

            <Header description={`Alternative Funds Names`} hasShadow={false} />

            <TableMain style={tableStyle}>

                {fundObject.alt_names.map((name, index) =>

                    <TableRow key={index} style={{ height: '4.3rem' }}>

                        <LeftRow style={{ flex: 1, alignItems: 'center' }}>

                            <InputForm obj={name.name} onChange={value => onChange(index, 'name', value)} />
                            <Caption>{name.dateCreated}</Caption>
                            <Caption>{name.createdBy}</Caption>

                        </LeftRow>

                        <RightRow style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5, width: 100, maxWidth: 100, minWidth: 100 }}>

                            <Button.Group size='small'>

                                <Button color='black' icon onClick={() => onChange(index, 'delete', !name.editable)}>
                                    <Icon name='trash' />
                                </Button>

                                <Button color='black' icon onClick={() => onChange(index, 'editable', !name.editable)}>
                                    <Icon name={!name.editable ? 'edit' : 'lock'} />
                                </Button>

                            </Button.Group>

                        </RightRow>
                    </TableRow>

                )}



            </TableMain>
        </TableWrapper>
    )
}

export default Aliases
{/* <AddButton onClick={() => dispatch(addAltFundName(fundObject.id))}>
                    <i className="plus icon inverted"></i>
                </AddButton> */}