import React, { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Modal, Button } from 'semantic-ui-react'
import { TableRow, TableWrapper, TableHeader, HeaderItem, TableMain } from '../../../assets/styled-components/Table'
import { InputForm } from '../../common/FormInput'
import { Caption } from '../../../assets/styled-components/Carry'
import { CustomSelect } from '../../common/Select'
import { capitalizeFirstLetter } from '../../common/helpers'
import DatePicker from '../../common/DatePicker'
import { saveCriteria } from '../../../store/actions/funds/funds'
import { useSelector } from 'react-redux'
import { getAuditSettings, addAuditSetting, updateAuditSettings } from '../../../store/actions/main'

export const formatName = string => {

    let name = string.replace('_', ' ')

    return capitalizeFirstLetter(name)
}


const UpdateForm = ({ dispatch, formObj }) => {

    const { auditSettings } = useSelector(state => state.main)

    useEffect(() => {
        if (auditSettings.length === 0) {
            dispatch(getAuditSettings(null))
        }
    }, [])

    const [selectedIndex, setSelectedIndex] = useState(null)

    const options = [
        { value: "Net Assets", label: "Net Assets" },
        { value: "Net Income", label: "Net Income" },
    ]



    const onChange = (key, value) => {
        dispatch(updateAuditSettings([...auditSettings], selectedIndex, key, value))
        console.log("onChange", key, value)

    }

    const onSubmit = () => {


    }

    const onAdd = () => {
        dispatch(addAuditSetting())
        setSelectedIndex(auditSettings.length)
    }


    const onSelect = index => {
        setSelectedIndex(index)

    }

    const tableStyle = {
        overflowY: 'auto',
        height: '45vh',
        paddingRight: 5,
    }

    const renderForm = () => {
        if (selectedIndex === null) {
            return null
        } else {
            return (
                <TableMain style={tableStyle}>
                    <TableRow style={{ height: '4.3rem' }} >
                        <Caption>Name</Caption>
                        <InputForm
                            obj={auditSettings[selectedIndex].name}
                            inputStyles={{ textAlign: 'left' }}
                            readOnly={false}
                            isNumber={false}
                            onChange={value => onChange('name', value)} />
                    </TableRow>
                    <TableRow style={{ height: '4.3rem' }} >
                        <Caption>Benchmark</Caption>
                        <CustomSelect
                            obj={auditSettings[selectedIndex].benchmark}
                            readOnly={false}
                            options={options}
                            onChange={value => onChange('benchmark', value)}
                        />

                    </TableRow>
                    <TableRow style={{ height: '4.3rem' }} >
                        <Caption>Overall Bps</Caption>
                        <InputForm
                            obj={auditSettings[selectedIndex].overall}
                            readOnly={false}
                            isBps={true}
                            onChange={value => onChange('overall', value)} />
                    </TableRow>
                    <TableRow style={{ height: '4.3rem' }} >
                        <Caption>Performance (% of OM)</Caption>
                        <InputForm
                            obj={auditSettings[selectedIndex].performance}
                            readOnly={false}
                            isPercent={true}
                            onChange={value => onChange('performance', value)} />
                    </TableRow>
                    <TableRow style={{ height: '4.3rem' }} >
                        <Caption>Deminimis (% of OM)</Caption>
                        <InputForm
                            obj={auditSettings[selectedIndex].deminimis}
                            readOnly={false}
                            isPercent={true}
                            onChange={value => onChange('deminimis', value)} />
                    </TableRow>

                </TableMain>
            )
        }
    }

    return (
        <React.Fragment>
            <Modal.Header>Update Form - {formatName(formObj.key)} </Modal.Header>
            <Modal.Content style={{ height: '50vh', display: 'grid', gridTemplateColumns: '2fr 1fr' }}>

                <TableWrapper>
                    {renderForm()}
                </TableWrapper>

                <TableWrapper>
                    <TableHeader hasShadow={true} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                        <Caption>Audit Settings</Caption>
                    </TableHeader>
                    <TableMain>


                        {auditSettings.map((auditSetting, index) =>

                            <TableRow isSelected={index === selectedIndex} isHoverable={true} key={index} onClick={() => onSelect(index)}>
                                <Caption>{auditSetting.label}</Caption>
                            </TableRow>

                        )}
                    </TableMain>

                </TableWrapper>


            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onAdd}>Add New</Button>
                <Button onClick={onSubmit}>Submit</Button>
            </Modal.Actions>
        </React.Fragment>
    )
}

export default UpdateForm
