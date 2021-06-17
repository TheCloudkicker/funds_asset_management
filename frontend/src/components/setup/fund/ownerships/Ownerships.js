import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormInput from '../../../common/FormInput'
import { TableWrapper, TableHeader, HeaderItem, TableMain, TableRow, RowItem } from '../../../../assets/styled-components/Table'
import { IconWrapper } from '../../../../assets/styled-components/General'
import Select from 'react-select'
import { customStyles } from '../../../../assets/styles/select'
import Spinner from '../../../common/Spinner'
import { addNewOwnership, setEntityOptions, getEntityOwnerships, toggleOwnershipsLoading, addChildOwnership } from '../../../../store/actions/funds/funds'
import styled, { keyframes, css } from 'styled-components'
import { Icon, Button, Popup } from 'semantic-ui-react'

const Ownership = ({ ownership, onChange, owner_options, owned_options }) => {

    return (
        <TableRow key={ownership.id}>

            <RowItem>{ownership.level}</RowItem>
            <RowItem>

                {ownership.editable ?

                    <Select
                        placeholder="owner entity..."
                        styles={customStyles}
                        value={ownership.owner_entity.current}
                        options={owner_options}
                        onChange={entity => onChange('entity', entity)} /> : ownership.owner_entity.current ? ownership.owner_entity.current.value : 'Not Set'}

            </RowItem>

            <RowItem>
                {ownership.editable ?

                    <Select
                        placeholder="owned entity..."
                        styles={customStyles}
                        value={ownership.owned_entity.current}
                        options={owned_options}
                        onChange={entity => onChange('entity', entity)} /> : ownership.owned_entity.current ? ownership.owned_entity.current.value : 'Not Set'}
            </RowItem>

            <RowItem>{ownership.ownership_type.current}</RowItem>
            <RowItem>
                {ownership.editable ?
                    <FormInput value={ownership.ownership_percentage.current} /> :
                    ownership.ownership_percentage.current}
            </RowItem>
            <RowItem>{ownership.net_ownership}</RowItem>


        </TableRow>
    )
}

const TableRowWrapper = styled.div`
    width: 100%;
    border: 1px solid cornflowerblue;
`

const RowContainer = ({ entity, branch, ownershipType, dispatch }) => {


    let no_children = entity.consolidated_entities.length + entity.unconsolidated_entities.length

    const [open, setOpen] = useState(false)

    const onClick = () => {
        setOpen(!open)
    }
    const consolidated_children = entity.consolidated_entities.map(consol_entity => {
        return <RowContainer entity={consol_entity} branch={branch + 1} ownershipType={`Consolidated with ${entity.label}`} dispatch={dispatch} />
    })
    const unconsolidated_children = entity.unconsolidated_entities.map((unconsol_entity, uIndex) => {
        return <RowContainer entity={unconsol_entity} branch={branch + 1} ownershipType={`Shared pick up by ${entity.label}`} key={uIndex} dispatch={dispatch} />
    })

    const handleAdd = () => dispatch(addChildOwnership(entity))

    const handleDelete = () => {

    }

    const displayPercent = num => {
        if (isNaN(num)) {
            return num
        }
        return num.toFixed(4)
    }



    return (
        <>
            <TableRow>

                <RowItem style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <IconWrapper onClick={onClick} style={{ marginLeft: branch * 20 }}>
                        {no_children === 0 ? null : <i className={(open ? "minus" : "plus") + " icon"}></i>}
                    </IconWrapper>
                    <span>
                        {entity.label}
                    </span>
                </RowItem>
                <RowItem style={{ flex: 1, justifyContent: 'flex-start' }}>{no_children} blocker owned</RowItem>
                <RowItem style={{ width: '20%' }}>{ownershipType}</RowItem>
                <RowItem style={{ width: '10%' }}>{displayPercent(entity.gross_percent * 100)}%</RowItem>
                <RowItem style={{ width: '10%' }}></RowItem>
                <RowItem style={{ width: '10%' }}>

                    <Button.Group size='small'>

                        <Button color='black' icon disabled={false} onClick={() => handleAdd()}>
                            <Icon name={'plus'} />
                        </Button>
                        <Button color='black' icon disabled={true} onClick={() => handleDelete()}>
                            <Icon name={'trash'} />
                        </Button>

                    </Button.Group>

                </RowItem>
            </TableRow>
            {open ? consolidated_children : null}
            {open ? unconsolidated_children : null}
        </>
    )
}

const TableRowWrapperContainer = ({ entity, ownershipType, dispatch }) => {

    return (
        <TableRowWrapper>
            <RowContainer
                entity={entity} branch={0} dispatch={dispatch}
                ownershipType={ownershipType} />

        </TableRowWrapper>
    )
}



const Ownerships = () => {

    const { entity_ownership_obj, new_entity_ownerships, owner_options, owned_options, funds, ownershipsLoading } = useSelector(state => state.funds)
    const { selectedFund } = useSelector(state => state.funds)
    const { selectedPeriod } = useSelector(state => state.periods)
    const { isDark } = useSelector(state => state.layout)
    const dispatch = useDispatch()


    const secondary_headers = [
        "Owner Entity", "Ownership Type", "Ownership %", "Actions", "Unsaved Changes"
    ]

    const handleAdd = () => dispatch(addNewOwnership())
    const onChange = (key, value) => {

    }

    useEffect(() => {
        if (selectedFund) {
            dispatch(getEntityOwnerships(selectedFund.value))
            dispatch(toggleOwnershipsLoading(true))
            dispatch(setEntityOptions('owner_options', [selectedFund]))
            dispatch(setEntityOptions('owned_options', funds))
        }


    }, [JSON.stringify(selectedFund), JSON.stringify(selectedPeriod)])





    return (
        <TableWrapper>
            <TableHeader hasShadow={false} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <HeaderItem style={{ flex: 1, justifyContent: 'flex-start', paddingLeft: '5rem' }}>Entity</HeaderItem>
                <HeaderItem style={{ flex: 1, justifyContent: 'flex-start' }}>Blocker Info</HeaderItem>
                <HeaderItem style={{ width: '20%' }}>Ownership Type</HeaderItem>
                <HeaderItem style={{ width: '10%' }}>Gross %</HeaderItem>
                <HeaderItem style={{ width: '10%' }}>Net %</HeaderItem>
                <HeaderItem style={{ width: '10%' }}>Actions</HeaderItem>
            </TableHeader>

            {false ? <Spinner loadingText="loading ownerships..." inverted={!isDark} /> :

                <TableMain style={{ backgroundColor: 'var(--bg-primary)', overflowY: 'auto', maxHeight: 'calc(100vh - 15rem)' }}>

                    <TableRowWrapperContainer entity={entity_ownership_obj} ownershipType={"FS issuing level"} dispatch={dispatch} />


                    {entity_ownership_obj.combined_entities.map(combined_entity =>

                        <TableRowWrapperContainer entity={combined_entity} ownershipType={`Combined with ${entity_ownership_obj.label}`} dispatch={dispatch} />

                    )}


                </TableMain>

            }

        </TableWrapper>
    )
}

export default Ownerships

