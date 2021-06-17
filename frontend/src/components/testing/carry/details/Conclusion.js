import React, { useState } from 'react'
import { Text, Caption, DetailContainer } from '../../../../assets/styled-components/Carry'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes, css } from 'styled-components'

const TextAreaWrapper = styled.div`
    width: 100%;
    border: ${props => {

        if (props.isError) {
            return '3px solid crimson'
        } else if (props.unsaved_changes) {
            return '3px solid var(--waibe-blue-primary)'
        } else {
            return 'none'
        }

    }}
`

const Conclusion = () => {

    // const { conclusion } = useSelector(state => state.testing.carry)
    // const { selectedFund } = useSelector(state => state.funds)
    // const { selectedPeriod } = useSelector(state => state.periods)
    const dispatch = useDispatch()


    const handleChange = (key, value) => {
        // dispatch(updateCarryConclusion('custom', key, value))
    }

    const handleSave = () => {
        // dispatch(saveCarryConclusion(conclusion))v
    }

    return (
        <DetailContainer style={{ height: '100%' }}>

            <div className="ui form">
                <textarea style={{ fontSize: '1.2rem' }} name="" id="" cols="50" rows="5" value={''} onChange={e => handleChange('custom_conclusion', e.target.value)}></textarea>
            </div>

        </DetailContainer>
    )
}

export default Conclusion
