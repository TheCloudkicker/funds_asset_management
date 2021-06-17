import React, { useState, useEffect, useRef } from 'react'
import { TableMain, TableWrapper, TableHeader, TableRow, LeftRow, RightRow } from '../../../../assets/styled-components/Table'
import { Caption } from '../../../../assets/styled-components/Carry'
import { capitalTypes2, formatNumAsString } from '../../../common/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { updateCapital2, getCapital, deleteCapital } from '../../../../store/actions/capital'
import { updateLayout } from '../../../../store/actions/layout'
import { CustomSelect3 } from '../../../common/Select'
import Spinner from '../../../common/Spinner'
import { InputForm } from '../../../common/FormInput'
import { CustomDateInput } from '../../../common/DatePicker'
import { Button, Icon, Popup } from 'semantic-ui-react'
import Header from '../../../table/Header'
import Footer from '../../../table/Footer'

// false ? <Spinner loadingText="Calculating capital summary..." inverted={true} />

const Movement = ({ capitalMovement, index, onChange, dispatch }) => {
    return (
        <TableRow key={index}>

            <LeftRow style={{ flex: 1, alignItems: 'center' }}>

                <CustomDateInput
                    wrapperStyles={{ width: '20%', }}
                    obj={capitalMovement.movementDate}
                    onChange={data => onChange(index, 'movementDate', data.value)}
                />

                <CustomSelect3
                    wrapperStyles={{ width: '20%', height: '70%', }}
                    options={capitalTypes2}
                    obj={capitalMovement.movementType}
                    onChange={value => onChange(index, 'movementType', value)}
                />

                <InputForm
                    obj={capitalMovement.totalAmount}
                    wrapperStyles={{ width: '20%', height: '70%' }}
                    onChange={value => onChange(index, 'totalAmount', value)} />

                <Caption
                    style={{ justifyContent: 'flex-end', width: '20%', color: capitalMovement.preferred < 0 ? 'red' : 'black' }}>
                    {formatNumAsString(capitalMovement.preferred)}
                </Caption>

                <Popup content={`Uploaded by ${capitalMovement.addedBy} on ${capitalMovement.dateAdded}`} trigger={<Caption style={{ cursor: 'pointer', width: 20, flex: 'none', paddingBottom: 5, marginLeft: 5 }}><Icon name='info' /></Caption>} />

            </LeftRow>

            <RightRow style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5, width: 100, maxWidth: 100, minWidth: 100 }}>

                <Button.Group size='small'>

                    <Button color='black' icon onClick={() => dispatch(deleteCapital(capitalMovement.id))}>
                        <Icon name='trash' />
                    </Button>

                    <Button color='black' icon onClick={() => onChange(index, 'readOnly', !capitalMovement.readOnly)}>
                        <Icon name={capitalMovement.readOnly ? 'edit' : 'lock'} />
                    </Button>

                    <Button disabled={!capitalMovement.hasSupport} color='black' icon onClick={() => onChange(index, 'view', null)}>
                        <Icon name='eye' />
                    </Button>

                </Button.Group>

            </RightRow>
        </TableRow>
    )
}

const Capital = () => {

    const { selectedFund } = useSelector(state => state.funds)
    const capital = useSelector(state => state.capital)
    const dispatch = useDispatch()

    const usePrevious = value => {
        const ref = useRef()
        useEffect(() => {
            ref.current = value
        });
        return ref.current
    }

    const endRef = useRef(null)
    const prevMovements = usePrevious(capital.capitalMovements.length)
    const scrollToBottom = () => endRef.current.scrollIntoView({ behavior: 'smooth' })

    useEffect(() => {
        if (prevMovements < capital.capitalMovements.length) {
            scrollToBottom()
        }
    }, [capital.capitalMovements.length])

    useEffect(() => {
        // dispatch(updateAppView('Setup', 'Capital'))

        if (selectedFund) dispatch(getCapital(selectedFund.value))
    }, [])

    const onChange = (index, key, value) => updateCapital2({ ...capital }, index, key, value, dispatch, 8)

    return (
        <TableWrapper style={{ height: '100%' }}>
            <Header unique="capital" />
            <TableMain style={{ paddingTop: 2, overflowY: 'auto', maxHeight: '70vh', minHeight: '70vh', flex: 1 }}>

                {capital.capitalMovements.map((capitalMovement, index) => (
                    <Movement capitalMovement={capitalMovement} index={index} dispatch={dispatch} onChange={onChange} />
                ))}

                <div style={{ minHeight: '5rem' }} ref={endRef}></div>

            </TableMain>
            <TableMain style={{ height: 125, maxHeight: 125 }}>

                <Footer
                    description={`HTD Contribution`}
                    unique="capital"
                    border={false}
                    value={formatNumAsString(capital.totalContributions)} />

                <Footer
                    description={`HTD Distributions`}
                    unique="capital"
                    border={false}
                    value={formatNumAsString(capital.totalDistributions)} />

                <Footer
                    description={`HTD Preferred @${capital.prefRate}%`}
                    unique="capital"
                    border={false}
                    value={formatNumAsString(capital.totalPreferred)} />

                <Footer
                    description={`HTD Net Capital`}
                    unique="capital"
                    value={formatNumAsString(capital.totalContributions + capital.totalPreferred - capital.totalDistributions)} />

            </TableMain>

        </TableWrapper>
    )
}

export default Capital
