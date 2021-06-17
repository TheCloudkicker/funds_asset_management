import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Mappings from './mapping/Mappings'
import Fslis from './fslis/Fslis'
import Footnotes from './footnotes/Footnotes'

import { PrimaryContainer } from '../../assets/styled-components/Containers'
import { Switch, Route } from 'react-router-dom'
import { Tab, Segment, Table, Icon, Container, Button } from 'semantic-ui-react'

const Fs = () => {

    const dispatch = useDispatch()
    const { isDark } = useSelector(state => state.layout)

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/fs')
    }, [])

    return (
        <Container>

            <Switch>
                <Route path="/fs/mappings/">
                    <Mappings dispatch={dispatch} isDark={isDark} />
                </Route>
                <Route path="/fs/footnotes/">
                    <Footnotes dispatch={dispatch} isDark={isDark} />
                </Route>
                <Route path="/fs/fslis/">
                    <Fslis dispatch={dispatch} isDark={isDark} />
                </Route>
            </Switch>

        </Container>

    )
}

export default Fs
