import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


const Repository = ({ isDark, dispatch }) => {

    const { repositories } = useSelector(state => state.repository)

    useEffect(() => {

    }, [])

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/setup/repository')
    }, [])

    const handleDragEnd = result => {
        const { destination, source, reason } = result;
        console.log('destination', destination)

        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }


    }


    return (
        <DragDropContext onDragEnd={result => handleDragEnd(result)} >
            <div className="repository-setup-container">


                {/* {repositories.map((repository, index) =>

                    <RepositoryRow key={repository.id} rowIndex={index} repository={repository} />

                )} */}

            </div>
        </DragDropContext>
    )
}

export default Repository
