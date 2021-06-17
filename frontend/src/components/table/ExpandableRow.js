import React, { useState, useEffect } from 'react'

import { Caption } from '../../assets/styled-components/Carry'
import { TableRow, RowWrapper, LeftRow, RightRow } from '../../assets/styled-components/Table'
import { IconWrapper } from '../../assets/styled-components/General'
import Selector from './Selector'
import { InputForm } from '../common/FormInput'
import { Icon, Button, Popup } from 'semantic-ui-react'
import { numberWithCommas, trimString, renderPercent } from '../common/helpers'


export const renderIcon = (obj, checks = []) => {
    for (var i = 0; i < checks.length; i++) {
        if (obj[checks[i]].length > 0) {
            if (obj.isOpen) {
                return <Icon name={'minus'} />
            } else {
                return <Icon name={'plus'} />
            }
        }
        return null
    }
}

export const NestededContainer = ({ obj, onChange, sourceType, isAllocated = false }) => {

    const renderSubs = () => {
        if (obj.isOpen) {
            return obj.years.map((year, yearIndex) =>

                <ExpandableRow
                    year={year}
                    type='accounts'
                    sourceType={sourceType}
                    onChange={onChange}
                    isNested={true}
                    yearIndex={yearIndex}
                    key={yearIndex} />

            )
        }
    }


    const handleClick = () => {
        onChange([null, null, null], 'isOpen', !obj.isOpen)
    }

    const handleChange = (key, value) => {

    }

    const handleEditToggle = () => { }

    return (
        <RowWrapper style={obj.isOpen ? { borderBottom: '1px solid var(--text-secondary-light)' } : null}>
            <TableRow style={{ height: '3rem' }} isHoverable={false}>

                <LeftRow style={{ flex: 1, alignItems: 'center' }}>

                    <IconWrapper isHoverable={obj.years.length > 0} onClick={handleClick}>{renderIcon(obj, ['years'])}</IconWrapper>
                    <Caption style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}>{obj.label} {isAllocated ? `- ${renderPercent(obj.gross_percent)}%` : null}</Caption>
                    <Caption style={{ maxWidth: '10rem', display: 'flex', justifyContent: 'center' }}></Caption>
                    <InputForm wrapperStyles={{ minWidth: 150 }} obj={obj.total} onChange={value => handleChange('total', value)} />
                    <Popup content={`Last updated by Batman`} trigger={<Caption style={{ cursor: 'pointer', width: 20, flex: 'none', paddingBottom: 5, marginLeft: 5 }}><Icon name='info' /></Caption>} />

                </LeftRow>


                <RightRow style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5, width: 100, maxWidth: 100, minWidth: 100 }}>

                    <Button.Group size='small'>

                        <Button color='black' icon disabled={obj.source !== 'Pre Waibe'} onClick={() => handleEditToggle()}>
                            <Icon name={obj.readOnly ? 'save' : 'edit'} />
                        </Button>

                    </Button.Group>

                </RightRow>

            </TableRow>
            {renderSubs()}
        </RowWrapper>
    )
}

const ExpandableRow = ({ year, yearIndex, onChange, type, sourceType = 'tb', isNested = false, allocPerc = null }) => {

    const handleEditToggle = () => {
        if (year.source === 'Pre Waibe') onChange([yearIndex, null, null], 'readOnly', !year.total.readOnly)
    }
    const handleClick = () => {
        if (year.source !== 'Pre Waibe') onChange([yearIndex, null, null], 'isOpen', !year.isOpen)
    }
    const handleInputChange = (key, value) => {
        onChange([yearIndex, null, null], key, value)
    }

    const handleSubChange = (accountIndex, key, value) => {
        onChange([yearIndex, accountIndex, null], key, value)
    }


    const renderSub = () => {
        if (!year.isOpen) {
            return null
        } else {
            return (
                <Selector
                    accounts={year[type]}
                    sourceType={sourceType}
                    yearIndex={yearIndex}
                    onChange={handleSubChange} />
            )
        }
        // else if (type === 'attachments') {
        //     return <h1>Attachments</h1>
        // }
    }

    const isHoverable = () => {
        if (year.accounts && year.accounts.length > 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <RowWrapper>
            <TableRow style={{ height: '3rem' }} isHoverable={false}>

                <LeftRow style={{ flex: 1, alignItems: 'center' }}>
                    <IconWrapper isHoverable={isHoverable()} onClick={handleClick}>{renderIcon(year, ['accounts', 'attachments'])}</IconWrapper>
                    <Caption style={{ justifyContent: 'flex-start', paddingLeft: '1rem', textIndent: isNested ? '1rem' : 0 }}>{year.year}</Caption>
                    <Caption style={{ justifyContent: 'center' }}>{trimString(year.source, 25)}</Caption>
                    <InputForm wrapperStyles={{ minWidth: 150 }} obj={year.total} onChange={value => handleInputChange('total', value)} />
                    {allocPerc === null ? null : <Caption style={{ maxWidth: '10rem', display: 'flex', justifyContent: 'flex-end' }}>${numberWithCommas(year.total.current * (allocPerc / 100))}</Caption>}
                    <Popup content={`Last updated by Batman`} trigger={<Caption style={{ cursor: 'pointer', width: 20, flex: 'none', paddingBottom: 5, marginLeft: 5 }}><Icon name='info' /></Caption>} />
                </LeftRow>

                <RightRow style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5, width: 100, maxWidth: 100, minWidth: 100 }}>

                    <Button.Group size='small'>

                        <Button color='black' icon disabled={year.source !== 'Pre Waibe'} onClick={() => handleEditToggle()}>
                            <Icon name={year.readOnly ? 'save' : 'edit'} />
                        </Button>

                    </Button.Group>

                </RightRow>

            </TableRow>

            {renderSub()}

        </RowWrapper>
    )
}

export default ExpandableRow
