import React from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import styled, { keyframes, css } from 'styled-components'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';


const Wrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: .28571429rem;
    flex: 1;
`

const DatePicker = ({ index, key, value, onChange, unsaved_changes, readOnly = false, disabled = false, type = 'basic' }) => {
    return (
        <Wrapper unsaved_changes={unsaved_changes}>
            <SemanticDatepicker
                styles={{ width: '100%', height: '100%' }}
                value={value}
                readOnly={readOnly}
                disabled={disabled}
                type={type}
                onChange={(event, data) => onChange(data)}
            />
        </Wrapper>
    )
}

export default DatePicker

export const HeaderItem = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.3rem;
    color: var(--text-secondary);
`

export const CustomDatePicker = ({ obj, onChange, wrapperStyles }) => {

    return (
        <Wrapper style={{ ...wrapperStyles }} unsaved_changes={obj.unsaved_changes} >
            <SemanticDatepicker
                value={obj.current}
                readOnly={obj.readOnly}
                styles={{ width: 100 }}
                disabled={obj.readOnly}
                type={obj.type ? obj.type : 'basic'}
                onChange={(event, data) => onChange(data)}
            />
        </Wrapper>
    )


}

export const CustomDateInput = ({ obj, onChange, wrapperStyles }) => {
    return (
        <Wrapper style={{ ...wrapperStyles }} unsaved_changes={obj.unsaved_changes} >
            <DateInput
                name="date"
                placeholder="Date"
                value={obj.current}
                style={obj.readOnly ? null : { color: 'var(--waibe-blue-primary)' }}
                iconPosition="left"
                dateFormat="MM-DD-YYYY"
                className="test"
                autoComplete='off'
                readOnly={obj.readOnly}
                onChange={(event, data) => onChange(data)}
            />
        </Wrapper>
    )
}