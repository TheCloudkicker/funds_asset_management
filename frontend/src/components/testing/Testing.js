import React, { useEffect } from 'react'
import { Route, Switch } from "react-router";

import Capital from './capital/Capital'
import Carry from './carry/Carry'
import Expenses from './expenses/Expenses'
import Irr from './irr/Irr'
import Mgmt from './mgmt/Mgmt'
import Investments from './investments/Investments'
import LandingPage from './landing/LandingPage'
import { useSelector, useDispatch } from 'react-redux'
import { PrimaryContainer } from '../../assets/styled-components/Containers'


const Testing = () => {

    const dispatch = useDispatch()
    const { isDark } = useSelector(state => state.layout)

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/testing')
    }, [])

    return (
        <PrimaryContainer style={{ paddingLeft: 2 }}>

            <Switch>
                <Route path="/testing/irr/:fundID">
                    <Irr isDark={isDark} dispatch={dispatch} />
                </Route>
                <Route path="/testing/capital/">
                    <Capital isDark={isDark} dispatch={dispatch} />
                </Route>
                <Route path="/testing/carry/">
                    <Carry isDark={isDark} dispatch={dispatch} />
                </Route>
                <Route path="/testing/mgmt/">
                    <Mgmt isDark={isDark} dispatch={dispatch} />
                </Route>
                <Route path="/testing/investments/">
                    <Investments isDark={isDark} dispatch={dispatch} />
                </Route>
                <Route path="/testing/expenses/">
                    <Expenses isDark={isDark} dispatch={dispatch} />
                </Route>
                <Route path="/testing/">
                    <LandingPage isDark={isDark} dispatch={dispatch} />
                </Route>
            </Switch>

        </PrimaryContainer>
    )
}

export default Testing