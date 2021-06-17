import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateRepositoryHeader, toggleRepoChecked } from '../../../store/actions/repository'



import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


const RepositoryHeader = ({ repoID, header, dispatch, index }) => {

    const onInputChange = (e, key) => {
        dispatch(updateRepositoryHeader(repoID, header.id, key, e.target.value))
    }

    const renderHeader = () => {

        if (header.editable) {
            return (
                <React.Fragment>
                    <input
                        className={"repository-name-input"}
                        placeholder="Name" value={header.name} onChange={e => onInputChange(e, 'name')} />

                    <input
                        className={"repository-name-input"}
                        placeholder="Description" value={header.description} onChange={e => onInputChange(e, 'description')} />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div
                        className={"repo-text-bold " + (header.selected ? "database-row-item-selected" : "")}>
                        {header.name}
                    </div>
                    <div
                        className={"repo-text-bold " + (header.selected ? "database-row-item-selected" : "")}>
                        {header.description} | {header.order_no}
                    </div>
                </React.Fragment>
            )
        }
    }

    return (
        <Draggable
            key={index}
            draggableId={index + ''}
            index={index}

        >
            {(provided) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="repository-setup-row-option">
                        {renderHeader()}
                    </div>
                )
            }}

        </Draggable>
    )
}


function CheckBox({ repository, type, dispatch }) {

    const { isDark } = useSelector(state => state.layout)

    const onChange = () => {
        // dispatch(selectRepoHeaders(repository.id, !repository.checked))
        dispatch(toggleRepoChecked(repository.id, !repository.checked))
    }

    return (
        <div className={"ui checkbox " + (isDark ? 'inverted' : '')}>
            <input type="checkbox" name="example" checked={repository.checked} onChange={onChange} />
            <label></label>
        </div>
    )
}





function RepositoryRow({ repository, type, rowIndex }) {


    const dispatch = useDispatch()
    const { isDark } = useSelector(state => state.layout)

    const handleAddHeader = () => console.log("A")





    return (

        <div className="repository-setup-row">

            <div className={"funds-setup-header-select"}>
                <CheckBox dispatch={dispatch} repository={repository} type={type} />
            </div>

            <div className="repository-setup-row-name">
                <div className="repository-setup-row-header-text">
                    {repository.name}
                </div>
            </div>

            <Droppable droppableId={rowIndex + ''} direction="horizontal">
                {(provided, snapshot) => {
                    return (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="repository-setup-row-options" style={{ background: snapshot.isDraggingOver ? "lightblue" : "none" }}>
                            {repository.headers.map((header, index) =>

                                <RepositoryHeader key={index} index={index} header={header} repoID={repository.id} dispatch={dispatch} />

                            )}

                        </div>

                    )

                }}

            </Droppable>

            <div className="new-repo-header" onClick={handleAddHeader}>
                <i className={"plus icon " + (isDark ? 'inverted' : '')}></i>
            </div>

        </div>
    )
}

export default RepositoryRow
