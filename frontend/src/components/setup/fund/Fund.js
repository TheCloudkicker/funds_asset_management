import React, { useState, useEffect } from 'react'
import { Route, Switch } from "react-router";
import { getEntityOwnerships, getFundDetails, toggleFundLoading } from '../../../store/actions/funds/funds'
import { useParams } from "react-router-dom";

import Capital from './details/Capital'
import Carry from './details/Carry'
import Data from './details/Data'
import Aliases from './details/Aliases'
import General from './General'
import Investments from './details/Investments'
import Investors from './details/Investors'
import Ownerships from './ownerships/Ownerships'
import Spinner from '../../common/Spinner'
import Questionaire from './questionaire/Questionaire'
import Viewer from './details/Viewer'
import Fees from './details/Fees'
import Materiality from './details/Materiality';
import { useSelector, useDispatch } from 'react-redux'
import { TableDetailContainer, RightSection, LeftSection } from '../../../assets/styled-components/Containers'
import { Tab } from 'semantic-ui-react'

const detailHeight = 'calc(100vh - 9rem)'
const mainHeight = 'calc(100vh - 6.2rem)'

const mainPanes = [
    {
        menuItem: 'General',
        render: () => <Tab.Pane style={{ height: mainHeight }} attached={false}><General /></Tab.Pane>,
    },
    {
        menuItem: 'Ownerships',
        render: () => <Tab.Pane style={{ height: mainHeight }} attached={false}><Ownerships /></Tab.Pane>,
    },
    {
        menuItem: 'Investments',
        render: () => <Tab.Pane style={{ height: mainHeight }} attached={false}><Investments /></Tab.Pane>,
    },
    {
        menuItem: 'Investors',
        render: () => <Tab.Pane style={{ height: mainHeight }} attached={false}><Investors /></Tab.Pane>,
    },
    {
        menuItem: 'Capital',
        render: () => <Tab.Pane style={{ height: mainHeight }} attached={false}><Capital /></Tab.Pane>,
    },
    {
        menuItem: 'Data',
        render: () => <Tab.Pane style={{ height: mainHeight }} attached={false}><Data /> </Tab.Pane>,
    },
    {
        menuItem: 'Carry',
        render: () => <Tab.Pane style={{ height: mainHeight }} attached={false}><Carry /></Tab.Pane>,
    },
]

const Fund = () => {

    const { fundID } = useParams()
    const dispatch = useDispatch()
    const { isLoading, fundObject } = useSelector(state => state.funds)
    const { sidePanel, isDark } = useSelector(state => state.layout)

    useEffect(() => {
        if (isNaN(fundID)) return
        dispatch(getFundDetails(fundID))
        dispatch(toggleFundLoading(true))
    }, [])





    const sidePanes = [
        {
            menuItem: 'Aliases',
            render: () => <Tab.Pane style={{ height: detailHeight }} attached='top'><Aliases /></Tab.Pane>,
        },
        {
            menuItem: 'Materiality',
            render: () => <Tab.Pane style={{ height: detailHeight }} attached='top'><Materiality /></Tab.Pane>,
        },
    ]



    return (
        <TableDetailContainer>

            <Tab style={{ height: '100%' }} grid={{ paneWidth: 14, tabWidth: 2 }} menu={{ vertical: true, tabular: true }} panes={mainPanes} />

            <Tab menu={{ attached: 'bottom' }} panes={sidePanes} />

        </TableDetailContainer>

    )
}

export default Fund