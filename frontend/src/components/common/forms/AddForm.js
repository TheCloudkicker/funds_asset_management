import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Modal, Button } from 'semantic-ui-react'
import { TableRow } from '../../../assets/styled-components/Table'
import FormInput from '../../common/FormInput'
import { Caption } from '../../../assets/styled-components/Carry'
import Select from '../../common/Select'
import DatePicker from '../../common/DatePicker'
import { saveCriteria } from '../../../store/actions/funds/funds'
import { useSelector } from 'react-redux'

const FormRow = ({ formRow, onChange, rowIndex }) => {


    const renderInput = () => {
        if (formRow.formType === 'input') {
            return (
                <FormInput
                    inputStyles={{ textAlign: 'left', width: '100%' }}
                    wrapperStyles={{ height: '4rem' }}
                    placeholder={formRow.placeholder}
                    readOnly={!formRow.isRequired}
                    isError={formRow.isError} unsaved_changes={formRow.unsaved_changes}
                    value={formRow.current} onChange={value => onChange(rowIndex, formRow.key, value)} />
            )
        } else if (formRow.formType === 'select') {
            return (
                <Select
                    value={formRow.current}
                    options={formRow.options}
                    isDisabled={!formRow.isRequired}
                    onChange={value => onChange(rowIndex, formRow.key, value)}
                    unsaved_changes={formRow.unsaved_changes}

                />
            )
        } else if (formRow.formType === 'bool') {

            return (
                <Select
                    value={formRow.current}
                    options={[
                        { 'value': true, 'label': "Yes" },
                        { 'value': false, 'label': "No" },
                    ]}
                    isDisabled={formRow.readOnly}
                    onChange={value => onChange(rowIndex, formRow.key, value)}
                    unsaved_changes={formRow.unsaved_changes}

                />
            )
        } else if (formRow.formType === 'date') {
            return (
                <DatePicker
                    unsaved_changes={formRow.unsaved_changes}
                    readOnly={formRow.readOnly}
                    onChange={data => onChange(rowIndex, formRow.key, data.value)}
                />
            )
        } else {
            return "ERROR"
        }
    }
    return (
        <TableRow style={{ height: '4.3rem', ...formRow.styles }} >
            <Caption>{formRow.text}</Caption>

            {renderInput()}

        </TableRow>

    )
}

const AddForm = ({ dispatch, formObj }) => {

    const [criterias, setCriterias] = useState([
        {
            text: 'Text',
            key: 'text',
            current: '',
            isRequired: true,
            formType: 'input',
            options: [],
            helpText: 'Help Text',
        },
        {
            text: 'Form Type',
            key: 'formType',
            current: null,
            isRequired: true,
            options: [
                { label: 'Text Input', value: 'input' },
                { label: 'Form Select', value: 'select' },
                { label: 'Yes/No', value: 'bool' },
                { label: 'Date', value: 'date' },
            ],
            formType: 'select',
            helpText: 'Help Text',
        },
        {
            text: 'Related Object',
            key: 'relatedObjectName',
            current: null,
            isRequired: false,
            options: [],
            formType: 'select',
            helpText: 'Help Text',
        },
        {
            text: 'Placeholder',
            key: 'placeholder',
            current: '',
            isRequired: true,
            options: [],
            formType: 'input',
            helpText: 'Help Text',
        },
        {
            text: 'Is Required',
            key: 'isRequired',
            current: '',
            isRequired: true,
            options: [],
            formType: 'bool',
            helpText: 'Help Text',
        }
    ])


    const onChange = (index, key, value) => {

        const criteriasCopy = [...criterias]
        criteriasCopy[index].current = value
        setCriterias(criteriasCopy)

    }

    const onClick = () => {

        dispatch(saveCriteria(criterias, null))

    }

    return (
        <React.Fragment>
            <Modal.Header>Add Form - {formObj.value}</Modal.Header>
            <Modal.Content style={{ height: '50vh' }}>

                {/* {criterias.map((formRow, rowIndex) =>

                    <FormRow
                        formRow={formRow}
                        onChange={onChange}
                        key={rowIndex}
                        rowIndex={rowIndex} />

                )} */}


            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClick}>Submit</Button>
            </Modal.Actions>
        </React.Fragment>
    )
}

export default AddForm
