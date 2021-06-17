import React from 'react'
import styled, { keyframes, css } from 'styled-components'

export const CheckboxWrapper = styled.div`
    display: flex;
    width: 5rem;
    height: 100%;
    border-radius: .28571429rem;
    justify-content: center;
    align-items: center;
    background-color:${props => props.unsaved_changes ? 'var(--waibe-blue-primary)' : 'none'}
`

const CheckBox = ({ checked, onChange, isDark, unsaved_changes, wrapperStyles }) => {

    return (
        <CheckboxWrapper styles={{ ...wrapperStyles }} unsaved_changes={unsaved_changes} >
            <div className={"ui checkbox " + (isDark ? 'inverted' : '')}>
                <input type="checkbox" checked={checked} name="example" onChange={e => onChange(e.target.checked)} />
                <label></label>
            </div>
        </CheckboxWrapper>
    )
}


export default CheckBox
