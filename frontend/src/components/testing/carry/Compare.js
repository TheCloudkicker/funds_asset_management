import React from 'react'
import { Caption, Text, CaptionHover, Row } from '../../../assets/styled-components/Carry'
import { TableRow } from '../../../assets/styled-components/Table'
import styled, { keyframes, css } from 'styled-components'
import { InputForm } from '../../common/FormInput'
import { numberWithCommas } from '../../common/helpers'
import { useSelector } from 'react-redux'

const DEFAULT_VALUE = {
    'current': 0,
    'previous': 0,
    'unsaved_data': false,
    'editable': false,
    'isError': false,
}
const Wrapper = styled.div`
    flex: 2;
    height: 100%;
    display: flex;
`


export const SectionContainer = styled.div`
    display: flex;
    border-bottom: 1px solid var(--text-secondary-light);
    min-height: 5rem;
`
export const SectionInfo = styled.div`
    display: flex;
    width: 10rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const SectionMain = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const Compare = ({ onChange, handleRowClick, carry, materiality }) => {

    const { detailView } = useSelector(state => state.layout)

    const onClick = () => {

    }

    const threshold = 'Deminimis'
    return (
        <SectionContainer>
            {detailView ?
                <SectionInfo>
                    <Text isBold={true} style={{ fontSize: '2rem', alignItems: 'flex-end' }}>Compare</Text>
                    <Text style={{ alignItems: 'flex-start' }}>& Conclude</Text>
                </SectionInfo>
                : null}

            <SectionMain>

                <TableRow
                    style={{ height: '3rem' }}
                    isHoverable={false}
                    isSelected={false}>


                    <Caption >Client Value</Caption>
                    {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} ></Text> : null}
                    {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} ></Text> : null}
                    <Wrapper>
                        <Text style={{ 'justifyContent': 'flex-end', 'paddingRight': '1rem' }}></Text>

                        <InputForm obj={carry.clientValue} onChange={value => onChange('clientValue', value)} />
                    </Wrapper>
                </TableRow>

                <TableRow
                    style={{ height: '3rem' }}
                    isHoverable={false}
                    isSelected={false}>

                    <Caption >Difference</Caption>
                    {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} ></Text> : null}
                    {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} ></Text> : null}
                    <Wrapper>
                        <Text style={{ 'justifyContent': 'flex-end', 'paddingRight': '1rem' }}></Text>
                        <Text style={{ 'justifyContent': 'flex-end', 'paddingRight': '1rem' }}>${numberWithCommas(carry.difference)}</Text>
                    </Wrapper>

                </TableRow>

                <TableRow
                    style={{ height: '3rem' }}
                    isHoverable={true}
                    isSelected={false}
                    onClick={() => handleRowClick({ detail: 'materiality' })}>


                    <Caption >Threshold - {threshold}</Caption>
                    {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} ></Text> : null}
                    {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} ></Text> : null}
                    <Wrapper>
                        <Text style={{ 'justifyContent': 'flex-end', 'paddingRight': '1rem' }}></Text>
                        <Text style={{ 'justifyContent': 'flex-end', 'paddingRight': '1rem' }}>${numberWithCommas(materiality.deminimis_amount)}</Text>
                    </Wrapper>
                </TableRow>

                <TableRow
                    style={{ height: '3rem' }}
                    isHoverable={true}
                    isSelected={false}
                    onClick={() => handleRowClick({ detail: 'conclusion' })}>


                    <Caption >Conclusion</Caption>
                    {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} ></Text> : null}
                    {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} ></Text> : null}
                    <Wrapper>
                        <Text style={{ 'justifyContent': 'flex-end', 'paddingRight': '1rem' }}></Text>
                        <Text style={{ 'justifyContent': 'flex-end', 'paddingRight': '1rem' }}>{carry.conclusion}</Text>
                    </Wrapper>
                </TableRow>
            </SectionMain>

        </SectionContainer >

    )
}

export default Compare
{/* <Section
            section={section}
            dispatch={dispatch}
            onChange={onChange}
            detailView={detailView} /> */}
{/* <SectionContainer>

{detailView ?
    <SectionInfo>
        <Text isBold={true} style={{ fontSize: '2rem', alignItems: 'flex-end' }}>{section.primaryTitle}</Text>
        <Text style={{ alignItems: 'flex-start' }}>{section.secondaryTitle}</Text>
    </SectionInfo>
    : null}

<SectionMain>
    {section.rows.map((dataRow, index) =>

        <SectionRow
            dataRow={dataRow}
            key={index}
            detailView={detailView}
            index={index}
            onClick={onClick}
            onChange={onChange} />

    )}

</SectionMain>
</SectionContainer> */}