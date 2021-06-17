import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TableDetailContainer } from '../../../assets/styled-components/Containers'
import { TableWrapper, TableHeader, TableMain } from '../../../assets/styled-components/Table'
import { Caption, Text } from '../../../assets/styled-components/Carry'
import Spinner from '../../common/Spinner'
import { formatName, renderPercent, trimString, numberWithCommas } from '../../common/helpers'
import Section from './Section'
import { Tab, Segment, Popup } from 'semantic-ui-react'
import Conclusion from './details/Conclusion'
import Materiality from '../../setup/fund/details/Materiality'
import Questionaire from '../../setup/fund/questionaire/Questionaire'
import Capital from '../../setup/fund/details/Capital'
import styled, { keyframes, css } from 'styled-components'
import General from './details/General'
import Investments from './details/Investments'
import Blockers from './details/Blockers'
import Compare from './Compare'

import { updateCarry, getCarry, updateCarryDetail, updateCarryCompare, calculateInvestorAmounts, initInvestments, initAllocations, setCarryLoading } from '../../../store/actions/carry'
import { getCapital } from '../../../store/actions/capital'
import { getMateriality, updateMateriality } from '../../../store/actions/materiality'

export const SectionInfo = styled.div`
    display: flex;
    width: 10rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const Carry = ({ dispatch, isDark }) => {

    // const { carrySidePanel, detailView, isLoading } = useSelector(state => state.testing)

    const { selectedFund } = useSelector(state => state.funds)
    const { detailView } = useSelector(state => state.layout)
    const { selectedPeriod } = useSelector(state => state.periods)
    const { currentUser } = useSelector(state => state.user)
    const capital = useSelector(state => state.capital)
    const carry = useSelector(state => state.carry)
    const materiality = useSelector(state => state.materiality)



    const initCarry = () => {
        console.log("Initializing Carry")
        dispatch(setCarryLoading(true))
        dispatch(getCapital(selectedFund.value))
        dispatch(getMateriality(selectedFund.value, selectedPeriod.value))
        dispatch(getCarry(selectedFund.value, selectedPeriod.value))
    }

    useEffect(() => {
        updateMateriality(dispatch, { ...materiality }, 'recalc', null)
    }, [materiality.net_assets])
    //GET EVERYTHING
    useEffect(() => {
        if (selectedFund && selectedPeriod) {
            initCarry()
        }
    }, [])


    //INIT INVESTORS
    useEffect(() => {

        if (!capital.isLoading && selectedFund && selectedPeriod && carry.sections.allocation.rows.length > 0) {
            calculateInvestorAmounts(capital, { ...carry.sections.investor }, dispatch)
        }
    }, [capital.totalContributions, capital.totalDistributions, carry.isLoading])

    //INIT INVESTMENTS
    useEffect(() => {
        if (!capital.isLoading && selectedFund && selectedPeriod && carry.sections.investment.rows.length > 0) {
            initInvestments({ ...carry }, dispatch)
        }
    }, [carry.isLoading,])

    //INIT ALLOCATIONS
    useEffect(() => {
        if (!capital.isLoading && selectedFund && selectedPeriod && carry.sections.allocation.rows.length > 0) {
            initAllocations({ ...carry }, materiality, dispatch)
        }
    }, [carry.isLoading])


    const onChange = (section, key, value) => {

        if (key === 'editable' && value === false) {
            // dispatch(saveCarryCalc(currentUser, selectedFund.value, selectedPeriod.value, {}, 'client_value', key, carry.compare.client_value))
        }

        if (key === 'client_value' && !isNaN(value)) {
            // calcDifference(value)
        }

    }

    const [activeIndex, setActiveIndex] = useState(0)

    const onTabChange = (e, data) => setActiveIndex(data.activeIndex)

    const handleRowClick = dataRow => {
        let ind = null
        if (dataRow.detail === 'capital') {
            ind = 2
        } else if (dataRow.detail === 'conclusion') {
            ind = 0
        } else if (dataRow.detail === 'materiality') {
            ind = 1
        } else {
            for (var m = 0; m < carry.supportDetails.length; m++) {
                if (carry.supportDetails[m].name === dataRow.key) {
                    ind = m + 3
                    break
                }
            }
        }
        if (ind !== null) setActiveIndex(ind)
    }

    const onDetailChange = (indexArray, key, value) => {
        console.log('onDetailChange', indexArray, key, value)
        updateCarryDetail(dispatch, { ...carry }, indexArray, key, value)
    }


    const onCompareChange = (key, value) => {
        updateCarryCompare(dispatch, carry, materiality, key, value)
    }

    useEffect(() => {
        onCompareChange('clientValue', carry.clientValue.current)
    }, [carry.sections.allocation.rows.length])

    const detailHeight = 'calc(100vh - 9rem)'
    const mainHeight = 'calc(100vh - 6.2rem)'

    const renderPanes = () => {
        const panes = [
            {
                menuItem: 'Conclusion',
                render: () => <Tab.Pane style={{ height: detailHeight }} attached='top'><Conclusion /></Tab.Pane>
            },
            {
                menuItem: 'Materiality',
                render: () => <Tab.Pane style={{ height: detailHeight }} attached='top'><Materiality /></Tab.Pane>
            },
            {
                menuItem: 'Capital',
                render: () => <Tab.Pane style={{ height: detailHeight }} attached='top'><Capital /></Tab.Pane>
            }
        ]

        const renderDetail = (detailType, supportIndex, name) => {
            if (detailType === 'investment') {
                return <Tab.Pane style={{ height: detailHeight }} attached='top'><Investments supportIndex={supportIndex} name={name} onChange={onDetailChange} /></Tab.Pane>
            } else if (detailType === 'blockers') {
                return <Tab.Pane style={{ height: detailHeight }} attached='top'><Blockers supportIndex={supportIndex} name={name} onChange={onDetailChange} /></Tab.Pane>
            } else {
                return <Tab.Pane style={{ height: detailHeight }} attached='top'><General supportIndex={supportIndex} name={name} onChange={onDetailChange} /></Tab.Pane>
            }
        }

        for (var i = 0; i < carry.supportDetails.length; i++) {
            let name = formatName(carry.supportDetails[i].name)
            const supportIndex = i
            const detailType = carry.supportDetails[i].detailType

            panes.push({
                menuItem: name,
                render: () => renderDetail(detailType, supportIndex, name)
            })

        }
        return panes
    }


    return (
        <TableDetailContainer>

            <Segment style={{ height: mainHeight }}>

                <TableWrapper style={{ maxHeight: '100%' }}>

                    <TableHeader hasShadow={false} style={{ backgroundColor: 'var(--bg-tertiary)' }}>

                        {detailView ? <SectionInfo></SectionInfo> : null}
                        <Caption style={{ fontWeight: '800', fontSize: '1.3rem', justifyContent: 'flex-start' }}>Caption</Caption>
                        {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} isBold={true}>Period</Text> : null}
                        {detailView ? <Text style={{ minWidth: 150, maxWidth: 150 }} isBold={true}>Source</Text> : null}
                        <Text isBold={true} style={{ justifyContent: 'flex-end', paddingRight: '.5rem' }}>Total Fund Level</Text>
                        <Popup content={`Unaffiliated Commitment: ${numberWithCommas(carry.affilInfo.unaff_commitments)} Total Commitment: ${numberWithCommas(carry.affilInfo.total_commitments)}`} trigger={<Text isBold={true} style={{ justifyContent: 'flex-end', paddingRight: '.5rem' }}>Investors Subject to Carry ({carry.affilInfo.percent.toFixed(2)}%)</Text>} />
                    </TableHeader>

                    {carry.isLoading ? <Spinner loadingText='Loading carried interest data' inverted={!isDark} /> :

                        <TableMain style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 12.8rem)' }}>

                            {Object.keys(carry.sections).map((keyName, keyIndex) => {

                                return (
                                    <Section
                                        dispatch={dispatch}
                                        key={keyIndex}
                                        section={carry.sections[keyName]}
                                        detailView={detailView}
                                        handleRowClick={handleRowClick}
                                        onChange={onChange} />
                                )


                            })}

                            <Compare
                                onChange={onCompareChange}
                                handleRowClick={handleRowClick}
                                materiality={materiality}
                                carry={carry} />


                        </TableMain>}

                </TableWrapper>
            </Segment>

            <Tab onTabChange={onTabChange} activeIndex={activeIndex} menu={{ attached: 'bottom' }} panes={renderPanes()} />

        </TableDetailContainer>
    )
}

export default Carry

