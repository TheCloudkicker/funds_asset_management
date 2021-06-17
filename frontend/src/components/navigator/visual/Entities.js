import React from 'react'
import { TextPrimary, TextSecondary, LpEntity, LtdEntity, CorpEntity, LlcEntity } from './components'

export const Partnership = ({ entity_name, no_investments, id }) => {
    return (
        <LpEntity>
            <TextPrimary>
                {entity_name} {id}
            </TextPrimary>
            <TextSecondary>
                {no_investments} Investments Held
            </TextSecondary>
        </LpEntity>
    )
}

export const Company = ({ entity_name, no_investments, id }) => {
    return (
        <LlcEntity>
            <TextPrimary>
                {entity_name} {id}
            </TextPrimary>
            <TextSecondary>
                {no_investments} Investments Held
            </TextSecondary>
        </LlcEntity>
    )
}

export const Limited = ({ entity_name, no_investments, id }) => {
    return (
        <LtdEntity>
            <TextPrimary>
                {entity_name} {id}
            </TextPrimary>
            <TextSecondary>
                {no_investments} Investments Held
            </TextSecondary>
        </LtdEntity>
    )
}

export const Corp = ({ entity_name, no_investments, id }) => {
    return (
        <CorpEntity>
            <TextPrimary>
                {entity_name} {id}
            </TextPrimary>
            <TextSecondary>
                {no_investments} Investments Held
            </TextSecondary>
        </CorpEntity>
    )
}
