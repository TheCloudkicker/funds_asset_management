import React, { useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { HeaderItem, RowItem } from '../../../assets/styled-components/Table'
import { IconWrapper } from '../../../assets/styled-components/General'
import { updateDbObject } from '../../../store/actions/database'
import CheckBox from '../../common/CheckBox'
// import Select from 'react-select'
// import { customStyles3 } from '../../../assets/styles/select'
import FormInput from '../../common/FormInput'
import Select from '../../common/Select'

const SectionContainer = styled.div`
    width:100%;
    margin-bottom: 2rem;
    
`
const ReportContainer = styled.div`
    width:100%;
    height: 6rem;
    display: grid;
    grid-template-columns: 5rem 15rem 20rem auto;
`
const SectionSummary = styled.div`
    width:100%;
    margin-bottom: 2px;
    background-color: var(--bg-tertiary);
    height: 4rem;
    cursor: pointer;
    display: flex;
    box-shadow: 0px 2px 5px 0 rgba(0,0,0,.2);

    &:hover{
        background-color: var(--waibe-blue-primary-hover);
    }
`
const Label = styled.div`
    position: absolute;
    vertical-align: text-top;
    top: 0;
    left: 4px;
    opacity: .7;
    transform: translateY(-2px);
    color: var(--text-secondary);
`
const HeaderWrapper = styled.div`
    position: relative;
    padding: 0;
    display:flex;
    flex: 1;

`

const Section = ({ dispatch, isDark, section, type }) => {

    const onClick = () => {
        dispatch(updateDbObject(type, null, null, 'isOpen', !section.isOpen))
    }

    const onCheck = (reportIndex, isChecked) => {
        dispatch(updateDbObject(type, reportIndex, null, 'checked', isChecked))
    }

    const reports = section.reports.map((report, reportIndex) =>

        <ReportContainer key={report.id} >
            <CheckBox checked={report.checked} onChange={isChecked => onCheck(reportIndex, isChecked)} isDark={isDark} />

            <HeaderItem style={{ justifyContent: 'flex-start', paddingLeft: '1rem', position: 'relative' }}>
                {report.editable ?
                    <FormInput
                        unsaved_changes={report.name.unsaved_changes}
                        styles={{ height: '3.8rem' }} onChange={value => dispatch(updateDbObject(type, reportIndex, null, 'name', value))} value={report.name.current} />
                    : report.name.current ? report.name.current : 'Not Set'}
            </HeaderItem>

            <HeaderItem style={{ justifyContent: 'flex-start', paddingLeft: '1rem', paddingRight: 5, position: 'relative', width: '100%' }}>
                {report.editable ?
                    <Select
                        value={report.identifier.current}
                        unsaved_changes={report.identifier.unsaved_changes}
                        isError={report.identifier.isError}
                        onChange={identifier => dispatch(updateDbObject(type, reportIndex, null, 'identifier', identifier))}
                        options={[{ value: 'File Name', label: 'File Name' }, ...report.headers]} />
                    : report.identifier.current ? report.identifier.current.label : 'Not Set'}
            </HeaderItem>

            <HeaderWrapper style={{ overflowX: 'scroll', maxWidth: '80.5vw' }}>
                {report.headers.map(header =>
                    <RowItem key={header.value} style={{ justifyContent: 'flex-start', paddingLeft: '1rem', fontSize: '1rem', fontWeight: '500', lineHeight: '1rem', overflow: 'hidden', minWidth: '75px' }}>{header.label}</RowItem>
                )}
            </HeaderWrapper>

        </ReportContainer>

    )

    return (
        <SectionContainer>
            <SectionSummary onClick={onClick}>
                <IconWrapper >
                    {section.reports.length === 0 ? null : <i className={(section.isOpen ? "minus" : "plus") + " icon " + (isDark ? "inverted" : "")}></i>}
                </IconWrapper>
                <HeaderItem style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}>{section.reports.length === 0 ? '' : section.reports.length} {section.title}</HeaderItem>
                {section.isOpen && section.reports.length > 0 ? <HeaderItem style={{ justifyContent: 'flex-start', paddingLeft: '1rem', fontStyle: 'italic' }}>Fund Identifier</HeaderItem> : null}
                {section.isOpen && section.reports.length > 0 ? <HeaderItem style={{ justifyContent: 'flex-start', paddingLeft: '1rem', fontStyle: 'italic', marginLeft: '4rem' }}>Column Headers</HeaderItem> : null}

            </SectionSummary>

            {section.isOpen ? reports : null}
        </SectionContainer>
    )
}

export default Section
