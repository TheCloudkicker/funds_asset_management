import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TableMain, TableRow, TableWrapper, TableHeader, RowWrapper } from '../../../../assets/styled-components/Table'
import { Caption, DetailContainer } from '../../../../assets/styled-components/Carry'
import { numberWithCommas } from '../../../common/helpers'
import Header from '../../../table/Header'
import styled, { keyframes, css } from 'styled-components'
import { CustomSelect2 } from '../../../common/Select'
import { InputForm } from '../../../common/FormInput'
import { CustomDateInput } from '../../../common/DatePicker'
import { updateMateriality, getMateriality } from '../../../../store/actions/materiality'
import { getAuditSettings } from '../../../../store/actions/main'
import { updateLayout } from '../../../../store/actions/layout'
import { Select, Button, Icon } from 'semantic-ui-react'

const FormRow = ({ formRow, onChange, rowIndex }) => {

    const renderInput = () => {
        if (formRow.formType === 'input') {
            return (
                <InputForm
                    obj={formRow} onChange={value => onChange(rowIndex, formRow.key, value)} />
            )
        } else if (formRow.formType === 'select' || formRow.formType === 'bool') {
            return (
                <CustomSelect2
                    wrapperStyles={{ justifyContent: 'flex-start' }}
                    value={formRow.current}
                    options={formRow.options}
                    onChange={value => onChange(rowIndex, formRow.key, value)} placeholder="Select Materiality type" />
            )
        } else if (formRow.formType === 'date') {
            return (
                <CustomDateInput
                    obj={formRow}
                    onChange={data => onChange(rowIndex, formRow.key, data.value)}
                />
            )
        } else if (formRow.formType === 'text') {

            if (formRow.format === 'number') {
                return <Caption>${numberWithCommas(formRow.current)}</Caption>
            } else if (formRow.format === 'bps') {
                return <Caption>{formRow.current} bps</Caption>
            } else if (formRow.format === 'percent') {
                return <Caption>{formRow.current} %</Caption>
            } else {
                return <Caption>{formRow.current}</Caption>
            }

        } else {
            return "ERROR"
        }
    }
    return (
        <TableRow style={{ height: '3rem', ...formRow.styles }} >
            <Caption>{formRow.text}</Caption>

            <Button.Group size='small' style={{ width: '3rem', paddingRight: 2 }}>
                {formRow.formType === 'select' && !formRow.readOnly ?
                    <Button color='black' icon disabled={false} onClick={() => onChange(rowIndex, { key: formRow.key, value: formRow.text }, 'ADD_AUDIT_SETTING')}>
                        <Icon name={'plus icon inverted'} />
                    </Button> : null}
            </Button.Group>
            <div style={{ width: 200 }}>

                {renderInput()}

            </div>


        </TableRow>

    )
}
const Materiality = () => {


    const materiality = useSelector(state => state.materiality)
    const { auditSettings } = useSelector(state => state.main)
    const { selectedPeriod } = useSelector(state => state.periods)
    const { selectedFund } = useSelector(state => state.funds)
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedPeriod) {
            dispatch(getAuditSettings(selectedPeriod.value))
        }
    }, [selectedPeriod && selectedPeriod.value])

    useEffect(() => {
        if (selectedPeriod && selectedFund) {
            dispatch(getMateriality(selectedFund.value, selectedPeriod.value))
        }
    }, [selectedPeriod && selectedPeriod.value])

    const rows = [
        {
            'text': 'Select Materiality Setting',
            'key': 'audit_setting',
            'isRequired': true,
            'format': null,
            'readOnly': false,
            'current': materiality.audit_setting,
            'previous': '',
            'unsaved_changes': false,
            'isError': false,
            'options': auditSettings,
            'isDisabled': false,
            'isMulti': false,
            'formType': 'select',
            'placeholder': 'Enter Legal Name',
        },
        {
            'text': `Net Assets`,
            'key': 'net_assets',
            'isRequired': true,
            'format': 'number',
            'readOnly': false,
            'current': materiality.net_assets,
            'previous': '',
            'unsaved_changes': false,
            'isError': false,
            'options': [],
            'isDisabled': false,
            'isMulti': false,
            'formType': 'text',
            'placeholder': 'Enter Legal Name',
        },
        {
            'text': 'Overall Basis Points',
            'key': 'overall_bps',
            'isRequired': true,
            'format': 'bps',
            'readOnly': false,
            'current': materiality.overall_bps,
            'previous': '',
            'unsaved_changes': false,
            'isError': false,
            'options': [],
            'isDisabled': false,
            'isMulti': false,
            'formType': 'text',
            'placeholder': 'Enter Legal Name',
        },
        {
            'text': 'Overall Amount',
            'key': 'overall_amount',
            'isRequired': true,
            'format': 'number',
            'readOnly': false,
            'current': materiality.overall_amount,
            'previous': '',
            'unsaved_changes': false,
            'isError': false,
            'options': [],
            'isDisabled': false,
            'isMulti': false,
            'formType': 'text',
            'placeholder': 'Enter Legal Name',
        },
        {
            'text': 'Performance (% of Overall)',
            'key': 'performance',
            'isRequired': true,
            'format': 'percent',
            'readOnly': false,
            'current': materiality.performance_percent,
            'previous': '',
            'unsaved_changes': false,
            'isError': false,
            'options': [],
            'isDisabled': false,
            'isMulti': false,
            'formType': 'text',
            'placeholder': 'Enter Legal Name',
        },
        {
            'text': 'Performance Amount',
            'key': 'performance_amount',
            'isRequired': true,
            'format': 'number',
            'readOnly': false,
            'current': materiality.performance_amount,
            'previous': '',
            'unsaved_changes': false,
            'isError': false,
            'options': [],
            'isDisabled': false,
            'isMulti': false,
            'formType': 'text',
            'placeholder': 'Enter Legal Name',
        },
        {
            'text': 'Deminimis (% of Overall)',
            'key': 'deminimis',
            'isRequired': true,
            'format': 'percent',
            'readOnly': false,
            'current': materiality.deminimis_percent,
            'previous': '',
            'unsaved_changes': false,
            'isError': false,
            'options': [],
            'isDisabled': false,
            'isMulti': false,
            'formType': 'text',
            'placeholder': 'Enter Legal Name',
        },
        {
            'text': 'Deminimis Amount',
            'key': 'deminimis_amount',
            'isRequired': true,
            'format': 'number',
            'readOnly': false,
            'current': materiality.deminimis_amount,
            'previous': '',
            'unsaved_changes': false,
            'isError': false,
            'options': [],
            'isDisabled': false,
            'isMulti': false,
            'formType': 'text',
            'placeholder': 'Enter Legal Name',
        },
    ]


    const onChange = (index, key, value) => {

        if (value === 'ADD_AUDIT_SETTING') {
            dispatch(updateLayout('modalForm', key))
            dispatch(updateLayout('modalVisible', true))
        } else {
            // updateMateriality(dispatch, { ...materiality }, index, key, value)
        }
    }

    // useEffect(() => {
    //     updateMateriality(dispatch, { ...materiality }, 'recalc', null)
    // }, [])

    return (
        <TableWrapper style={{ height: '100%' }}>
            <Header description={`Materiality Settings for ${selectedFund && selectedFund.label}`} hasShadow={false} details={false} />
            <TableMain>
                <TableMain>

                    {rows.map((formRow, rowIndex) =>

                        <FormRow
                            formRow={formRow}
                            onChange={onChange}
                            key={rowIndex}
                            rowIndex={rowIndex} />

                    )}
                </TableMain>
            </TableMain>
        </TableWrapper>
    )
}

export default Materiality
