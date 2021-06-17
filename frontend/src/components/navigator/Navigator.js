import React from 'react'
import '../../assets/css/Navigator.css'
import EntityIcon from './EntityIcon'
import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FundContainer from './tabular/fund/FundContainer'
import ClientContainer from './tabular/client/ClientContainer'
import TabularNavigator from './tabular/TabularNavigator'
import VisualContainer from './visual/VisualContainer'

import { Main } from './components'
import { NavigatorContainer } from '../../assets/styled-components/Containers'

const Navigator = () => {

    const dispatch = useDispatch()
    const { isDark } = useSelector(state => state.layout)

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/navigator')
    }, [])


    return (
        <NavigatorContainer>

            <Main>

                <Switch>
                    <Route exact path="/navigator/visual">
                        <VisualContainer />
                    </Route>
                    <Route exact path="/navigator/tabular">
                        <TabularNavigator />
                    </Route>
                    <Route path="/navigator/client/:clientID">
                        <ClientContainer />
                    </Route>
                    <Route path="/navigator/fund/:fundID">
                        <FundContainer />
                    </Route>
                </Switch>

            </Main>
        </NavigatorContainer>

    )
}

export default Navigator
