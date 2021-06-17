import React from 'react'
import { useSelector } from 'react-redux'
import { ButtonWrapper } from '../../../assets/styled-components/General'


const RepoForm = ({ newColumn, onChange, clearForm, handleDelete, addNewColumn }) => {

    const { isDark } = useSelector(state => state.layout)
    return (
        <div className="repository-form-container" >

            <div className="repository-setup-row-main-row">
                <div className="repository-setup-row-main-row-text">
                    {newColumn.id ? "Update Column" : "Add New Column"}
                </div>
            </div>

            <div className="repository-setup-row-main-row">
                <input value={newColumn.name} onChange={onChange} name="name" placeholder='Column title' type="text" />

            </div>
            <div className="repository-setup-row-main-row">
                <input value={newColumn.hover_text} onChange={onChange} name="hover_text" placeholder='Hover Text' type="text" />
                <div className="ui checkbox">
                    <input checked={newColumn.required} onChange={onChange} type="checkbox" name="required" />
                    <label className="setup-label">Required?</label>
                </div>

            </div>
            <div className="repository-setup-row-main-row">
                <ButtonWrapper className={"ui vertical animated button"} tabIndex="0" onClick={addNewColumn} >
                    <div className="hidden content">Upload</div>
                    <div className="visible content">
                        <i className={"upload icon large " + (isDark ? 'inverted' : '')}></i>
                    </div>
                </ButtonWrapper>
                {newColumn.id ?
                    <ButtonWrapper className={"ui vertical animated button"} tabIndex="0" onClick={handleDelete} >
                        <div className="hidden content">Delete</div>
                        <div className="visible content">
                            <i className={"trash icon large " + (isDark ? 'inverted' : '')}></i>
                        </div>
                    </ButtonWrapper>

                    : null}
                {newColumn.id ?
                    <ButtonWrapper className={"ui vertical animated button"} tabIndex="0" onClick={clearForm} >
                        <div className="hidden content">Add </div>
                        <div className="visible content">
                            <i className={"plus icon large " + (isDark ? 'inverted' : '')}></i>
                        </div>
                    </ButtonWrapper>

                    : null}

            </div>
        </div>
    )
}

export default RepoForm
