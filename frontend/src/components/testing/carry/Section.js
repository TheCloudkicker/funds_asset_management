import React, { useState, useEffect } from 'react'
import { Caption, Text, CaptionHover, Row } from '../../../assets/styled-components/Carry'
import { numberWithCommas } from '../../common/helpers'
import { useSelector } from 'react-redux'
import { InputForm } from '../../common/FormInput'
import styled, { keyframes, css } from 'styled-components'
import { Popup } from 'semantic-ui-react'
import { TableRow } from '../../../assets/styled-components/Table'

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

const Wrapper = styled.div`
    flex: 2;
    height: 100%;
    display: flex;
`
const InnerWrapper = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
`



const SectionRow = ({ dataRow, index, onChange, onClick, detailView }) => {

    const { carrySidePanel } = useSelector(state => state.testing)
    const { affilInfo } = useSelector(state => state.carry)



    const renderCell = (dataRow, rowIndex) => {
        if (dataRow.nameLower === 'conclusion') {
            const bColor = () => {
                if (
                    dataRow.conclusion.generic_conclusion &&
                    dataRow.conclusion.generic_conclusion.value !== 2
                ) {
                    return 'var(--fail-color)'
                } else {
                    return 'hsl(0,0%,95%)'
                }
            }
            return (
                <Wrapper>
                    <InnerWrapper>

                    </InnerWrapper>
                    <InnerWrapper>
                        <InputForm obj={dataRow.value} onChange={onChange} />
                    </InnerWrapper>
                </Wrapper>
            )
        } else if (dataRow.formType === 'input') {
            const renderValue = () => {
                if (dataRow.value.editable) {
                    return dataRow.value.current
                } else {
                    return `$${numberWithCommas(dataRow.value.current)}`
                }
            }
            return (
                <Wrapper >
                    <InnerWrapper>

                    </InnerWrapper>

                    <InnerWrapper>
                        <InputForm obj={dataRow.value} onChange={onChange} />
                    </InnerWrapper>

                </Wrapper>
            )
        } else {
            return (
                <Wrapper>
                    <Text style={dataRow.style}>{dataRow.display[0] === 1 ? `${numberWithCommas(dataRow.value.current)}` : null}</Text>
                    <Text style={dataRow.style}>{dataRow.display[1] === 1 ? `${numberWithCommas(dataRow.value.current * (affilInfo.percent / 100))}` : null}</Text>

                </Wrapper>
            )
        }
    }

    // inputStyles={{ textAlign: 'right', backgroundColor: bColor(), color: 'var(--text-secondary)' }}
    return (
        <TableRow
            style={{ height: '3rem' }}
            isHoverable={dataRow.isHoverable}
            isSelected={carrySidePanel === dataRow.key}
            onClick={() => onClick(dataRow)}>
            <Popup content={dataRow.hoverText} disabled={dataRow.hoverText === ''} trigger={<Caption >{dataRow.title}</Caption>} />
            {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} >{dataRow.type}</Text> : null}
            {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} >{dataRow.source}</Text> : null}
            {renderCell(dataRow, index)}
        </TableRow>
    )
}




const Section = ({ section, onChange, handleRowClick }) => {

    const { detailView } = useSelector(state => state.layout)

    const handleChange = (index, key, value) => {

    }

    return (
        <SectionContainer>

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
                        onClick={handleRowClick}
                        onChange={onChange} />

                )}

            </SectionMain>
        </SectionContainer>
    )
}

export default Section
