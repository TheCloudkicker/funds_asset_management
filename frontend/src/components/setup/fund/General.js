import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { numberWithCommas, domicileLocations, entityTypes, acctSystems } from '../../common/helpers'
import Alises from './details/Aliases'
import Spinner from '../../common/Spinner'
import CheckBox from '../../common/CheckBox'
import { InputForm } from '../../common/FormInput'
import { CustomDateInput } from '../../common/DatePicker'
import Select from '../../common/Select'

import { Caption } from '../../../assets/styled-components/Carry'
import { TableMain, TableRow, TableWrapper } from '../../../assets/styled-components/Table'
import { updateFund } from '../../../store/actions/funds/funds'
import { updateLayout } from '../../../store/actions/layout'
import styled, { keyframes, css } from 'styled-components'
import { Tab } from 'semantic-ui-react'
import Header from '../../table/Header'

const tableStyle = {
    overflowY: 'auto',
    maxHeight: '80vh',
    paddingRight: '2rem',
    paddingTop: '1rem'
}
const ButtonContainer = styled.div`
    height: 100%;
    width: 4.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const AddButton = styled.div`
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding-left: 2px;
    padding-bottom: 5px;
    align-items: center;

    box-shadow: ${props => props.isDisabled ? '0px 1px 3px 0 rgba(0,0,0,.1)' : '0px 2px 5px 0 rgba(0,0,0,.3)'};
    border-radius: .28571429rem;
    background-color: ${props => props.isDisabled ? 'hsl(0,0%,95%)' : 'var(--header-color)'};


    &:hover{
        background-color: ${props => props.isDisabled ? 'none' : '#1a1919'}; ;
        box-shadow: ${props => props.isDisabled ? 'none' : '0px 5px 10px 0 rgba(0,0,0,.2)'};
    }
`

const FormRow = ({ formRow, onChange, rowIndex }) => {

    const renderInput = () => {
        if (formRow.formType === 'input') {
            return (
                <div style={{ flex: 1, height: '100%', display: 'flex', paddingTop: 2, paddingBottom: 2 }}>
                    <InputForm
                        obj={formRow}
                        isPercent={formRow.valueType === 'percent'}
                        isText={formRow.valueType === 'text'}
                        isYears={formRow.valueType === 'years'}
                        wrapperStyles={{ minWidth: '100%' }}
                        onChange={value => onChange(rowIndex, formRow.key, value)} />

                </div>


            )
        } else if (formRow.formType === 'select' || formRow.formType === 'bool') {
            return (
                <Select
                    value={formRow.current}
                    options={formRow.options}
                    isDisabled={formRow.readOnly}
                    onChange={value => onChange(rowIndex, formRow.key, value)}
                    unsaved_changes={formRow.unsaved_changes}

                />
            )
        } else if (formRow.formType === 'date') {
            return (
                <CustomDateInput
                    obj={formRow}
                    onChange={data => onChange(rowIndex, formRow.key, data.value)}
                />
            )
        } else {
            return "ERROR"
        }
    }
    // ...formRow.styles
    return (
        <TableRow style={{ height: '4.3rem', }} >
            <Caption >{formRow.text}</Caption>
            <ButtonContainer>
                {formRow.formType === 'select' && !formRow.readOnly ?
                    <AddButton onClick={() => onChange(rowIndex, { key: formRow.key, value: formRow.text }, 'ADD_SELECT_ITEM')}>
                        <i className="plus icon inverted"></i>
                    </AddButton>
                    : null}
            </ButtonContainer>

            {renderInput()}

        </TableRow>

    )
}


const General = ({ isDark }) => {

    const { investors } = useSelector(state => state.investors)
    const { fundObject, legacyLoading, isLoading, selectedFund } = useSelector(state => state.funds)
    const { dateFormat } = useSelector(state => state.settings)
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [fundSidePanel, setFundSidePanel] = useState('alt_names')

    const isValidDate = dateString => {
        var dateParts = dateString.split("/");
        console.log(dateParts)
        return true
    }

    const changeFundDetail = (key, value) => {
        if (key === 'commencement_date') {
            let isValid = isValidDate(value)
            if (!isValid) {
                setError(true)
            }
        }
        dispatch(updateFund(key, value))
    }

    const renderSide = () => {
        if (legacyLoading) {
            return <Spinner loadingText="updating legacy info..." inverted={!isDark} />
        } else {
            switch (fundSidePanel) {
                case 'alt_names':
                    return <Alises dispatch={dispatch} isDark={isDark} />
                case null:
                    return null
                default:
                    return null
            }

        }
    }


    const onChange = (rowIndex, key, value) => {

        console.log("onChange", rowIndex, key, value)
        if (value === 'ADD_SELECT_ITEM') {
            dispatch(updateLayout('modalForm', key))
            dispatch(updateLayout('modalVisible', true))
        } else {
            dispatch(updateFund(rowIndex, key, value))
        }
    }

    const renderText = () => {
        if (selectedFund) {
            return `General Information - ${selectedFund.label} | ${selectedFund.value}`
        } else {
            return "None Selected"
        }
    }

    return (
        <TableWrapper style={{ height: '100%' }} >
            <Header description={renderText()} details={false} hasShadow={false} />
            <TableMain style={tableStyle}>

                {fundObject.details.map((formRow, rowIndex) =>

                    <FormRow
                        formRow={formRow}
                        onChange={onChange}
                        key={rowIndex}
                        rowIndex={rowIndex} />

                )}

            </TableMain>
        </TableWrapper>

    )
}
export default General

