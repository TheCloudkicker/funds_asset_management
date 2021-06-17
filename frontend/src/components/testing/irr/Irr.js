import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCashMovements } from '../../../store/actions/cash'
import { xirr } from 'node-irr'
import { createSuccess } from '../../../store/actions/alerts'

import { HeaderItem, TableMain, TableHeader } from '../../../assets/styled-components/Table'
import { TableDetailContainer } from '../../../assets/styled-components/Containers'
import { Caption } from '../../../assets/styled-components/Carry'
import { Tab, Segment, Table, Icon, Container, Button } from 'semantic-ui-react'

const CashFlowItem = ({ value }) => {
    return (
        <Container>
            {value}
        </Container>
    )
}



const CashFlow = ({ cashFlow }) => {
    return (
        <Segment>
            <CashFlowItem value={cashFlow.date} />
            <CashFlowItem value={cashFlow.amount} />
            <CashFlowItem value={cashFlow.currency} />
            <CashFlowItem value={cashFlow.type} />
            <CashFlowItem value={cashFlow.dataSource} />
            <CashFlowItem value={cashFlow.sourceFileName} />
        </Segment>
    )
}

const Result = ({ title, result }) => {
    return (
        <Segment>
            <Caption>{title}</Caption>
            <Caption>{result}</Caption>
        </Segment>
    )
}

const Irr = ({ dispatch, isDark }) => {

    const { selectedPeriod } = useSelector(state => state.periods)
    const { cashFlows } = useSelector(state => state.cash)
    const [calcIrr, setCalcIrr] = useState('No Cash Flows Loaded')

    useEffect(() => {
        dispatch(getCashMovements(12))
    }, [])


    let asOfDate = 'xx/xx/xx'

    if (selectedPeriod) {
        asOfDate = selectedPeriod.end
    }

    const calculatedIRR = () => {
        let irrRate = xirr(cashFlows).rate * 365
        let irrRounded = irrRate.toFixed(5)
        setCalcIrr(irrRounded)
        dispatch(createSuccess('IRR Calculated'))
    }

    useEffect(() => {
        if (cashFlows.length > 0) {
            calculatedIRR()
        }
    }, [cashFlows])



    return (
        <TableDetailContainer>

            <Container>

                <TableHeader>
                    <HeaderItem>{"Date"}</HeaderItem>
                    <HeaderItem>{"Amount"}</HeaderItem>
                    <HeaderItem>{"Currency"}</HeaderItem>
                    <HeaderItem>{"Cont / Dist"}</HeaderItem>
                    <HeaderItem>{"Data Source"}</HeaderItem>
                    <HeaderItem>{"Source File Name"}</HeaderItem>
                </TableHeader>

                <TableMain>
                    {cashFlows.map(cashFlow =>
                        <CashFlow key={cashFlow.id} cashFlow={cashFlow} />
                    )}
                </TableMain>


            </Container>

            <Container>

                <Segment>
                    <Result title={`Calculated IRR as of ${asOfDate}`} result={'22.1%'} />
                    <Result title={"IRR as per FS"} result={`${calcIrr} %`} />
                    <Result title={"Difference"} result={'0.1%'} />
                    <Result title={"Defined Threshold"} result={'0.5%'} />
                    <Result title={"Conclusion"} result={'Satisfactory'} />
                </Segment>

            </Container>

        </TableDetailContainer>
    )
}

export default Irr
