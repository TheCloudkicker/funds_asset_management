
import React, { useState } from 'react'
import Select from 'react-select'
import { customStyles } from '../../../../assets/styles/select'
import { useSelector } from 'react-redux'
import { changeOwnershipInfo, deleteOwnership, setSelectedBlocker, toggleBlockerLoading, getBlockerOwners } from '../../../../store/actions/funds/funds'
import { createError } from '../../../../store/actions/alerts'
import { ownership_types } from '../../../common/helpers'





function Ownership({ ownership, dispatch, setOpen }) {

    const handleDelete = () => dispatch(deleteOwnership(ownership.id))

    const handleClick = () => {
        dispatch(setSelectedBlocker(ownership.owned_entity))
        dispatch(toggleBlockerLoading(true))
        dispatch(getBlockerOwners(ownership.owned_entity.value))
        setOpen(true)
    }

    const { funds } = useSelector(state => state.funds)
    // const [ownership, setOwnership] = useState({
    //     owner_entity: null,
    //     owned_entity: null,
    //     ownership_percentage: 0
    // })

    const onChange = (key, value) => {
        if (key === 'ownership_percentage' && isNaN(value)) {
            dispatch(createError('Ownership percentage must be a number'))
        } else if (key === 'owned_entity' && ownership.owner_entity) {
            if (value.value === ownership.owner_entity.value) {
                dispatch(createError('Entity cannot own itself'))
                dispatch(changeOwnershipInfo(ownership.id, 'ownership_error', true))
            }

        } else if (key === 'owner_entity' && ownership.owned_entity) {
            if (value.value === ownership.owned_entity.value) {
                dispatch(createError('Entity cannot own itself'))
                dispatch(changeOwnershipInfo(ownership.id, 'ownership_error', true))
            }
        }
        dispatch(changeOwnershipInfo(ownership.id, key, value))
    }

    return (
        <div className="ownership-main-row">

            <div className="ownership-main-item" >
                {ownership.level}
            </div>

            <div className="ownership-main-item">
                {ownership.editable ?
                    <div className={"ownership-select-wrapper " + (ownership.ownership_error ? "ownership-select-wrapper-error-left" : "")}>


                        <Select
                            placeholder="Select owner entity..."
                            styles={customStyles}
                            value={ownership.owner_entity}
                            options={funds.map(fund => {
                                return { value: fund.id, label: fund.name }
                            })}
                            onChange={entity => onChange('owner_entity', entity)} /> </div> : ownership.owner_entity.label}
            </div>

            <div className="ownership-main-item">

                {ownership.editable ?
                    <div className={"ownership-select-wrapper " + (ownership.ownership_error ? "ownership-select-wrapper-error-right" : "")}>
                        <Select
                            placeholder="Select owned entity..."
                            styles={customStyles}
                            value={ownership.owned_entity}
                            options={funds.map(fund => {
                                return { value: fund.id, label: fund.name }
                            })}
                            onChange={entity => onChange('owned_entity', entity)} /></div> : ownership.owned_entity.label}
            </div>

            <div className="ownership-main-item">
                {ownership.editable ?
                    <div className={"input-wrapper "}>
                        <input
                            type="text"
                            className={"ownership-percentage-input " + (ownership.ownership_percentage_error ? "input-error" : "")}
                            onChange={e => onChange('ownership_percentage', e.target.value)}
                            value={ownership.ownership_percentage} /></div> : ownership.ownership_percentage}
            </div>

            <div className="ownership-main-item">
                {ownership.net_ownership}
            </div>
            <div className="ownership-main-item">
                {ownership.editable ?
                    <div className={"ownership-select-wrapper "}>
                        <Select
                            placeholder="Select ownership type..."
                            styles={customStyles}
                            value={ownership.ownership_type}
                            options={ownership_types}
                            onChange={ownership_type => onChange('ownership_type', ownership_type)} /></div> : ownership.ownership_type ? ownership.ownership_type.label : "Not Set"}
            </div>
            <div className="ownership-main-item">
                <div className="ownership-delete-icon" onClick={() => handleDelete()}>
                    <i className="trash icon"></i>
                </div>
                <div className="ownership-delete-icon" onClick={() => handleClick()}>
                    <i className="sitemap icon"></i>
                </div>
            </div>
            <div className={"ownership-main-item " + (ownership.saved ? "ownership-saved" : "ownership-notsaved")}>

            </div>

        </div>
    )
}


export default Ownership
