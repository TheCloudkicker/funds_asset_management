import React from 'react'
import { Modal, Button, Segment, Form, Select } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSetting } from '../../../store/actions/settings'

const GlobalSettings = () => {

    const { currencies } = useSelector(state => state.main)
    const settings = useSelector(state => state.settings)
    const dispatch = useDispatch()

    const formatOptions = [
        { value: 'MM-DD-YYYY', text: 'MM-DD-YYYY' },
        { value: 'DD-MM-YYYY', text: 'DD-MM-YYYY' },
    ]
    const boolOptions = [
        { value: false, text: 'No' },
        { value: true, text: 'Yes' },
    ]

    return (
        <>
            <Modal.Header>Global Settings </Modal.Header>
            <Modal.Content style={{ height: '50vh', display: 'grid', gridTemplateColumns: '2fr 1fr' }}>

                <Segment>

                    <Form>
                        <Form.Field>
                            <label>Rounding Tolerance (Basis Points)</label>
                            <input
                                placeholder='Enter basis points'
                                onChange={e => updateSetting(dispatch, { ...settings }, 'rounding_tolerance', e.target.value)}
                                value={settings.rounding_tolerance.current} />
                        </Form.Field>

                        <Form.Field
                            control={Select}
                            label='Date Format'
                            value={settings.date_format.current}
                            onChange={(e, data) => updateSetting(dispatch, { ...settings }, 'date_format', data.value)}
                            options={formatOptions}
                            placeholder='Default CCY'
                        />

                        <Form.Field
                            control={Select}
                            label='Default Currency'
                            value={settings.defaultCcy.current}
                            onChange={(e, data) => updateSetting(dispatch, { ...settings }, 'defaultCcy', data.value)}
                            options={currencies.map(ccy => {
                                return { value: ccy.value, text: ccy.short_name }
                            })}
                            placeholder='Default CCY'
                        />

                        <Form.Field
                            control={Select}
                            label='Dark Mode'
                            value={settings.isDark.current}
                            onChange={(e, data) => updateSetting(dispatch, { ...settings }, 'isDark', data.value)}
                            options={boolOptions}
                            placeholder='Dark Mode'
                        />

                    </Form>
                </Segment>



            </Modal.Content>
            <Modal.Actions>
                <Button>Add New</Button>
                <Button>Submit</Button>
            </Modal.Actions>
        </>
    )
}

export default GlobalSettings
