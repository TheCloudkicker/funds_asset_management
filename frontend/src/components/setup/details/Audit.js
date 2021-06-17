import React, { useEffect } from 'react'

import { InputForm } from '../../common/FormInput'
import { TableMain, TableRow, RowItem, TableWrapper, TableHeader, LeftRow, RightRow } from '../../../assets/styled-components/Table'
import { Caption } from '../../../assets/styled-components/Carry'
import { useSelector } from 'react-redux'
import { getAuditSettings, updateAuditSettings, addAuditSetting, deleteAuditSetting, saveAuditSettings } from '../../../store/actions/main'
import { TableDetailContainer, LeftSection, RightSection } from '../../../assets/styled-components/Containers'
import { CustomSelect } from '../../common/Select'
import styled, { keyframes, css } from 'styled-components'

export const HeaderItem = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    text-indent: 1rem;
    font-size: 1rem;
    color: var(--text-secondary);
`
const benchmarks = [
    { value: "Net Assets", label: "Net Assets" },
    { value: "Net Income", label: "Net Income" },
]


const AuditSetting = ({ onChange, auditSetting, index }) => {


    return (

        <TableRow style={{ padding: 2 }}>
            <LeftRow style={{ flex: 1 }}>
                <InputForm obj={auditSetting.name} placeholder="Enter Name" isNumber={false} inputStyles={{ textAlign: 'left' }} onChange={value => onChange(index, 'name', value)} />
                <CustomSelect obj={auditSetting.benchmark} onChange={value => onChange(index, 'benchmark', value)} />
                <InputForm obj={auditSetting.overall} isBps={true} onChange={value => onChange(index, 'overall', value)} />
                <InputForm obj={auditSetting.performance} isPercent={true} onChange={value => onChange(index, 'performance', value)} />
                <InputForm obj={auditSetting.deminimis} isPercent={true} onChange={value => onChange(index, 'deminimis', value)} />
            </LeftRow>


            <RightRow style={{ justifyContent: 'space-around', alignItems: 'center', width: '8rem', padding: 2 }}>

                <button className="ui black icon button" onClick={() => onChange(index, 'DELETE_AUDIT_SETTING', true)} style={{ height: '3rem', width: '3rem' }} >
                    <i className="trash icon inverted"></i>
                </button>
                <button className="ui black icon button" onClick={() => onChange()} style={{ height: '3rem', width: '3rem' }} >
                    {performance.editable ? <i className="lock icon inverted"></i> : <i className="unlock icon inverted"></i>}
                </button>
            </RightRow>
        </TableRow>
    )
}


const Audit = ({ dispatch, isDark }) => {

    const { auditSettings } = useSelector(state => state.main)
    const { selectedPeriod } = useSelector(state => state.periods)

    // const onChange = (index, key, value) => dispatch(updateAuditSettings(index, key, value))

    useEffect(() => {
        if (selectedPeriod) {
            dispatch(getAuditSettings(selectedPeriod.value))
        }
    }, [selectedPeriod && selectedPeriod.value])

    const onChange = (index, key, value) => {

    }

    return (
        <TableDetailContainer>

            <LeftSection>
                <TableWrapper>

                    <TableHeader hasShadow={true} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                        <LeftRow style={{ flex: 1 }}>
                            <HeaderItem style={{ justifyContent: 'flex-start' }}>Name</HeaderItem>
                            <HeaderItem style={{ justifyContent: 'center' }}>Benchmark</HeaderItem>
                            <HeaderItem style={{ justifyContent: 'center' }}>Overall bps</HeaderItem>
                            <HeaderItem style={{ justifyContent: 'center' }}>Performance (% of OM)</HeaderItem>
                            <HeaderItem style={{ justifyContent: 'center' }}>Deminimis (% of OM)</HeaderItem>
                        </LeftRow>

                        <RightRow style={{ justifyContent: 'center', width: '8rem', padding: 2 }}>
                            <HeaderItem style={{ justifyContent: 'center', flex: 1 }}>Actions</HeaderItem>
                        </RightRow>
                    </TableHeader>

                    <TableMain style={{ backgroundColor: 'var(--bg-primary)' }}>
                        {auditSettings.map((auditSetting, index) =>

                            <AuditSetting auditSetting={auditSetting} key={index} index={index} onChange={onChange} />

                        )}

                    </TableMain>
                </TableWrapper>
            </LeftSection>

            <RightSection>


            </RightSection>

        </TableDetailContainer>
    )
}

export default Audit


{/* <TableMain>
                    <TableRow>
                        <Caption>
                            What benchmark is used for materiality?
                        </Caption>
                        <ValueContainer unsaved_changes={auditSettings.benchmark.unsaved_changes}>

                        </ValueContainer>
                    </TableRow>

                    <DividerHorizontal style={{ marginBottom: 10, marginTop: 10 }} />
                    <TableRow>
                        <Caption>
                            Overall materiality bps of benchmark
                        </Caption>
                        <ValueContainer unsaved_changes={auditSettings.overall.unsaved_changes}>
                            <Input
                                value={auditSettings.overall.current}
                                unsavedChanges={false}
                                onChange={e => onChange('overall', e.target.value)} />
                        </ValueContainer>

                    </TableRow>

                    <DividerHorizontal style={{ marginBottom: 10, marginTop: 10 }} />
                    <TableRow>
                        <Caption>
                            Performance materiality bps of overall materiality
                        </Caption>
                        <ValueContainer unsaved_changes={auditSettings.performance.unsaved_changes}>
                            <Input
                                value={auditSettings.performance.current}
                                unsavedChanges={false}
                                onChange={e => onChange('performance', e.target.value)} />
                        </ValueContainer>
                    </TableRow>

                    <DividerHorizontal style={{ marginBottom: 10, marginTop: 10 }} />
                    <TableRow>
                        <Caption>
                            De minimis materiality bps of overall materiality
                        </Caption>
                        <ValueContainer unsaved_changes={auditSettings.deminimis.unsaved_changes}>
                            <Input
                                value={auditSettings.deminimis.current}
                                unsavedChanges={false}
                                onChange={e => onChange('deminimis', e.target.value)} />
                        </ValueContainer>
                    </TableRow>

                </TableMain> */}