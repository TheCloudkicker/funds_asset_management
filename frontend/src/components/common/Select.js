import React from 'react'
import { default as BaseSelect } from 'react-select'
import styled, { keyframes, css } from 'styled-components'
import { Dropdown, Select as Select2 } from 'semantic-ui-react'

const SelectWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .28571429rem;
    flex: 1;
    border: ${props => {

        if (props.isError) {
            return '1px solid crimson'
        } else if (props.unsaved_changes) {
            return '2px solid var(--waibe-blue-primary)'
        } else {
            return 'none'
        }
    }}
`


const styles = {
    container: styles => {
        return {
            ...styles,
            width: '100%',
        }
    },
    control: (styles, state) => {

        let border = ''

        if (state.selectProps.isError) {
            border = '3px solid crimson'
        } else if (state.selectProps.unsaved_changes) {
            border = '3px solid var(--waibe-blue-primary)'
        }


        return {
            ...styles,
            borderRadius: '.28571429rem',
            paddingBotton: 0,

            marginBotton: 0,
            boxShadow: 1,
            border: border,
            '&:focus': {
                border: 0,
            },
            '&:hover': {
                border: border,
            }
            // 
            // This line disable the blue border
            // '&:hover': {
            //     border: state.isFocused ? 0 : 0
            // },
        }
    },
    menu: base => ({
        ...base,
        borderRadius: 0,
    }),
    option: (styles, state) => {

        let backgroundColor = 'none'
        if (state.isSelected) {
            backgroundColor = 'var(--waibe-blue-primary)'
        } else if (state.label === 'File Name') {
            backgroundColor = 'var(--bg-tertiary)'
        }

        return {
            ...styles,
            color: state.isSelected ? 'var(--header-color)' : 'var(--header-color)',
            backgroundColor: backgroundColor,
            borderBottom: state.label === 'File Name' ? '1px solid black' : 'none',
            cursor: state.isDisabled ? 'not-allowed' : 'default',
        };
    },
};

const Select = ({ value, onChange, options, unsaved_changes, isError, placeholder, wrapperStyles, isDisabled }) => {

    return (
        <SelectWrapper style={{ ...wrapperStyles }} >

            <BaseSelect
                isDisabled={isDisabled}
                placeholder={placeholder}
                isError={isError}
                unsaved_changes={unsaved_changes}
                value={value}
                onChange={onChange}
                styles={styles}
                options={options} />
        </SelectWrapper>
    )
}

export default Select


export const CustomSelect = ({ obj, wrapperStyles, onChange, options = null, readOnly = null }) => {


    return (
        <SelectWrapper style={{ ...wrapperStyles }} >

            <BaseSelect
                isDisabled={readOnly === null ? obj.readOnly : readOnly}
                placeholder={obj.placeholder}
                isError={obj.isError}
                unsaved_changes={obj.unsaved_changes}
                value={obj.current}
                onChange={onChange}
                styles={styles}
                options={options ? options : obj.options} />

        </SelectWrapper>
    )
}

export const SemanticSelect = ({ obj, wrapperStyles, onChange, options, selectedText, readOnly = null }) => {


    return (
        <SelectWrapper style={{ ...wrapperStyles }} >

            <Dropdown text={selectedText}>
                <Dropdown.Menu >
                    {options.map((option, index) =>

                        <Dropdown.Item key={index} onClick={e => onChange(option)} text={option.label} />
                    )}

                </Dropdown.Menu>
            </Dropdown>



        </SelectWrapper>
    )
}


export const CustomSelect2 = ({ wrapperStyles, onChange, options, placeholder, value }) => {


    return (
        <SelectWrapper style={{ ...wrapperStyles, }} >
            <Select2
                placeholder={placeholder}
                options={options.map(option => {
                    return { text: option.label, value: option.value }
                })}
                value={value && value.value}
                onChange={(e, data) => onChange(options[options.findIndex(s => s.value === data.value)])}
            />
        </SelectWrapper>
    )
}

export const CustomSelect3 = ({ obj, wrapperStyles, innerStyles, onChange, options }) => {


    const setStyles = () => {
        if (obj.unsaved_changes) {
            return { width: '80%', ...innerStyles, border: '1px solid #EE82EE' }
        } else {
            return { width: '80%', ...innerStyles }
        }

    }

    return (
        <SelectWrapper style={{ ...wrapperStyles }} >

            <Select2
                options={options}
                compact
                style={setStyles()}
                disabled={obj.readOnly}
                error={obj.isError}
                value={obj.current}
                onChange={(e, data) => onChange(data.value)}
            />

        </SelectWrapper>
    )
}