import React, { useState, useEffect } from 'react'
import { Route, Switch } from "react-router";
import Dropzone from '../../common/Dropzone'
import { useSelector } from 'react-redux'
import { closeRowToEditing } from '../../../store/actions/admin'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TableDetailContainer } from '../../../assets/styled-components/Containers'
import { DzContainer, DzToggle } from '../../../assets/styled-components/Dropzone'

import Funds from './Funds'


const Database = ({ dispatch, isDark }) => {

    const { resized } = useSelector(state => state.layout)

    const [maxWidth, setMaxWidth] = useState('50vw')
    const [isCalc, setIsCalc] = useState(false)

    const calcMaxWidth = async () => {

        let innerHeight = window.innerHeight

        if (!dropzoneVisible) {
            return innerHeight - ((9.6 * 12) + 210)
        } else {
            return innerHeight - ((9.6 * 12) + 10)
        }

    }




    const setMaxHeightA = async () => {
        setIsCalc(true)
        let max = await calcMaxHeight()
        setMaxHeight(max)
        setIsCalc(false)
        setDropzoneVisible(!dropzoneVisible)
    }


    useEffect(() => {
        localStorage.setItem('waibeUrl', '/setup/database')
    }, [])




    const handleDragEnd = result => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }
    }

    const [dropzoneVisible, setDropzoneVisible] = useState(false)
    const [maxHeight, setMaxHeight] = useState(null)


    const calcMaxHeight = () => {
        if (dropzoneVisible) {
            setMaxHeight(window.innerHeight - (146 + 200))
        } else {
            setMaxHeight(window.innerHeight - (146))
        }

    }

    useEffect(() => {
        calcMaxHeight()
    }, [dropzoneVisible, resized])


    const onToggleClick = () => {
        setMaxHeight(window.innerHeight - (146 + !dropzoneVisible ? 0 : 200))
        setDropzoneVisible(!dropzoneVisible)

    }

    const { fundClientReports } = useSelector(state => state.database)



    return (
        <TableDetailContainer>

            <Switch>
                <Route path="/setup/database/funds">
                    <Funds fundClientReports={fundClientReports} dispatch={dispatch} isDark={isDark} />
                </Route>
                <Route path="/setup/database/investments">
                    <h1>Investments</h1>
                </Route>
                <Route path="/setup/database/investors">
                    <h1>Investors</h1>
                </Route>
            </Switch>


            <DzToggle dzVisible={dropzoneVisible} onClick={() => onToggleClick()}>DZ</DzToggle>

            {dropzoneVisible ?

                <DzContainer style={{ height: '20rem' }}>
                    <Dropzone />
                </DzContainer>

                : null}

        </TableDetailContainer>
    )
}

export default Database
