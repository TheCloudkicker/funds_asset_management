import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { numberWithCommas } from './helpers'
import { Input } from 'semantic-ui-react'

const FormInputWrapper = styled.div`
    flex: 1;
    display: flex;
    border-radius: .28571429rem;

`

const FormInput = ({ value, onChange, isError, unsaved_changes, inputStyles, wrapperStyles, placeholder = "Search...", readOnly = false }) => {

    let border = '1px solid rgba(34,36,38,.15)'

    if (unsaved_changes || isError) {
        border = 'none'
    }

    return (
        <FormInputWrapper
            isError={isError}
            style={{ ...wrapperStyles }}
            unsaved_changes={unsaved_changes}
            className="ui input" >

            <input
                style={{
                    backgroundColor: readOnly ? 'hsl(0,0%,95%)' : 'white',
                    color: readOnly ? 'hsl(0,0%,50%)' : 'default',
                    border: border,
                    ...inputStyles,
                }}
                type="text"
                readOnly={readOnly} placeholder={placeholder}
                value={value} onChange={e => onChange(e.target.value)} />

        </FormInputWrapper>
    )
}

export default FormInput

const InputFormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .28571429rem;
    flex: 1;
`

export const InputForm = ({ obj, onChange, inputStyles, wrapperStyles, placeholder = null, isPercent = false, isBps = false, isText = false, readOnly = null, isYears = false, isDollar = true }) => {


    const renderValue = () => {
        if (readOnly === false) {
            return obj.current
        } else if (obj.readOnly) {
            if (isPercent) {
                return `${obj.current} %`
            } else if (isBps) {
                return `${obj.current} bps`
            } else if (isText) {
                return `${obj.current}`
            } else if (isYears) {
                return `${obj.current} yrs`
            } else if (isDollar) {
                return `$${numberWithCommas(obj.current)}`
            } else {
                return obj.current
            }
        } else {
            return obj.current
        }
    }

    return (
        <InputFormWrapper
            isError={obj.isError}
            unsaved_changes={obj.unsaved_changes}
            style={{ ...wrapperStyles }}
            className={"ui input " + (obj.isError ? 'error' : '')} >

            <input
                style={{
                    color: obj.readOnly ? 'hsl(0,0%,80%)' : 'black',
                    height: '100%',
                    textAlign: 'right',
                    ...inputStyles,
                }}
                type="text"
                readOnly={readOnly === null ? obj.readOnly : readOnly}
                placeholder={placeholder ? placeholder : obj.placeholder ? obj.placeholder : 'Search...'}
                value={renderValue()}
                onChange={e => onChange(e.target.value)} />

        </InputFormWrapper>
    )
}



export const OverrideInput = ({ obj, onChange, wrapperStyles, inputStyles }) => {

    const placeholder = 'test'

    const renderValue = () => {

        if (obj.overrideValue.current === '') {

            if (obj.editable) {
                return obj.balance
            } else {
                return `$${numberWithCommas(obj.balance)}`
            }

        } else {
            return obj.overrideValue.current
        }
    }

    return (
        <InputFormWrapper
            isError={obj.isError}
            unsaved_changes={obj.unsaved_changes}
            style={{ ...wrapperStyles }}
            className={"ui input " + (obj.overrideValue.current !== '' ? 'error' : '')} >

            <input
                style={{
                    color: 'hsl(0,0%,80%)',
                    height: '100%',
                    textAlign: 'right',
                    ...inputStyles,
                }}
                type="text"
                readOnly={true}
                placeholder={placeholder}
                value={renderValue()}
                onChange={e => onChange(e.target.value)} />

        </InputFormWrapper>
    )
}
