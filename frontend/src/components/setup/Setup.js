import React from 'react'

import Allocation from './details/Allocation'
import Fund from './fund/Fund'
import Funds from './fund/Funds'
import Repository from './repository/Repository'
import Team from './team/Team'
import { Route, Switch } from "react-router";
import { PrimaryContainer } from '../../assets/styled-components/Containers'

const Setup = () => {

    return (
        <PrimaryContainer>

            <Switch>
                <Route exact path="/setup/funds/">
                    <Funds />
                </Route>
                <Route path="/setup/funds/:fundID">
                    <Fund />
                </Route>
                <Route path="/setup/team/">
                    <Team />
                </Route>
                <Route path="/setup/allocations/">
                    <Allocation />
                </Route>
                <Route path="/setup/repository/">
                    <Repository />
                </Route>

            </Switch>

        </PrimaryContainer>
    )
}

export default Setup
